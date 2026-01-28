import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  Zap,
  Volume2,
  Smartphone,
  ShoppingBag,
  Play,
  Award,
  Users,
  TrendingUp,
  Sparkles,
  Timer,
  Heart,
} from "lucide-react";
import { sampleProducts, categories } from "@shared/products";
import { useCart } from "@/contexts/CartContext";
import { AirPodsShowcase } from "@/components/AirPodsShowcase";

const HomePage: React.FC = () => {
  const { addItem } = useCart();
  const featuredProducts = sampleProducts.filter(
    (product) => product.isFeatured,
  );

  return (
    <div className="space-y-0 overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[95vh] bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-float delay-1000"></div>
        </div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[95vh] py-20">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-sm px-6 py-3 rounded-full shadow-lg animate-bounce-subtle">
                  <Sparkles className="h-4 w-4 mr-2" />
                  New Collection Available Now
                </Badge>
                <h1 className="text-6xl md:text-8xl font-bold leading-tight text-shadow-lg">
                  Experience{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Premium
                  </span>
                  <br />
                  <span className="relative">
                    Electronics
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-shimmer"></div>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                  Discover the latest in wireless audio, cutting-edge
                  smartphones, and premium accessories at{" "}
                  <span className="text-primary font-semibold">
                    unbeatable prices
                  </span>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 btn-gradient btn-glow hover-lift group shadow-2xl"
                  asChild
                >
                  <Link to="/products/airpods">
                    <Volume2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    Shop AirPods
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 hover:bg-primary/5 transition-all duration-300 hover-lift group"
                  asChild
                >
                  <Link to="/products">
                    <Play className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    View Collection
                  </Link>
                </Button>
              </div>

              {/* Enhanced trust indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="flex flex-col items-center text-center space-y-3 group hover-lift">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                    <Truck className="h-7 w-7 text-primary group-hover:animate-bounce" />
                  </div>
                  <span className="text-sm font-semibold">Free Shipping</span>
                  <span className="text-xs text-muted-foreground">
                    On orders $100+
                  </span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 group hover-lift">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                    <Shield className="h-7 w-7 text-primary group-hover:animate-bounce" />
                  </div>
                  <span className="text-sm font-semibold">2-Year Warranty</span>
                  <span className="text-xs text-muted-foreground">
                    Full coverage
                  </span>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 group hover-lift">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                    <Headphones className="h-7 w-7 text-primary group-hover:animate-bounce" />
                  </div>
                  <span className="text-sm font-semibold">24/7 Support</span>
                  <span className="text-xs text-muted-foreground">
                    Expert help
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Product Showcase */}
            <div className="relative animate-slide-in-right">
              <div className="relative z-20">
                <img
                  src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop"
                  alt="Premium AirPods"
                  className="w-full h-auto rounded-3xl shadow-2xl hover-scale"
                />

                {/* Enhanced floating product cards */}
                <div className="absolute -top-6 -left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Best Seller</div>
                      <div className="text-xs text-muted-foreground">
                        10k+ sold this month
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border animate-float delay-1000">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">4.9★ Rating</div>
                      <div className="text-xs text-muted-foreground">
                        2.8k reviews
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-4 bg-background/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border animate-float delay-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Most Loved</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced background gradient circles */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl -z-10 rotate-3 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl -z-20 -rotate-2 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers", icon: Users },
              { number: "100+", label: "Products", icon: ShoppingBag },
              { number: "4.9★", label: "Average Rating", icon: Star },
              { number: "24/7", label: "Support", icon: Headphones },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-4 group hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-primary group-hover:animate-pulse" />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text-primary">
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

      {/* Enhanced Categories Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 mb-20 animate-fade-in">
          <Badge variant="outline" className="px-6 py-3 text-base">
            <TrendingUp className="h-4 w-4 mr-2" />
            Product Categories
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold">
            Shop by{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated selection of premium electronics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover-lift">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />

                  {/* Enhanced category icon */}
                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/30 transition-all duration-300">
                      {category.id === "airpods" && (
                        <Volume2 className="h-7 w-7 text-white" />
                      )}
                      {category.id === "earphones" && (
                        <Headphones className="h-7 w-7 text-white" />
                      )}
                      {category.id === "mobiles" && (
                        <Smartphone className="h-7 w-7 text-white" />
                      )}
                      {category.id === "accessories" && (
                        <ShoppingBag className="h-7 w-7 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Enhanced category content */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium group-hover:text-accent transition-colors">
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Product count badge */}
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-primary/80 text-primary-foreground backdrop-blur-sm">
                      {
                        sampleProducts.filter((p) => p.category === category.id)
                          .length
                      }
                      + Products
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Enhanced AirPods Showcase */}
      <AirPodsShowcase />

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                ElectroZone
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience premium quality with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description:
                  "Free shipping on all orders over $100 with express delivery options",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Shield,
                title: "2-Year Warranty",
                description:
                  "Comprehensive warranty coverage on all premium electronics",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                description:
                  "Express delivery in 24-48 hours for most locations",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description:
                  "Round-the-clock expert customer support and technical help",
                color: "from-orange-500 to-orange-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-6 p-8 rounded-3xl hover:bg-background/50 transition-all duration-500 hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`mx-auto w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300`}
                >
                  <feature.icon className="h-10 w-10 text-white group-hover:animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Upgrade
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience premium
              electronics today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="text-lg px-10 py-6 btn-gradient btn-glow hover-lift shadow-2xl"
                asChild
              >
                <Link to="/products">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 border-2 hover:bg-primary/5 transition-all duration-300"
                asChild
              >
                <Link to="/about">
                  <Users className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
