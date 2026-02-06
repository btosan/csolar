"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// mission
export default function AboutPage() {
  return (
    <section className="bg-black text-white min-h-screen py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* === Header === */}
        <div
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.6 }}
          className=" mb-16"
        >
          <h1 className="text-start md:text-center text-3xl lg:text-6xl md:text-5xl text-purple-100 font-bold uppercase mb-4 tracking-wide">
            About Ofashi
          </h1>
          <p className="text-start md:text-center text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Pioneering bespoke web development and AI automation in Nigeria, delivering scalable and high-performance digital solutions for businesses and organizations worldwide. Founded by Best Tosan, a full-stack software developer, UI/UX designer, and AI expert with over 10 years of experience.
          </p>
        </div>

        {/* === Mission Section === */}
        <div
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-purple-100 uppercase">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We empower Nigerian businesses with world-class custom web solutions, from stunning websites to scalable e-commerce apps and AI-driven automation, helping them grow in the digital age.
            </p>
            <p className="mt-6 text-gray-400">
              We are not just building websites; we create high-performance, future-ready digital experiences using the latest tools such as <strong>FastAPI</strong>, <strong>Django</strong>, <strong>React</strong>, and <strong>Next.js</strong>. <br /> <br />
              With <strong> Best Tosan’s 10+ years of experience,</strong> every solution is innovative, reliable, and crafted for results.
            </p>
          </div>

          <div className="relative w-full h-87.5 md:h-120 rounded-3xl overflow-hidden">
            <Image
              src="/assets/people/ofashi-about.jpg"
              alt="Ofashi Custom Web App"
              fill
              className="object-cover rounded-3xl opacity-90"
            />
          </div>
        </div>

        {/* === Company Overview === */}
        <div
          // initial={{ opacity: 0, y: 30 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.6 }}
          className="space-y-8 mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-100 uppercase">
            Who We Are
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong>Ofashi</strong> is Nigeria's leading custom web development agency specializing in hand-coded websites, e-commerce platforms, and AI integrations. Founded by Best Tosan, our agency combines deep technical expertise with creative design to build exactly what your business needs, with no templates and no shortcuts.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Based in Nigeria and supported by a team of expert developers, we deliver lightning-fast, secure, and scalable solutions for startups, SMEs, and enterprises. Every project is tailored to your vision and uses the same technologies that power global leaders.
          </p>
        </div>

        {/* === Why Choose Us === */}
        <div
          // initial={{ opacity: 0, y: 40 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8 }}
          className="bg-[#0a0a0a] rounded-3xl p-10 md:p-16 mb-24 border border-gray-800 lg:border-gray-700"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 uppercase text-purple-100">
            Why Nigerian Businesses Choose Ofashi
          </h2>
          <ul className="space-y-6 text-gray-300 text-lg leading-relaxed list-disc pl-6">
            <li>
              <strong>100% Custom Development</strong> — Every line of code is hand-written for your exact needs — no drag-and-drop or generic templates.
            </li>
            <li>
              <strong>AI Integration Expertise</strong> — Seamless chatbots, automation, and intelligent features to boost your business efficiency.
            </li>
            <li>
              <strong>E-Commerce & Web Apps</strong> — Fully functional online stores and dashboards with Paystack, Flutterwave, and real-time capabilities.
            </li>
            <li>
              <strong>Lightning-Fast Delivery</strong> — Professional websites in days, not months — built with Next.js for instant loading.
            </li>
            <li>
              <strong>Scalable & Secure</strong> — Future-proof solutions using FastAPI, Django, React, and Next.js — safe for growth.
            </li>
            <li>
              <strong>Nigerian-Focused Support</strong> — Local team, fast communication, and ongoing support tailored to your market.
            </li>
          </ul>
        </div>

        {/* === Partners & Network === */}
        <div
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-100 uppercase mb-8 text-center">
            Our Network & Commitment
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto text-center mb-10">
            Ofashi works with modern frameworks, proven platforms, and local businesses to deliver high-performance web solutions across Nigeria and beyond.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition ">
              <h3 className="text-xl font-semibold mb-3 text-purple-100">
                Tools & Technology
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                We build with a modern, battle-tested stack: Next.js, FastAPI, Django, React, and Tailwind, ensuring every project is fast, secure, scalable, and future-ready.
              </p>
            </div>

            <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition ">
              <h3 className="text-xl font-semibold mb-3 text-purple-100">
                Client Success
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                From startups to enterprises, we design and develop websites and web applications that drive measurable growth, engagement, and real ROI.
              </p>
            </div>

            <div className="border border-gray-800 lg:border-gray-700 rounded-3xl p-8 bg-[#0a0a0a] hover:bg-gray-900 transition ">
              <h3 className="text-xl font-semibold mb-3 text-purple-100">
                Ongoing Support
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                We provide continuous maintenance, performance optimization, updates, and AI enhancements — keeping your digital presence competitive long after launch.
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-8 text-center max-w-3xl mx-auto">
            <em>
              Ready to build your custom web solution?{" "}
            </em>
            <Link
              href="/contact"
              className="text-purple-100 underline hover:text-purple-300 font-medium"
            >
              Contact Ofashi today
            </Link>
            .
          </p>
        </div>

        {/* === Vision Section === */}
        <div
          // initial={{ opacity: 0, y: 20 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-100 uppercase mb-6">
            Our Vision
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            To make world-class digital experiences accessible to every Nigerian business — powering growth through custom web development, e-commerce, and AI innovation.
          </p>
        </div>

        {/* === Call to Action === */}
        <div
          // initial={{ opacity: 0, scale: 0.9 }}
          // whileInView={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg mb-6">
            Explore our custom web development and AI solutions.
          </p>
          <Link
            href="/#pricing"
            className="bg-purple-500/80 text-white px-10 py-4 mb-4 md:mb-0 rounded-full font-bold uppercase tracking-widest hover:bg-purple-500 transition-all inline-block"
          >
            View Our Packages
          </Link>
          <Link
            href="/projects"
            className="ml-4 bg-transparent border-2 border-purple-500/80 text-purple-100 px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-purple-500/80 hover:text-white transition-all inline-block"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}