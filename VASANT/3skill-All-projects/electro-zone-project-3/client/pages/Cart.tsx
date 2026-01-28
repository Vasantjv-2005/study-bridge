import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShoppingCart,
  Star,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground">
              Looks like you haven't added any items to your cart yet. Discover
              our amazing collection of electronics!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/products/airpods">Browse AirPods</Link>
            </Button>
          </div>

          {/* Popular Categories */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Popular Categories
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/products/airpods"
                className="text-sm text-primary hover:underline"
              >
                AirPods
              </Link>
              <Link
                to="/products/earphones"
                className="text-sm text-primary hover:underline"
              >
                Earphones
              </Link>
              <Link
                to="/products/mobiles"
                className="text-sm text-primary hover:underline"
              >
                Mobile Phones
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-lg text-muted-foreground">
            {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={item.product.id}
                className="overflow-hidden border-0 bg-gradient-to-r from-background to-muted/20"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      {item.product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">
                          New
                        </Badge>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.product.brand}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(item.product.rating)
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({item.product.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary">
                              ${item.product.price}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.product.originalPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            ${(item.product.price * item.quantity).toFixed(2)}{" "}
                            total
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="text-destructive hover:text-destructive/80 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {item.product.specs?.noiseCancel && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            ANC
                          </Badge>
                        )}
                        {item.product.specs?.waterResistant && (
                          <Badge variant="outline" className="text-xs">
                            {item.product.specs.waterResistant}
                          </Badge>
                        )}
                        {item.product.specs?.magSafeCompatible && (
                          <Badge variant="outline" className="text-xs">
                            MagSafe
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-medium">
                      ${(total * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(total + total * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <div className="text-center">
                  <Button variant="link" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold mb-4">Why Shop with Us?</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">100% Genuine Products</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm">Free Shipping on all orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="text-sm">Secure Payment Options</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
