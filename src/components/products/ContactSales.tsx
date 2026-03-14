"use client";

import { useState } from "react";
import ContactOptionsModal from "@/components/products/ContactOptionsModal";

type Props = {
  productName: string;
  productUrl: string;
};

export default function ContactSales({ productName, productUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border border-black px-6 py-3 text-center hover:bg-black hover:text-white hover:cursor-pointer transition"
      >
        Contact Sales
      </button>

      <ContactOptionsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        productName={productName}
        productUrl={productUrl}
      />
    </>
  );
}