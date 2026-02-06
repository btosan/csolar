"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// SHARED AUTOPLAY TIMING (use same value across all sliders)
const AUTOPLAY_DELAY = 5000;

export default function TestimonialsSection() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

const testimonials = [
  {
    name: "Kingsley Emi",
    role: "CEO, eVehicles NG",
    project: "Custom Web App & EVs Landing Page",
    quote:
      "Our landing page showcases BYD electric vehicles beautifully, attracting customers nationwide and driving inquiries and showroom visits. Ofashi delivered a fast, professional platform that builds trust in Nigeria's EV market. Highly recommend their expertise!",
    rating: 5,
    avatar: "/assets/people/emi.png",
  },
  {
    name: "Oyereri Adelagun",
    role: "Founder, Gideon Youth Foundation",
    project: "Professional NGO Website",
    quote:
      "Now I have a professional NGO website I'm proud to share. It attracts more support and helps reach students effectively. The content writing was a great bonus. Ofashi was helpful and professional—I highly recommend them!",
    rating: 5,
    avatar: "/assets/people/adelagun.png",
  },
  {
    name: "Fatade Lekan",
    role: "Owner, Olaf Contractors",
    project: "Real Estate Web App with AI Chatbot",
    quote:
      "The AI chatbot handles inquiries 24/7, cutting support time in half and boosting leads. Delivered fast with outstanding quality. Ofashi's professional approach made the difference—strongly recommend them!",
    rating: 5,
    avatar: "/assets/people/fatade.png",
  },
  {
    name: "Emmanuel Edem",
    role: "CEO, CoinPlacid",
    project: "Crypto Investment and Lending Platform",
    quote:
      "Our secure, user-friendly crypto platform boosts engagement and business growth. Ofashi delivered top-notch hand-coded quality with great professionalism. Can't recommend them enough!",
    rating: 5,
    avatar: "/assets/people/kess.png",
  },
];

  return (
    <section className="relative bg-black py-20 md:py-28 border-t border-gray-700/20 lg:border-gray-600/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-100 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Hear how our clients are growing and succeeding with our custom websites and web apps.
          </p>
        </motion.div>

        {/* MOBILE SWIPE HINT */}
        <div className="flex items-center justify-center gap-3 mb-4 md:hidden text-purple-100/70 text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to see more</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative md:h-full h-120 flex flex-col justify-center rounded-2xl bg-gray-950/60 border border-gray-800 p-8 hover:border-purple-100/40 transition-all duration-500"
              >
                {/* Star Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-purple-100 text-purple-100"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-gray-200 italic mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-100/30">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      priority={index < 2}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-purple-100/80 mt-1">
                      {testimonial.project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6 md:mt-0"
        >
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center md:px-10 px-8 md:py-4 py-3 bg-linear-to-bl hover:from-blue-100 hover:via-purple-100 hover:to-purple-200 hover:text-black from-indigo-800/5 via-purple-900/5 to-purple-600/5 transition-all duration-300 hover:cursor-pointer text-purple-200 md:text-xl text-lg font-bold rounded-xs shadow-2xl"
          >
            Be Our Next Success Story
          </button>
        </motion.div>
      </div>

      {/* Exact same modal from HeroSection */}
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
                  className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl transition-all"
                >
                  Continue on WhatsApp
                </button>

                <Link
                  href="/contact-form"
                  onClick={() => setOpen(false)}
                  className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:cursor-pointer hover:text-black font-semibold py-4 rounded-xl transition-all text-center block"
                >
                  Use Email Form
                </Link>

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

      {/* Pagination styling */}
      <style jsx>{`
        :global(.swiper-pagination) {
          position: relative;
          margin-top: 18px;
          margin-bottom: 20px;
          text-align: center;
        }
        :global(.swiper-pagination-bullet) {
          background-color: #9333ea;
          opacity: 0.4;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        :global(.swiper-pagination-bullet-active) {
          background-color: #9333ea;
          opacity: 0.6;
          transform: scale(1.25);
        }
      `}</style>
    </section>
  );
}