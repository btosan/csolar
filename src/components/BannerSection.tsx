"use client";

import { motion } from "framer-motion";

export default function BannerSection() {
  const bullets = [
    { title: "100+", subtitle: "Projects Successfully Delivered" },
    { title: "Predictable", subtitle: "Timelines With No Surprises" },
    { title: "Reliable", subtitle: "Modern Technology Stack" },
    { title: "Trusted", subtitle: "Long-Term Client Support" },
  ];

  return (
    <section className="relative bg-linear-to-b from-black via-gray-950 to-black py-16 md:py-20 lg:py-24 lg:border-t-2 lg:border-b-4 border-b border-gray-700/40">
      <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}  
        >
          <h2 className="sr-only">Why Our Clients Choose Us</h2>
          {/* {backend}.test */}
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-10 place-items-center-safe">
            {bullets.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="mt-3 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />

                <div className="flex flex-col">
                  <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-purple-100 md:tracking-widest leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-300 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
