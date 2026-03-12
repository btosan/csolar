import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type ProductCategoryCardProps = {
  title: string;
  url: string;
  className?: string;
};

const ProductCategoryCard = ({ title, url, className }: ProductCategoryCardProps) => {
  return (
    <Link
      href={url}
      className={cn(
        "group relative w-full h-full md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-out",
        "flex items-end bg-gray-100",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

      <div className="relative z-10 p-5 md:p-6 lg:p-7 ">
        <h3
          className={cn(
            "text-xl sm:text-2xl md:text-[26px] lg:text-3xl font-semibold text-white uppercase pb-2 lg:pb-4",
            "drop-shadow-[0_1.5px_1px_rgba(255,202,59,0.9)]",
            "group-hover:translate-x-1 transition-transform duration-300"
          )}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCategoryCard;