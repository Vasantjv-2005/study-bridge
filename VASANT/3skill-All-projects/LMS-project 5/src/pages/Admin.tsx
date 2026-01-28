import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, GripVertical, Loader2, BookOpen, Video } from 'lucide-react';
import { z } from 'zod';

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  thumbnail: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const lessonSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  video_url: z.string().url('Must be a valid YouTube URL').optional().or(z.literal('')),
});

interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
}

interface Lesson {
  id: string;
  course_id: string;
  title: string;
  video_url: string | null;
  order: number;
}

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Course form state
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('');

  // Lesson form state
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);

      // Fetch lessons for each course
      const lessonsMap: Record<string, Lesson[]> = {};
      for (const course of data || []) {
        const { data: lessonData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', course.id)
          .order('order', { ascending: true });
        lessonsMap[course.id] = lessonData || [];
      }
      setLessons(lessonsMap);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCourseForm = () => {
    setEditingCourse(null);
    setCourseTitle('');
    setCourseDescription('');
    setCourseThumbnail('');
  };

  const resetLessonForm = () => {
    setEditingLesson(null);
    setLessonTitle('');
    setLessonVideoUrl('');
    setSelectedCourseId(null);
  };

  const handleSaveCourse = async () => {
    const result = courseSchema.safeParse({
      title: courseTitle,
      description: courseDescription || undefined,
      thumbnail: courseThumbnail || undefined,
    });

    if (!result.success) {
      toast({
        title: 'Validation error',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update({
            title: courseTitle,
            description: courseDescription || null,
            thumbnail: courseThumbnail || null,
          })
          .eq('id', editingCourse.id);

        if (error) throw error;
        toast({ title: 'Course updated!' });
      } else {
        const { error } = await supabase.from('courses').insert({
          title: courseTitle,
          description: courseDescription || null,
          thumbnail: courseThumbnail || null,
          created_by: user!.id,
        });

        if (error) throw error;
        toast({ title: 'Course created!' });
      }

      setCourseDialogOpen(false);
      resetCourseForm();
      fetchCourses();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure? This will delete all lessons in this course.')) return;

    try {
      const { error } = await supabase.from('courses').delete().eq('id', courseId);
      if (error) throw error;
      toast({ title: 'Course deleted' });
      fetchCourses();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSaveLesson = async () => {
    const result = lessonSchema.safeParse({
      title: lessonTitle,
      video_url: lessonVideoUrl || undefined,
    });

    if (!result.success) {
      toast({
        title: 'Validation error',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (editingLesson) {
        const { error } = await supabase
          .from('lessons')
          .update({
            title: lessonTitle,
            video_url: lessonVideoUrl || null,
          })
          .eq('id', editingLesson.id);

        if (error) throw error;
        toast({ title: 'Lesson updated!' });
      } else {
        const currentLessons = lessons[selectedCourseId!] || [];
        const maxOrder = currentLessons.reduce((max, l) => Math.max(max, l.order), -1);

        const { error } = await supabase.from('lessons').insert({
          course_id: selectedCourseId,
          title: lessonTitle,
          video_url: lessonVideoUrl || null,
          order: maxOrder + 1,
        });

        if (error) throw error;
        toast({ title: 'Lesson created!' });
      }

      setLessonDialogOpen(false);
      resetLessonForm();
      fetchCourses();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;

    try {
      const { error } = await supabase.from('lessons').delete().eq('id', lessonId);
      if (error) throw error;
      toast({ title: 'Lesson deleted' });
      fetchCourses();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseTitle(course.title);
    setCourseDescription(course.description || '');
    setCourseThumbnail(course.thumbnail || '');
    setCourseDialogOpen(true);
  };

  const openAddLesson = (courseId: string) => {
    resetLessonForm();
    setSelectedCourseId(courseId);
    setLessonDialogOpen(true);
  };

  const openEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setSelectedCourseId(lesson.course_id);
    setLessonTitle(lesson.title);
    setLessonVideoUrl(lesson.video_url || '');
    setLessonDialogOpen(true);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Course Management
            </h1>
            <p className="text-muted-foreground">Create and manage your courses</p>
          </div>

          <Dialog open={courseDialogOpen} onOpenChange={(open) => {
            setCourseDialogOpen(open);
            if (!open) resetCourseForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gradient-primary shadow-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? 'Edit Course' : 'Create New Course'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Course title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Course description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={courseThumbnail}
                    onChange={(e) => setCourseThumbnail(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <Button onClick={handleSaveCourse} className="w-full" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lesson Dialog */}
        <Dialog open={lessonDialogOpen} onOpenChange={(open) => {
          setLessonDialogOpen(open);
          if (!open) resetLessonForm();
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="lessonTitle">Lesson Title</Label>
                <Input
                  id="lessonTitle"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Lesson title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">YouTube URL</Label>
                <Input
                  id="videoUrl"
                  value={lessonVideoUrl}
                  onChange={(e) => setLessonVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <Button onClick={handleSaveLesson} className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingLesson ? 'Update Lesson' : 'Add Lesson'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Courses List */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          </div>
        ) : courses.length > 0 ? (
          <div className="space-y-6">
            {courses.map((course) => (
              <Card key={course.id} className="border-0 shadow-md">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-start gap-4">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="font-display text-lg">{course.title}</CardTitle>
                      {course.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditCourse(course)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Lessons</h4>
                    <Button variant="outline" size="sm" onClick={() => openAddLesson(course.id)}>
                      <Plus className="mr-1 h-3 w-3" />
                      Add Lesson
                    </Button>
                  </div>
                  
                  {lessons[course.id]?.length > 0 ? (
                    <div className="space-y-2">
                      {lessons[course.id].map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <Video className="h-4 w-4 text-primary" />
                          <span className="flex-1 text-sm">
                            {index + 1}. {lesson.title}
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditLesson(lesson)}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteLesson(lesson.id)}>
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No lessons yet. Add your first lesson!
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first course to get started.
              </p>
              <Button onClick={() => setCourseDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
