"use client"

import Link from "next/link"
import {
  BatteryCharging,
  Timer,
  Plug,
  TrendingDown,
  Layers,
  Cloud,
  Zap,
  RefreshCw,
  Factory,
  Building2,
  Users,
  Leaf,
} from "lucide-react"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import EnergyCabinetGallery from "./EnergyCabinetGallery"

const PRODUCT_NAME = "175kWh Commercial & Industrial Energy Storage Cabinet"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.containedsolar.com"
const PRODUCT_URL = `${SITE_URL}/products/175kwh-energy-storage-cabinet`

// Same WhatsApp number as the Contact page
const WHATSAPP_HREF = `https://wa.me/2348033319391?text=${encodeURIComponent(
  `Hello, I'd like a quote for the ${PRODUCT_NAME} by Blue Carbon. ${PRODUCT_URL}`
)}`

const gallery = [
  { src: "/assets/inverters/industrial.webp", alt: "Blue Carbon 175kWh energy storage cabinet, front view" },
  { src: "/assets/inverters/industrial2.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 2" },
  { src: "/assets/inverters/industrial3.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 3" },
  { src: "/assets/inverters/industrial4.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 4" },
  { src: "/assets/inverters/industrial5.webp", alt: "Blue Carbon 175kWh energy storage cabinet, view 5" },
  { src: "/assets/inverters/industrial12.png", alt: "Blue Carbon 175kWh energy storage cabinet, view 6" },
  { src: "/assets/inverters/industrial13.png", alt: "Blue Carbon 175kWh energy storage cabinet, view 7" },
]

const modePills = ["Off-grid", "Hybrid", "Peak shaving & valley filling"]

// Figures come from Blue Carbon's 175kWh product pages.
const stats = [
  { value: "175kWh", label: "Battery capacity" },
  { value: "6,600", label: "Cycles, up to" },
  { value: "Zero", label: "Transfer time on outage" },
  { value: "-30°C to 50°C", label: "Operating range" },
]

const features = [
  {
    icon: BatteryCharging,
    title: "Durable LiFePO₄ cells",
    text: "Automotive-grade LiFePO₄ cells deliver up to 6,600 cycles under standard conditions, with a stable discharge profile and high thermal stability.",
  },
  {
    icon: Timer,
    title: "Zero transfer time",
    text: "Switches seamlessly between grid and battery power, so operations continue without interruption during outages.",
  },
  {
    icon: Plug,
    title: "Flexible power inputs",
    text: "Charges from solar PV, the utility grid or a diesel generator, with seamless switching between grid-tied and off-grid modes.",
  },
  {
    icon: TrendingDown,
    title: "Peak shaving and tariff optimization",
    text: "Intelligent scheduling reduces peak demand charges and optimizes time-of-use tariffs.",
  },
  {
    icon: Layers,
    title: "Compact and expandable",
    text: "A 1332 x 1328 x 2142 mm footprint that needs no special foundation, with multi-unit parallel networking to add capacity as demand grows.",
  },
  {
    icon: Cloud,
    title: "Remote monitoring and easy maintenance",
    text: "Cloud monitoring gives real-time equipment status, fault early warning and remote management. The modular design allows one-click installation and disassembly.",
  },
]

const modes = [
  {
    icon: Zap,
    title: "Off-Grid",
    text: "Stable, independent power for areas without grid access. The cabinet is compatible with solar PV and diesel generator charging.",
  },
  {
    icon: RefreshCw,
    title: "Hybrid",
    text: "Switches seamlessly between grid and battery power for greater stability, with zero transfer time during outages.",
  },
  {
    icon: TrendingDown,
    title: "Grid Peak Shaving & Valley Filling",
    text: "Stores cheap off-peak electricity and supplies it during peak hours, reducing peak demand charges and optimizing time-of-use tariffs.",
  },
]

const applications = [
  {
    icon: Factory,
    title: "Factories and industrial parks",
    text: "Cut peak-hour electricity costs and keep production steady through grid faults and outages.",
  },
  {
    icon: Building2,
    title: "Hotels and commercial buildings",
    text: "A high discharge rate design suited to transformer-loaded equipment.",
  },
  {
    icon: Users,
    title: "Communities and microgrids",
    text: "Independent, stable power for communities, including areas without grid access.",
  },
  {
    icon: Leaf,
    title: "Farms",
    text: "Dependable backup and off-grid power for agricultural sites.",
  },
]

const specGroups = [
  {
    title: "DC side",
    rows: [
      { label: "Nominal capacity", value: "175kWh" },
      { label: "Nominal voltage", value: "716.8V" },
      { label: "Battery cells", value: "Automotive-grade LiFePO₄ (LFP)" },
    ],
  },
  {
    title: "AC side",
    rows: [
      { label: "Connection type", value: "Three-phase four-wire" },
      { label: "AC-side voltage range (daytime)", value: "230V/400V ±15%" },
      { label: "Charging sources", value: "Solar PV, utility grid, diesel generator" },
    ],
  },
  {
    title: "System",
    rows: [
      { label: "Integrated systems", value: "BMS, EMS and PCS" },
      { label: "Cycle life", value: "Up to 6,600 cycles under standard conditions" },
      { label: "Transfer time", value: "Zero" },
      { label: "IP rating", value: "IP55" },
      { label: "Operating temperature", value: "-30°C to 50°C" },
      { label: "Dimensions (W x D x H)", value: "1332 x 1328 x 2142 mm" },
      { label: "Installation", value: "No special foundation required" },
      { label: "Expansion", value: "Multi-unit parallel networking" },
    ],
  },
]

function SectionHeading({
  pretitle,
  title,
  text,
}: {
  pretitle: string
  title: string
  text?: string
}) {
  return (
    <div className="text-center max-w-135 mx-auto mb-12 lg:mb-16">
      <PreTitle text={pretitle} center />
      <h2 className="h2 mb-3">{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default function EnergyCabinetDetail() {
  return (
    <main className="overflow-hidden">
      {/* INTRO + GALLERY */}
      <section className="container mx-auto py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gray-900">
              175kWh Energy Storage Cabinet
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <EnergyCabinetGallery images={gallery} />

          <div>
            <PreTitle text="Blue Carbon" />
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {PRODUCT_NAME}
            </h1>

            <p className="text-gray-700 leading-relaxed mb-4 max-w-xl">
              One all-in-one cabinet that powers communities and companies. It
              integrates the battery management system (BMS), energy management
              system (EMS) and energy storage converter (PCS), and charges from
              solar PV, the grid or a diesel generator.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-xl">
              Run several cabinets in parallel to add capacity as your load
              grows.
            </p>

            <ul className="flex flex-wrap gap-3 mb-8">
              {modePills.map((pill) => (
                <li
                  key={pill}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {pill}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href={WHATSAPP_HREF} text="Request a Quote" />
              <Link
                href="/contact"
                className="font-primary font-semibold underline underline-offset-8 decoration-dotted hover:decoration-0"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FIGURES */}
      <section className="bg-primary text-white py-10 md:py-14">
        <dl className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse gap-1 border-l-2 border-accent pl-4"
            >
              <dt className="text-sm text-white/70">{stat.label}</dt>
              <dd className="text-2xl md:text-3xl font-semibold leading-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* KEY FEATURES */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <SectionHeading
            pretitle="Key Features"
            title="Built for demanding sites"
            text="Storage, power conversion and energy management in a single cabinet."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-gray-50 p-6 lg:p-8">
                <div className="w-12 h-12 flex items-center justify-center bg-accent text-primary mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="h4 mb-3">{title}</h3>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATING MODES */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto">
          <SectionHeading
            pretitle="Operating Modes"
            title="One cabinet, three ways to run it"
            text="Choose the mode that fits your site and grid conditions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modes.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white p-6 lg:p-8 shadow">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-white mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="h4 mb-3">{title}</h3>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <SectionHeading
            pretitle="Applications"
            title="Powering communities and companies"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {applications.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border p-6 lg:p-8">
                <Icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                <h3 className="h4 mb-3">{title}</h3>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            pretitle="Specifications"
            title="Technical specifications"
          />

          <div className="overflow-x-auto">
            <table className="w-full border bg-white text-left">
              <caption className="sr-only">
                Technical specifications of the {PRODUCT_NAME}
              </caption>
              {specGroups.map((group) => (
                <tbody key={group.title}>
                  <tr>
                    <th
                      colSpan={2}
                      scope="colgroup"
                      className="bg-primary text-white px-4 py-3 font-semibold"
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b last:border-none">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium bg-gray-50 w-1/2 md:w-1/3"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 py-3">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container max-w-3xl flex flex-col items-center justify-center mx-auto w-full">
          <PreTitle text="Get a Quote" center white />
          <h2 className="h3 mb-6 text-white">
            Tell us about your site and power needs
          </h2>
          <p className="mb-8">
            Message us on WhatsApp and our team will get back to you with a
            quote for the {PRODUCT_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button href={WHATSAPP_HREF} text="Request a Quote" />
            <Link
              href="/contact"
              className="font-primary font-semibold underline underline-offset-8 decoration-dotted hover:decoration-0"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}