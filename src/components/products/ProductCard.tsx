"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCardContactOverlay from "@/components/products/ProductCardContactOverlay";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://www.containedsolar.com"
    : "http://localhost:3000");

type ProductCardProps = {
  data: {
    id: string;
    name: string;
    slug: string | null;
    price: number;
    mainImageUrl: string | null;
    rating: number;
    gallery?: { url: string }[];
  };
};

export default function ProductCard({ data }: ProductCardProps) {
  const { name, slug, mainImageUrl, rating } = data;

  const imageSrc =
    mainImageUrl && mainImageUrl.trim() !== ""
      ? mainImageUrl
      : "/assets/csolar/solar-inverter.jpeg";

  const [overlayOpen, setOverlayOpen] = useState(false);

  const productUrl = slug ? `${BASE_URL}/products/${slug}` : "";

  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden rounded-xl border border-black/5 pb-4 shadow-md bg-white">
      <Link
        href={`/products/${slug}`}
        className="group w-full"
        data-no-drag="true"
      >
        <div className="mb-4 aspect-square w-full overflow-hidden rounded-t-xl bg-white">
          <Image
            src={imageSrc}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h3 className="mb-1 px-4 text-center text-base font-bold text-black line-clamp-2 md:text-lg">
          {name}
        </h3>
      </Link>

      <div className="mb-2 flex items-center gap-2 px-4">
        <div className="text-sm text-yellow-500">
          {"★".repeat(Math.round(rating || 0))}
          {"☆".repeat(5 - Math.round(rating || 0))}
        </div>

        <span className="text-xs text-muted-foreground">
          {rating?.toFixed(1) || "0.0"}/5
        </span>
      </div>

      <div className="mt-auto w-full px-4">
        <button
          type="button"
          data-no-drag="true"
          onClick={() => setOverlayOpen(true)}
          className="w-full rounded-lg bg-accent px-6 py-3 text-center font-medium text-black transition hover:opacity-80 hover:cursor-pointer"
        >
          Contact Sales
        </button>
      </div>

      <ProductCardContactOverlay
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        productName={name}
        productUrl={productUrl}
      />
    </div>
  );
}