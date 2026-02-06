"use client";

import { motion } from "framer-motion";

export default function DomainHostingNote() {
  return (
    <section className="relative bg-gray-950 py-16 md:py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-purple-100 mb-8">
            Domain & Hosting? We’ve Got You Covered
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            On the <span className="text-[#e0f4fa] font-semibold">Starter plan</span>, you get a professional <span className="text-[#e0f4fa] font-semibold">.com.ng domain</span> + <span className="text-[#e0f4fa] font-semibold">1 year of fast hosting</span> included — completely free.
          </p>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            For Growth, Pro, or Enterprise plans, we’ll send you a simple guide to register your domain (or handle it for you — just tell us the name you want).
          </p>

          <p className="mt-8 text-sm text-gray-400">
            Getting a .com.ng is easy and costs ~₦6,500/year via NIRA-approved registrars.
          </p>
        </motion.div>
      </div>
    </section>
  );
}