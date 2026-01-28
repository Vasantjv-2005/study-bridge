import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, Play } from 'lucide-react';

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-24 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur mb-6">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="text-sm text-primary-foreground/90">Start learning today</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Master New Skills with{' '}
              <span className="text-accent">LearnHub</span>
            </h1>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Access high-quality courses, track your progress, and achieve your learning goals with our modern learning platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-accent shadow-accent text-accent-foreground font-semibold">
                <Link to="/auth?mode=register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/courses">
                  <Play className="mr-2 h-4 w-4" />
                  Browse Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Why Choose LearnHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to accelerate your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Quality Courses', description: 'Curated content from expert instructors' },
              { icon: Users, title: 'Learn at Your Pace', description: 'Access courses anytime, anywhere' },
              { icon: Award, title: 'Track Progress', description: 'Monitor your learning journey' },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-card shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-primary mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of learners and start your journey today.
          </p>
          <Button asChild size="lg" className="gradient-primary shadow-primary">
            <Link to="/auth?mode=register">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
