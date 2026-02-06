"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Sparkles,
  Cpu,
  LucideIcon
} from "lucide-react";

type Solution = {
  icon: LucideIcon;
  name: string;
  title: string;
  description: string;
  cta: string;
};

/* ---------------- SOLUTIONS pb-10---------------- */
const solutions: Solution[] = [
  { icon: Globe, name: "High-Performance & Search-Optimized", title: "Professional Websites", description: "Custom-built websites designed for speed, SEO visibility, and seamless user experience — turning your online presence into a powerful business asset.", cta: "Get Started" },
  { icon: Smartphone, name: "Scalable Platforms & Dashboards", title: "Full-Stack Apps", description: "Robust web and mobile applications built with modern technologies — from customer portals to complete business systems.", cta: "Get Started" },
  { icon: Cpu, name: "Smart Features & Intelligence", title: "AI Integration", description: "We embed AI into your products and platforms — chatbots, recommendation systems, data insights, and intelligent user experiences.", cta: "Get Started" },
  { icon: Sparkles, name: "Systems That Work Automatically", title: "AI Automation", description: "Automate lead management, customer communication, data processing, and internal workflows with intelligent, time-saving systems.", cta: "Get Started" },
  { icon: ShieldCheck, name: "Intuitive, Conversion-Focused Experiences", title: "UI/UX Design", description: "Exceptional interface and user experience design that improves usability, builds trust, and turns visitors into engaged customers.", cta: "Get Started" },
  { icon: TrendingUp, name: "Visibility, Positioning & Growth", title: "Digital Strategy", description: "Strategic branding, digital presence, and performance-driven marketing systems that attract the right audience and drive measurable business growth.", cta: "Get Started" },
];

export default function ServicesSection() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);

  /* ---------------- DESKTOP CHECK ---------------- */
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------------- SCROLL PROGRESS ---------------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ---------------- DESKTOP ANIMATIONS ---------------- */
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.6]);
  const imageRadius = useTransform(scrollYProgress, [0, 0.35], ["0px", "100%"]);
  const imageWidth = useTransform(scrollYProgress, [0, 0.35], ["100%", "70%"]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.35], ["100%", "70%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.2]);

  /* ---------------- WHATSAPP ---------------- */
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349123631219?text=Hi%21%20I%27m%20interested%20in%20building%20a%20custom%20website%20or%20web%20application%20and%20would%20like%20to%20discuss%20my%20project.",
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  return (
    <section ref={sectionRef} className="relative bg-black text-gray-100">

      {/* ================= HERO (ALL DEVICES) ================= */}
      <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">

        <motion.div
          style={
            isDesktop
              ? {
                  y: imageY,
                  opacity: imageOpacity,
                  scale: imageScale,
                  borderRadius: imageRadius,
                  width: imageWidth,
                  height: imageHeight,
                }
              : {}
          }
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-full h-full"
        >
          <Image
            src="/assets/people/services-hero.jpg"
            alt="Ofashi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        {/* Hero text */}
        <motion.div
          style={isDesktop ? { opacity: imageOpacity } : {}}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-purple-100 mb-4">
            Services & Solutions
          </h2>
          <p className="text-gray-300 max-w-3xl text-base md:text-lg lg:text-3xl">
            We help businesses create inspiring AI & digital solutions.
          </p>
        </motion.div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="relative z-10 py-20 px-0 md:px-12 lg:px-16 2xl:px-20 space-y-12">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-12 lg:gap-8 xl:gap-16 gap-12 bg-black">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card solution={s} setOpen={setOpen} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
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
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

              <h3 className="text-2xl font-bold text-purple-100 mb-6">How would you like to continue?</h3>

              <div className="flex flex-col gap-4">
                <button onClick={handleWhatsApp} className="bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl">Continue on WhatsApp</button>

                <a href="/contact-form" className="border border-purple-100 text-purple-100 hover:bg-purple-100 hover:text-black font-semibold py-4 rounded-xl text-center">Use Email Form</a>

                <button onClick={() => setOpen(false)} className="text-gray-400 text-sm mt-2 hover:text-gray-200">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- CARD ---------------- */
function Card({ solution, setOpen }: { solution: Solution; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="relative h-full pb-10 md:hover:bg-purple-950/20 hover:bg-purple-950/50 border hover:border-purple-300/30 md:border-gray-800 rounded-xs p-8 flex flex-col justify-between hover:cursor-pointer md:bg-gray-950 md:ring-1 md:ring-white/20 bg-purple-950/5 border-purple-900/5 md:border-0 transition-all duration-300 lg:shadow-lg shadow-sm md:shadow-gray-800/50 shadow-purple-900/80">
      <div className="absolute top-6 left-6 w-12 h-12 bg-purple-950/40 flex items-center justify-center border border-white/10 rounded-full">
        {React.createElement(solution.icon, { className: "w-9 h-9 text-purple-100" })}
      </div>

      <div className="pt-16">
        <span className="text-purple-50/90 text-xs uppercase">{solution.name}</span>
        <h3 className="text-xl font-semibold text-purple-100 mt-3 mb-4 uppercase">{solution.title}</h3>
        <p className="text-gray-200 text-sm leading-relaxed">{solution.description}</p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-xs font-semibold text-sm md:text-base hover:text-purple-50 text-white bg-linear-to-bl hover:border hover:border-purple-100/80 from-purple-900 via-purple-600 to-indigo-700 transition-all duration-300 w-fit"
      >
        {solution.cta}
      </button>
    </div>
  );
}
