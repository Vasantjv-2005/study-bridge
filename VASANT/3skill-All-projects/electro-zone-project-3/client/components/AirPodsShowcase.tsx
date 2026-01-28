import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Star,
  Volume2,
  Zap,
  Shield,
  Bluetooth,
  Battery,
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { sampleProducts } from "@shared/products";
import { useCart } from "@/contexts/CartContext";

export const AirPodsShowcase: React.FC = () => {
  const { addItem } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const airpodsProducts = sampleProducts.filter(
    (product) => product.category === "airpods",
  );

  const featuredAirPods = airpodsProducts.filter(
    (product) => product.isFeatured,
  );
  const allAirPods = airpodsProducts.slice(0, 6);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredAirPods.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredAirPods.length) % featuredAirPods.length,
    );
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 text-lg font-medium">
              <Volume2 className="h-5 w-5 mr-2" />
              Premium AirPods Collection
            </Badge>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Wireless
            </span>
            <br />
            <span className="text-foreground">Freedom</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of audio with Apple's revolutionary AirPods.
            From the iconic AirPods to the premium AirPods Max, discover the
            perfect sound companion for your lifestyle.
          </p>
        </div>

        {/* Hero Product Carousel */}
        <div className="mb-20">
          <div className="relative max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm border">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Product Info */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {featuredAirPods[currentSlide]?.isNew && (
                          <Badge className="bg-accent text-accent-foreground">
                            <Sparkles className="h-3 w-3 mr-1" />
                            New
                          </Badge>
                        )}
                        {featuredAirPods[currentSlide]?.originalPrice && (
                          <Badge className="bg-destructive text-destructive-foreground">
                            Save $
                            {(
                              (featuredAirPods[currentSlide]?.originalPrice ||
                                0) - featuredAirPods[currentSlide]?.price
                            ).toFixed(0)}
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        {featuredAirPods[currentSlide]?.name}
                      </h3>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {featuredAirPods[currentSlide]?.description}
                      </p>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i <
                                Math.floor(
                                  featuredAirPods[currentSlide]?.rating || 0,
                                )
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-medium">
                          {featuredAirPods[currentSlide]?.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({featuredAirPods[currentSlide]?.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="grid grid-cols-2 gap-4">
                      {featuredAirPods[currentSlide]?.specs?.noiseCancel && (
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">
                            Noise Cancelling
                          </span>
                        </div>
                      )}
                      {featuredAirPods[currentSlide]?.specs?.waterResistant && (
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                          <Zap className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">
                            {
                              featuredAirPods[currentSlide]?.specs
                                ?.waterResistant
                            }
                          </span>
                        </div>
                      )}
                      {featuredAirPods[currentSlide]?.specs?.batteryLife && (
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                          <Battery className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">
                            {featuredAirPods[currentSlide]?.specs?.batteryLife}
                          </span>
                        </div>
                      )}
                      {featuredAirPods[currentSlide]?.specs?.connectivity && (
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                          <Bluetooth className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">
                            {featuredAirPods[currentSlide]?.specs?.connectivity}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-4xl font-bold text-primary">
                            ${featuredAirPods[currentSlide]?.price}
                          </span>
                          {featuredAirPods[currentSlide]?.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through">
                              ${featuredAirPods[currentSlide]?.originalPrice}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Free shipping & 2-year warranty
                        </p>
                      </div>

                      <Button
                        size="lg"
                        onClick={() =>
                          featuredAirPods[currentSlide] &&
                          addItem(featuredAirPods[currentSlide])
                        }
                        className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Add to Cart
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative">
                    <div className="relative z-10">
                      <img
                        src={featuredAirPods[currentSlide]?.image}
                        alt={featuredAirPods[currentSlide]?.name}
                        className="w-full h-auto max-w-md mx-auto rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl -z-10 rotate-3"></div>
                    <div className="absolute -bottom-6 -left-6 w-full h-full bg-gradient-to-br from-accent/15 to-primary/15 rounded-2xl -z-20 -rotate-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-background"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-background"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredAirPods.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Complete AirPods Collection
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From everyday listening to professional audio, find your perfect
              AirPods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allAirPods.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-accent text-accent-foreground shadow-lg">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="bg-destructive text-destructive-foreground shadow-lg">
                        Save $
                        {(product.originalPrice - product.price).toFixed(0)}
                      </Badge>
                    )}
                  </div>

                  {/* Hover overlay with floating action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                    <Button
                      onClick={() => addItem(product)}
                      className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 bg-white text-black hover:bg-white/90"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {product.brand}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.specs?.batteryLife && (
                      <p className="text-xs text-muted-foreground">
                        {product.specs.batteryLife} battery life
                      </p>
                    )}
                  </div>

                  {/* Feature highlights */}
                  <div className="flex flex-wrap gap-1">
                    {product.specs?.noiseCancel && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        ANC
                      </Badge>
                    )}
                    {product.specs?.waterResistant && (
                      <Badge variant="outline" className="text-xs">
                        {product.specs.waterResistant}
                      </Badge>
                    )}
                    {product.specs?.magSafeCompatible && (
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        MagSafe
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-2 hover:bg-primary/5 group"
              asChild
            >
              <Link to="/products/airpods">
                <Volume2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Explore All AirPods
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
