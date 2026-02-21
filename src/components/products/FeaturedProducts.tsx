"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products/featured");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-16">
        <p>Loading featured products...</p>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center uppercase">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
}