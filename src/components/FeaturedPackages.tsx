"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FeaturedPackages() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const packages = [
    {
      name: "Starter Package",
      focus: "main",
      tagline: "Perfect for small businesses ready to launch online",
      price: "₦70,000",
      includes: [
        "Custom 5-page website",
        "Mobile-responsive design",
        "Hand-coded admin panel",
        "Free .com.ng domain + 1 year hosting",
        "Professional content writing (up to 1,000 words)",
        "5 custom business email templates",
      ],
      cta: "Get Started Now",
      image: "/assets/web/starter-package.jpg",
    },
    {
      name: "Growth Package",
      focus: "secondary",
      tagline: "For businesses needing login, payments & automation",
      price: "₦100,000",
      includes: [
        "Web app with up to 10 pages",
        "User login & dashboard",
        "API integration",
        "Basic AI feature (e.g., chatbot)",
        "2-week delivery",
        "Free content writing + emails",
      ],
      cta: "Get Started Now",
      image: "/assets/web/growth-package.jpg",
    },
  ];

  return (
    <section className="relative bg-black text-gray-100 py-20 md:py-28 px-6 md:px-16 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 mb-6"
        >
          Most Popular Packages
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Choose the perfect solution for your business. Limited slots available this month.
        </motion.p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
              pkg.focus === "main"
                ? "border-purple-200/40 bg-gray-950/80 shadow-xl shadow-purple-200/50"
                : "border-gray-700/90 bg-gray-950/60 hover:border-gray-400/50"
            }`}
          >
            {/* Unique Image per Package */}
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={pkg.image}
                alt={`${pkg.name} preview`}
                fill
                className="object-cover"
                priority={pkg.focus === "main"}
              />
              {pkg.focus === "main" && (
                <div className="absolute top-4 left-4 bg-purple-300/80 text-black font-bold px-5 py-2 rounded-full text-sm">
                  MOST POPULAR
                </div>
              )}
            </div>

            <div className="p-8 md:p-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {pkg.name}
              </h3>
              <p className="text-lg text-gray-300 mb-4">{pkg.tagline}</p>

              <p className="text-4xl md:text-5xl font-bold text-purple-100 mb-8">
                {pkg.price}
              </p>

              <ul className="space-y-3 mb-10">
                {pkg.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-gray-50 mt-1">✓</span>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setOpen(true)}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 hover:cursor-pointer ${
                  pkg.focus === "main"
                    ? "bg-linear-to-r from-blue-100 via-purple-100 to-purple-200 text-black hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 hover:text-white"
                    : "border-2 border-gray-400/60 text-gray-200 hover:bg-linear-to-r hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 hover:text-white hover:border-0"
                }`}
              >
                {pkg.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Link */}
      <div className="text-center mt-12">
        <a
          href="#pricing"
          className="text-purple-50 no-underline hover:underline underline-offset-8 decoration-purple-50 hover:text-purple-50 transition-all text-lg lg:text-xl hover:cursor-pointer"
        >
          View All Packages →
        </a>
      </div>

      {/* Exact same modal from previous sections */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-purple-100 mb-6">
                How would you like to continue?
              </h3>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl transition-all hover:cursor-pointer"
                >
                  Continue on WhatsApp
                </button>

                <a
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold hover:cursor-pointer py-4 rounded-xl transition-all text-center block"
                >
                  Use Email Form
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 text-sm mt-2 hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}