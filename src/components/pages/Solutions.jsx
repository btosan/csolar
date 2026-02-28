"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"
import TrustSection from "@/components/TrustSection"
import Faq from "@/components/Faq"
// talk to
const monitoringSolutions = [
  {
    title: "Real-Time Solar Health Monitoring",
    slug: "health-monitoring",
    image: "/assets/csolar/monitoring2.jpg",
    shortDesc:
      "Continuous performance tracking, energy production visualization, and system health status — accessible from phone, tablet or desktop.",
    cta: "Get Started",
  },
  {
    title: "Smart Alerts & Early Diagnostics",
    slug: "alerts",
    image: "/assets/csolar/diagnostics2.jpg",
    shortDesc:
      "Instant notifications for underperformance, faults, shading issues, inverter errors or battery problems — so issues are caught before they become costly.",
    cta: "Get Started",
  },
  {
    title: "Maintenance & Service Tracking",
    slug: "tracking",
    image: "/assets/csolar/maintenance.jpg",
    shortDesc:
      "Digital log of all service events, technician notes, warranty tracking, and automated reminders — never miss a recommended cleaning or inspection again.",
    cta: "Get Started",
  },
  {
    title: "Performance Insights & Optimization",
    slug: "insights",
    image: "/assets/csolar/performance.jpg",
    shortDesc:
      "Deep analytics, historical trends, weather-adjusted benchmarks, savings reports, and personalized recommendations to squeeze maximum value from your solar investment.",
    cta: "Get Started",
  },
]

export default function MonitoringSolutionsPage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-[70vh] lg:h-[85vh] flex items-center justify-center py-16 md:py-0">
        <Image
          src="/assets/csolar/monitoring2.jpg" 
          alt="Solar System Monitoring Solutions"
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
            <PreTitle text="Intelligent Monitoring" center />
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-6 tracking-wide">
              Our Solar System Solutions
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Real-time visibility, proactive alerts, smart diagnostics, and clear insights — 
              everything you need to keep your solar system performing at its best, every single day.
            </p>
            <div className="w-full mx-auto flex items-center justify-center">
              <Button href="/contact" text="Contact Us" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <PreTitle text="Our Monitoring Solutions" center />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight">
              Four Powerful Ways to Stay in Control
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-6">
            {monitoringSolutions.map((solution, i) => (
              <motion.div
                key={solution.slug}
                variants={fadeIn("up", 0.1 * i)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="group bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 lg:h-64">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 lg:p-8 flex flex-col grow">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 leading-tight">
                    {solution.title}
                  </h3>
                  <p className="text-gray-700 mb-6 grow text-base leading-relaxed">
                    {solution.shortDesc}
                  </p>

                  <Button href="/dashboard" text={solution.cta} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <div>
        <TrustSection />
        <Faq />
      </div>

      {/* FINAL CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto text-center max-w-4xl px-4">
          <PreTitle text="Ready to Monitor Smarter?" center white />
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 tracking-tight">
            Take Full Control of Your Solar Performance
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Get real-time visibility, instant alerts, detailed analytics, and peace of mind — 
            all tailored to your exact system and usage patterns.
          </p>
          <div className="w-full mx-auto flex items-center justify-center">
            <Button href="/contact" text="Contact Us" />
          </div>
        </div>
      </section>

    </main>
  )
}