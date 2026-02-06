"use client";

import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-purple-50 mb-8">
            Ready to Launch Your<br />
            <span className="text-purple-100">Custom App?</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Launch with <span className="text-purple-50">FREE business email setup</span>, 
            <span className="text-purple-50"> automated contact forms</span>, and 
            <span className="text-purple-50"> instant WhatsApp lead notifications</span>.<br />
            Start getting real enquiries immediately — backed by a 7-day money-back guarantee.
          </p>


          <a
            href="https://wa.me/2349123631219"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center lg:px-12 px-6 md:px-10 lg:py-5 md:py-5 py-4 bg-linear-to-r from-blue-100 via-purple-100 to-purple-200 text-black hover:bg-linear-to-r hover:from-indigo-900 hover:via-indigo-700 hover:to-purple-600 transition-all duration-300 hover:text-white md:text-2xl text-xl lg:text-3xl font-bold rounded-full shadow-2xl"
          >
            Start My Website Now

          </a>

          <p className="mt-10 text-lg text-indigo-100/70">
            <a href="https://wa.me/2348038168949" className="underline hover:no-underline">
              Call or WhatsApp: +234 803 816 8949
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}