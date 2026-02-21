"use client";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  data: {
    id: string;
    name: string;
    slug: string | null;
    price: number;
    mainImageUrl: string | null;
    rating: number;
  };
};

export default function ProductCard({ data }: ProductCardProps) {
  const {
    name,
    slug,
    price,
    mainImageUrl,
    rating,
  } = data;

  // ✅ SAFE IMAGE HANDLING
  const imageSrc =
    mainImageUrl && mainImageUrl.trim() !== ""
      ? mainImageUrl
      : "/placeholder-product.png"; // put a placeholder image in public folder

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col"
    >
      <div className="bg-[#F0EEED] rounded-xl lg:rounded-2xl w-full aspect-square mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <h3 className="font-semibold text-base md:text-lg text-black mb-1 line-clamp-2">
        {name}
      </h3>

      <div className="flex items-center gap-2 mb-2">
        <div className="text-yellow-500 text-sm">
          {"★".repeat(Math.round(rating || 0))}
          {"☆".repeat(5 - Math.round(rating || 0))}
        </div>
        <span className="text-xs text-muted-foreground">
          {rating?.toFixed(1) || "0.0"}/5
        </span>
      </div>

      <div className="font-bold text-lg md:text-xl text-black">
        ₦{price.toLocaleString()}
      </div>
    </Link>
  );
}