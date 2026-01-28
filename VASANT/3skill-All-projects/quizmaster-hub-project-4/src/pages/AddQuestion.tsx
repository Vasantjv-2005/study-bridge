import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';

const questionSchema = z.object({
  question_text: z.string().min(10, 'Question must be at least 10 characters').max(500, 'Question is too long'),
  option_a: z.string().min(1, 'Option A is required').max(200, 'Option is too long'),
  option_b: z.string().min(1, 'Option B is required').max(200, 'Option is too long'),
  option_c: z.string().min(1, 'Option C is required').max(200, 'Option is too long'),
  option_d: z.string().min(1, 'Option D is required').max(200, 'Option is too long'),
  correct_option: z.enum(['A', 'B', 'C', 'D'], { required_error: 'Please select the correct answer' }),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

const categories = [
  'General',
  'Science',
  'History',
  'Geography',
  'Math',
  'Literature',
  'Art',
  'Sports',
  'Technology',
  'Music',
];

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: '' as 'A' | 'B' | 'C' | 'D' | '',
    category: 'General',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastQuestionId, setLastQuestionId] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const USE_DUMMY = (import.meta as any).env?.VITE_USE_DUMMY_AUTH === 'true';

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    try {
      questionSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);

    try {
      if (USE_DUMMY) {
        const raw = localStorage.getItem('dummy_questions');
        const list: any[] = raw ? JSON.parse(raw) : [];
        const id = crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
        const newQ = {
          id,
          question_text: formData.question_text.trim(),
          option_a: formData.option_a.trim(),
          option_b: formData.option_b.trim(),
          option_c: formData.option_c.trim(),
          option_d: formData.option_d.trim(),
          correct_option: formData.correct_option,
          category: formData.category,
          difficulty: formData.difficulty,
          created_by: user?.id || 'dummy',
          created_at: new Date().toISOString(),
        };
        list.unshift(newQ);
        localStorage.setItem('dummy_questions', JSON.stringify(list));
        setSuccess(true);
        setLastQuestionId(id);
        toast({ title: 'Question Added!', description: 'Saved locally (dummy mode).' });
      } else {
        const { data, error } = await supabase
          .from('questions')
          .insert({
            question_text: formData.question_text.trim(),
            option_a: formData.option_a.trim(),
            option_b: formData.option_b.trim(),
            option_c: formData.option_c.trim(),
            option_d: formData.option_d.trim(),
            correct_option: formData.correct_option,
            category: formData.category,
            difficulty: formData.difficulty,
            created_by: user?.id,
          })
          .select('id')
          .single();

        if (error) throw error;

        setSuccess(true);
        if (data?.id) {
          setLastQuestionId(data.id);
        }
        toast({
          title: 'Question Added!',
          description: 'Your question has been added to the quiz pool.',
        });
      }

      // Reset form after success
      setTimeout(() => {
        setFormData({
          question_text: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct_option: '',
          category: 'General',
          difficulty: 'medium',
        });
        setSuccess(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding question:', error);
      toast({
        title: 'Error',
        description: 'Failed to add question. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const optionLabels = [
    { key: 'A', field: 'option_a' },
    { key: 'B', field: 'option_b' },
    { key: 'C', field: 'option_c' },
    { key: 'D', field: 'option_d' },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold">Add Question</h1>
            <p className="text-muted-foreground">Create a new quiz question</p>
          </div>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Question Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Text */}
              <div className="space-y-2">
                <Label htmlFor="question_text">Question *</Label>
                <Textarea
                  id="question_text"
                  placeholder="Enter your question here..."
                  value={formData.question_text}
                  onChange={(e) => handleChange('question_text', e.target.value)}
                  className={`min-h-[100px] ${errors.question_text ? 'border-destructive' : ''}`}
                />
                {errors.question_text && (
                  <p className="text-sm text-destructive">{errors.question_text}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-4">
                <Label>Answer Options *</Label>
                <div className="grid gap-3">
                  {optionLabels.map(({ key, field }) => (
                    <div key={key} className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                          formData.correct_option === key
                            ? 'gradient-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {key}
                      </div>
                      <Input
                        placeholder={`Option ${key}`}
                        value={formData[field as keyof typeof formData] as string}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className={`flex-1 ${errors[field] ? 'border-destructive' : ''}`}
                      />
                      <Button
                        type="button"
                        variant={formData.correct_option === key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleChange('correct_option', key)}
                        className={formData.correct_option === key ? 'gradient-success text-success-foreground' : ''}
                      >
                        {formData.correct_option === key ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          'Correct'
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.correct_option && (
                  <p className="text-sm text-destructive">{errors.correct_option}</p>
                )}
                {(errors.option_a || errors.option_b || errors.option_c || errors.option_d) && (
                  <p className="text-sm text-destructive">All options are required</p>
                )}
              </div>

              {/* Category & Difficulty */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleChange('difficulty', value as 'easy' | 'medium' | 'hard')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full gap-2 gradient-primary text-primary-foreground shadow-primary"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Question Added!
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Question
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/manage-questions')}>
            View My Questions
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              lastQuestionId
                ? navigate(`/quiz?questionId=${lastQuestionId}`)
                : navigate('/quiz')
            }
          >
            Take a Quiz
          </Button>
          {lastQuestionId && (
            <Button
              onClick={() => navigate(`/quiz?questionId=${lastQuestionId}`)}
              className="gradient-primary text-primary-foreground"
            >
              Take This Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
