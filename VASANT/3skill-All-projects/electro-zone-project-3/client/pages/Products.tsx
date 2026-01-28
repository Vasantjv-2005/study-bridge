import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Star,
  Filter,
  X,
  Volume2,
  Headphones,
  Smartphone,
  ShoppingBag,
  Mic,
  Zap,
  Bluetooth,
  Battery,
  Sparkles,
  Play,
  Shield,
} from "lucide-react";
import { sampleProducts, categories } from "@shared/products";
import { useCart } from "@/contexts/CartContext";

interface Filters {
  priceRange: [number, number];
  noiseCancel?: boolean;
  waterResistant?: boolean;
  magSafeCompatible?: boolean;
  inlineMic?: boolean;
  fastCharging?: boolean;
  optimizedFor?: string[];
  brands?: string[];
  soundProfile?: string[];
  connectorType?: string[];
  colors?: string[];
  type?: string[];
}

const ProductsPage: React.FC = () => {
  const { category } = useParams();
  const { addItem } = useCart();
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000],
    optimizedFor: [],
    brands: [],
    soundProfile: [],
    connectorType: [],
    colors: [],
    type: [],
  });

  const categoryInfo = categories.find((cat) => cat.id === category);

  // Get all products for category or all products
  const baseProducts = category
    ? sampleProducts.filter((product) => product.category === category)
    : sampleProducts;

  // Get unique filter options
  const availableBrands = [...new Set(baseProducts.map((p) => p.brand))];
  const availableSoundProfiles = [
    ...new Set(
      baseProducts
        .map((p) => p.specs?.soundProfile)
        .filter((profile): profile is string => !!profile),
    ),
  ];
  const availableConnectorTypes = [
    ...new Set(
      baseProducts
        .map((p) => p.specs?.connectorType)
        .filter((connector): connector is string => !!connector),
    ),
  ];
  const availableTypes = [
    ...new Set(
      baseProducts
        .map((p) => p.specs?.type)
        .filter((type): type is string => !!type),
    ),
  ];
  const availableColors = [
    ...new Set(
      baseProducts
        .flatMap((p) => p.specs?.colors || [])
        .filter((color): color is string => !!color),
    ),
  ];

  const maxPrice = Math.max(...baseProducts.map((p) => p.price));

  // Apply filters
  const filteredProducts = useMemo(() => {
    return baseProducts.filter((product) => {
      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Feature filters
      if (filters.noiseCancel && !product.specs?.noiseCancel) return false;
      if (filters.waterResistant && !product.specs?.waterResistant)
        return false;
      if (filters.magSafeCompatible && !product.specs?.magSafeCompatible)
        return false;
      if (filters.inlineMic && !product.specs?.inlineMic) return false;
      if (filters.fastCharging && !product.specs?.fastCharging) return false;

      // Array filters
      if (
        filters.optimizedFor &&
        filters.optimizedFor.length > 0 &&
        !filters.optimizedFor.includes(product.specs?.optimizedFor || "")
      )
        return false;

      if (
        filters.brands &&
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      )
        return false;

      if (
        filters.soundProfile &&
        filters.soundProfile.length > 0 &&
        !filters.soundProfile.includes(product.specs?.soundProfile || "")
      )
        return false;

      if (
        filters.connectorType &&
        filters.connectorType.length > 0 &&
        !filters.connectorType.includes(product.specs?.connectorType || "")
      )
        return false;

      if (
        filters.type &&
        filters.type.length > 0 &&
        !filters.type.includes(product.specs?.type || "")
      )
        return false;

      if (
        filters.colors &&
        filters.colors.length > 0 &&
        !filters.colors.some((color) => product.specs?.colors?.includes(color))
      )
        return false;

      return true;
    });
  }, [baseProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filteredProducts, sortBy]);

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, maxPrice],
      optimizedFor: [],
      brands: [],
      soundProfile: [],
      connectorType: [],
      colors: [],
      type: [],
    });
  };

  const activeFiltersCount =
    Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) return count + value.length;
      if (typeof value === "boolean") return count + (value ? 1 : 0);
      return count;
    }, 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "airpods":
        return <Volume2 className="h-6 w-6" />;
      case "earphones":
        return <Headphones className="h-6 w-6" />;
      case "mobiles":
        return <Smartphone className="h-6 w-6" />;
      case "accessories":
        return <ShoppingBag className="h-6 w-6" />;
      default:
        return <Filter className="h-6 w-6" />;
    }
  };

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case "TWS":
        return <Volume2 className="h-3 w-3" />;
      case "Wired":
        return <Headphones className="h-3 w-3" />;
      case "Neckband":
        return <Bluetooth className="h-3 w-3" />;
      case "Over-ear":
        return <Headphones className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Enhanced Header */}
      <div className="mb-12">
        {categoryInfo ? (
          <div className="text-center space-y-6">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden">
              <img
                src={categoryInfo.image}
                alt={categoryInfo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                <div className="text-white text-center space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      {getCategoryIcon(categoryInfo.id)}
                    </div>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-bold mb-4">
                    {categoryInfo.name}
                  </h1>
                  <p className="text-xl opacity-90 max-w-3xl leading-relaxed">
                    {categoryInfo.description}
                  </p>
                  <div className="flex justify-center space-x-8 mt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {baseProducts.length}+
                      </div>
                      <div className="text-sm opacity-80">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {availableBrands.length}+
                      </div>
                      <div className="text-sm opacity-80">Brands</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.5★</div>
                      <div className="text-sm opacity-80">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold">All Products</h1>
            <p className="text-xl text-muted-foreground">
              Discover our complete collection of premium electronics
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Enhanced Filters Sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl p-6 backdrop-blur-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    {activeFiltersCount}
                  </Badge>
                )}
              </h3>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            <Accordion
              type="multiple"
              defaultValue={[
                "price",
                "features",
                "type",
                "sound",
                "connectivity",
                "compatibility",
              ]}
              className="space-y-4"
            >
              {/* Price Range */}
              <AccordionItem value="price" className="border-0">
                <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                  Price Range
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter("priceRange", value)}
                    max={maxPrice}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Product Type */}
              {availableTypes.length > 0 && (
                <AccordionItem value="type" className="border-0">
                  <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                    Product Type
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {availableTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters.type?.includes(type) || false}
                          onCheckedChange={(checked) => {
                            const current = filters.type || [];
                            if (checked) {
                              updateFilter("type", [...current, type]);
                            } else {
                              updateFilter(
                                "type",
                                current.filter((t) => t !== type),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={type}
                          className="text-sm font-medium flex items-center cursor-pointer"
                        >
                          {getProductTypeIcon(type)}
                          <span className="ml-2">{type}</span>
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Features */}
              <AccordionItem value="features" className="border-0">
                <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                  Features
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="noise-cancel"
                        checked={filters.noiseCancel || false}
                        onCheckedChange={(checked) =>
                          updateFilter("noiseCancel", checked)
                        }
                      />
                      <label
                        htmlFor="noise-cancel"
                        className="text-sm font-medium flex items-center cursor-pointer"
                      >
                        <Shield className="h-3 w-3 mr-2" />
                        Noise Cancellation
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="water-resistant"
                        checked={filters.waterResistant || false}
                        onCheckedChange={(checked) =>
                          updateFilter("waterResistant", checked)
                        }
                      />
                      <label
                        htmlFor="water-resistant"
                        className="text-sm font-medium flex items-center cursor-pointer"
                      >
                        <Zap className="h-3 w-3 mr-2" />
                        Water Resistant (IPX4+)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inline-mic"
                        checked={filters.inlineMic || false}
                        onCheckedChange={(checked) =>
                          updateFilter("inlineMic", checked)
                        }
                      />
                      <label
                        htmlFor="inline-mic"
                        className="text-sm font-medium flex items-center cursor-pointer"
                      >
                        <Mic className="h-3 w-3 mr-2" />
                        In-line Mic
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fast-charging"
                        checked={filters.fastCharging || false}
                        onCheckedChange={(checked) =>
                          updateFilter("fastCharging", checked)
                        }
                      />
                      <label
                        htmlFor="fast-charging"
                        className="text-sm font-medium flex items-center cursor-pointer"
                      >
                        <Battery className="h-3 w-3 mr-2" />
                        Fast Charging
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="magsafe"
                        checked={filters.magSafeCompatible || false}
                        onCheckedChange={(checked) =>
                          updateFilter("magSafeCompatible", checked)
                        }
                      />
                      <label
                        htmlFor="magsafe"
                        className="text-sm font-medium flex items-center cursor-pointer"
                      >
                        <Zap className="h-3 w-3 mr-2" />
                        MagSafe Compatible
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Sound Profile */}
              {availableSoundProfiles.length > 0 && (
                <AccordionItem value="sound" className="border-0">
                  <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                    Sound Profile
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {availableSoundProfiles.map((profile) => (
                      <div
                        key={profile}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={profile}
                          checked={
                            filters.soundProfile?.includes(profile) || false
                          }
                          onCheckedChange={(checked) => {
                            const current = filters.soundProfile || [];
                            if (checked) {
                              updateFilter("soundProfile", [
                                ...current,
                                profile,
                              ]);
                            } else {
                              updateFilter(
                                "soundProfile",
                                current.filter((p) => p !== profile),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={profile}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {profile}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Connector Type */}
              {availableConnectorTypes.length > 0 && (
                <AccordionItem value="connectivity" className="border-0">
                  <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                    Connector Type
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {availableConnectorTypes.map((connector) => (
                      <div
                        key={connector}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={connector}
                          checked={
                            filters.connectorType?.includes(connector) || false
                          }
                          onCheckedChange={(checked) => {
                            const current = filters.connectorType || [];
                            if (checked) {
                              updateFilter("connectorType", [
                                ...current,
                                connector,
                              ]);
                            } else {
                              updateFilter(
                                "connectorType",
                                current.filter((c) => c !== connector),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={connector}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {connector}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Compatibility */}
              <AccordionItem value="compatibility" className="border-0">
                <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                  Optimized For
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  {["iOS", "Android", "Both"].map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform}
                        checked={
                          filters.optimizedFor?.includes(platform) || false
                        }
                        onCheckedChange={(checked) => {
                          const current = filters.optimizedFor || [];
                          if (checked) {
                            updateFilter("optimizedFor", [
                              ...current,
                              platform,
                            ]);
                          } else {
                            updateFilter(
                              "optimizedFor",
                              current.filter((p) => p !== platform),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={platform}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {platform}
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Brands */}
              <AccordionItem value="brands" className="border-0">
                <AccordionTrigger className="hover:no-underline py-3 text-base font-medium">
                  Brands
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={filters.brands?.includes(brand) || false}
                          onCheckedChange={(checked) => {
                            const current = filters.brands || [];
                            if (checked) {
                              updateFilter("brands", [...current, brand]);
                            } else {
                              updateFilter(
                                "brands",
                                current.filter((b) => b !== brand),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={brand}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Results */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">
                {sortedProducts.length} products found
              </span>
              {activeFiltersCount > 0 && (
                <Badge variant="outline" className="text-sm">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                  active
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enhanced Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
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

                  {/* Product type badge */}
                  {product.specs?.type && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        {getProductTypeIcon(product.specs.type)}
                        <span className="ml-1">{product.specs.type}</span>
                      </Badge>
                    </div>
                  )}

                  {/* Hover overlay with floating action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                    <Button
                      onClick={() => addItem(product)}
                      className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 bg-white text-black hover:bg-white/90"
                      disabled={!product.inStock}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
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
                      <span className="text-xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-sm text-green-600 font-medium">
                        Save $
                        {(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Enhanced Feature highlights */}
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
                    {product.specs?.inlineMic && (
                      <Badge variant="outline" className="text-xs">
                        <Mic className="h-3 w-3 mr-1" />
                        Mic
                      </Badge>
                    )}
                    {product.specs?.fastCharging && (
                      <Badge variant="outline" className="text-xs">
                        <Battery className="h-3 w-3 mr-1" />
                        Fast Charge
                      </Badge>
                    )}
                    {product.specs?.magSafeCompatible && (
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        MagSafe
                      </Badge>
                    )}
                    {product.specs?.soundProfile && (
                      <Badge variant="outline" className="text-xs">
                        {product.specs.soundProfile}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mb-8">
                <Filter className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">No products found</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Try adjusting your filters or search criteria to find what
                you're looking for
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={clearFilters} size="lg">
                  <X className="mr-2 h-5 w-5" />
                  Clear All Filters
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/products">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Browse All Products
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
