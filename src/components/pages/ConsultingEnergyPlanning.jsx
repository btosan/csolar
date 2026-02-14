"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const features = [
  "Energy usage assessment & analysis",
  "Solar system planning & sizing",
  "Upgrade & expansion strategy",
  "Component compatibility advisory",
  "Performance optimization guidance",
  "Brand-agnostic recommendations",
  "Long-term solar planning",
]

const process = [
  {
    title: "Energy Assessment",
    description:
      "We analyze your consumption patterns and goals to understand how your energy system should perform.",
  },
  {
    title: "System Planning",
    description:
      "We design a realistic roadmap — whether installing new solar, expanding capacity, or optimizing existing systems.",
  },
  {
    title: "Expert Advisory",
    description:
      "We provide clear, unbiased recommendations on equipment, compatibility, and upgrade paths.",
  },
  {
    title: "Implementation Guidance",
    description:
      "We support decision-making and execution planning to ensure smooth system evolution.",
  },
]

export default function ConsultingEnergyPlanningPage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-screen flex items-center justify-center">
        <Image
          src="/assets/csolar/solar-consulting.jpg"
          alt="Solar consulting session"
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
            <PreTitle text="Consulting & Energy Planning" />
            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase mb-6 text-white">
              Smarter Solar Decisions Start with Expert Planning
            </h1>
            <p className="mb-8 text-lg">
              We help you make confident, informed energy decisions —
              designing practical solar strategies that balance performance,
              budget, and long-term growth.
            </p>

            <Button href="/contact" text="Book Consultation" />
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
              Practical Guidance for Real-World Energy Planning
            </h2>

            <p className="mb-8">
              Solar investments should be strategic, not reactive. Our
              consulting services help you choose the right path — avoiding
              overspending, incompatibility issues, and performance risks.
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
              alt="Energy planning session"
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
            Structured Planning from Insight to Execution
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
              Advice Focused on Performance, Not Sales
            </h2>

            <p className="mb-6">
              Our consulting is brand-agnostic and grounded in real-world
              system experience. We guide you toward solutions that maximize
              efficiency, reliability, and long-term value.
            </p>

            <Button href="/contact" text="Speak with an Expert" />
          </div>

          <div className="relative h-100">
            <Image
              src="/assets/csolar/solar-project.jpeg"
              alt="Solar planning discussion"
              fill
              className="object-cover rounded-lg"
            />
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Ready to Plan?" center />
          <h2 className="h3 mb-6">
            Let’s Build a Smarter Solar Strategy
          </h2>

          <p className="mb-8">
            Whether starting fresh or improving an existing system,
            expert planning ensures your energy investment works for you.
          </p>

          <Button href="/contact" text="Contact Us" />
        </div>
      </section>

    </main>
  )
}
