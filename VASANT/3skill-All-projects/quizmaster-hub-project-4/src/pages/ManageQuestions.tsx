import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Loader2, FileQuestion } from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  category: string;
  difficulty: string;
  created_by: string | null;
}

const ManageQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const USE_DUMMY = (import.meta as any).env?.VITE_USE_DUMMY_AUTH === 'true';

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchQuestions();
  }, [user, navigate]);

  const fetchQuestions = async () => {
    try {
      if (USE_DUMMY) {
        const raw = localStorage.getItem('dummy_questions');
        const all: any[] = raw ? JSON.parse(raw) : [];
        const mine = user?.id ? all.filter((q) => q.created_by === user.id) : all;
        setQuestions(mine);
      } else {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('created_by', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setQuestions(data || []);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load questions.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      if (USE_DUMMY) {
        const raw = localStorage.getItem('dummy_questions');
        const list: any[] = raw ? JSON.parse(raw) : [];
        const next = list.filter((q) => q.id !== deleteId);
        localStorage.setItem('dummy_questions', JSON.stringify(next));
        setQuestions((prev) => prev.filter((q) => q.id !== deleteId));
      } else {
        const { error } = await supabase
          .from('questions')
          .delete()
          .eq('id', deleteId);
        if (error) throw error;
        setQuestions((prev) => prev.filter((q) => q.id !== deleteId));
      }
      toast({ title: 'Deleted', description: 'Question has been removed.' });
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({ title: 'Error', description: 'Failed to delete question.', variant: 'destructive' });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success/20 text-success';
      case 'hard':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-timer/20 text-timer';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold">My Questions</h1>
              <p className="text-muted-foreground">{questions.length} question{questions.length !== 1 ? 's' : ''} created</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const pwd = window.prompt('Enter password to show answers');
                if (pwd === 'Vasantjv05$') {
                  setShowAnswers(true);
                } else if (pwd !== null) {
                  setShowAnswers(false);
                }
              }}
            >
              {showAnswers ? 'Answers Unlocked' : 'Show Answers'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/quiz?createdBy=me')}
            >
              Take Quiz (My Questions)
            </Button>
            <Button onClick={() => navigate('/add-question')} className="gap-2 gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <Card className="text-center p-8">
            <FileQuestion className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2">No Questions Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start creating your own quiz questions!
            </p>
            <Button onClick={() => navigate('/add-question')} className="gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Question
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id} className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <Badge variant="outline">{question.category}</Badge>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground mb-3">{question.question_text}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {['A', 'B', 'C', 'D'].map((key) => {
                          const optionKey = `option_${key.toLowerCase()}` as keyof Question;
                          const isCorrect = showAnswers && question.correct_option === key;
                          return (
                            <div
                              key={key}
                              className={`p-2 rounded-lg ${
                                isCorrect
                                  ? 'bg-success/20 text-success border border-success/30'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <span className="font-semibold">{key}.</span> {question[optionKey]}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => navigate('/quiz?createdBy=me')}
                        className="gradient-primary text-primary-foreground"
                      >
                        Take Quiz
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(question.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This question will be permanently removed from the quiz pool.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageQuestions;
