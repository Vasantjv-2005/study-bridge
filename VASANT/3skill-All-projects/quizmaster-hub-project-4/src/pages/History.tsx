import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trophy, Clock, Target, Loader2, History as HistoryIcon } from 'lucide-react';
import { format } from 'date-fns';

interface QuizResult {
  id: string;
  total_questions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  passed: boolean;
  time_taken: number;
  created_at: string;
}

const History = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const USE_DUMMY = (import.meta as any).env?.VITE_USE_DUMMY_AUTH === 'true';

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchHistory();
  }, [user, navigate]);

  const fetchHistory = async () => {
    try {
      if (USE_DUMMY) {
        const raw = localStorage.getItem('dummy_results');
        const all: any[] = raw ? JSON.parse(raw) : [];
        const mine = user?.id ? all.filter((r) => r.user_id === user.id) : all;
        setResults(mine);
      } else {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setResults(data || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
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
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold">Quiz History</h1>
            <p className="text-muted-foreground">Your past quiz attempts</p>
          </div>
        </div>

        {results.length === 0 ? (
          <Card className="text-center p-8">
            <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2">No History Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't taken any quizzes yet. Start one now!
            </p>
            <Button onClick={() => navigate('/quiz')} className="gradient-primary text-primary-foreground">
              Start Quiz
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        result.passed ? 'gradient-success' : 'bg-destructive/20'
                      }`}>
                        {result.passed ? (
                          <Trophy className="w-6 h-6 text-success-foreground" />
                        ) : (
                          <Target className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">
                          Score: <span className={result.passed ? 'text-success' : 'text-destructive'}>
                            {result.score.toFixed(0)}%
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(result.created_at), 'MMM d, yyyy • h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-success">{result.correct} correct</p>
                      <p className="text-destructive">{result.wrong} wrong</p>
                      <p className="text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {formatTime(result.time_taken)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
