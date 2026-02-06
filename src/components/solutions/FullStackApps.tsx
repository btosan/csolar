"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building2,
  ShoppingCart,
  Home,
  Rocket,
  User,
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
    title: "API Development & Integrations",
    description:
      "Build robust APIs for web and mobile apps, enabling secure communication, third-party integrations, and seamless data flows across platforms.",
    href: "/contact",
    icon: <Briefcase size={42} className="text-purple-400" />,
  },
  {
    title: "Next.js Full-Stack Apps",
    description:
      "End-to-end full-stack applications using Next.js, combining server-side rendering, static pages, and dynamic backends for high performance and SEO.",
    href: "/contact",
    icon: <Rocket size={42} className="text-purple-400" />,
  },
  {
    title: "Database & Backend Systems",
    description:
      "Design scalable backends with PostgreSQL or MongoDB, using Prisma ORM for structured data access, migrations, and complex queries.",
    href: "/contact",
    icon: <Building2 size={42} className="text-purple-400" />,
  },
  {
    title: "Enterprise Systems",
    description:
      "Scalable enterprise-grade full-stack systems designed to handle complex data flows, user management, reporting dashboards, and high-performance backends.",
    href: "/contact",
    icon: <Building2 size={42} className="text-purple-400" />,
  },
  {
    title: "Booking & Management Platforms",
    description:
      "Full-stack solutions for booking and management, including school management systems, hotel management platforms, and other resource management apps.",
    href: "/contact",
    icon: <Home size={42} className="text-purple-400" />,
  },
  {
    title: "Full-Stack SaaS & Platforms",
    description:
      "Build polished, production-ready SaaS platforms with authentication, subscriptions, dashboards, and real-time features.",
    href: "/contact",
    icon: <User size={42} className="text-purple-400" />,
  },
];

const carouselData: CarouselCard[] = [
  {
    title: "Next.js Full-Stack Applications",
    content:
      "End-to-end Next.js apps combining frontends, APIs, and server-side rendering to deliver high-performance, scalable web platforms.",
    image: "/assets/apps/fullstack1.jpg",
  },
  {
    title: "Robust APIs for Web & Mobile",
    content:
      "Secure, scalable REST or GraphQL APIs designed to serve both web and mobile applications with real-time data flows.",
    image: "/assets/apps/fullstack2.jpg",
  },
  {
    title: "Database-Driven Backends",
    content:
      "PostgreSQL or MongoDB backends managed with Prisma ORM for efficient queries, migrations, and structured data management.",
    image: "/assets/apps/fullstack3.jpg",
  },
  {
    title: "Microservices & Serverless Architecture",
    content:
      "Modern cloud-ready architectures for apps that scale effortlessly, using microservices or serverless functions for flexibility and reliability.",
    image: "/assets/apps/fullstack4.jpg",
  },
  {
    title: "SaaS Platforms & Dashboards",
    content:
      "Complete platforms including authentication, admin dashboards, subscription management, and real-time features for professional SaaS products.",
    image: "/assets/apps/fullstack5.jpg",
  },
  {
    title: "Mobile & Web Ready",
    content:
      "Full-stack apps designed to support responsive web, progressive web apps, and mobile apps seamlessly with a single backend.",
    image: "/assets/apps/fullstack6.jpg",
  },
];

export default function FullStackAppsSection() {
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
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* HERO */}
      <div className="relative isolate">
        <Image
          src="/assets/apps/app-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/90 -z-10" />

        <div className="relative z-10 mx-auto w-full px-6 md:px-16 lg:px-12 xl:px-16 2xl:px-20 py-24 grid md:grid-cols-2 gap-16 items-center-safe ">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              High-Performance Full-Stack Applications That Scale
            </h1>
            <p className="mt-6 text-gray-200 text-lg xl:text-xl">
              We build full-stack applications with optimized frontends,
              robust backends, and seamless integrations — turning your
              ideas into powerful digital solutions.
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
              <h2 className="text-3xl md:text-4xl font-bold">Start Your Project</h2>
              <p className="mt-4 text-purple-100 text-lg max-w-md mx-auto">
                Tell us about your idea and get a professional estimate within 24 hours.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 text-sm md:text-base bg-white text-purple-900 px-4 md:px-6 py-3 rounded-xl font-semibold mx-auto">
                Let’s Build Your Project <ChevronRight size={20} />
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

      {/* SERVICES GRID */}
      <div className="bg-black text-purple-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Our Full-Stack Development Services
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Tailored applications built around your business, users, and growth goals.
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

      {/* CAROUSEL */}
      <div className="py-20 px-4 md:px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:tracking-wider font-bold">
            Types of Full-Stack Applications We Build
          </h2>
          <p className="mt-4 text-gray-200">
            From internal tools to enterprise-grade digital platforms.
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
                alt="full-stack apps"
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