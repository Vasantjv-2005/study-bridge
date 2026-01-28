import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  Zap,
  Users,
  Heart,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

const About: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "100% Genuine Products",
      description:
        "All our products are verified and sourced directly from authorized dealers and brands.",
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Fast & Reliable Delivery",
      description:
        "Quick delivery across India with real-time tracking and secure packaging.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Secure Payment Options",
      description:
        "Multiple payment methods with bank-level security for safe transactions.",
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "Responsive Customer Support",
      description:
        "Easy returns and dedicated customer support to help you with any queries.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "100+", label: "Products" },
    { number: "4.9★", label: "Average Rating" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-lg px-6 py-3">
                <Calendar className="h-5 w-5 mr-2" />
                Founded in 2025
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ElectroZone
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your one-stop destination for high-quality electronics like
                AirPods, wired earphones, and mobile phones.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=400&fit=crop"
                  alt="ElectroZone Products"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl -z-10 rotate-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              ElectroZone was created with a mission to make premium electronics
              more accessible and affordable for everyone. Whether you're a
              student, a working professional, or a tech enthusiast, we aim to
              bring you the latest gadgets that fit your lifestyle and budget.
            </p>
          </div>

          {/* Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Students</h3>
                <p className="text-muted-foreground">
                  Affordable tech solutions for your academic and personal needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Working Professionals</h3>
                <p className="text-muted-foreground">
                  Premium devices to enhance productivity and communication
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Tech Enthusiasts</h3>
                <p className="text-muted-foreground">
                  Latest gadgets and cutting-edge technology at great prices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              What Makes Us{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional service and building
              long-lasting relationships with our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by Thousands
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Building Trust Through{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Quality & Service
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                At ElectroZone, we believe in building trust through quality and
                service. Every product we sell is carefully selected and
                verified to ensure you get the best value for your money.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Quality Assured</h3>
                <p className="text-muted-foreground">
                  Every product undergoes strict quality checks before delivery
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Heart className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our top priority in everything we do
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold">Pan-India Delivery</h3>
                <p className="text-muted-foreground">
                  Fast and reliable delivery to every corner of India
                </p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-lg font-medium text-primary">
                Thank you for choosing us to be a part of your digital
                lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
