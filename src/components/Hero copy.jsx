"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
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
    bg: "bg-hero",
  },
  {
    title: (
      <>
        Smart <span className="text-accent">Energy</span> Solutions
      </>
    ),
    description:
      "Custom solar systems engineered for efficiency, reliability, and long-term savings for homes and businesses.",
    bg: "bg-hero-2",
  },
  {
    title: (
      <>
        Clean <span className="text-accent">Power</span> Independence
      </>
    ),
    description:
      "Reduce grid dependence with advanced battery storage and inverter systems designed to perform.",
    bg: "bg-hero-3",
  },
  {
    title: (
      <>
        Future-Ready <span className="text-accent">Solar</span>
      </>
    ),
    description:
      "Scalable renewable energy infrastructure built to grow with your needs.",
    bg: "bg-hero-4",
  },
];

export default function HeroCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [api, setApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const scrollTo = (index) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Carousel
        className="h-full w-full"
        opts={{
          loop: true,
          align: "center",
          containScroll: "trimSnaps",
          dragFree: false,
        }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 h-full">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative h-[80vh] lg:h-[85vh] w-full pl-0"
            >
              <div
                className={`absolute inset-0 ${slide.bg} bg-cover bg-center`}
              >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 container mx-auto h-full flex items-center justify-center xl:justify-start">
                  <div className="text-white max-w-xl text-center xl:text-left">
                    <h1 className="h1 text-white mb-4">{slide.title}</h1>
                    <p className="mb-8">{slide.description}</p>
                    <Button href="/solutions" text="Our Solutions" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows (UNCHANGED) */}
        <div className="absolute bottom-24 lg:bottom-40 right-12 z-20 flex space-x-4">
          <CarouselPrevious
            className={cn(
              "relative inset-auto h-10 w-10 rounded-full border border-white/30 bg-black/20",
              "hover:bg-black/70 hover:border-gray-200 transition-all data-disabled:opacity-50"
            )}
          >
            <ChevronLeftIcon className="h-8 w-8 text-white" />
          </CarouselPrevious>

          <CarouselNext
            className={cn(
              "relative inset-auto h-10 w-10 rounded-full border border-white/30 bg-black/20",
              "hover:bg-black/70 hover:border-gray-200 transition-all data-disabled:opacity-50"
            )}
          >
            <ChevronRightIcon className="h-8 w-8 text-white" />
          </CarouselNext>
        </div>

        {/* Bottom Slide Indicators (RESTORED EXACTLY) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 w-10 rounded-full transition ${
                index === selectedIndex
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}



// "use client"
// import { fadeIn } from "@/variants"
// import Button from "./Button"


// const Hero = () => {
//   return (
//     <section className="lg:h-[85vh] h-[80vh] bg-hero bg-no-repeat bg-cover bg-center relative">
//       <div className="absolute inset-0 bg-linear-to-l from-black/0 via-black/50 to-black/70 z-10">
//       </div>
//         <div className="container mx-auto h-full flex items-center">
//           <div className="z-20 text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-170">
//             <h1  className="h1 text-white mb-4">
//               <span className="text-accent">Reliable</span> Solar & Inverter Systems
//             </h1>
//             <p className="mb-9  text-base lg:text-lg">
//               From solar panels and batteries to inverters and system monitoring, Contained Solar designs, installs, and maintains power solutions built for long-term performance.
//             </p>
//             <div className="">
//              <Button className='' href="/solutions" text="Our Solutions" />
//             </div>
//           </div>
//         </div>  
//     </section>
//   )
// }

// export default Hero