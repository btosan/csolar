"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", form)
    alert("Message sent! (connect backend later)")
  }

  const scrollToContact = () => {
    const section = document.getElementById("contact-info")
    if (section) {
        section.scrollIntoView({ behavior: "smooth" })
    }
}


  return (
    <main className="overflow-hidden bg-primary">

      {/* HERO */}
      <section className="relative md:h-screen flex items-center justify-center py-16 md:py-0">
        <Image
          src="/assets/people/solar-group2.jpg"
          alt="Contact Contained Solar"
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
            <PreTitle text="Contact Us" />
            <h1 className="text-3xl lg:text-5xl text-white font-bold mb-6">
              Let’s Power Your Solar Journey
            </h1>

            <p className="mb-8 text-lg">
                Reach out today and let our engineers design the right solar solution for your home or business.
            </p>

            <button
                onClick={scrollToContact}
                className="hover:underline hover:underline-offset-8 hover:opacity-80 text-accent text-center mx-auto flex items-center justify-center hover:cursor-pointer"
            >
                <ChevronDoubleDownIcon className="h-6 w-6 animate-bounce" />
            </button>


          </motion.div>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section id="contact-info" className="py-20 bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16">

          {/* CONTACT INFO */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
          >
            <PreTitle text="Reach Us" />
            <h2 className="h2 mb-6">We’re Ready to Help</h2>

            <div className="space-y-6 text-lg">

              <div>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+2348033319391"
                  className="text-gray-950 hover:underline hover:underline-offset-8"
                >
                  +234 803 331 9391
                </a>
              </div>

              <div>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/2348033319391"
                  target="_blank"
                  className="text-gray-950 hover:underline hover:underline-offset-8"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <strong>Address:</strong>
                <p className="mt-2">
                  No 91/93 Aina Street,<br />
                  Ojodu Berger,<br />
                  Lagos, Nigeria
                </p>
              </div>

              <a
                href="https://www.google.com/maps?q=No+91/93+Aina+Street,+Ojodu+Berger,+Lagos"
                target="_blank"
                className="inline-block mt-4 text-gray-950 underline underline-offset-8 hover:opacity-80"
              >
                Open in Google Maps →
              </a>

            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            className="bg-gray-50 p-8 rounded-lg shadow"
          >
            <PreTitle text="Send a Message" />
            <h3 className="h4 mb-6">We’ll respond shortly</h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="phone"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <textarea
                name="message"
                placeholder="How can we help?"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <Button href="/contact" text="Send Message" />

            </form>
          </motion.div>

        </div>
      </section>

      {/* GOOGLE MAP */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <PreTitle text="Our Location" center />

          <div className="w-full h-112.5 rounded-lg overflow-hidden shadow mt-8">
            <iframe
              src="https://www.google.com/maps?q=No+91/93+Aina+Street,+Ojodu+Berger,+Lagos&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center ">
        <div className="container  max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Ready to Start?" center />
          <h2 className="h3 mb-6">
            Let’s Build Reliable Solar Together
          </h2>

          <p className="mb-8">
            Whether you’re installing, upgrading, or maintaining a solar
            system — our team is ready to support you.
          </p>

          <Button href="/projects" text="See Our Projects" />
        </div>
      </section>

    </main>
  )
}
