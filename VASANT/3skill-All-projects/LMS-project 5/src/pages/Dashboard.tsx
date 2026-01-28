import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';
import { CourseCard } from '@/components/CourseCard';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, TrendingUp, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EnrolledCourse {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  lessonCount: number;
  progress: number;
}

export default function Dashboard() {
  const { user, role } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalLessons: 0,
    averageProgress: 0,
  });

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select(`
          course_id,
          progress_percentage,
          courses (
            id,
            title,
            description,
            thumbnail
          )
        `)
        .eq('user_id', user!.id);

      if (error) throw error;

      const coursesWithLessons = await Promise.all(
        (enrollments || []).map(async (enrollment) => {
          const { count } = await supabase
            .from('lessons')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', enrollment.course_id);

          const course = enrollment.courses as any;
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            lessonCount: count || 0,
            progress: enrollment.progress_percentage || 0,
          };
        })
      );

      setEnrolledCourses(coursesWithLessons);

      // Calculate stats
      const totalProgress = coursesWithLessons.reduce((sum, c) => sum + c.progress, 0);
      const completedCount = coursesWithLessons.filter(c => c.progress === 100).length;
      const totalLessons = coursesWithLessons.reduce((sum, c) => sum + c.lessonCount, 0);

      setStats({
        totalCourses: coursesWithLessons.length,
        completedCourses: completedCount,
        totalLessons,
        averageProgress: coursesWithLessons.length > 0 ? Math.round(totalProgress / coursesWithLessons.length) : 0,
      });
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}! 👋
          </h1>
          <p className="text-muted-foreground">
            {role === 'admin'
              ? 'Manage your courses and track student progress.'
              : 'Continue your learning journey where you left off.'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Enrolled Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">{stats.totalCourses}</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">{stats.averageProgress}%</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <Award className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">{stats.completedCourses}</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Lessons
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">{stats.totalLessons}</div>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">My Courses</h2>
            <Button asChild variant="outline">
              <Link to="/courses">Browse All Courses</Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  thumbnail={course.thumbnail}
                  lessonCount={course.lessonCount}
                  isEnrolled
                  progress={course.progress}
                />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">No courses yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start your learning journey by enrolling in a course.
                </p>
                <Button asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
