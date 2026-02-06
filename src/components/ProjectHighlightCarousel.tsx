// src/components/ProjectHighlightCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Highlight {
  id: string;
  type: "image";
  url: string;
  alt: string;
  title: string;
  description: string;
}

interface ProjectHighlightCarouselProps {
  highlights: Highlight[];
}

export default function ProjectHighlightCarousel({ highlights }: ProjectHighlightCarouselProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Project Highlights
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {highlights.map((highlight) => (
            <SwiperSlide key={highlight.id}>
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative w-full aspect-video">
                  <Image
                    src={highlight.url}
                    alt={highlight.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}