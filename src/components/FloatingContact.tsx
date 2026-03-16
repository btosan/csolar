"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [isMobile, setIsMobile] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [showWindow, setShowWindow] = useState(false);

  // Replace with your actual contact info
  const phoneNumber = "+2348033319391";
  const whatsappNumber = "+2348099549798";
  const whatsappMessage = "Hello! I'd like to know more about your renewable energy solutions & products.";
  const emailAddress = "containedsolar@gmail.com";
  const emailSubject = "Inquiry about Contained Energy Services";
  const emailBody = "Hi,\n\nI'd like to know more about your solar installation, inverters, storage system, & solar products.\n\nThank you!";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show callout after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCallout(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenWindow = () => {
    setShowCallout(false);
    setShowWindow(true);
  };

  const handleCloseCallout = () => {
    setShowCallout(false);
  };

  const handleCloseWindow = () => {
    setShowWindow(false);
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="fixed bottom-6 right-6 md:bottom-16 z-50 ">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenWindow}
          className="w-14 h-14 bg-linear-to-tr from-yellow-200 via-yellow-500 to-accent text-black rounded-full border border-yellow-200/50 shadow-sm lg:shadow-lg shadow-gray-500/50 flex items-center justify-center hover:bg-yellow-50 hover:cursor-pointer transition-all"
          aria-label="Contact Us"
        >
          <MessageCircle size={28} />
        </motion.button>
      </div>

      {/* Callout (shows after 10 seconds) */}
      <AnimatePresence>
        {showCallout && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-white text-gray-900 border border-yellow-50 p-4 rounded-xl shadow-2xl max-w-xs"
          >
            <div className="flex justify-end">
              <button onClick={handleCloseCallout} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="lg:text-2xl text-xl">Hello</div>
              <h3 className="font-bold lg:text-lg text-base">Chat with us!</h3>
            </div>
            <p className="lg:text-sm text-xs mb-4">Ready for a sustainable energy upgrade, expert solar installation, or smart power monitoring? We're here to help.</p>
            <button
              onClick={handleOpenWindow}
              className="w-full bg-accent/90 text-black hover:cursor-pointer px-4 py-2 rounded-full font-semibold hover:bg-yellow-50 transition-all"
            >
              Let's chat now
            </button>
            {/* Tail */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Window */}
      <AnimatePresence>
        {showWindow && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 md:right-6 right-2 z-50 bg-white text-gray-900 border border-yellow-50 md:p-4 p-5 rounded-xl shadow-2xl max-w-sm w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Contact Us</h3>
              <button onClick={handleCloseWindow} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm mb-6">Choose how you'd like to get in touch for your project.</p>

            <div className="space-y-4">
              {/* Phone */}
              {isMobile ? (
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <Phone size={24} className="text-yellow-500" />
                  <span>Call Us</span>
                </a>
              ) : (
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
                  <Phone size={24} className="text-yellow-500" />
                  <span>{phoneNumber}</span>
                </div>
              )}

              {/* WhatsApp */}
              {isMobile ? (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <MessageCircle size={24} className="text-green-500" />
                  <span>WhatsApp Us</span>
                </a>
              ) : (
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
                  <MessageCircle size={24} className="text-green-500" />
                  <span>{whatsappNumber}</span>
                </div>
              )}

              {/* Email */}
              <a
                href={`mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-all"
              >
                <Mail size={24} className="text-blue-500" />
                <span>Email Us</span>
              </a>
            </div>

            {/* Tail */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}