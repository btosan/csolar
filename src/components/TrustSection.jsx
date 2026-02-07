"use client"

import { fadeIn } from "@/variants"
import { motion } from "framer-motion"
import { RiShieldCheckLine, RiToolsLine, RiBattery2ChargeLine, RiLineChartLine } from "react-icons/ri"

const trustItems = [
  {
    icon: <RiShieldCheckLine />,
    title: "Proven Solar & Inverter Expertise",
    description:
      "Years of hands-on experience installing and maintaining residential and commercial power systems.",
  },
  {
    icon: <RiToolsLine />,
    title: "Support Beyond Installation",
    description:
      "We don’t stop at installation. We monitor system health, handle maintenance, and support upgrades as your needs grow.",
  },
  {
    icon: <RiBattery2ChargeLine />,
    title: "Quality Components, Properly Deployed",
    description:
      "We work with trusted panels, inverters, and batteries to ensure efficiency, safety, and long-term reliability.",
  },
  {
    icon: <RiLineChartLine />,
    title: "Early Detection, Fewer Failures",
    description:
      "Our monitoring approach helps identify performance drops and service needs before they become major issues.",
  },
]

const TrustSection = () => {
  return (
    <section className="py-24 bg-linear-to-b from-muted/40 to-muted/10">
      <motion.div variants={fadeIn("up", 0.2)} initial='hidden' whileInView="show" viewport={{ once: false, amount: 0.2 }} className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.h2 variants={fadeIn("up",0.2)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.8}} className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Built for Long-Term Performance
          </motion.h2>
          <motion.p variants={fadeIn("up",0.2)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.8}} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contained Solar delivers power systems you can rely on — today, tomorrow, and years from now.
          </motion.p>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent/70 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6 xl:gap-8">
          {trustItems.map((item, index) => (
            <motion.div variants={fadeIn("up",0.4)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.8}}
              key={index}
              className={`
                group relative
                bg-white
                border border-gray-200/70 hover:border-accent/40
                rounded-2xl overflow-hidden
                shadow-sm shadow-gray-400
                hover:shadow-gray-500
                transition-all duration-400 ease-out
                hover:-translate-y-1.5
                p-7 text-center
              `}
            >
              {/* Very subtle gradient overlay */}
              <div className="
                absolute inset-0 
                bg-linear-to-br hover:bg-linear-to-tl from-accent/30 via-accent/5 to-transparent 
                opacity-50 group-hover:opacity-60 
                transition-opacity duration-500 pointer-events-none
              " />

              {/* Icon */}
              <div className={`
                mx-auto mb-6 
                flex size-16 items-center justify-center 
                rounded-xl bg-accent/50 text-primary text-4xl
                shadow-sm group-hover:shadow-md group-hover:bg-accent/60
                transition-all duration-300 border
              `}>
                {item.icon}
              </div>

              <h3 className="
                text-xl font-semibold text-gray-900 mb-3
                group-hover:text-gray-800 transition-colors
              ">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-[15.5px]">
                {item.description}
              </p>

              {/* Small line under description on hover */}
              <div className="
                mx-auto mt-6 h-0.5 w-12 bg-accent/60 rounded-full
                opacity-0 group-hover:opacity-100 group-hover:w-20
                transition-all duration-400
              " />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default TrustSection