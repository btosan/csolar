"use client";

import { addToCart } from "@/lib/actions/cart";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Props {
  productId: string;
  name: string; // product name
  mainImageUrl?: string; // product main image
  quantity?: number;
}

export default function AddToCartButton({
  productId,
  name,
  mainImageUrl,
  quantity = 1,
}: Props) {
  const { data: session } = useSession();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleAdd = () => {
    startTransition(async () => {
      try {
        if (session?.user) {
          await addToCart(productId, quantity, { safeStock: true });

          window.dispatchEvent(new Event("cart-updated"));

          router.refresh();

          toast({
            title: "Added to cart",
            description: "Item added successfully",
          });

          return;
        }
        
        // Guest user: store in localStorage
        const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

        const existing = cart.find((item: any) => item.productId === productId);

        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({
            productId,
            name,
            mainImageUrl,
            quantity,
          });
        }

        localStorage.setItem("guest_cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("cart-updated")); // trigger header count update

        toast({
          title: "Added to cart",
          description: "Item added successfully",
        });
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Error",
          description: error.message || "Could not add item",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <button
      onClick={handleAdd}
      disabled={pending}
      className="bg-accent text-black font-medium px-6 py-3 hover:opacity-80 disabled:opacity-50 hover:cursor-pointer"
    >
      {pending ? "Adding..." : "Add to Cart"}
    </button>
  );
}