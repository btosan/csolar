"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  Rocket,
  Home,
  Briefcase,
  Building2,
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
    title: "User Research & Testing",
    description:
      "Conduct in-depth research to understand your audience, identify pain points, and validate design decisions with real users.",
    href: "/contact",
    icon: <User size={42} className="text-purple-400" />,
  },
  {
    title: "Wireframes & Prototyping",
    description:
      "Create interactive wireframes and prototypes to visualize workflows, test usability, and align stakeholders before development.",
    href: "/contact",
    icon: <Rocket size={42} className="text-purple-400" />,
  },
  {
    title: "UI Design & Visual Systems",
    description:
      "Design polished, on-brand interfaces with consistent visual language, typography, and iconography that engage and delight users.",
    href: "/contact",
    icon: <Briefcase size={42} className="text-purple-400" />,
  },
  {
    title: "UX Strategy & Information Architecture",
    description:
      "Develop user flows, navigation systems, and content hierarchy to ensure intuitive, conversion-focused experiences.",
    href: "/contact",
    icon: <Building2 size={42} className="text-purple-400" />,
  },
  {
    title: "Conversion Optimization",
    description:
      "Design interfaces that guide users to take action, increasing engagement, leads, and sales through tested UX patterns.",
    href: "/contact",
    icon: <Home size={42} className="text-purple-400" />,
  },
  {
    title: "Responsive & Mobile-First Design",
    description:
      "Craft interfaces that work seamlessly across devices, ensuring consistent experience on desktop, tablet, and mobile screens.",
    href: "/contact",
    icon: <User size={42} className="text-purple-400" />,
  },
];

const carouselData: CarouselCard[] = [
  {
    title: "Intuitive User Flows",
    content:
      "Design workflows that make complex processes simple and guide users naturally to conversion points.",
    image: "/assets/uiux/uiux1.jpg",
  },
  {
    title: "Engaging Interfaces",
    content:
      "Polished visual designs that build trust, reinforce brand identity, and encourage interaction.",
    image: "/assets/uiux/uiux2.jpg",
  },
  {
    title: "Conversion-Focused Layouts",
    content:
      "Layouts optimized for action, strategically placing elements to drive clicks, sign-ups, and purchases.",
    image: "/assets/uiux/uiux3.jpg",
  },
  {
    title: "Mobile & Desktop Ready",
    content:
      "Responsive designs that adapt seamlessly across devices while maintaining usability and aesthetics.",
    image: "/assets/uiux/uiux4.jpg",
  },
  {
    title: "Rapid Prototyping",
    content:
      "Test ideas quickly with interactive prototypes to validate concepts and reduce design iteration cycles.",
    image: "/assets/uiux/uiux5.jpg",
  },
  {
    title: "Data-Driven Design Decisions",
    content:
      "Use analytics and user testing insights to continuously improve UI/UX and drive measurable results.",
    image: "/assets/uiux/uiux6.jpg",
  },
];

export default function UIUXSection() {
  const [showForm, setShowForm] = useState(false);
  const [index, setIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const prev = () =>
    setIndex((i) => (i === 0 ? carouselData.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === carouselData.length - 1 ? 0 : i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
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
        <Image
          src="/assets/uiux/uiux-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />

        {/* Overlay matched to CustomWebsitesSection */}
        <div className="absolute inset-0 bg-black/90 -z-10" />

        <div className="relative z-10 mx-auto w-full px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 py-24 grid md:grid-cols-2 gap-16 items-center-safe ">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Intuitive, Conversion-Focused Experiences
            </h1>
            <p className="mt-6 text-gray-200 text-lg xl:text-xl">
              Exceptional interface and user experience design that improves usability, builds trust, and turns visitors into engaged customers.
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
              <h2 className="text-3xl md:text-4xl font-bold">Start Your Design Project</h2>
              <p className="mt-4 text-purple-100 text-lg max-w-md mx-auto">
                Tell us about your project and get a professional design estimate within 24 hours.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 text-sm md:text-base bg-white text-purple-900 px-4 md:px-6 py-3 rounded-xl font-semibold mx-auto">
                Let’s Design Your Experience <ChevronRight size={20} />
              </div>
            </div>
          ) : (
            <div className="relative animate-fadeIn">
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
            Our UI/UX Design Services
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            User-focused design solutions that enhance usability, engagement, and conversion.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mt-16">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative bg-linear-to-tl from-gray-900/10 via-gray-950 to-black p-8 md:p-10 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-300 shadow-sm shadow-gray-400/90 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-700/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="text-gray-400 mt-4 leading-relaxed">{service.description}</p>
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
            UI/UX Experiences We Craft
          </h2>
          <p className="mt-4 text-gray-200">
            From wireframes to high-fidelity interfaces, we design experiences that convert.
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
              className="grid md:grid-cols-2 gap-10 items-center bg-linear-to-br from-gray-950 via-indigo-950 to-purple-950 rounded-sm md:p-8 p-0"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={carouselData[index].image}
                alt="UI/UX designs"
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
                  <Link href="/contact" className="flex items-center gap-1 uppercase hover:text-purple-200 ">
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