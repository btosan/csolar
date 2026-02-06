"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setScrolled(window.scrollY > 20);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 text-gray-100 border-b border-gray-800">
      <div className="mx-auto px-6 md:px-16 py-2 flex items-center justify-between transition-all duration-300">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 lg:gap-2" // consistent gap on all sizes
        >
          {/* Text + Icon as one centered group when not scrolled (mobile) */}
          <div
            className={`flex items-center gap-3 transition-all duration-500  ${
              scrolled
                ? "translate-x-0 opacity-0 pointer-events-none pt-6"
                : "translate-x-0 opacity-100 "
            } lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto`}
          >
            
            <Image
              src="/logo/ofashi.png"
              alt="Ofashi Logo"
              width={100}
              height={100}
              className="h-9 md:h-10 lg:h-12 w-auto shrink-0"
            />
            <p className="flex items-center gap-1 md:gap-1.5 font-serif font-semibold tracking-wider text-2xl md:text-3xl lg:text-4xl bg-linear-to-l from-white via-purple-50 to-purple-200 bg-clip-text text-transparent">
              {/* <span className="font-serif">titi</span>
              <span className="font-serif">systems</span> */}
              Ofashi
            </p>
          </div>

          {/* Logo only - visible when scrolled on mobile */}
          <div
            className={`absolute left-6 md:left-16 flex items-center transition-all duration-500 ${
              scrolled
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8 pointer-events-none"
            } lg:hidden`}
          >
            <Image
              src="/logo/ofashi.png"
              alt="Titi Systems Logo"
              width={100}
              height={100}
              className="h-9 md:h-10 w-auto shrink-0"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center xl:space-x-10 lg:space-x-8 text-sm font-medium uppercase">
          <li>
            <Link href="/services" className="hover:text-purple-100 transition tracking-widest">
              Services
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-purple-100 transition tracking-widest">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-purple-100 transition tracking-widest">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="hover:text-purple-100 transition tracking-widest">
              FAQs
            </Link>
          </li>
        </ul>

        {/* Desktop Contact Button */}
        <div className="hidden lg:flex items-center lg:space-x-8 xl:space-x-12 space-x-5">
          <Link
            href="/contact"
            className="text-base lg:text-lg lg:px-10 lg:py-2 xl:px-12 bg-linear-to-r from-purple-200 via-purple-100 to-purple-50 text-black font-bold rounded-2xl hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white transition-all"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-purple-100 focus:outline-none z-50"
        >
          {open ? <X size={0} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Full Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-start items-center space-y-8 z-40"
          >
            <div className="w-full flex items-center justify-between px-12 mt-6">
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center gap-3">
                  
                  <Image
                    src="/logo/ofashi.png"
                    alt=""
                    width={100}
                    height={100}
                    className="h-7 md:h-8 lg:h-10 w-auto"
                  />
                  <p className="flex items-center justify-center gap-1.5 font-semibold tracking-wider text-2xl md:text-3xl lg:text-4xl bg-linear-to-l from-white via-purple-100 to-purple-200 bg-clip-text text-transparent transition-colors duration-300">
                    {/* <span className="font-serif">titi</span>
                    <span className="font-serif">systems</span> */}
                    Ofashi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-purple-100"
              >
                <X size={30} />
              </button>
            </div>

            <ul className="text-gray-100 text-lg space-y-8 text-center uppercase">
              <li>
                <Link href="/services" onClick={handleCloseMenu} className="hover:text-purple-100 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" onClick={handleCloseMenu} className="hover:text-purple-100 transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={handleCloseMenu} className="hover:text-purple-100 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" onClick={handleCloseMenu} className="hover:text-purple-100 transition">
                  FAQs
                </Link>
              </li>
            </ul>

            <div className="flex flex-col items-center space-y-6 mt-6 w-3/4 uppercase">
              <Link
                href="/contact"
                onClick={handleCloseMenu}
                className="w-full px-6 py-3 bg-linear-to-r from-purple-300 via-purple-200 to-purple-100 text-black text-base font-bold rounded-full text-center hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-500 hover:text-white transition"
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