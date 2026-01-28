import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Brain,
  Play,
  History,
  LogOut,
  Trophy,
  Target,
  PlusCircle,
  FileQuestion,
  Clock,
  Sparkles,
  User,
} from 'lucide-react';

interface Stats {
  totalQuizzes: number;
  avgScore: number;
  bestScore: number;
}

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalQuizzes: 0, avgScore: 0, bestScore: 0 });
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  const USE_DUMMY = (import.meta as any).env?.VITE_USE_DUMMY_AUTH === 'true';

  useEffect(() => {
    if (!loading && user) {
      fetchStats();
      fetchProfile();
    }
  }, [user, loading]);

  const fetchStats = async () => {
    if (!user) return;

    try {
      if (USE_DUMMY) {
        const raw = localStorage.getItem('dummy_results');
        const all: any[] = raw ? JSON.parse(raw) : [];
        const mine = all.filter((r) => (user.id ? r.user_id === user.id : true));
        if (mine.length > 0) {
          const scores = mine.map((r) => r.score);
          setStats({
            totalQuizzes: mine.length,
            avgScore: scores.reduce((a: number, b: number) => a + b, 0) / scores.length,
            bestScore: Math.max(...scores),
          });
        } else {
          setStats({ totalQuizzes: 0, avgScore: 0, bestScore: 0 });
        }
      } else {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('score')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          const scores = data.map((r) => r.score);
          setStats({
            totalQuizzes: data.length,
            avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
            bestScore: Math.max(...scores),
          });
        } else {
          setStats({ totalQuizzes: 0, avgScore: 0, bestScore: 0 });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;

    try {
      if (USE_DUMMY) {
        const metaName = (user as any)?.user_metadata?.name;
        if (metaName) setUserName(metaName);
        return;
      } else {
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('user_id', user.id)
          .single();

        if (error && (error as any).code !== 'PGRST116') throw error;
        if (data) {
          setUserName(data.name);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative container mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">
                Test Your Knowledge
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                QuizMaster
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
              Challenge yourself with our interactive quizzes. Track your progress, compete with yourself, and become a knowledge champion!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="gap-2 gradient-primary text-primary-foreground shadow-primary text-lg px-8"
              >
                <Play className="w-5 h-5" />
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-primary">
                  <Brain className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Multiple Topics</h3>
                <p className="text-muted-foreground text-sm">
                  Questions from various categories including Science, History, Geography, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl gradient-success flex items-center justify-center mx-auto mb-4 shadow-success">
                  <Clock className="w-7 h-7 text-success-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Timed Challenges</h3>
                <p className="text-muted-foreground text-sm">
                  Test your knowledge under pressure with our countdown timer feature.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-timer/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-7 h-7 text-timer" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Track Progress</h3>
                <p className="text-muted-foreground text-sm">
                  Review your answers and monitor your improvement over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Logged in dashboard
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">QuizMaster</span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="relative container mx-auto px-4 py-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-4">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Welcome back
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Hello, {userName || user.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">Ready to challenge your brain today?</p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-display font-bold">{stats.totalQuizzes}</p>
              <p className="text-xs text-muted-foreground">Quizzes Taken</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Brain className="w-6 h-6 mx-auto mb-2 text-timer" />
              <p className="text-2xl font-display font-bold">{stats.avgScore.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-success" />
              <p className="text-2xl font-display font-bold">{stats.bestScore.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Best Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/quiz')}
              className="gap-3 gradient-primary text-primary-foreground shadow-primary text-lg py-6"
            >
              <Play className="w-6 h-6" />
              All Questions
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/quiz?createdBy=me')}
              className="gap-3 gradient-success text-success-foreground shadow-success text-lg py-6"
            >
              <Brain className="w-6 h-6" />
              My Questions
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/add-question')}
              className="gap-2 py-6"
            >
              <PlusCircle className="w-5 h-5" />
              Add Questions
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/manage-questions')}
              className="gap-2 py-6"
            >
              <FileQuestion className="w-5 h-5" />
              My Questions
            </Button>
          </div>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/history')}
            className="w-full gap-3 text-lg py-6"
          >
            <History className="w-6 h-6" />
            View Quiz History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
