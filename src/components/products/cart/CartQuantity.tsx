"use client";

import { updateCartItemQuantity } from "@/lib/actions/cart";
import { useTransition } from "react";

export default function CartQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}) {
  const [pending, startTransition] = useTransition();

  const update = (newQty: number) => {
    startTransition(async () => {
      await updateCartItemQuantity(cartItemId, newQty);
    });
  };

  return (
    <div className="flex items-center gap-3 mt-3">
      <button
        onClick={() => update(quantity - 1)}
        disabled={pending || quantity <= 1}
        className="border px-3 py-1"
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        onClick={() => update(quantity + 1)}
        disabled={pending}
        className="border px-3 py-1"
      >
        +
      </button>
    </div>
  );
}