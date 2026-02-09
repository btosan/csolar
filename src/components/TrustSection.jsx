// TrustSection.jsx
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
    gradient: "from-accent/5 via-accent/10 to-accent/30",
    delay: 0.1,
  },
  {
    icon: <RiToolsLine />,
    title: "Support Beyond Installation",
    description:
      "We don’t stop at installation. We monitor system health, handle maintenance, and support upgrades as your needs grow.",
    gradient: "from-accent/5 via-gray-100/20 to-violet-600/10",
    delay: 0.2,
  },
  {
    icon: <RiBattery2ChargeLine />,
    title: "Quality Components, Properly Deployed",
    description:
      "We work with trusted panels, inverters, and batteries to ensure efficiency, safety, and long-term reliability.",
    gradient: "from-accent/5 via-accent/10 to-red-500/10",
    delay: 0.3,
  },
  {
    icon: <RiLineChartLine />,
    title: "Early Detection, Fewer Failures",
    description:
      "Our monitoring approach helps identify performance drops and service needs before they become major issues.",
    gradient: "from-accent/5 via-accent/10 to-pink-500/10",
    delay: 0.4,
  },
]

const TrustSection = () => {
  return (
    <section className="py-24 relative bg-linear-to-b from-muted/30 to-muted/10 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Optional subtle background pattern or noise (like your FeatureSection) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0,100,80,0.8) 1px, transparent 0),
              radial-gradient(circle at 40px 40px, rgba(0,100,80,0.6) 1px, transparent 0)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.h2
            variants={fadeIn("up", 0.3)}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5"
          >
            Built for Long-Term Performance
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto"
          >
            Contained Solar delivers power systems you can rely on — today, tomorrow, and years from now.
          </motion.p>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent/60 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: item.delay, ease: "easeOut" }}
              className="
                group relative
                bg-white/10 
                backdrop-blur-xl
                border border-white/20
                rounded-2xl
                overflow-hidden
                shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:scale-[1.02]
                p-8 text-center
              "
            >
              {/* Hover Gradient Overlay */}
              <div
                className={`
                  absolute inset-0 bg-linear-to-br ${item.gradient}
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-700 ease-out
                `}
              />

              {/* Glass overlay (extra depth) */}
              <div className="absolute inset-0 bg-linear-to-br from-white/15 to-transparent dark:from-white/5 pointer-events-none" />

              {/* Icon */}
              <div
                className="
                  mx-auto mb-6 flex h-20 w-20 items-center justify-center
                  rounded-2xl bg-accent/5 
                  backdrop-blur-md border border-accent/5
                  text-gray-950 text-5xl
                  shadow-inner group-hover:scale-110 group-hover:shadow-lg
                  transition-all duration-500
                "
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  text-2xl font-semibold text-gray-900 dark:text-white mb-4
                  group-hover:text-black transition-colors duration-400
                "
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                {item.description}
              </p>

              {/* Subtle underline accent on hover */}
              <div
                className="
                  mx-auto mt-8 h-1 w-16 rounded-full bg-accent/60
                  opacity-0 group-hover:opacity-100 group-hover:w-24
                  transition-all duration-500 ease-out
                "
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, 5px) rotate(-5deg); }
          75% { transform: translate(5px, 10px) rotate(5deg); }
        }
      `}</style>
    </section>
  )
}

export default TrustSection