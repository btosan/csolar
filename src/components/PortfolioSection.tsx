"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const AUTOPLAY_DELAY = 5000;

interface Project {
  slug: string; // ✅ ADDED
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string;
  image: string;
  liveUrl: string;
}

const ProjectCard = ({
  project,
  index,
  onUserInteract,
}: {
  project: Project;
  index: number;
  onUserInteract?: () => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleInteraction = () => {
    setIsActive(!isActive);
    onUserInteract?.();
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden border lg:border-2 border-purple-900/5 shadow-sm shadow-purple-900 transition-all duration-500 px-2 bg-purple-950/10 lg:bg-purple-950/20 hover:border-purple-300/30"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={handleInteraction}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className={`object-cover transition-transform duration-700 ${
            isActive ? "scale-110" : "scale-100"
          }`}
        />
      </div>

      <div className="px-0 py-6 md:px-4 md:py-8 relative">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 leading-tight">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-2 text-sm lg:text-sm">
          {project.shortDescription}
        </p>

        <p
          className={`absolute left-0 md:left-4 right-0 md:right-4 text-gray-400 text-sm lg:text-sm leading-relaxed transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
        >
          {project.fullDescription}
        </p>

        <p
          className={`text-xs md:text-sm text-blue-100 tracking-wider font-medium mb-8 ${
            isActive ? "mt-12 pt-3" : "mt-0"
          }`}
        >
          {project.tech}
        </p>

        <div className="flex flex-row items-center justify-between md:gap-4 gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-5 py-2.5 md:py-3 text-sm text-white bg-linear-to-bl from-purple-900 via-purple-600 to-indigo-700 transition-all duration-300"
          >
            <ExternalLink size={18} />
            View Site
          </a>

          {/* ✅ INTERNAL LINK USING SLUG */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-1 px-4 py-2.5 md:py-3 text-sm text-white/90 border border-gray-500 hover:border-purple-50/60 transition group/link"
          >
            Details
            <ArrowRight
              size={18}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  const swiperRef = useRef<any>(null);
  const stopAutoplay = () => swiperRef.current?.autoplay?.stop();

  const projects: Project[] = [
    {
      slug: "ecommerce-platform",
      title: "E-Commerce Platform",
      shortDescription:
        "Full-stack Next.js + FastAPI web app with Paystack integration",
      fullDescription:
        "A complete online store with inventory management, secure payments, user authentication, order tracking, and admin dashboard.",
      tech: "Next.js, FastAPI, React, Tailwind, PostgreSQL",
      image: "/assets/byd/song-plus-3qv.jpg",
      liveUrl: "https://example-ecommerce.com",
    },
    {
      slug: "business-dashboard",
      title: "Business Dashboard",
      shortDescription:
        "Custom analytics dashboard with real-time data and AI insights",
      fullDescription:
        "Enterprise dashboard with live data feeds, AI predictions, charts, role-based access and reporting.",
      tech: "Django, React, Chart.js, PostgreSQL",
      image: "/assets/byd/song-plus-back.jpg",
      liveUrl: "https://dashboard.example.com",
    },
    {
      slug: "corporate-website",
      title: "Corporate Website",
      shortDescription: "Modern responsive site with CMS and SEO optimization",
      fullDescription:
        "Professional multi-page corporate site with CMS, advanced SEO, blog, and fast performance.",
      tech: "Next.js, Tailwind, CMS",
      image: "/assets/byd/song-plus-bonnet.jpg",
      liveUrl: "https://corporate.example.com",
    },
    {
      slug: "saas-landing-page",
      title: "SaaS Landing Page",
      shortDescription:
        "High-conversion landing page with animations and forms",
      fullDescription:
        "Marketing-focused landing page for lead capture with animations and integrations.",
      tech: "Next.js, Framer Motion, Node.js",
      image: "/assets/byd/song-plus-dashboard.jpg",
      liveUrl: "https://saas.example.com",
    },
    {
      slug: "ai-powered-tool",
      title: "AI-Powered Tool",
      shortDescription:
        "Web app integrating custom AI models for content generation",
      fullDescription:
        "Platform generating blog posts, emails, and social content using AI.",
      tech: "FastAPI, React, AI APIs",
      image: "/assets/byd/songplus.jpg",
      liveUrl: "https://ai-tool.example.com",
    },
    {
      slug: "mobile-first-site",
      title: "Mobile-First Site",
      shortDescription:
        "Lightning-fast progressive web app for local business",
      fullDescription:
        "PWA with offline support, push notifications, and native app feel.",
      tech: "Next.js, PWA, Tailwind",
      image: "/assets/byd/song-plus-others.jpg",
      liveUrl: "https://mobile.example.com",
    },
  ];

  return (
    <section className="relative bg-black py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden">
      <div className="mx-auto px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-100 mb-6 leading-tight">
            Explore Our Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Real custom solutions built for clients — hand-coded and scalable.
          </p>
        </motion.div>

        <div className="md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
            pagination={{ type: "progressbar", progressbarFillClass: "!bg-purple-300" }}
            spaceBetween={16}
            slidesPerView={1.05}
            loop
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard project={project} index={index} onUserInteract={stopAutoplay} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 xl:gap-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
