import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CertificateDialog } from '@/components/CertificateDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Play, CheckCircle, Circle, ArrowLeft, BookOpen, Loader2, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
}

interface Lesson {
  id: string;
  title: string;
  video_url: string | null;
  order: number;
}

interface Enrollment {
  completed_lessons: string[];
  progress_percentage: number;
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [marking, setMarking] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [profile, setProfile] = useState<{ name: string } | null>(null);

  // Fetch user profile for certificate
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('name')
        .eq('user_id', user.id)
        .maybeSingle();
      setProfile(data);
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (id) {
      fetchCourseDetails();
    }
  }, [id, user]);

  const fetchCourseDetails = async () => {
    try {
      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('order', { ascending: true });

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);

      if (lessonsData && lessonsData.length > 0) {
        setSelectedLesson(lessonsData[0]);
      }

      // Fetch enrollment if user is logged in
      if (user) {
        const { data: enrollmentData } = await supabase
          .from('enrollments')
          .select('completed_lessons, progress_percentage')
          .eq('user_id', user.id)
          .eq('course_id', id)
          .maybeSingle();

        setEnrollment(enrollmentData);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load course details.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setEnrolling(true);
    try {
      const { error } = await supabase.from('enrollments').insert({
        user_id: user.id,
        course_id: id,
      });

      if (error) throw error;

      setEnrollment({ completed_lessons: [], progress_percentage: 0 });
      toast({
        title: 'Enrolled!',
        description: 'You have successfully enrolled in this course.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setEnrolling(false);
    }
  };

  const handleMarkComplete = async (lessonId: string) => {
    if (!enrollment) return;

    setMarking(true);
    try {
      const isCompleted = enrollment.completed_lessons.includes(lessonId);
      const updatedLessons = isCompleted
        ? enrollment.completed_lessons.filter((l) => l !== lessonId)
        : [...enrollment.completed_lessons, lessonId];

      const newProgress = Math.round((updatedLessons.length / lessons.length) * 100);

      const { error } = await supabase
        .from('enrollments')
        .update({
          completed_lessons: updatedLessons,
          progress_percentage: newProgress,
        })
        .eq('user_id', user!.id)
        .eq('course_id', id);

      if (error) throw error;

      setEnrollment({
        completed_lessons: updatedLessons,
        progress_percentage: newProgress,
      });

      toast({
        title: isCompleted ? 'Marked incomplete' : 'Lesson completed!',
        description: isCompleted ? 'Lesson marked as incomplete.' : 'Great job! Keep going.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="aspect-video max-w-4xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="border-0 shadow-md">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">Course not found</h3>
              <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {selectedLesson?.video_url ? (
              <VideoPlayer videoUrl={selectedLesson.video_url} title={selectedLesson.title} />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <Play className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {lessons.length > 0 ? 'Select a lesson to start' : 'No lessons available yet'}
                  </p>
                </div>
              </div>
            )}

            {/* Lesson Title & Actions */}
            {selectedLesson && enrollment && (
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">{selectedLesson.title}</h2>
                <Button
                  variant={enrollment.completed_lessons.includes(selectedLesson.id) ? 'secondary' : 'default'}
                  onClick={() => handleMarkComplete(selectedLesson.id)}
                  disabled={marking}
                >
                  {marking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {enrollment.completed_lessons.includes(selectedLesson.id)
                    ? 'Completed'
                    : 'Mark as Complete'}
                </Button>
              </div>
            )}

            {/* Course Info */}
            <div>
              <h1 className="font-display text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>

          {/* Sidebar - Lessons List */}
          <div className="space-y-4">
            {/* Progress Card */}
            {enrollment && (
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Your Progress</span>
                    <span className="text-sm font-bold text-primary">
                      {enrollment.progress_percentage}%
                    </span>
                  </div>
                  <Progress value={enrollment.progress_percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {enrollment.completed_lessons.length} of {lessons.length} lessons completed
                  </p>
                  
                  {/* Generate Certificate Button */}
                  {enrollment.progress_percentage === 100 && (
                    <Button
                      onClick={() => setShowCertificate(true)}
                      className="w-full mt-4 gradient-accent shadow-accent"
                    >
                      <Award className="mr-2 h-4 w-4" />
                      Generate Certificate
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Enroll Button */}
            {!enrollment && (
              <Button onClick={handleEnroll} className="w-full gradient-primary shadow-primary" disabled={enrolling}>
                {enrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? 'Enroll Now - Free' : 'Sign In to Enroll'}
              </Button>
            )}

            {/* Lessons List */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <h3 className="font-display font-semibold mb-4">Course Content</h3>
                <div className="space-y-2">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, index) => {
                      const isCompleted = enrollment?.completed_lessons.includes(lesson.id);
                      const isActive = selectedLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={cn(
                            'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted'
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {index + 1}. {lesson.title}
                            </p>
                          </div>
                          {isActive && <Play className="h-4 w-4 flex-shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No lessons available yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Certificate Dialog */}
        {course && profile && (
          <CertificateDialog
            open={showCertificate}
            onOpenChange={setShowCertificate}
            studentName={profile.name}
            courseName={course.title}
            completionDate={new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          />
        )}
      </div>
    </Layout>
  );
}
