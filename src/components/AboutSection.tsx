"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image - appears SECOND on mobile, FIRST on lg+ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full order-2 lg:order-1" 
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-100/10">
              <Image
                src="/assets/people/about-home.jpg"
                alt="About Ofashi"
                width={500}
                height={500}
                className="object-contain object-center " 
                priority
              />
            </div>
          </motion.div>

          {/* Content - appears FIRST on mobile, SECOND on lg+ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-left order-1 lg:order-2" 
          >
            <p className="text-sm uppercase tracking-widest text-purple-300 mb-3">
              Our Story
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
              10+ Years of App Development.
              <br />
              <span className="text-purple-100 font-bold">Now Leading with AI.</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Ofashi has been at the forefront of app development and digital
              innovation for over a decade. We started with custom website and
              web application development, mastered exceptional UI/UX design,
              and now we’re pioneering AI-powered solutions that transform how
              businesses operate online.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              Today, we bring together the best of AI, automation, and design to
              help startups and growing businesses build scalable web
              applications, streamline workflows, and deliver engaging digital
              experiences that drive real business impact.
            </p>

            <Link
              href="/about"
              className="w-full mx-auto py-4 px-0 hover:px-8 uppercase bg-linear-to-bl hover:from-purple-200 hover:via-purple-100 hover:to-purple-50 hover:text-black font-medium hover:cursor-pointer from-indigo-700/5 via-purple-800/5 to-purple-500/5 text-purple-200  transition-colors"
            >
              Learn more about us
              <span className="ml-2 text-2xl ">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}