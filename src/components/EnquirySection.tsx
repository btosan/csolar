"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "@/components/Enquiry";
import GoogleEnquiryForm from "@/components/GoogleEnquiryForm";

export default function EnquirySection() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<"whatsapp" | "email" | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to form when method changes
  useEffect(() => {
    if (method && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [method]);

  return (
    <section
      id="enquiry"
      className="bg-black text-gray-100 py-20 px-6 md:px-16 lg:px-24 border-t border-gray-700/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-purple-100"
        >
          Ready to Launch Your Custom App?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Tell us a bit about your business and the package you want.
          We’ll reply with next steps, timelines, and deliverables.
        </motion.p>

        {!method && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="
              bg-linear-to-bl
              hover:from-purple-50 hover:via-purple-100 hover:to-indigo-100
              hover:text-black text-lg md:text-xl font-semibold uppercase
              rounded-xs px-10 py-4
              from-indigo-900/5 via-indigo-700/5 to-purple-600/5
              text-white transition-all hover:cursor-pointer
            "
          >
            Start Your Project
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={() => { setOpen(false); setMethod(null); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                ✕
              </button>

              {!method && (
                <>
                  <h3 className="text-2xl font-bold text-purple-100 mb-6">
                    How would you like to continue?
                  </h3>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setMethod("whatsapp")}
                      className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl transition-all"
                    >
                      Continue on WhatsApp
                    </button>

                    <button
                      onClick={() => setMethod("email")}
                      className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl transition-all"
                    >
                      Use Email Form
                    </button>

                    <button
                      onClick={() => setOpen(false)}
                      className="text-gray-400 text-sm mt-2 hover:text-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {/* WhatsApp Form */}
              {method === "whatsapp" && (
                <div className="mt-4" ref={formRef}>
                  <button
                    onClick={() => setMethod(null)}
                    className="mb-4 text-gray-400 text-sm hover:text-gray-200 transition"
                  >
                    ← Go back
                  </button>

                  <EnquiryForm />
                </div>
              )}

              {/* Email / Google Form */}
              {method === "email" && (
                <div className="mt-4" ref={formRef}>
                  <button
                    onClick={() => setMethod(null)}
                    className="mb-4 text-gray-400 text-sm hover:text-gray-200 transition"
                  >
                    ← Go back
                  </button>

                  <GoogleEnquiryForm />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
