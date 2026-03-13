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
        <div className="h-10 md:h-12 lg:h-14 w-64 md:w-80 lg:w-96 mx-auto mb-10 bg-gray-200 rounded animate-shimmer" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-shimmer"
            >
              {/* Image placeholder */}
              <div className="w-full aspect-square bg-gray-300" />

              <div className="p-4 space-y-3">
                {/* Product name / title lines */}
                <div className="h-5 bg-gray-300 rounded w-4/5" />
                <div className="h-4 bg-gray-300 rounded w-3/5" />

                {/* Price / rating line */}
                <div className="h-5 bg-gray-400 rounded w-2/5" />

                {/* Optional button / add to cart placeholder */}
                <div className="h-10 bg-gray-300 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center uppercase">
        Featured Products
      </h2>
      <p className="mb-10 text-center text-sm md:text-base lg:text-lg">New Arrivals</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
}