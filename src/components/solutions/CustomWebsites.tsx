"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ArrowRight,
  ArrowBigLeftDash,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building2,
  ShoppingCart,
  Home,
  Rocket,
  User,
  ArrowLeft,
} from "lucide-react";

import OurProcess from "../OurProcess";
import TechStack from "../TechStack";
import GoogleEnquiryLight from "../GoogleEnquiryLight";

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};


type CarouselCard = {
  title: string;
  content: string;
  image: string;
};

const services: ServiceCard[] = [
  {
    title: "Business Websites",
    description:
      "Professional, modern websites crafted to build instant credibility, clearly communicate your value, guide visitors through strategic content flows, strengthen trust signals, and consistently convert interested visitors into qualified leads and long-term paying customers.",
    href: "/contact",
    icon: <Briefcase size={42} className="text-purple-400" />,
  },
  {
    title: "Corporate Websites",
    description:
      "Structured, scalable corporate websites designed for organizations that need strong authority, clear communication of complex services, intuitive navigation systems, stakeholder trust, professional presentation, and flexible architecture that supports long-term growth and expansion.",
    href: "/contact",
    icon: <Building2 size={42} className="text-purple-400" />,
  },
  {
    title: "E-Commerce Websites",
    description:
      "High-converting online stores built with seamless shopping experiences, optimized product pages, persuasive product storytelling, secure payment integrations, mobile-first performance, and conversion-focused user journeys that increase sales, average order value, and repeat purchases.",
    href: "/contact",
    icon: <ShoppingCart size={42} className="text-purple-400" />,
  },
  {
    title: "Real Estate Websites",
    description:
      "Powerful property platforms featuring searchable listings, advanced filtering systems, high-quality visual galleries, interactive maps, detailed property pages, and integrated lead capture tools designed to connect agents with serious buyers and motivated sellers efficiently.",
    href: "/contact",
    icon: <Home size={42} className="text-purple-400" />,
  },
  {
    title: "Landing Pages & Funnels",
    description:
      "High-impact landing pages and structured sales funnels optimized for marketing campaigns, paid ads, product launches, lead generation, and promotions, built to remove distractions, clarify messaging, strengthen persuasion, and maximize measurable conversion rates.",
    href: "/contact",
    icon: <Rocket size={42} className="text-purple-400" />,
  },
  {
    title: "Portfolio / Personal Websites",
    description:
      "Modern personal and portfolio websites designed to showcase your work, highlight achievements, communicate your story, build authority in your field, attract premium opportunities, and position your personal brand as credible, polished, and professional.",
    href: "/contact",
    icon: <User size={42} className="text-purple-400" />,
  },
];



const carouselData: CarouselCard[] = [
  {
    title: "Websites Built to Generate Consistent Leads",
    content:
      "Conversion-focused websites structured to guide visitors toward action using clear paths, persuasive CTAs, trust signals, and lead capture systems.",
    image: "/assets/web/website1.jpg",
  },
  {
    title: "Online Stores That Sell at Scale",
    content:
      "High-performance online stores with optimized products, stunning visuals, frictionless checkout, mobile-first design, secure payments, and scalable infrastructure for growth.",
    image: "/assets/web/ecommerce1.jpg",
  },
  {
    title: "Websites That Clearly Communicate Your Value",
    content:
      "Authority-building service websites that clarify your value, showcase proof, highlight success stories, and make choosing you simple and confident.",
    image: "/assets/web/website4.jpg",
  },
  {
    title: "Structured Websites for Growing Organizations",
    content:
      "Scalable, well-structured websites for complex organizations, featuring intuitive navigation, modular architecture, directories, and flexible CMS systems supporting long-term growth.",
    image: "/assets/web/website3.jpg",
  },
  {
    title: "Digital Presence for Professionals & Creators",
    content:
      "Polished personal websites showcasing your work, achievements, story, credibility, and media presence to attract premium opportunities and partnerships.",
    image: "/assets/web/website5.jpg",
  },
  {
    title: "Focused Pages Built for Conversions",
    content:
      "High-conversion landing pages built for campaigns, launches, and ads, removing distractions, sharpening messaging, strengthening proof, and maximizing actions.",
    image: "/assets/web/software3.jpg",
  },
];


export default function CustomWebsitesSection() {

  const [showForm, setShowForm] = useState(false);

  const [index, setIndex] = useState(0);

  // ✅ TOUCH STATE
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const prev = () =>
    setIndex((i) => (i === 0 ? carouselData.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === carouselData.length - 1 ? 0 : i + 1));

  // ✅ SWIPE HANDLERS
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  return (
    <section className="relative overflow-hidden bg-black text-white">
        
    {/* ================= HERO ================= */}
<div className="relative isolate">
  {/* Background Image */}
  <Image
    src="/assets/web/software2.jpg"
    alt=""
    fill
    priority
    className="object-cover -z-10"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 lg:bg-black/80 bg-black/80 -z-10" />

  {/* Content */}
  <div className="relative z-10 mx-auto w-full px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 py-24 grid md:grid-cols-2 gap-16 items-center-safe ">
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        Fast-Loading Custom Websites That Drive Real Business Results
      </h1>
      <p className="mt-6 text-gray-200 text-lg xl:text-xl">
        We design and develop high-performance custom websites built for
        speed, visibility, and conversion — transforming your site into a
        powerful growth engine.
      </p>
    </div>
      {!showForm ? (
      <div
        onClick={() => setShowForm(true)}
        className="
          bg-linear-to-tl from-gray-800/40 via-gray-900/40 to-gray-950/40
          p-8 md:p-9 lg:p-10 rounded-3xl md:shadow-lg md:border-2 border border-gray-600/90
          cursor-pointer transition-all duration-300 shadow-sm shadow-gray-700/50
          hover:scale-[1.02] hover:shadow-gray-500/50
          text-center text-white flex flex-col justify-center
          min-h-105
        "
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Project
        </h2>

        <p className="mt-4 text-purple-100 text-lg max-w-md mx-auto">
          Tell us about your idea and get a professional estimate within 24 hours.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 text-sm md:text-base bg-white text-purple-900 px-4 md:px-6 py-3 rounded-xl font-semibold mx-auto">
          Let’s Build Your Project <ChevronRight size={20} />
        </div>
      </div>
    ) : (
      <div className="relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => setShowForm(false)}
          className="absolute -top-4 -right-4 bg-white text-red-500 font-bold hover:cursor-pointer w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
        >
          ✕
        </button>

        <GoogleEnquiryLight />
      </div>
    )}

    </div>
  </div>


      {/* ================= SERVICES GRID ================= */}
      <div className="bg-black text-purple-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Our Custom Website Development Services
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Tailored websites built around your industry, audience, and growth
            goals.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mt-16">
            {services.map((service) => (
                        <div
            key={service.title}
           className="group relative bg-linear-to-tl from-gray-900/10 via-gray-950 to-black p-8 md:p-10 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-300 shadow-sm shadow-gray-400/90 overflow-hidden"
            >
            {/* glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-700/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />

            <div className="mb-6">{service.icon}</div>

            <h3 className="text-2xl font-semibold">{service.title}</h3>

            <p className="text-gray-400 mt-4 leading-relaxed">
                {service.description}
            </p>

            <Link
                href={service.href}
                className="inline-flex items-center gap-2 mt-6 uppercase text-gray-300 group-hover:text-purple-200 transition"
            >
                Get started <ArrowRight size={18} />
            </Link>
            </div>

            ))}
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL ================= */}
      <div className="py-20 px-4 md:px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:tracking-wider font-bold">
            Types of Websites We Build
          </h2>
          <p className="mt-4 text-gray-200">
            From growth-focused business sites to advanced digital platforms.
          </p>

          <div className="relative mt-16">
            <div className="hidden lg:flex justify-center items-center gap-16 lg:gap-20 xl:gap-24 mt-16 mb-4">
                <button
                    onClick={prev}
                    className="flex items-center gap-3 hover:text-gray-300 hover:cursor-pointer text-purple-100 transition"
                >
                    <ArrowLeft size={40} strokeWidth={1.5} />
                    <span className="text-lg tracking-wide"></span>
                </button>

                <button
                    onClick={next}
                    className="flex items-center gap-3 text-purple-200 hover:text-white hover:cursor-pointer transition"
                >
                    <span className="text-lg tracking-wide"></span>
                    <ArrowRight size={40} strokeWidth={1.5} />
                </button>
              </div>

            <div 
              className="grid md:grid-cols-2 gap-10 items-center shadow-sm shadow-gray-500 bg-linear-to-br from-gray-950 via-indigo-950 to-purple-950 rounded-sm md:p-8 p-0"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={carouselData[index].image}
                alt="websites"
                className="rounded-t-xl object-cover w-full h-56 md:h-96"
                width={100}
                height={100}
              />
              <div className="text-left px-6 md:px-0">
                <h3 className="md:text-2xl lg:text-3xl text-xl font-semibold">
                  {carouselData[index].title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg lg:text-xl mt-4 ">
                  {carouselData[index].content}
                </p>
                <div className="py-4 md:mb-0 my-4">
                  <Link href='/contact' className="flex items-center gap-1 uppercase hover:text-purple-200 ">
                  <span>Get Started </span>
                    <ArrowRight className="h-5 w-5"/>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:hidden flex justify-center items-center gap-4 my-4">
                <button
                    onClick={prev}
                    className="flex items-center gap-3 text-gray-300 hover:cursor-pointer hover:text-purple-300 transition"
                >
                    <ChevronLeft className="w-6 h-6"/>
                    <span className="text-lg tracking-wide"></span>
                </button>
                <span className="text-xs">swipe</span>
                <button
                    onClick={next}
                    className="flex items-center gap-3 text-purple-300 hover:text-white hover:cursor-pointer transition"
                >
                    <span className="text-lg tracking-wide"></span>
                    <ChevronRight className="w-6 h-6" />
                </button>
              </div>
          </div>
        </div>
      </div>
      <OurProcess />
      <TechStack />
    </section>
  );
}
