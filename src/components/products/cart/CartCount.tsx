"use client";

import { useEffect, useState } from "react";

export default function CartCount() {
  const [count, setCount] = useState<number | null>(null);

  const loadCount = async () => {
    try {
      const res = await fetch("/api/cart/count");
      const data = await res.json();

      let count = data.count;

      if (!count) {
        const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        count = guestCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      }

      setCount(count);
    } catch (error) {
      console.error("Cart count error:", error);
    }
  };

  useEffect(() => {
    // Load initially
    loadCount();

    // Listen for cart changes
    const handler = () => loadCount();
    window.addEventListener("cart-updated", handler);

    return () => {
      window.removeEventListener("cart-updated", handler);
    };
  }, []);

  if (count === null) return null;

  return (
    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {count}
    </span>
  );
}