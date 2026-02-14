"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const features = [
  "Preventive system maintenance",
  "Battery & inverter health checks",
  "Fault diagnosis & repair",
  "Performance inspections",
  "Emergency service response",
  "Maintenance reporting & history tracking",
]

const process = [
  {
    title: "System Evaluation",
    description:
      "We assess your solar system’s current condition, performance metrics, and component health.",
  },
  {
    title: "Preventive Care",
    description:
      "We perform scheduled maintenance to prevent failures and extend equipment lifespan.",
  },
  {
    title: "Repair & Optimization",
    description:
      "If issues are detected, we resolve them quickly while optimizing system performance.",
  },
  {
    title: "Ongoing Monitoring",
    description:
      "Your system continues under observation to detect early signs of wear or inefficiency.",
  },
]

export default function MaintenancePage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-[70vh] flex items-center py-12">
        <Image
          src="/assets/csolar/solar-repair1.jpg"
          alt="Solar maintenance and repair"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="container mx-auto relative text-white">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="max-w-2xl xl:max-w-3xl"
          >
            <PreTitle text="Maintenance & Repairs" />
            <h1 className="h2 uppercase mb-6 text-white">
              Keep Your Solar System Reliable, Safe, and Performing
            </h1>
            <p className="mb-8 text-lg">
              Preventive care and rapid repairs ensure your solar investment
              continues delivering stable power without unexpected downtime.
            </p>

            <Button href="/contact" text="Schedule Service" />
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
              Proactive Care That Prevents Costly Failures
            </h2>

            <p className="mb-8">
              Solar systems are long-term assets that require regular care.
              Our maintenance approach focuses on early detection,
              performance optimization, and fast repairs to keep everything
              running smoothly.
            </p>

            <ul className="space-y-4">
              {features.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
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
            className="relative h-112.5"
          >
            <Image
              src="/assets/csolar/inverter-project.jpeg"
              alt="Technician servicing solar system"
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
            Structured Maintenance for Long-Term Reliability
          </h2>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.1 * i)}
              initial="hidden"
              whileInView="show"
              className="bg-white p-8 shadow rounded-lg"
            >
              <div className="text-gray-500 font-bold mb-3">
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
            <h2 className="h2 mb-6">
              Maintenance Designed Around Lifecycle Ownership
            </h2>

            <p className="mb-6">
              We treat maintenance as an essential part of solar ownership —
              not an afterthought. Our proactive approach minimizes downtime,
              extends system lifespan, and protects your investment.
            </p>

            <Button href="/contact" text="Book Maintenance" />
          </div>

          <div className="relative h-100">
            <Image
              src="/assets/csolar/solar-project3.jpeg"
              alt="Solar repair team"
              fill
              className="object-cover rounded-lg"
            />
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white ">
        <div className="container  max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Need Service?" center />
          <h2 className="h3 mb-6">
            Protect Your Solar Investment Today
          </h2>

          <p className="mb-8">
            Regular maintenance and fast repairs ensure your system keeps
            delivering dependable power for years to come.
          </p>

          <Button href="/contact" text="Contact Us" />
        </div>
      </section>

    </main>
  )
}
