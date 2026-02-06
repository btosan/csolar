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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); // parallax drift
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.2]); // fades hero image + text

  const row1Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const row1Y = useTransform(scrollYProgress, [0.2, 0.35], [100, 0]);

  const row2Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const row2Y = useTransform(scrollYProgress, [0.45, 0.65], [100, 0]);

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

      {/* ================= DESKTOP HERO (STICKY) ================= */}
      {isDesktop && (
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Parallax image */}
          <motion.div
            style={{
              y: imageY,
              opacity: imageOpacity,
              scale: imageScale,
              borderRadius: imageRadius,
              width: imageWidth,
              height: imageHeight,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          >
            <Image
              src="/assets/people/services-hero.jpg"
              alt="Ofashi"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0" />
          </motion.div>


          {/* Hero text fades with image */}
          <motion.div
            style={{ opacity: imageOpacity }}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-purple-100 mb-4">Services & Solutions</h2>
            <p className="text-gray-300 max-w-3xl text-lg lg:text-3xl">
              We help businesses create inspiring AI & digital solutions.
            </p>
          </motion.div>
        </div>
      )}

      {/* ================= CONTENT AREA ================= */}
      <div className="relative z-10 py-20 px-0 md:px-12 lg:px-16 2xl:px-20 space-y-12">

        {/* MOBILE HEADER (no hero image on mobile) */}
        {!isDesktop && (
          <div className="text-center mb-14 px-6 ">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-100 mb-4">
              Services & Solutions
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
              We help businesses create inspiring AI & digital solutions.
            </p>
          </div>
        )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-12 lg:gap-8 xl:gap-16 gap-12 bg-black">
        {solutions.map((s, i) => {
          const isSecondRow = i >= 3; // cards 4–6

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: isSecondRow ? 0.2 + (i - 3) * 0.1 : i * 0.1,
                duration: 0.6,
              }}
              viewport={{ once: true }}
            >
              <Card solution={s} setOpen={setOpen} />
            </motion.div>
          );
        })}
      </div>

      </div>

      {/* Modal placeholder */}
      <AnimatePresence>{/* keep your modal code here */}</AnimatePresence>
    </section>
  );
}

/* ---------------- CARD UI UNCHANGED ---------------- */
function Card({
    solution,
    setOpen,
  }: {
    solution: Solution;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
  return (
    <div className="relative h-full pb-10 md:hover:bg-purple-950/50 hover:bg-purple-950 border hover:border-purple-300/30 md:border-gray-800 rounded-xs p-8 flex flex-col justify-between hover:cursor-pointer md:bg-gray-950 md:ring-1 md:ring-white/20 bg-purple-950/5 border-purple-900/5 md:border-0 transition-all duration-300 lg:shadow-lg shadow-sm md:shadow-gray-800/50 shadow-purple-900/80">
      <div className="absolute top-6 lg:top-8 left-6 lg:w-16 lg:h-16 w-12 h-12 md:w-14 md:h-14 bg-purple-950/40 flex items-center justify-center shadow-xl border border-white/10 rounded-full">
        {React.createElement(solution.icon, { className: "lg:w-12 lg:h-12 md:w-10 md:h-10 w-9 h-9 text-purple-100" })}
      </div>

      <div className="pt-16">
        <span className="text-purple-50/90 text-xs uppercase">{solution.name}</span>
        <h3 className="text-xl lg:text-2xl font-semibold text-purple-100 mt-3 mb-4 uppercase">{solution.title}</h3>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed w-[90%] md:w-full">{solution.description}</p>
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
