"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

const slides = [
  {
    title: (
      <>
        <span className="text-accent">Reliable</span> Solar & Inverter Systems
      </>
    ),
    description:
      "From solar panels and batteries to inverters and system monitoring, Contained Solar designs, installs, and maintains power solutions built for long-term performance.",
    bg: "bg-[url('/assets/csolar/portable-solar-power.avif')]",
  },

  // SLIDE 2 — System Monitoring & Health Management
  {
    title: (
      <>
        Smart <span className="text-accent">System Monitoring</span>
      </>
    ),
    description:
      "Advanced solar system health tracking with battery and inverter condition assessment, performance benchmarking, early issue detection, and proactive service recommendations.",
    bg: "bg-[url('/assets/products/monitoring2.jpg')]",
  },

  // SLIDE 3 — Solar Panels
  {
    title: (
      <>
        High-Efficiency <span className="text-accent">Solar Panels</span>
      </>
    ),
    description:
      "Durable, high-performance solar panels engineered for maximum energy generation, long-term reliability, and seamless integration with grid-tied, hybrid, and off-grid systems.",
    bg: "bg-[url('/assets/img/hero/hero-bg.jpg')]",
  },

  // SLIDE 4 — Inverters
  {
    title: (
      <>
        Advanced <span className="text-accent">Inverter Systems</span>
      </>
    ),
    description:
      "Grid-tied, hybrid, and off-grid inverters designed for intelligent power conversion, system stability, and optimized performance across residential and commercial installations.",
    bg: "bg-[url('/assets/products/micro-hybrid.webp')]",
  },

  // SLIDE 5 — Storage & Batteries
  {
    title: (
      <>
        Reliable <span className="text-accent">Battery Storage</span>
      </>
    ),
    description:
      "Scalable energy storage solutions with high-capacity batteries built for efficiency, safety, and dependable backup power when you need it most.",
    bg: "bg-[url('/assets/products/solar-storage.webp')]",
  },
];



export default function HeroCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
      duration: 30, // smoother animation
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = (index) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative lg:h-screen h-[80vh] w-full overflow-hidden">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`relative flex-[0_0_100%] h-full ${slide.bg} bg-cover bg-center`}
            >
              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 container mx-auto h-full flex items-center justify-center xl:justify-start">
                <div className="text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-170">
                  <h1 className="h1 text-white mb-4">{slide.title}</h1>
                  <p className="mb-8">{slide.description}</p>
                  <Button href="/solutions" text="Our Solutions" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE ARROWS (added, same style as working example) */}
      <div className="absolute bottom-12 md:bottom-16 lg:bottom-48 right-12 z-20 hidden md:flex space-x-4">
        <button
          onClick={scrollPrev}
          className="relative h-10 w-10 rounded-full border border-white/30 bg-black/20 
          hover:bg-black/70 hover:border-gray-200 transition-all"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white mx-auto" />
        </button>

        <button
          onClick={scrollNext}
          className="relative h-10 w-10 rounded-full border border-white/30 bg-black/20 
          hover:bg-black/70 hover:border-gray-200 transition-all"
        >
          <ChevronRightIcon className="h-6 w-6 text-white mx-auto" />
        </button>
      </div>

     
      <div className="absolute bottom-12 md:bottom-16 lg:bottom-48 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`md:h-1.5 md:w-10 h-1 w-5 rounded-full transition ${
              index === selectedIndex
                ? "bg-white"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
