"use client";

import { useMemo, useState } from "react";
import { Copy, Check, X } from "lucide-react";

type ProductCardContactPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productUrl: string;
  whatsappNumber?: string;
  phoneNumber?: string;
  emailAddress?: string;
};

export default function ProductCardContactPanel({
  isOpen,
  onClose,
  productName,
  productUrl,
  whatsappNumber = "2348099549798",
  phoneNumber = "+2348033319391",
  emailAddress = "containedsolar@gmail.com",
}: ProductCardContactPanelProps) {
  const [copied, setCopied] = useState(false);

  const cleanName = productName.trim();

  const message = useMemo(
    () =>
      `Hello, I want to buy ${cleanName}.\nProduct link: ${productUrl}`,
    [cleanName, productUrl]
  );

  const fullEmailText = useMemo(
    () =>
      `Subject: Inquiry about ${cleanName}\n\nHello,\n\nI want to buy this product: ${cleanName}.\nProduct link: ${productUrl}\n\nThank you!`,
    [cleanName, productUrl]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullEmailText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
    onClose();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Inquiry about ${cleanName}`);
    const body = encodeURIComponent(
      `Hello,\n\nI want to buy this product: ${cleanName}.\nProduct link: ${productUrl}\n\nThank you!`
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      data-no-drag="true"
      className="mt-3 w-full rounded-xl border border-black/10 bg-white p-3 shadow-lg"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-black">Contact Sales</p>
          <p className="mt-1 line-clamp-2 text-xs text-gray-600">
            {cleanName}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          data-no-drag="true"
          className="shrink-0 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
          aria-label="Close contact options"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          data-no-drag="true"
          className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Chat on WhatsApp
        </button>

        <button
          type="button"
          onClick={handleCall}
          data-no-drag="true"
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
        >
          Call {phoneNumber}
        </button>

        <button
          type="button"
          onClick={handleEmail}
          data-no-drag="true"
          className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Send Email
        </button>
      </div>

      <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="mb-2 text-xs font-medium text-gray-700">
          Copy email message
        </p>

        <div className="max-h-24 overflow-y-auto whitespace-pre-wrap wrap-break-word rounded-md bg-white p-2 text-xs text-gray-600">
          {fullEmailText}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          data-no-drag="true"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Message"}
        </button>
      </div>
    </div>
  );
}