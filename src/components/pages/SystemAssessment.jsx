"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const features = [
  "Existing solar system evaluation",
  "Performance benchmarking",
  "Battery & inverter health analysis",
  "Capacity expansion planning",
  "Component upgrade recommendations",
  "System optimization tuning",
  "Compatibility verification",
]

const process = [
  {
    title: "System Assessment",
    description:
      "We inspect your current solar setup, measuring performance, component condition, and overall system efficiency.",
  },
  {
    title: "Diagnostics & Planning",
    description:
      "We identify bottlenecks, aging components, and growth opportunities to design a smart upgrade path.",
  },
  {
    title: "Upgrade Implementation",
    description:
      "We install compatible upgrades and optimize configurations to improve output and reliability.",
  },
  {
    title: "Validation & Monitoring",
    description:
      "We verify performance gains and continue monitoring to ensure long-term stability.",
  },
]

export default function SystemAssessmentPage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-screen flex items-center justify-center py-16 md:py-0">
        <Image
          src="/assets/csolar/solar-audits.jpg"
          alt="Solar system assessment"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="container mx-auto relative text-white">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="max-w-2xl 2xl:max-w-3xl"
          >
            <PreTitle text="System Assessment & Upgrades" />
            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase mb-6 text-white">
              Optimize, Upgrade, and Future-Proof Your Solar System
            </h1>
            <p className="mb-8 text-lg">
              We evaluate existing solar systems to improve performance,
              extend lifespan, and prepare your setup for growing energy needs.
            </p>

            <Button href="/contact" text="Schedule Assessment" />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
          >
            <PreTitle text="What We Deliver" />
            <h2 className="h2 mb-6">
              Smart Upgrades for Better Performance
            </h2>

            <p className="mb-8">
              Solar systems evolve with your needs. Our assessment and upgrade
              services improve efficiency, reliability, and scalability —
              ensuring your system continues delivering optimal performance.
            </p>

            <ul className="space-y-4">
              {features.map((item, i) => (
                <li key={i} className="flex gap-4 items-center">
                  <div className="w-2 h-2 mt-2 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            className="relative h-114.5"
          >
            <Image
              src="/assets/csolar/solar-installation1.jpg"
              alt="Solar system inspection"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center mb-12">
          <PreTitle text="Our Process" center />
          <h2 className="h2">
            Structured Optimization from Evaluation to Upgrade
          </h2>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          {process.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.1 * i)}
              initial="hidden"
              whileInView="show"
              className="bg-white p-8 shadow rounded-lg"
            >
              <div className="text-black font-medium mb-3 px-4 py-1 bg-accent/80 rounded-md w-fit text-2xl">
                Step {i + 1}
              </div>
              <h3 className="h4 mb-3">{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <PreTitle text="Why Choose Contained Solar" />
            <h2 className="text-white text-2xl lg:text-3xl 2xl:text-4xl mb-6">
              Upgrade Decisions Backed by Lifecycle Expertise
            </h2>

            <p className="mb-6">
              We don’t push unnecessary replacements. Our upgrade philosophy
              focuses on compatibility, longevity, and measurable performance
              gains — protecting your investment while preparing for growth.
            </p>

            <Button href="/contact" text="Talk to an Expert" />
          </div>

          <div className="relative h-100">
            <Image
              src="/assets/csolar/solar-project.jpeg"
              alt="Solar technician assessment"
              fill
              className="object-cover rounded-lg"
            />
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Ready to Optimize?" center />
          <h2 className="h3 mb-6">
            Let’s Improve Your Solar System Performance
          </h2>

          <p className="mb-8">
            Whether expanding capacity or improving efficiency, we help your
            solar system perform better today and adapt for tomorrow.
          </p>

          <Button href="/contact" text="Contact Us" />
        </div>
      </section>

    </main>
  )
}
