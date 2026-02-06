"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Urbanist } from 'next/font/google';
import {
  Globe,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Sparkles,
  Cpu,
} from "lucide-react";
// lg:hidden text-purple-100 focus:outline-none
const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

// Your 6 solutions (with href added for navigation)
const solutions = [
  {
    icon: Globe,
    name: "High-Performance & Search-Optimized",
    title: "Custom Websites",
    description: "Custom-built websites designed for speed, SEO visibility, and seamless user experience — turning your online presence into a powerful business asset.",
    href: "/custom-websites",
  },
  {
    icon: Smartphone,
    name: "Scalable Platforms & Dashboards",
    title: "Full-Stack Apps",
    description: "Robust web and mobile applications built with modern technologies — from customer portals to complete business systems.",
    href: "/full-stack-apps",
  },
  {
    icon: Cpu,
    name: "Smart Features & Intelligence",
    title: "AI Integration",
    description: "We embed AI into your products and platforms — chatbots, recommendation systems, data insights, and intelligent user experiences.",
    href: "/ai-integration",
  },
  {
    icon: Sparkles,
    name: "Systems That Work Automatically",
    title: "AI Automation",
    description: "Automate lead management, customer communication, data processing, and internal workflows with intelligent, time-saving systems.",
    href: "/ai-automation",
  },
  {
    icon: ShieldCheck,
    name: "Intuitive, Conversion-Focused Experiences",
    title: "UI/UX Design",
    description: "Exceptional interface and user experience design that improves usability, builds trust, and turns visitors into engaged customers.",
    href: "/ui-ux-design",
  },
  {
    icon: TrendingUp,
    name: "Visibility, Positioning & Growth",
    title: "Digital Strategy",
    description: "Strategic branding, digital presence, and performance-driven marketing systems that attract the right audience and drive measurable business growth.",
    href: "/digital-branding-marketing",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);                
  const [servicesOpen, setServicesOpen] = useState(false); 
  const router = useRouter();

  const handleExploreNow = () => {
    setOpen(false);
    router.push("/?type=project#enquiry");
  };

  const handleCloseMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 text-gray-100 border-b lg:border-gray-800 border-gray-800/5">
      <div className="mx-auto px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 py-3 lg:py-5 flex items-center justify-between">
        {/* === LOGO (unchanged) === */}
        <div className="flex items-center justify-center ">
          <Link
            href={"/"}
            className="flex items-center justify-center gap-3 md:gap-4 xl:gap-6 lg:gap-4 w-full relative h-9 md:h-12 lg:h-14 "
          > 
            <Image 
              src="/logo/ofashi-icon.png" 
              alt=""
              width={100}
              height={100}
              className="h-7 md:h-8 lg:h-9 w-auto shadow-2xl shadow-white" 
            />
            <p className={`${urbanist.className} scale-x-110 py-2 flex items-center gap-0.5 md:gap-1 font-medium md:tracking-wide tracking-wider text-2xl lg:text-3xl bg-linear-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent transition-colors duration-300`} >
              Ofashi
            </p>
          </Link>
        </div>

        {/* === DESKTOP MENU === */}
        <ul className="hidden lg:flex items-center xl:space-x-10 lg:space-x-8 text-lg lg:text-xl font-medium ">
          <li className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
          >
            <div className="flex items-center justify-center gap-1 hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300 cursor-pointer">
              SERVICES
              <ChevronDown className={`w-6 h-6 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* === MEGA MENU (desktop only) === */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen max-w-none"
                >
                  <div className="bg-gray-950 border-b-2 border-t-2 border-gray-700/80 shadow-xl shadow-gray-800 ">
                    <div className="max-w-6xl mx-auto py-12 px-8 lg:px-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-32">
                        {solutions.map((solution, idx) => (
                          <Link
                            key={idx}
                            href={solution.href}
                            onClick={handleCloseMenu}
                            className="group flex flex-col px-8 py-6 rounded-xl border border-purple-900/50 bg-purple-900/5 hover:bg-purple-950/50 hover:border-purple-500/40 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-9 h-9 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-200 group-hover:text-purple-100 transition-colors">
                                {React.createElement(solution.icon, { size: 24 })}
                              </div>
                              <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                                {solution.title}
                              </h3>
                            </div>
                            <p className="text-gray-300 text-sm lg:text-base leading-relaxed line-clamp-3 ">
                              {solution.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link href="/projects" className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/about" className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="uppercase hover:text-purple-200 transition tracking-wider hover:underline hover:underline-offset-12 decoration-2 decoration-purple-300">
              FAQs
            </Link>
          </li>
        </ul>

        {/* === DESKTOP BUTTONS (unchanged) === */}
        <div className="hidden lg:flex items-center lg:space-x-8 xl:space-x-12 space-x-5">
          <Link href='/contact' className=" tracking-wider uppercase lg:text-xl text-lg lg:px-6 lg:py-2 xl:py-3 xl:px-10 bg-linear-to-bl hover:from-purple-200 hover:via-purple-100 hover:to-purple-50 hover:text-black font-medium hover:cursor-pointer from-indigo-700 via-purple-800 to-purple-500 text-white transition-all">
            Contact
          </Link>
        </div>

        {/* === MOBILE TOGGLE (unchanged) === */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-purple-100 focus:outline-none"
        >
          {open ? <X className="h-8 md:h-10 w-auto text-purple-300" /> : <Menu className="h-8 md:h-10 w-auto" />}
          <span className=" sr-only">open or close</span>
        </button>
      </div>

      {/* === MOBILE MENU (updated with Services accordion) === */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-linear-to-b from-black via-gray-900 to-gray-800 bg-opacity-95 flex flex-col justify-start items-center space-y-8 z-40 h-full"
          >
            {/* Logo + Close (unchanged) */}
            <div className="w-full flex items-center justify-between px-6 pt-2">
              <Image 
                src="/logo/ofashi-icon.png" 
                alt=""
                width={100}
                height={100}
                className="h-7 md:h-8 lg:h-9 w-auto absolute top-6 left-6"
              />

              <div className="flex justify-center w-full">
                <div className="relative w-48 h-32">
                  <p className={`${urbanist.className} w-full mt-6 mx-auto flex items-center justify-center gap-2 font-semibold tracking-wider text-xl md:text-2xl leading-tight md:tracking-wider bg-linear-to-l from-white via-purple-50 to-purple-100 bg-clip-text text-transparent transition-colors duration-300`}>
                    Ofashi
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-purple-100"
              >
                <X className="h-8 md:h-10 w-auto text-purple-300"/>
              </button>
            </div>

            {/* Links with Services accordion */}
            <ul className="flex flex-col items-center justify-center text-gray-100 text-lg space-y-8 mx-auto  w-full px-6">
              {/* Services with submenu */}
              <li>
                <button
                  className="w-full mx-auto flex items-center justify-center gap-1 hover:text-purple-100 transition"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  SERVICES
                  <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 space-y-2  text-center text-lg text-purple-100 "
                    >
                      {solutions.map((solution, idx) => (
                        <li key={idx} className="py-2">
                          <Link
                            href={solution.href}
                            onClick={handleCloseMenu}
                            className="lg:text-xl hover:text-purple-200 divide-y divide-purple-100/40 underline underline-offset-12 decoration-purple-100/40 transition  "
                          >
                            {solution.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Other links unchanged */}
              <li>
                <Link
                  href="/projects"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition uppercase"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition uppercase"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition uppercase"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  onClick={handleCloseMenu}
                  className="hover:text-purple-100 transition uppercase"
                >
                  FAQs
                </Link>
              </li>
            </ul>

            {/* Mobile Buttons (unchanged) */}
            <div className="flex flex-col items-center space-y-6 mt-6 md:w-1/3 w-3/4 uppercase">
              <Link href='/contact' onClick={handleCloseMenu} 
                className="w-full uppercase px-6 py-3 bg-linear-to-tr hover:from-purple-300 hover:via-purple-200 hover:to-purple-100 hover:text-black text-base font-bold text-center from-indigo-700 via-purple-800 to-purple-500 text-white hover:cursor-pointer transition"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}