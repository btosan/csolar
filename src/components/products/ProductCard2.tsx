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

type Product = {
  id: string;
  name: string;
  slug: string | null;
  type: "PANEL" | "BATTERY" | "INVERTER" | "ACCESSORY" | "EQUIPMENT";
  brand: string;
  model?: string | null;
  mainImageUrl: string | null;
  price: number;
  rating: number;
  active: boolean;
  featured?: boolean;
};

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

export default function ProductCard2({ data }: ProductCardProps) {
  const { id, name, slug, price, mainImageUrl, rating } = data;

  const imageSrc =
    mainImageUrl && mainImageUrl.trim() !== ""
      ? mainImageUrl
      : "/assets/csolar/solar-inverter.jpeg";

  const [modalOpen, setModalOpen] = useState(false);

  const productUrl = slug ? `${BASE_URL}/products/${slug}` : "";

  return (
    <div className="flex flex-col border border-black/5 shadow-sm rounded-lg pb-3 max-w-55 w-full bg-white">

      <Link href={`/products/${slug}`} className="group">
        <div className="bg-[#F0EEED] rounded-t-lg w-full aspect-square mb-2 overflow-hidden ">
          <Image
            src={imageSrc}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h3 className="px-3 text-sm font-semibold text-black mb-1 line-clamp-2 leading-tight">
          {name}
        </h3>
      </Link>

      <div className="px-3 flex items-center gap-1 mb-1">
        <div className="text-yellow-500 text-xs">
          {"★".repeat(Math.round(rating || 0))}
          {"☆".repeat(5 - Math.round(rating || 0))}
        </div>

        <span className="text-[11px] text-muted-foreground">
          {rating?.toFixed(1) || "0.0"}
        </span>
      </div>

      {/* <div className="px-3 font-bold text-base text-black mb-2">
        ₦{price.toLocaleString()}
      </div> */}

      <div className="w-full px-3 flex flex-col gap-1">
        {/* <AddToCartButton
          productId={id}
          name={name}
          mainImageUrl={mainImageUrl || data.gallery?.[0]?.url}
        /> */}

        {/* <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white font-medium text-center px-2 md:px-6 py-3 hover:opacity-80 transition hover:cursor-pointer"
        >
          Contact Sales
        </button> */}

        <button
          onClick={() => setModalOpen(true)}
          className="bg-accent text-black font-medium text-center px-2 md:px-6 py-3 hover:opacity-80 transition hover:cursor-pointer"
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