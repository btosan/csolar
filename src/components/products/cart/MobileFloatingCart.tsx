"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartIcon from "@/components/products/cart/CartIcon";
import CartCount from "@/components/products/cart/CartCount";

export default function MobileFloatingCart() {
  const [count, setCount] = useState(0);

  const loadCount = async () => {
    try {
      const res = await fetch("/api/cart/count");
      const data = await res.json();

      let total = data.count || 0;

      // check guest cart if not logged in
      if (!total) {
        const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        total = guestCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      }

      setCount(total);
    } catch (err) {
      console.error("Cart count error", err);
    }
  };

  useEffect(() => {
    loadCount();

    const handler = () => loadCount();
    window.addEventListener("cart-updated", handler);

    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  if (count === 0) return null;

  return (
    <Link
      href="/cart"
      className="
        fixed bottom-6 left-6
        z-999
        md:hidden
        bg-black/70 text-white
        p-4 rounded-full
        shadow-lg
        flex items-center justify-center
      "
    >
      <div className="relative flex items-center">
        <CartIcon />
        <span className="absolute -top-3 -right-3">
          <CartCount />
        </span>
      </div>
    </Link>
  );
}