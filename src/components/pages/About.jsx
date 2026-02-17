"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const capabilities = [
  "End-to-end solar lifecycle solutions",
  "Residential & commercial solar systems",
  "Monitoring, maintenance & preventive care",
  "Battery & inverter upgrades",
  "Brand-agnostic system support",
  "Performance optimization & diagnostics",
  "Nationwide solar deployment & service",
]

const principles = [
  {
    title: "Lifecycle Ownership",
    description:
      "We stay responsible for your system beyond installation — monitoring, maintaining, and improving performance throughout its lifespan.",
  },
  {
    title: "Practical Engineering",
    description:
      "Every solution is designed around real-world energy use — not theory — ensuring compatibility, safety, and long-term reliability.",
  },
  {
    title: "Preventive Care",
    description:
      "We prioritize early detection, scheduled maintenance, and proactive upgrades to prevent failures before they happen.",
  },
  {
    title: "Technology + Human Support",
    description:
      "Our digital platform enhances expert service — providing clarity, insights, and responsive on-ground support.",
  },
]

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false)

  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-screen flex items-center justify-center py-16 md:py-0">
        <Image
          src="/assets/people/about.jpg"
          alt="Contained Solar team"
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
            <PreTitle text="About Contained Solar" />
            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase mb-6 text-white">
              Solar Systems Built for Today — Maintained for Tomorrow
            </h1>
            <p className="mb-8 text-lg">
              Contained Solar delivers complete solar lifecycle solutions,
              from design and installation to monitoring, maintenance, and
              long-term performance care, helping homes and businesses
              across Nigeria enjoy dependable clean energy.
            </p>

            <Button href="/contact" text="Work With Us" />
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
          >
            <PreTitle text="Who We Are" />
            <h2 className="h2 mb-6">
              Engineering Reliable Solar Ownership
            </h2>

            <p className="mb-6">
              Contained Solar is a Nigerian renewable energy company focused
              on delivering dependable solar systems that continue performing
              long after installation. For over 26 years, we have treated
              solar as a living system — requiring intelligent design,
              proactive care, and continuous improvement — helping customers
              achieve long-term energy reliability instead of short-term fixes.
            </p>

            <motion.div
              initial={false}
              animate={{ height: showMore ? "auto" : 0, opacity: showMore ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden text-black"
            >
              <p className="mb-6">
                Our strength comes from a multidisciplinary team of experienced
                electrical and solar engineers, technicians, and field specialists
                who have successfully executed government, residential, and
                commercial-grade projects nationwide. This deep hands-on expertise
                ensures every system we deploy meets strict performance, safety,
                and durability standards.
              </p>

              <p className="mb-8">
                Guided by our vision to become the most trusted solar care
                company, we combine field expertise, digital monitoring,
                preventive maintenance, and intelligent upgrade planning to
                simplify solar ownership. Our mission is to deliver reliable,
                future-ready clean energy solutions that customers can depend
                on — ensuring every system remains efficient, protected, and
                prepared to grow with evolving energy needs.
              </p>
            </motion.div>

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-gray font-medium hover:underline hover:underline-offset-8 mb-8 hover:cursor-pointer"
            >
              {showMore ? "Show less" : "More about us ..."}
            </button>


            <ul className="space-y-4">
              {capabilities.map((item, i) => (
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
              src="/assets/people/csolar-group2.jpg"
              alt="Solar system overview"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>

        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            className="relative h-114.5"
          >
            <Image
              src="/assets/people/emi.png"
              alt="Founder"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
          >
            <PreTitle text="Leadership" />
            <h2 className="h2 mb-6">
              Experience Driving Sustainable Innovation
            </h2>

            <p className="mb-6">
              Led by Engineer Kingsley Ochonogor Emi, Contained Solar is guided
              by decades of electrical and renewable energy expertise. His
              work in large-scale solar deployment and sustainable energy
              strategy has helped shape reliable clean energy solutions across
              Nigeria.
            </p>

            <p>
              This engineering-first mindset ensures every project balances
              innovation, safety, and long-term performance.
            </p>
          </motion.div>

        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center mb-12">
          <PreTitle text="Our Approach" center />
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold uppercase">
            Principles Behind Every Solar System
          </h2>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          {principles.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.1 * i)}
              initial="hidden"
              whileInView="show"
              className="bg-gray-50 p-8 shadow rounded-lg"
            >
              <h3 className="h4 mb-3">{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISION */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <PreTitle text="Vision & Mission" />
            <h2 className="text-white text-2xl lg:text-3xl 2xl:text-4xl mb-6">
              Reliable Solar Care for a Sustainable Future
            </h2>

            <p className="mb-6">
              Our vision is to be the most trusted solar care company —
              ensuring every system we manage stays efficient, resilient,
              and future-ready.
            </p>

            <p className="mb-6">
              We simplify solar ownership through proactive maintenance,
              intelligent monitoring, and dependable support — delivering
              clean energy customers can rely on long term.
            </p>

            <Button href="/contact" text="Get In Touch" />
          </div>

          <div className="relative h-100">
            <Image
              src="/assets/people/solar-group2.jpg"
              alt="Solar professionals"
              fill
              className="object-cover rounded-lg"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center ">
        <div className="container  max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Let’s Work Together" center />
          <h2 className="h3 mb-6">
            Solar Systems That Grow With Your Needs
          </h2>

          <p className="mb-8">
            Whether installing new solar or improving an existing system,
            we provide lifecycle care that keeps your energy reliable,
            efficient, and future-ready.
          </p>

          <Button href="/contact" text="Contact Us" />
        </div>
      </section>

    </main>
  )
}
