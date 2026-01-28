import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Timer from '@/components/quiz/Timer';
import ProgressBar from '@/components/quiz/ProgressBar';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuestionNavigation from '@/components/quiz/QuestionNavigation';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Send, Loader2, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  category: string;
}

const QUIZ_TIME = 300; // 5 minutes in seconds

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [startTime] = useState(Date.now());

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get('questionId');
  const createdBy = queryParams.get('createdBy');
  const USE_DUMMY = (import.meta as any).env?.VITE_USE_DUMMY_AUTH === 'true';

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchQuestions();
  }, [user, navigate, questionId, createdBy]);

  useEffect(() => {
    if (loading || submitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, submitting]);

  const fetchQuestions = async () => {
    try {
      if (USE_DUMMY) {
        const raw = localStorage.getItem('dummy_questions');
        const all: any[] = raw ? JSON.parse(raw) : [];
        let list = all;
        if (questionId) {
          const q = all.find((q) => q.id === questionId);
          list = q ? [q] : [];
        } else if (createdBy === 'me' && user?.id) {
          list = all.filter((q) => q.created_by === user.id);
        }
        if (!questionId && createdBy !== 'me') {
          list = all.sort(() => Math.random() - 0.5).slice(0, 10);
        }
        setQuestions(list || []);
      } else {
        if (questionId) {
          const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('id', questionId)
            .single();

          if (error) throw error;
          setQuestions(data ? [data] : []);
        } else {
          let query = supabase
            .from('questions')
            .select('*');

          if (createdBy === 'me' && user?.id) {
            query = query.eq('created_by', user.id);
          } else {
            query = query.limit(10);
          }

          const { data, error } = await query;

          if (error) throw error;
          
          const shuffled = (data || []).sort(() => Math.random() - 0.5);
          setQuestions(shuffled);
        }
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load questions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleSubmit = useCallback(async (autoSubmit = false) => {
    if (submitting) return;
    setSubmitting(true);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    let correct = 0;
    let wrong = 0;
    const attempted = Object.keys(answers).length;

    const answerDetails = questions.map((q, idx) => ({
      questionId: q.id,
      question: q.question_text,
      userAnswer: answers[idx] || null,
      correctAnswer: q.correct_option,
      isCorrect: answers[idx] === q.correct_option,
      options: {
        A: q.option_a,
        B: q.option_b,
        C: q.option_c,
        D: q.option_d,
      },
    }));

    answerDetails.forEach((detail) => {
      if (detail.userAnswer) {
        if (detail.isCorrect) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const score = questions.length > 0 ? (correct / questions.length) * 100 : 0;
    const passed = score >= 50;

    try {
      if (!USE_DUMMY) {
        const { error } = await supabase.from('quiz_results').insert({
          user_id: user?.id,
          total_questions: questions.length,
          attempted,
          correct,
          wrong,
          score,
          passed,
          time_taken: timeTaken,
          answers: answerDetails,
        });
        if (error) throw error;
      } else {
        const raw = localStorage.getItem('dummy_results');
        const list: any[] = raw ? JSON.parse(raw) : [];
        const result = {
          id: (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
          user_id: user?.id || 'dummy',
          total_questions: questions.length,
          attempted,
          correct,
          wrong,
          score,
          passed,
          time_taken: timeTaken,
          answers: answerDetails,
          created_at: new Date().toISOString(),
        };
        list.unshift(result);
        localStorage.setItem('dummy_results', JSON.stringify(list));
      }

      navigate('/results', {
        state: {
          total: questions.length,
          attempted,
          correct,
          wrong,
          score,
          passed,
          timeTaken,
          answers: answerDetails,
          autoSubmitted: autoSubmit,
        },
      });
    } catch (error) {
      console.error('Error saving results:', error);
      toast({
        title: 'Error',
        description: 'Failed to save results. Please try again.',
        variant: 'destructive',
      });
      setSubmitting(false);
    }
  }, [answers, questions, user, navigate, startTime, submitting, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center p-8">
          <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold mb-2">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            There are no quiz questions available at the moment.
          </p>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Timer timeLeft={timeLeft} totalTime={QUIZ_TIME} />
          <Button
            variant="outline"
            onClick={() => setShowSubmitDialog(true)}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Quiz
          </Button>
        </div>

        {/* Progress */}
        <ProgressBar
          current={currentIndex}
          total={questions.length}
          answeredCount={answeredCount}
        />

        {/* Question */}
        <Card className="p-6 md:p-8 shadow-lg border-0">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentIndex] || null}
            onSelectAnswer={handleSelectAnswer}
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
            }
            disabled={currentIndex === questions.length - 1}
            className="gap-2 gradient-primary text-primary-foreground shadow-primary"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Question Navigation Grid */}
        <Card className="p-4">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Quick Navigation
          </p>
          <QuestionNavigation
            totalQuestions={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            onNavigate={setCurrentIndex}
          />
        </Card>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              {unansweredCount > 0 ? (
                <>
                  You have <span className="font-semibold text-warning">{unansweredCount} unanswered</span> question{unansweredCount > 1 ? 's' : ''}. 
                  Are you sure you want to submit?
                </>
              ) : (
                'You have answered all questions. Ready to submit?'
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleSubmit(false)}
              className="gradient-primary text-primary-foreground"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Quiz'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Quiz;
