import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy,
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';

interface AnswerDetail {
  questionId: string;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  options: Record<string, string>;
}

interface ResultsState {
  total: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  passed: boolean;
  timeTaken: number;
  answers: AnswerDetail[];
  autoSubmitted?: boolean;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);

  const results = location.state as ResultsState;

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center p-8">
          <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-display font-semibold mb-2">No Results Found</h2>
          <p className="text-muted-foreground mb-6">
            Please take a quiz first to see your results.
          </p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = () => {
    if (results.score >= 80) return 'text-success';
    if (results.score >= 50) return 'text-timer';
    return 'text-destructive';
  };

  const getScoreBackground = () => {
    if (results.score >= 80) return 'from-success/20 to-success/5';
    if (results.score >= 50) return 'from-timer/20 to-timer/5';
    return 'from-destructive/20 to-destructive/5';
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Auto-submit warning */}
        {results.autoSubmitted && (
          <Card className="bg-warning/10 border-warning/30">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-warning" />
              <p className="text-sm text-warning">
                Quiz was automatically submitted because time ran out.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Score Card */}
        <Card className={`overflow-hidden border-0 shadow-xl`}>
          <div className={`bg-gradient-to-br ${getScoreBackground()} p-8 text-center`}>
            <div className="mb-4">
              {results.passed ? (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-success shadow-success animate-bounce-subtle">
                  <Trophy className="w-10 h-10 text-success-foreground" />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20">
                  <Target className="w-10 h-10 text-destructive" />
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-display font-bold mb-2">
              {results.passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {results.passed
                ? "You've passed the quiz successfully!"
                : 'You can always try again and improve.'}
            </p>

            <div className={`text-6xl font-display font-bold ${getScoreColor()} mb-2`}>
              {results.score.toFixed(0)}%
            </div>
            <p className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
              results.passed
                ? 'bg-success/20 text-success'
                : 'bg-destructive/20 text-destructive'
            }`}>
              {results.passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
            </p>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-display font-bold">{results.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-success" />
                <p className="text-2xl font-display font-bold text-success">{results.correct}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <XCircle className="w-6 h-6 mx-auto mb-2 text-destructive" />
                <p className="text-2xl font-display font-bold text-destructive">{results.wrong}</p>
                <p className="text-xs text-muted-foreground">Wrong</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Clock className="w-6 h-6 mx-auto mb-2 text-timer" />
                <p className="text-2xl font-display font-bold">{formatTime(results.timeTaken)}</p>
                <p className="text-xs text-muted-foreground">Time Taken</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Section */}
        <Card className="border-0 shadow-lg">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-xl"
          >
            <span className="font-display font-semibold">Review Answers</span>
            {showReview ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          
          {showReview && (
            <CardContent className="p-4 pt-0 space-y-4">
              {results.answers.map((answer, index) => (
                <div
                  key={answer.questionId}
                  className={`p-4 rounded-xl border-2 ${
                    answer.isCorrect
                      ? 'border-correct-light bg-correct-light/30'
                      : 'border-wrong-light bg-wrong-light/30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="font-medium text-foreground">{answer.question}</p>
                  </div>

                  <div className="ml-11 space-y-2">
                    {answer.userAnswer && (
                      <div className={`flex items-center gap-2 text-sm ${
                        answer.isCorrect ? 'text-success' : 'text-destructive'
                      }`}>
                        {answer.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        <span>
                          Your answer: <strong>{answer.userAnswer}</strong> - {answer.options[answer.userAnswer]}
                        </span>
                      </div>
                    )}
                    
                    {!answer.userAnswer && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-4 h-4 rounded-full border-2 border-current" />
                        <span>Not answered</span>
                      </div>
                    )}

                    {!answer.isCorrect && (
                      <div className="flex items-center gap-2 text-sm text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          Correct answer: <strong>{answer.correctAnswer}</strong> - {answer.options[answer.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
          <Button
            onClick={() => navigate('/quiz')}
            className="gap-2 gradient-primary text-primary-foreground shadow-primary"
          >
            <RotateCcw className="w-4 h-4" />
            Take Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
