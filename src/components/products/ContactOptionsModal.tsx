"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I would like to know more about ${cleanName}.\n\nProduct link: ${productUrl}`
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
    const subject = encodeURIComponent(`Inquiry about ${cleanName}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to know more about the product: ${cleanName}.\nProduct link: ${productUrl}\n\nThank you!`
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

              <button
                onClick={handleEmail}
                className="bg-primary hover:bg-gray-800 text-white text-base md:text-lg font-medium py-4 hover:cursor-pointer rounded-md transition"
              >
                Send Email
              </button>

              <button
                onClick={onClose}
                className="text-gray-500 text-sm mt-2 hover:text-gray-700 underline"
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