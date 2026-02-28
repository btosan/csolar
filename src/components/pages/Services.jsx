"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"
import TrustSection from "@/components/TrustSection";
import Faq from "@/components/Faq";

const services = [
  {
    title: "Solar Installation",
    slug: "installation",
    image: "/assets/services/thumb-1a.jpg",
    shortDesc:
      "Custom-designed grid-tied, off-grid & hybrid solar systems installed with precision and long-term reliability in mind.",
    cta: "Get a Quote",
  },
  {
    title: "Maintenance & Repairs",
    slug: "maintenance",
    image: "/assets/csolar/solar-repair1.jpg",
    shortDesc:
      "Proactive care, performance checks, fast fault diagnosis and emergency repairs to maximize uptime and lifespan.",
    cta: "Schedule Service",
  },
  {
    title: "Consulting & Energy Planning",
    slug: "consulting",          
    image: "/assets/services/thumb-6.jpg",
    shortDesc:
      "Independent energy audits, smart system sizing, upgrade roadmaps and brand-agnostic recommendations.",
    cta: "Start Planning",
  },
  {
    title: "System Assessment & Upgrades",
    slug: "upgrades",
    image: "/assets/csolar/solar-audits.jpg",
    shortDesc:
      "Detailed evaluation of existing systems + targeted upgrades to boost efficiency, capacity and future-readiness.",
    cta: "Book Assessment",
  },
]

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-[70vh] lg:h-[85vh] flex items-center justify-center py-16 md:py-0">
        <Image
          src="/assets/csolar/solar-installation.jpg"   // ← temporary - replace with your intended hero image
          alt="Contained Solar Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/65" />

        <div className="container mx-auto relative text-white text-center px-4">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto"
          >
            <PreTitle text="Our Services" center />
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-6 tracking-wide">
              Comprehensive Solar Solutions
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              From first consultation to lifetime performance, we deliver reliable solar systems, 
              expert planning, professional installation, and ongoing care tailored to your real energy needs.
            </p>
            <div className="w-full mx-auto flex items-center justify-center">
              <Button href="/contact" text="Talk to an Expert" />
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <PreTitle text="What We Offer" center />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight">
              Four Ways We Support Your Solar Journey
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                variants={fadeIn("up", 0.1 * i)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="group bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 lg:h-64">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 lg:p-8 flex flex-col grow">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6 grow text-base leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <Button
                    href={`/services/${service.slug}`}
                    text={service.cta}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <TrustSection />
        <Faq />
      </div>

      {/* FINAL CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto text-center max-w-4xl px-4">
          <PreTitle text="Ready to Begin?" center white />
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 tracking-tight">
            Let’s Power Your Future with Solar Done Right
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Whether you're starting from scratch, optimizing what you have, or planning your next big step — 
            we're here with practical, lifetime-focused solar expertise.
          </p>
            <div className="w-full mx-auto flex items-center justify-center">
              <Button href="/contact" text="Get in Touch" />
            </div>
        </div>
      </section>

    </main>
  )
}