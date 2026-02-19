"use client"

import Image from "next/image"
import PreTitle from "@/components/PreTitle"
import Button from "@/components/Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"
import Link from "next/link"

const categories = [
  {
    title: "Solar Panels",
    description: "High-efficiency panels built for durability, performance in harsh conditions, and maximum energy yield.",
    products: [
      {
        name: "Contained Solar Mono 550W",
        description: "High-output monocrystalline panel with excellent low-light performance.",
        specs: "550W | 22.5% efficiency | 25-year warranty",
        image: "/assets/panels/solarpanel-550w.jpg",
        href: "/products/solar-panels/mono-550w",
      },
      {
        name: "Contained Solar All-Black 450W",
        description: "Sleek all-black design for residential rooftops with premium aesthetics.",
        specs: "450W | 22.8% efficiency | 30-year warranty",
        image: "/assets/panels/solarpanel-black.jpg",
        href: "/products/solar-panels/all-black-450w",
      },
      {
        name: "Contained Solar Bifacial 600W",
        description: "Dual-sided panel capturing reflected light for up to 30% more yield.",
        specs: "600W | 23% efficiency | Anti-PID technology",
        image: "/assets/panels/solarpanel-bifacial.jpg",
        href: "/products/solar-panels/bifacial-600w",
      },
      {
        name: "Contained Solar Compact 410W",
        description: "Space-efficient panel ideal for smaller roofs or commercial facades.",
        specs: "410W | 21.8% efficiency | Lightweight design",
        image: "/assets/panels/solarpanel-compact.jpg",
        href: "/products/solar-panels/compact-410w",
      },
      {
        name: "Contained Solar High-Snow 470W",
        description: "Reinforced frame for heavy snow/wind loads in challenging climates.",
        specs: "470W | 22.3% efficiency | 5400Pa snow load",
        image: "/assets/panels/solarpanel-highsnow.jpg",
        href: "/products/solar-panels/high-snow-470w",
      },
      {
        name: "Contained Solar Commercial 700W",
        description: "Large-format panel for utility-scale and commercial installations.",
        specs: "700W | 22.7% efficiency | 30-year performance warranty",
        image: "/assets/panels/solarpanel-commercial.jpg",
        href: "/products/solar-panels/commercial-700w",
      },
    ],
  },
  {
    title: "Inverters",
    description: "Stable, efficient energy conversion for grid-tied, hybrid, and off-grid systems with smart monitoring.",
    products: [
      {
        name: "Contained Hybrid 5kW Inverter",
        description: "All-in-one hybrid inverter with battery integration and backup power.",
        specs: "5kW | MPPT charge controller | WiFi monitoring",
        image: "/assets/inverters/inverter-hybrid-5kw.jpg",
        href: "/products/inverters/hybrid-5kw",
      },
      {
        name: "Contained Grid-Tie 8kW String Inverter",
        description: "High-efficiency string inverter for larger residential/commercial arrays.",
        specs: "8kW | 98.5% efficiency | Dual MPPT",
        image: "/assets/inverters/inverter-string-8kw.jpg",
        href: "/products/inverters/grid-tie-8kw",
      },
      {
        name: "Contained Microinverter 400W",
        description: "Panel-level microinverter for optimized performance and easy expansion.",
        specs: "400W per unit | 25-year warranty | Rapid shutdown",
        image: "/assets/inverters/microinverter-400w.jpg",
        href: "/products/inverters/microinverter-400w",
      },
      {
        name: "Contained Off-Grid 6kW Inverter",
        description: "Pure sine wave off-grid inverter with powerful surge capacity.",
        specs: "6kW | Built-in charger | 48V DC input",
        image: "/assets/inverters/inverter-offgrid-6kw.jpg",
        href: "/products/inverters/off-grid-6kw",
      },
      {
        name: "Contained Smart Hybrid 12kW",
        description: "Scalable hybrid inverter for whole-home backup and energy management.",
        specs: "12kW | Seamless grid/backup switch | App control",
        image: "/assets/inverters/inverter-hybrid-12kw.jpg",
        href: "/products/inverters/smart-hybrid-12kw",
      },
      {
        name: "Contained Commercial Inverter 20kW",
        description: "Three-phase inverter for medium to large commercial solar systems.",
        specs: "20kW | 98.8% efficiency | Multiple MPPT trackers",
        image: "/assets/inverters/inverter-commercial-20kw.jpg",
        href: "/products/inverters/commercial-20kw",
      },
    ],
  },
  {
    title: "Batteries & Storage",
    description: "Reliable deep-cycle storage solutions for backup power, off-grid living, and peak shaving.",
    products: [
      {
        name: "Contained LiFePO4 5kWh Battery",
        description: "Compact lithium iron phosphate battery with long cycle life.",
        specs: "5kWh | 6000+ cycles | Built-in BMS",
        image: "/assets/batteries/battery-lifepo4-5kwh.jpg",
        href: "/products/batteries/lifepo4-5kwh",
      },
      {
        name: "Contained Deep Cycle Gel 200Ah",
        description: "Maintenance-free sealed lead-acid battery for budget-conscious setups.",
        specs: "200Ah | 12V | 1500 cycles at 50% DoD",
        image: "/assets/batteries/batteries-gel-200ah.jpg",
        href: "/products/batteries/gel-200ah",
      },
      {
        name: "Contained Wall-Mount 10kWh Lithium",
        description: "Sleek wall-mounted lithium storage for home energy independence.",
        specs: "10kWh | 8000+ cycles | Scalable stacking",
        image: "/assets/batteries/battery-wallmount-10kwh.jpg",
        href: "/products/batteries/wall-mount-10kwh",
      },
      {
        name: "Contained AGM Deep Cycle 150Ah",
        description: "Absorbed glass mat battery for vibration-prone or mobile applications.",
        specs: "150Ah | 12V | Spill-proof design",
        image: "/assets/batteries/batteries-agm-150ah.jpg",
        href: "/products/batteries/agm-150ah",
      },
      {
        name: "Contained Rack-Mount 14.3kWh LiFePO4",
        description: "High-capacity rack battery for commercial or large residential storage.",
        specs: "14.3kWh | 48V | CAN/RS485 communication",
        image: "/assets/batteries/battery-rack-14kwh.jpg",
        href: "/products/batteries/rack-mount-14kwh",
      },
      {
        name: "Contained Portable Power Station 2kWh",
        description: "All-in-one portable lithium battery with inverter for emergency use.",
        specs: "2kWh | 2200W output | Solar input compatible",
        image: "/assets/batteries/portable-power-2kwh.jpg",
        href: "/products/batteries/portable-2kwh",
      },
    ],
  },
  {
    title: "Complete Solar Packages",
    description: "Ready-to-deploy integrated solar systems for residential, commercial, or off-grid needs.",
    products: [
      {
        name: "Contained Home 5kW Hybrid Package",
        description: "Complete hybrid system with panels, inverter, and battery backup.",
        specs: "5kW solar | 10kWh storage | Grid + backup",
        image: "/assets/csolar/package-hybrid-home.jpg",
        href: "/products/packages/home-5kw-hybrid",
      },
      {
        name: "Contained Off-Grid 3kW Essentials Kit",
        description: "Basic off-grid package for cabins or remote locations.",
        specs: "3kW solar | 5kWh battery | Off-grid inverter",
        image: "/assets/csolar/package-offgrid-3kw.jpg",
        href: "/products/packages/off-grid-3kw",
      },
      {
        name: "Contained Commercial 20kW Grid-Tie Package",
        description: "Scalable grid-tied system for businesses reducing energy bills.",
        specs: "20kW solar | String inverters | Monitoring included",
        image: "/assets/csolar/package-commercial-20kw.jpg",
        href: "/products/packages/commercial-20kw",
      },
      {
        name: "Contained Portable 1kW Solar Kit",
        description: "Portable foldable solar setup with battery for camping or emergencies.",
        specs: "1kW solar | 2kWh storage | Plug-and-play",
        image: "/assets/csolar/portable-solar-power.avif",
        href: "/products/packages/portable-1kw",
      },
      {
        name: "Contained Residential 10kW Hybrid Package",
        description: "Whole-home hybrid system with large storage and smart controls.",
        specs: "10kW solar | 20kWh storage | App monitoring",
        image: "/assets/csolar/package-hybrid-10kw.jpg",
        href: "/products/packages/residential-10kw",
      },
      {
        name: "Contained Streetlight Solar Package",
        description: "Integrated solar streetlight kit with pole, panel, and battery.",
        specs: "400W solar | LED light | Autonomous operation",
        image: "/assets/csolar/package-streetlight.jpg",
        href: "/products/packages/streetlight",
      },
    ],
  },
]

export default function ProductsPage() {
  return (
    <main className="overflow-hidden bg-white">

      {/* HERO */}
      <section className="relative md:h-[70vh] flex items-center justify-center py-16 md:py-0">
        <Image
          src="/assets/csolar/solar-products-hero.jpg"
          alt="Solar products overview"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />

        <div className="container  relative text-white flex flex-col items-center justify-center mx-auto text-center max-w-3xl w-full">
            
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
          >
            <PreTitle text="Our Products" center />
            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold uppercase mb-6">
              Complete Solar Solutions for Every Need
            </h1>
            <p className="mb-10 text-xl max-w-3xl mx-auto">
              From high-efficiency panels to full hybrid systems — explore reliable, performance-driven solar products tailored for residential, commercial, and off-grid applications.
            </p>
            <Button href="/contact" text="Get Expert Advice" />
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES / PRODUCT SECTIONS */}
      {categories.map((category, catIndex) => (
        <section 
          key={catIndex} 
          className={`py-20 ${catIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="container mx-auto">
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              className="text-center mb-12"
            >
              <PreTitle text={category.title} center />
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
                {category.title}
              </h2>
              <p className="text-lg max-w-3xl mx-auto">
                {category.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map((product, prodIndex) => (
                <motion.div
                  key={prodIndex}
                  variants={fadeIn("up", 0.1 * prodIndex)}
                  initial="hidden"
                  whileInView="show"
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-sm text-accent font-medium mb-6">{product.specs}</p>
                    <Link href={product.href}>
                     
                      <button>View Details</button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button href="/contact" text={`Explore ${category.title}`} />
            </div>
          </div>
        </section>
      ))}

      {/* FINAL CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container  max-w-3xl text-center flex flex-col items-center justify-center mx-auto w-full">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
          >
            <PreTitle text="Ready to Power Up?" center white />
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">
              Find the Perfect Solar Solution Today
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto">
              Our team will help you select the right products and design a system that matches your energy needs and budget.
            </p>
            <Button href="/contact" text="Request a Quote" variant="secondary" />
          </motion.div>
        </div>
      </section>

    </main>
  )
}