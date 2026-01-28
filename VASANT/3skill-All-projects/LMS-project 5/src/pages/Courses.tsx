import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { CourseCard } from '@/components/CourseCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  lessonCount: number;
  isEnrolled: boolean;
  progress: number;
}

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data: coursesData, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get enrollments if user is logged in
      let enrollments: { course_id: string; progress_percentage: number }[] = [];
      if (user) {
        const { data } = await supabase
          .from('enrollments')
          .select('course_id, progress_percentage')
          .eq('user_id', user.id);
        enrollments = data || [];
      }

      // Get lesson counts for each course
      const coursesWithDetails = await Promise.all(
        (coursesData || []).map(async (course) => {
          const { count } = await supabase
            .from('lessons')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);

          const enrollment = enrollments.find((e) => e.course_id === course.id);

          return {
            id: course.id,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            lessonCount: count || 0,
            isEnrolled: !!enrollment,
            progress: enrollment?.progress_percentage || 0,
          };
        })
      );

      setCourses(coursesWithDetails);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Explore Courses
          </h1>
          <p className="text-muted-foreground">
            Discover our collection of high-quality courses
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                thumbnail={course.thumbnail}
                lessonCount={course.lessonCount}
                isEnrolled={course.isEnrolled}
                progress={course.progress}
              />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? 'Try adjusting your search terms.'
                  : 'Check back soon for new courses!'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
