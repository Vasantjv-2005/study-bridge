import React from "react";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const { itemCount, clearCart } = useCart();

  useEffect(() => {
    if (itemCount > 0) {
      toast({
        title: "Successfully purchased",
        description: "Thank you for your order. Your items will be shipped soon.",
      });
      clearCart();
    }
  }, [itemCount, clearCart]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <PlaceholderPage
          title="Order Placed"
          description="Successfully purchased. You will receive a confirmation email shortly."
        />
        <div className="pt-4">
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
