"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard2 from "@/components/products/ProductCard2";

type Product = {
  id: string;
  name: string;
  slug: string | null;
  type: "PANEL" | "BATTERY" | "INVERTER" | "ACCESSORY";
  brand: string;
  model?: string | null;
  mainImageUrl: string | null;
  price: number;
  rating: number;
  active: boolean;
  featured?: boolean;
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products/active");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const panels = products.filter(p => p.type === "PANEL").slice(0, 4);
  const batteries = products.filter(p => p.type === "BATTERY").slice(0, 4);
  const inverters = products.filter(p => p.type === "INVERTER").slice(0, 4);
  const accessories = products.filter(p => p.type === "ACCESSORY").slice(0, 4);

  const sections = [
    { title: "Solar Panels", data: panels, slug: "panels" },
    { title: "Batteries", data: batteries, slug: "batteries" },
    { title: "Inverters", data: inverters, slug: "inverters" },
    { title: "Accessories", data: accessories, slug: "accessories" },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {Array.from({ length: 4 }).map((_, sectionIdx) => (
          <section key={sectionIdx}>
            <div className="h-10 w-64 mx-auto mb-10 bg-gray-200 rounded animate-pulse" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="w-full aspect-square bg-gray-300" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-4/5" />
                    <div className="h-4 bg-gray-300 rounded w-3/5" />
                    <div className="h-5 bg-gray-400 rounded w-2/5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      {sections.map((section) =>
        section.data.length > 0 ? (
          <section key={section.slug}>
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-center">
                {section.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 justify-items-center">
              {section.data.map((product) => (
                <ProductCard2 key={product.id} data={product} />
              ))}
            </div>

            <Link
              href={`/products/${section.slug}`}
              className="text-sm md:text-base lg:text-lg font-medium hover:underline flex items-center justify-center mx-auto w-full pt-6 mt-6"
            >
              View All →
            </Link>
          </section>
        ) : null
      )}
    </div>
  );
}