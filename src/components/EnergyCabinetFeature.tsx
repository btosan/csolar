"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Zap, RefreshCw, TrendingDown } from "lucide-react"
import { fadeIn } from "@/variants"
import PreTitle from "@/components/PreTitle"
import Button from "./Button"

// TODO: confirm this route once the detail page exists   view details
const PRODUCT_HREF = "/products/175kwh-energy-storage-cabinet"

const gallery = [
  { src: "/assets/inverters/industrial.webp", alt: "Blue Carbon 175kWh energy storage cabinet, front view" },
  { src: "/assets/inverters/industrial2.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 2" },
  { src: "/assets/inverters/industrial3.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 3" },
  { src: "/assets/inverters/industrial4.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 4" },
  { src: "/assets/inverters/industrial5.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 5" },
  { src: "/assets/inverters/industrial12.png", alt: "Blue Carbon 175kWh energy storage cabinet, view 6" },
  { src: "/assets/inverters/industrial13.png", alt: "Blue Carbon 175kWh energy storage cabinet, view 7" },
]

// Figures come from Blue Carbon's 175kWh product page.
const stats = [
  { value: "175kWh", label: "Battery capacity" },
  { value: "6,600", label: "Cycles, up to" },
  { value: "Zero", label: "Transfer time on outage" },
  { value: "-30°C to 50°C", label: "Operating range" },
]

const modes = [
  {
    icon: Zap,
    title: "Off-Grid",
    text: "Stable, independent power for sites with no grid access.",
  },
  {
    icon: RefreshCw,
    title: "Hybrid",
    text: "Switches between grid and battery power for greater stability.",
  },
  {
    icon: TrendingDown,
    title: "Grid Peak Shaving & Valley Filling",
    text: "Charges when electricity is cheap and discharges at peak to cut demand costs.",
  },
]

export default function EnergyCabinetFeature() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="energy-cabinet"
      className="bg-primary text-white py-16 md:py-24 xl:py-32 overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-center"
        >
          {/* GALLERY */}
          <div className="w-full min-w-0">
            {/* Fixed height keeps the layout steady between images.
                object-contain shows each image in full, never cropped. */}
            <div className="relative w-full aspect-4/3 xl:aspect-auto xl:h-150">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <Image
                    src={gallery[active].src}
                    alt={gallery[active].alt}
                    fill
                    sizes="(min-width: 1280px) 50vw, 100vw"
                    className="object-contain"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="mt-4 flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1 xl:justify-center"
              role="group"
              aria-label="Product images"
            >
              {gallery.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1} of ${gallery.length}`}
                  aria-pressed={index === active}
                  className={`relative shrink-0 w-16 h-16 md:w-24 md:h-24 overflow-hidden border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    index === active
                      ? "border-accent opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="text-center xl:text-left flex flex-col items-center xl:items-start">
            <PreTitle text="Featured Product" white />

            <h2 className="h2 text-white mb-2">
              <span className="text-accent">175kWh</span> Commercial &amp;
              Industrial Energy Storage Cabinet
            </h2>
            <p className="text-white/70 mb-5"></p>

            <p className="mb-8 max-w-xl">
              All-in-one cabinet that powers communities and companies. It
              integrates the battery management system (BMS), energy management
              system (EMS) and energy storage converter (PCS), and charges from
              solar PV, the grid or a diesel generator.
            </p>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10 w-full max-w-xl text-left">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-accent pl-4">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl md:text-3xl font-semibold leading-tight">
                    {stat.value}
                  </dd>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </dl>

            <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4 mb-10 w-full max-w-xl text-left">
              {modes.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex md:flex-col xl:flex-row gap-4 bg-white/5 p-4"
                >
                  <Icon className="w-6 h-6 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-white/70">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button href={PRODUCT_HREF} text="View Full Details" />
              <Link
                href="/contact"
                className="font-primary font-semibold underline underline-offset-8 decoration-dotted hover:decoration-0"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}