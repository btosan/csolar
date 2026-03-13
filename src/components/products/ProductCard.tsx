"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/products/AddToCartButton";
import ContactOptionsModal from "@/components/products/ContactOptionsModal";

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
  const { id, name, slug, price, mainImageUrl, rating } = data;

  const imageSrc =
    mainImageUrl && mainImageUrl.trim() !== ""
      ? mainImageUrl
      : "/assets/csolar/solar-inverter.jpeg";

  const [modalOpen, setModalOpen] = useState(false); // ← add this

  const productUrl = slug
      ? `${BASE_URL}/products/${slug}`
      : "";

  return (
    <div className="flex flex-col justify-center items-center border border-black/5 shadow-md rounded-xl pb-4">

      <Link href={`/products/${slug}`} className="group">
        <div className="bg-[#F0EEED] rounded-t-xl w-full aspect-square mb-4 overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h3 className="px-4 text-center font-bold text-base md:text-lg text-black mb-1 line-clamp-2">
          {name}
        </h3>
      </Link>

      <div className="px-4 flex items-center gap-2 mb-2">
        <div className="text-yellow-500 text-sm">
          {"★".repeat(Math.round(rating || 0))}
          {"☆".repeat(5 - Math.round(rating || 0))}
        </div>

        <span className="text-xs text-muted-foreground">
          {rating?.toFixed(1) || "0.0"}/5
        </span>
      </div>

      {/* <div className="font-bold text-lg md:text-xl text-black mb-4">
        ₦{price.toLocaleString()}
      </div> */}

      <div className="w-full px-4 mx-auto flex md:flex-col items-center md:items-stretch md:justify-center justify-between md:gap-2">
        {/* <AddToCartButton
          productId={id}
          name={name}
          mainImageUrl={mainImageUrl || data.gallery?.[0]?.url} 
        /> */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white font-medium text-center px-6 py-3 hover:opacity-80 transition hover:cursor-pointer"
        >
          Contact Sales
        </button>
      </div>
      <ContactOptionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={name}
        productUrl={productUrl}
      />
    </div>
  );
}