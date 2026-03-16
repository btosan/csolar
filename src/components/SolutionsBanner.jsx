"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"
import PreTitle from "@/components/PreTitle"
import Button from "./Button"

export default function SolutionsBanner() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/assets/csolar/monitoring2.jpg"
        alt="Solar Monitoring Solutions"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/80" />

      {/* Content */}
      <div className="container mx-auto relative px-4 text-white text-center">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <PreTitle text="Smart Solar Monitoring" center white />

          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tight mb-6">
            Monitor. Detect. Optimize.
          </h2>

          <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-10">
            Real-time system tracking, instant fault alerts, maintenance logs, 
            and performance insights — everything you need to keep your solar 
            system running at peak efficiency.
          </p>

          {/* CTA */}
          <div className="w-full mx-auto flex items-center justify-center">
            <Button href="/solutions" text="Solutions" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}