import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  Menu,
  User,
  Heart,
  Zap,
  Phone,
  Mail,
  MapPin,
  X,
  ChevronUp,
  Star,
  Award,
  Users,
  Shield,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "AirPods", href: "/products/airpods" },
  { name: "Earphones", href: "/products/earphones" },
  { name: "Mobile Phones", href: "/products/mobiles" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { itemCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowBackToTop(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Enhanced Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg border-b"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        )}
      >
        {/* Top bar with gradient */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden relative">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="container mx-auto px-4 py-2 relative z-10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6 animate-slide-in-left">
                <span className="flex items-center hover:text-accent transition-colors">
                  <Phone className="h-3 w-3 mr-2" />
                  9392069322
                </span>
                <span className="flex items-center hover:text-accent transition-colors">
                  <Mail className="h-3 w-3 mr-2" />
                  vasantjv2005@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-4 animate-slide-in-right">
                <span className="hidden sm:block">
                  ⚡ Free shipping on orders over $100
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-accent fill-current" />
                  <span className="text-xs font-medium">4.9★ Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main header with enhanced styling */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group hover-lift"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300">
                  <Zap className="h-6 w-6 text-primary-foreground animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce-subtle"></div>
              </div>
              <span className="text-2xl md:text-3xl font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300">
                ElectroZone
              </span>
            </Link>

            {/* Enhanced Search bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Input
                  type="search"
                  placeholder="Search for AirPods, earphones, mobiles..."
                  className="pl-12 pr-4 h-12 bg-muted/50 border-muted-foreground/20 focus:border-primary focus:bg-background transition-all duration-300 relative z-10 focus-ring"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>

            {/* Enhanced Right section */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex relative group hover-glow"
              >
                <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative group hover-glow"
              >
                <User className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
              </Button>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative group hover-glow"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg animate-scale-in">
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="border-t bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-primary whitespace-nowrap relative group py-2",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300",
                      location.pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  ></div>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg animate-slide-up z-40">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 pr-4"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg transition-all duration-300",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main content with enhanced wrapper */}
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none"></div>
        <div className="relative z-10">{children}</div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-muted/80 to-muted/60 backdrop-blur-sm mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-5"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Enhanced Company info */}
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text-primary">
                  ElectroZone
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your premier destination for the latest in electronic gadgets
                and accessories. Quality products, competitive prices, and
                exceptional service.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Tech Street, Silicon Valley, CA 94025</span>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground">
                    Certified
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">50K+</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-xs text-muted-foreground">4.9★</span>
                </div>
              </div>
            </div>

            {/* Quick links with hover effects */}
            <div
              className="space-y-4 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "AirPods", href: "/products/airpods" },
                  { name: "Earphones", href: "/products/earphones" },
                  { name: "Mobile Phones", href: "/products/mobiles" },
                  { name: "Special Deals", href: "/deals" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer service */}
            <div
              className="space-y-4 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-semibold text-lg">Customer Service</h3>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "Shipping Info", href: "/shipping" },
                  { name: "Returns", href: "/returns" },
                  { name: "Warranty", href: "/warranty" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Newsletter */}
            <div
              className="space-y-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <h3 className="font-semibold text-lg">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-background/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                  />
                  <Button className="btn-gradient">Subscribe</Button>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>We respect your privacy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ElectroZone. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl btn-gradient animate-scale-in"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
