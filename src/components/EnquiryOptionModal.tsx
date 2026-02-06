"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onWhatsapp: () => void;
  onEmail: () => void;
}

export default function EnquiryOptionsModal({
  open,
  onClose,
  onWhatsapp,
  onEmail,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-black border border-gray-700 rounded-2xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <h3 className="text-2xl font-semibold text-white mb-2">
              How would you like to continue?
            </h3>
            <p className="text-gray-400 mb-6">
              Choose your preferred contact method.
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <button
                onClick={() => {
                  onClose();
                  onWhatsapp();
                }}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-full text-white font-medium
                bg-[linear-gradient(90deg,#a855f7,#6366f1,#22c55e)] hover:opacity-90 transition"
              >
                <MessageCircle />
                Continue with WhatsApp
              </button>

              {/* Email */}
              <button
                onClick={() => {
                  onClose();
                  onEmail();
                }}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-full
                border border-purple-100/40 text-purple-100 hover:bg-purple-100/10 transition"
              >
                <Mail />
                Continue with Email
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
