import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Play } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  lessonCount?: number;
  isEnrolled?: boolean;
  progress?: number;
}

export function CourseCard({
  id,
  title,
  description,
  thumbnail,
  lessonCount = 0,
  isEnrolled = false,
  progress = 0,
}: CourseCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-md">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gradient-hero">
            <BookOpen className="h-12 w-12 text-primary-foreground/50" />
          </div>
        )}
        {isEnrolled && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
            Enrolled
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-display text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="pb-3">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Play className="h-3 w-3" />
            {lessonCount} lessons
          </span>
        </div>
      </CardContent>

      {isEnrolled && (
        <div className="px-6 pb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant={isEnrolled ? "secondary" : "default"}>
          <Link to={`/courses/${id}`}>
            {isEnrolled ? 'Continue Learning' : 'View Course'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
