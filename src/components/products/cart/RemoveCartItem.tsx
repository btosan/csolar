"use client";

import { removeCartItem } from "@/lib/actions/cart";
import { useTransition } from "react";

export default function RemoveCartItem({
  cartItemId,
}: {
  cartItemId: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => removeCartItem(cartItemId))
      }
      disabled={pending}
      className="text-red-500 text-sm mt-2"
    >
      Remove
    </button>
  );
}