"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const features = [
  "Residential & commercial solar installations",
  "Grid-tied, off-grid & hybrid systems",
  "Load analysis & system sizing",
  "Battery & inverter configuration",
  "Safety-compliant installation",
  "Full commissioning & handover",
]

const process = [
  {
    title: "Assessment & Planning",
    description:
      "We evaluate your energy usage, environment, and long-term goals to design a system that truly fits your needs.",
  },
  {
    title: "Design & Component Selection",
    description:
      "We select compatible panels, batteries, and inverters focused on durability, performance, and scalability.",
  },
  {
    title: "Professional Installation",
    description:
      "Our technicians install with strict safety standards and precision workmanship.",
  },
  {
    title: "Commissioning & Support",
    description:
      "We test, calibrate, and onboard your system — ensuring you understand how everything works.",
  },
]

export default function SolarInstallationPage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center">
        <Image
          src="/assets/csolar/solar-installation.jpg"
          alt="Solar installation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="container mx-auto relative text-white">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <PreTitle text="Solar & Inverter Installation" />
            <h1 className="h1 mb-6 text-white">
              Reliable Solar Systems Designed for Real-World Energy Needs
            </h1>
            <p className="mb-8 text-lg">
              We design and install solar and inverter systems that deliver
              consistent performance, safety, and long-term reliability —
              tailored to how you actually use energy.
            </p>

            <Button href="/contact" text="Get Started" />
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
              Installation Built for Performance & Longevity
            </h2>

            <p className="mb-8">
              Every installation is engineered around your energy patterns —
              not guesswork. We prioritize compatibility, efficiency, and
              future scalability so your system keeps serving you as your
              needs evolve.
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
              src="/assets/csolar/solar-repair.jpg"
              alt="Solar system setup"
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
            Structured Installation From Start to Finish
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

      {/* WHY INSTALL WITH US */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <PreTitle text="Why Choose Contained Solar" />
            <h2 className="h2 mb-6">
              Installation Backed by Lifecycle Care
            </h2>

            <p className="mb-6">
              Our responsibility doesn’t end after installation. Your system
              enters a long-term care ecosystem — monitoring, maintenance,
              and upgrade support — ensuring peak performance for years.
            </p>

            <Button href="/contact" text="Contact Us" />
          </div>

          <div className="relative h-100">
            <Image
              src="/assets/csolar/solar-project.jpeg"
              alt="Installation team"
              fill
              className="object-cover rounded-lg"
            />
          </div>

        </div>
      </section>

      <section className="py-20 bg-white text-center">
       <div className="container  max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Ready to Install?" center />
          <h2 className="h3 mb-6">
            Let’s Build a Solar System That Works for You
          </h2>

          <p className="mb-8">
            Whether you’re installing new solar or upgrading an existing
            setup, we design solutions that deliver reliability, safety,
            and long-term performance.
          </p>

          <Button href="/contact" text="Contact Us" />
        </div>
      </section>

    </main>
  )
}
