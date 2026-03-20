"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X } from "lucide-react";

type ProductCardContactOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productUrl: string;
  whatsappNumber?: string;
  phoneNumber?: string;
  emailAddress?: string;
};

export default function ProductCardContactOverlay({
  isOpen,
  onClose,
  productName,
  productUrl,
  whatsappNumber = "2348099549798",
  phoneNumber = "+2348033319391",
  emailAddress = "containedsolar@gmail.com",
}: ProductCardContactOverlayProps) {
  const [copied, setCopied] = useState(false);

  const cleanName = productName.trim();

  const emailText = useMemo(
    () =>
      `Subject: Inquiry about ${cleanName}\n\nHello,\n\nI want to buy this product: ${cleanName}.\nProduct link: ${productUrl}\n\nThank you!`,
    [cleanName, productUrl]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I want to buy ${cleanName}.\nProduct link: ${productUrl}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank", "noopener,noreferrer");
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-no-drag="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 rounded-xl bg-white/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex h-full flex-col rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-black/10 p-4">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-black">Contact Sales</h3>
                <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                  {cleanName}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                data-no-drag="true"
                className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close contact options"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <button
                type="button"
                onClick={handleWhatsApp}
                data-no-drag="true"
                className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Chat on WhatsApp
              </button>

              <button
                type="button"
                onClick={handleCall}
                data-no-drag="true"
                className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-medium text-black transition hover:opacity-90"
              >
                Call {phoneNumber}
              </button>

              <button
                type="button"
                onClick={handleEmail}
                data-no-drag="true"
                className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Send Email
              </button>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="mb-2 text-xs font-medium text-gray-700">
                  Copy email message
                </p>

                <div className="max-h-24 overflow-y-auto whitespace-pre-wrap break-words rounded-md bg-white p-2 text-xs text-gray-600">
                  {emailText}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}