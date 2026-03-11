"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/products/AddToCartButton";

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
  const { id, name, slug, price, mainImageUrl, rating } = data;

  const imageSrc =
    mainImageUrl && mainImageUrl.trim() !== ""
      ? mainImageUrl
      : "/assets/csolar/solar-inverter.jpeg";

  return (
    <div className="flex flex-col border border-black/5 shadow-md p-4 rounded-xl">

      <Link href={`/products/${slug}`} className="group">
        <div className="bg-[#F0EEED] rounded-xl w-full aspect-square mb-4 overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h3 className="font-bold text-base md:text-lg text-black mb-1 line-clamp-2">
          {name}
        </h3>
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <div className="text-yellow-500 text-sm">
          {"★".repeat(Math.round(rating || 0))}
          {"☆".repeat(5 - Math.round(rating || 0))}
        </div>

        <span className="text-xs text-muted-foreground">
          {rating?.toFixed(1) || "0.0"}/5
        </span>
      </div>

      <div className="font-bold text-lg md:text-xl text-black mb-4">
        ₦{price.toLocaleString()}
      </div>

      <AddToCartButton
        productId={id}
        name={name}
        mainImageUrl={mainImageUrl || data.gallery?.[0]?.url} 
      />
    </div>
  );
}