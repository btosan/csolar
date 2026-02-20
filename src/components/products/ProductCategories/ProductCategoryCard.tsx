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
      className={cn([
        "w-full md:h-full rounded-[20px] bg-white  bg-top text-lg md:text-xl font-medium text-left py-4 md:py-6.25 px-6 md:px-9 bg-no-repeat bg-cover",
        className,
      ])}
    >
      <span className="py-2 px-4 bg-primary/40 text-white">{title}</span>
      
    </Link>
  );
};

export default ProductCategoryCard;
