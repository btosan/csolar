"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GuestCart() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    setItems(cart);
  }, []);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {items.map((item, i) => (
        <div key={i} className="border-b py-4 flex gap-4 items-center">
          <img
            src={item.mainImageUrl || "/assets/csolar/solar-inverter.jpeg"}
            alt={item.name || "Product"}
            className="w-24 h-24 object-contain rounded"
          />
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p>Qty: {item.quantity}</p>
            <p>Product ID: {item.productId}</p>
          </div>
        </div>
      ))}

      <div className="mt-10">
        <Link
          href="/signin?callbackUrl=/checkout"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Login to Checkout
        </Link>
      </div>
    </div>
  );
}