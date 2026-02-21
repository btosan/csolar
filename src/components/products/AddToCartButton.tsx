"use client";

import { useTransition } from "react";
import { addToCart } from "@/app/actions/cart";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => addToCart(productId))
      }
      className="bg-black text-white px-6 py-3 rounded-xl w-full"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}