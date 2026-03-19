"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/variants"
import PreTitle from "@/components/PreTitle"
import Button from "./Button"
import Link from "next/link"

const steps = [
  {
    number: "01",
    title: "Register Your Account",
    desc: "Create your account using your email and get instant access to your personalized solar monitoring dashboard.",
  },
  {
    number: "02",
    title: "Add Your Solar System",
    desc: "Go to your dashboard and register your solar setup to start tracking performance, health, and energy output.",
  },
  {
    number: "03",
    title: "Run Checks or Get Support",
    desc: "Run a self-check to detect issues instantly or request a qualified technician for deeper diagnostics and maintenance.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <PreTitle text="Simple Process" center />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeIn("up", 0.1 * i)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Step Number */}
              <div className="text-primary text-4xl font-bold mb-4">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="w-full mx-auto flex items-center justify-center pt-8 md:pt-12 lg:pt-16">
            <Button href="/register" text="Get Started" />
        </div>

      </div>
    </section>
  )
}