"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Important: next/navigation for App Router
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageCircle, X } from "lucide-react";

export default function CTA() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleEmailClick = () => {
    setOpen(false);
    // Small delay to let modal close animation finish before navigating
    setTimeout(() => {
      router.push("/contact-form");
    }, 300);
  };

  return (
    <>
      {/* Main CTA Button */}
      <button
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-medium text-white
        bg-[linear-gradient(90deg,#dbeafe,#4c1d95,#6b21a8,#a855f7,#c084fc,#4169e1,#4b0082)]
        bg-size-[300%_300%] animate-gradient-wave hover:scale-[1.03] transition hover:cursor-pointer"
      >
        Start Your Project →
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-gray-950 border border-gray-700 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="md:text-2xl text-xl font-semibold text-white my-2">
                How would you like to get started?
              </h3>
              <p className="text-gray-400 mb-6">
                Choose the option that works best for you.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-full text-white font-medium
                  bg-[linear-gradient(90deg,#a855f7,#6366f1,#22c55e)] hover:opacity-90 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                {/* Email → Navigate to /contact-form */}
                <button
                  onClick={handleEmailClick}
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-full hover:cursor-pointer
                  border border-gray-700 text-gray-200 hover:border-purple-400 hover:text-white transition"
                >
                  <Mail className="w-5 h-5" />
                  Send an Email
                </button>

                {/* Call */}
                <a
                  href="tel:+2349123631219"
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-full
                  border border-gray-700 text-gray-200 hover:border-purple-400 hover:text-white transition"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}