"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

export default function SolutionPage({ data }) {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative md:h-screen flex items-center justify-center py-16 md:py-0">
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="container mx-auto relative text-white">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <PreTitle text={data.preTitle} />
            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold mb-6 text-gray-100">
              {data.heroTitle}
            </h1>
            <p className="mb-8 text-lg">{data.heroText}</p>

            <div className="flex gap-4 flex-wrap">
              <Button href="/contact" text="Talk to Us" />
              <Button href={data.liveLink} text="Live Monitoring" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
          >
            <PreTitle text="What This Does" />
            <h2 className="h2 mb-6">{data.sectionTitle}</h2>
            <p className="mb-8">{data.sectionText}</p>

            <ul className="space-y-4">
              {data.features.map((item, i) => (
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
              src={data.sideImage}
              alt="Solution visual"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center mb-12">
          <PreTitle text="How It Works" center />
          <h2 className="h2">{data.processTitle}</h2>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          {data.process.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.1 * i)}
              initial="hidden"
              whileInView="show"
              className="bg-white p-8 shadow rounded-lg"
            >
              <div className="px-4 py-1 bg-accent rounded-md w-fit mb-3 text-xl font-medium">
                Step {i + 1}
              </div>
              <h3 className="h4 mb-3">{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <PreTitle text="Try It Live" center />
          <h2 className="text-2xl lg:text-3xl mb-6">
            See Your Solar System in Action
          </h2>

          <p className="mb-8">
            Input your system details and get instant insights, alerts, and
            performance guidance.
          </p>

          <Button href={data.liveLink} text="Open Live Monitoring" />
        </div>
      </section>

    </main>
  )
}
