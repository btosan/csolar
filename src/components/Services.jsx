
"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "./ui/tabs"
import {
  PiWallFill,
  PiPaintRollerFill,
  PiWrenchFill,
  PiUserGearFill,
} from "react-icons/pi"
import { MonitorDot, Lightbulb, SolarPanel, BaggageClaim } from "lucide-react"
import Image from "next/image"
import PreTitle from "./PreTitle"
import Button from "./Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

// Swiper for swipe functionality 
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

const serviceData = [
  {
    name: "monitoring",
    icon: <MonitorDot className="lg:h-9! lg:w-9! w-6 h-6" />,
    title: "System Monitoring & Health Management",
    description:
      "We track system performance and health to detect issues early, reduce downtime, and guide timely maintenance decisions.",
    serviceList: [
      "Solar System Health Tracking",
      "Battery & Inverter Condition Monitoring",
      "Performance Benchmarking",
      "Early Issue Detection",
      "Service & Maintenance Alerts",
      "Health-Based Recommendations",
    ],
    thumbs: [
      { url: "/assets/products/monitoring2.jpg" },
      { url: "/assets/img/services/thumb-4.jpg" },
    ],
    buttonLink: "/solutions",
    buttonText: "Solutions",
  },

  {
    name: "sales",
    icon: <BaggageClaim className="lg:h-9! lg:w-9! w-6 h-6" />,
    title: "Sales of Solar Equipment",
    description:
      "We supply carefully selected solar equipment that balances performance, compatibility, and long-term durability.",
    serviceList: [
      "Solar Panels",
      "Batteries (Multiple Capacities)",
      "Solar & Hybrid Inverters",
      "Complete Solar System Packages",
      "Component Compatibility Guidance",
      "Upgrade & Replacement Equipment",
    ],
    thumbs: [
      { url: "/assets/inverters/inverter.jpg" },
      { url: "/assets/products/srne.webp" },
    ],
    buttonLink: "/products",
    buttonText: "Products",
  },

  {
    name: "installation",
    icon: <SolarPanel className="lg:h-9! lg:w-9! w-6 h-6" />,
    title: "Solar & Inverter Installation",
    description:
      "We design and install solar and inverter systems tailored to real energy needs, ensuring safety, efficiency, and long-term reliability from day one.",
    serviceList: [
      "Residential Solar Installations",
      "Commercial Solar Systems",
      "Mini-Grid, Off-Grid & Hybrid Systems",
      "Smart & Future-proof Solar Streetlights",
      "Inverter System Design & Setup",
      "Solar Boreholes",
      "Commissioning & Handover",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-1a.jpg" },
      { url: "/assets/img/services/streetlight1.jpg" },
    ],
    buttonLink: "/services/installation",
    buttonText: "Installation",
  },

  {
    name: "maintenance",
    icon: <PiWrenchFill className="lg:h-9! lg:w-9! w-6 h-6" />,
    title: "Maintenance & After-Sales Support",
    description:
      "We keep solar systems running efficiently through preventive care, timely repairs, and dependable after-sales support.",
    serviceList: [
      "Preventive Maintenance",
      "On-Demand Repairs & Support",
      "Annual Maintenance Contracts (AMC)",
      "Performance Inspections",
      "Fault Diagnosis & Resolution",
      "Service History & Reporting",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-3.jpg" },
      { url: "/assets/img/services/thumb-4.jpg" },
    ],
    buttonLink: "/services/maintenance",
    buttonText: "Maintenance",
  },

  {
    name: "consulting",
    icon: <Lightbulb className="lg:h-9! lg:w-9! w-6 h-6" />,
    title: "Consulting Services",
    description:
      "We provide clear, brand-agnostic guidance to help customers make informed decisions about their solar systems.",
    serviceList: [
      "Energy Usage Assessment",
      "System Evaluation & Audits",
      "Upgrade & Expansion Planning",
      "Brand & Component Advisory",
      "Performance Optimization Advice",
      "Long-Term Solar Planning",
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-6.jpg" },
      { url: "/assets/img/services/thumb-1.jpg" },
    ],
    buttonLink: "/contact",
    buttonText: "Contact Us",
  },
]

const Services = () => {
  const [activeTab, setActiveTab] = useState("monitoring")
  const swiperRef = useRef(null)

  // Sync active tab with swipe
  useEffect(() => {
    if (!swiperRef.current) return
    swiperRef.current.slideTo(
      serviceData.findIndex((item) => item.name === activeTab)
    )
  }, [activeTab])

  return (
    <section id="services" className="py-16 md:py-24 xl:py-32 ">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          className="text-center max-w-135 mx-auto lg:mb-20 md:mb-16 mb-12"
        >
          <PreTitle text="Our Services" center />
          <h2 className="h2 mb-1">Solutions We Provide</h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-3">
            We install your system, supply the parts, maintain it, and continuously monitor its health.
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col xl:flex-row lg:gap-7.5 gap-0 md:gap-5"
        >
          {/* MOBILE / MD TABS */}
          <TabsList
            className="
              flex xl:hidden
              flex-nowrap
              gap-2 w-full
              overflow-x-auto
              no-scrollbar
              py-4 h-16
              bg-transparent
              justify-start md:justify-center
            "
          >
            {serviceData.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="
                  shrink-0
                  h-9
                  md:h-11
                  px-4
                  rounded-full
                  shadow
                  whitespace-nowrap
                  data-[state=active]:bg-primary
                  data-[state=active]:text-white
                  data-[state=inactive]:bg-accent
                  data-[state=inactive]:text-primary
                "
              >
                {item.icon}
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* LG+ — ORIGINAL UNCHANGED SIDEBAR */}
          <TabsList
            className="
              hidden xl:grid
              grid-cols-1
              gap-7.5
              h-full
              w-86.25!
              rounded-none
              p-0 
              bg-transparent
            "
          >
            {serviceData.map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.name}
                className="
                  w-full
                  rounded-none
                  h-20
                  flex
                  items-center
                  relative
                  shadow
                  p-0 hover:cursor-pointer
                  outline-none
                "
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center absolute left-0 ${
                    activeTab === item.name
                      ? "bg-primary text-white"
                      : "bg-accent text-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="uppercase font-primary text-base font-semibold tracking-[.6px] w-25 ml-16">
                  {item.name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* CONTENT — FULL, WITH SWIPE ON MOBILE */}
          <div className="flex-1 bg-white shadow h-auto p-7.5">
            {/* Swiper for mobile/MD */}
            <div className="xl:hidden">
              <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => {
                    const tab = serviceData[swiper.activeIndex].name
                    setActiveTab(tab)
                  }}
                  slidesPerView={1}
                  spaceBetween={20}
                >

                {serviceData.map((item) => (
                  <SwiperSlide key={item.name}>
                    <div className="flex flex-col md:flex-row gap-5.5">
                      <div className="flex md:flex-col md:gap-5 gap-2.5">
                        {item.thumbs.map((thumb, i) => (
                          <div
                            key={i}
                            className="relative w-35 h-35 xl:w-50 xl:h-50"
                          >
                            <Image
                              src={thumb.url}
                              fill
                              alt="services and solutions"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <h3 className="md:h3 h4 mb-3 md:mb-6">{item.title}</h3>
                        <p className="mb-3 md:mb-10">{item.description}</p>

                        <ul className="grid grid-cols-2 gap-4 mb-12">
                          {item.serviceList.map((service, i) => (
                            <li key={i} className="flex items-center gap-4">
                              <div className="w-1.5 h-1.5 bg-accent" />
                              <span className="capitalize text-sm md:text-base font-medium text-primary">
                                {service}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <Button href={item.buttonLink} text={item.buttonText} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* XL+ tabs content unchanged */}
            <div className="hidden xl:block">
              {serviceData.map((item) => (
                <TabsContent key={item.name} value={item.name} className="m-0">
                  <motion.div className="flex flex-col md:flex-row gap-7.5">
                    <div className="flex md:flex-col gap-5">
                      {item.thumbs.map((thumb, i) => (
                        <div
                          key={i}
                          className="relative w-35 h-35 xl:w-50 xl:h-50"
                        >
                          <Image
                            src={thumb.url}
                            fill
                            alt="services and solutions"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="h3 mb-6">{item.title}</h3>
                      <p className="mb-10">{item.description}</p>

                      <ul className="grid grid-cols-2 gap-4 mb-12">
                        {item.serviceList.map((service, i) => (
                          <li key={i} className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-accent" />
                            <span className="capitalize font-medium text-primary">
                              {service}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button href={item.buttonLink} text={item.buttonText} />
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export default Services
