"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";


type ContactOptionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productUrl: string; 
  whatsappNumber?: string; 
};

export default function ContactOptionsModal({
  isOpen,
  onClose,
  productName,
  productUrl,
  whatsappNumber = "2348033319391", 
}: ContactOptionsModalProps) {
  const cleanName = productName.trim();

  const [copied, setCopied] = useState(false);
  const emailSubject = `Inquiry about ${cleanName}`;
  const emailBody = `Hello,\n\nI would like to know more about the product: ${cleanName}.\nProduct link: ${productUrl}\n\nThank you!`;

  const fullEmailText = `Subject: ${emailSubject}\n\n${emailBody}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullEmailText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! Is this Contained Solar? I want to buy ${cleanName}.\n\nProduct link: ${productUrl}`
    );
    const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handlePhone = () => {
    window.location.href = `tel:${whatsappNumber}`; 
    onClose();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Enquiry about ${cleanName}`);
    const body = encodeURIComponent(
      `Hello,\n\nIs this Contained Solar? I want to buy this product: ${cleanName}.\nProduct link: ${productUrl}\n\nThank you!`
    );
    const mailUrl = `mailto:containedsolar@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailUrl;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-black hover:text-gray-800 text-2xl lg:text-3xl hover:cursor-pointer"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-center mb-6 text-gray-900">
              Contact Sales
            </h3>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleWhatsApp}
                className="bg-green-800 hover:bg-green-600 text-white text-base md:text-lg font-medium py-4 hover:cursor-pointer rounded-md transition"
              >
                Chat on WhatsApp
              </button>

              <button
                onClick={handlePhone}
                className="bg-accent hover:bg-yellow-500 text-black text-base md:text-lg font-medium py-4 hover:cursor-pointer rounded-md transition"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className='text-black'>Call Us Now </p>
                  </TooltipTrigger>
                   <TooltipContent side="bottom" sideOffset={12} className="p-4 text-sm lg:text-base font-demibold uppercase tracking-widest text-primary bg-gray-50">
                     +2348033319391
                    </TooltipContent>
                  
                </Tooltip>
                
              </button>

              <div className="space-y-3">
                  <button
                    onClick={handleEmail}
                    className="w-full bg-primary hover:bg-gray-800 text-white text-base md:text-lg font-medium py-4 rounded-md transition hover:cursor-pointer"
                  >
                    Send Email
                  </button>


                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm hidden lg:block">
                    <p className="font-medium mb-2 text-gray-800">Or copy & paste this into your email:</p>
                    <div className="bg-white p-3 rounded border mb-3 whitespace-pre-wrap font-mono text-gray-700 text-xs md:text-sm">
                      {fullEmailText}
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition w-full justify-center"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Message"}
                    </button>
                  </div>
                </div>

              <button
                onClick={onClose}
                className="text-gray-600 text-sm mt-2 hover:text-gray-800 underline"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}