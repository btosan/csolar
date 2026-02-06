"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What does Ofashi do?",
    answer:
      "Ofashi is a custom web development and software agency. We build professional websites, scalable web applications, and AI-powered systems using modern technologies like React, Next.js, FastAPI, Django, and Node.js — not templates or drag-and-drop tools."
  },
  {
    question: "Do you use WordPress or website builders?",
    answer:
      "No. We do not build websites with WordPress, Wix, or drag-and-drop builders. Every project is fully custom-coded, which means better performance, stronger security, easier scaling, and no dependence on plugins or themes that can break over time."
  },
  {
    question: "Who is Ofashi best suited for?",
    answer:
      "We work with startups, businesses, and founders who need more than a basic website. If you need speed, scalability, integrations, dashboards, AI automation, or a system that grows with your business, Ofashi is built for you."
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our core stack includes React, Next.js, FastAPI, Django, Node.js, and modern databases. These technologies power high-performance platforms used by top startups and enterprises, allowing us to build fast, secure, and future-proof solutions."
  },
  {
    question: "Do you build AI-powered solutions?",
    answer:
      "Yes. We design and integrate AI solutions such as chatbots, workflow automation, smart content systems, data analysis tools, and custom AI features that improve efficiency and reduce operational costs."
  },
  {
    question: "How secure are your websites and applications?",
    answer:
      "Security is built in from day one. We avoid risky third-party plugins, follow best security practices, and build clean architectures that reduce vulnerabilities commonly found in CMS-based websites."
  },
  {
    question: "Can my website or app scale as my business grows?",
    answer:
      "Absolutely. Our solutions are built like real software, not static sites. Whether you’re launching an MVP or expanding into a full platform, your product is designed to scale without needing a rebuild."
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on the scope, but most projects are delivered in days or weeks — not months. We provide clear timelines, consistent communication, and predictable delivery from start to launch."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We provide long-term support, improvements, and system evolution. Ofashi works as a technical partner, not a one-time vendor, helping your product grow alongside your business."
  },
  {
    question: "How do I get started with Ofashi?",
    answer:
      "Simply contact us via WhatsApp or our website. We’ll discuss your goals, recommend the right solution, and outline a clear path to building a high-performance product tailored to your needs."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 lg:text-start text-center uppercase tracking-wide"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-gray-800 rounded-2xl overflow-hidden bg-[#0a0a0a] hover:border-gray-600 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg md:text-xl font-semibold tracking-wide">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-purple-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-5 text-gray-300 text-base md:text-lg leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.a
            href="https://wa.me/2349123631219"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-purple-600 text-white font-bold px-10 py-4 rounded-full text-lg uppercase tracking-widest hover:bg-purple-500 transition-all"
          >
            Start Your Project
          </motion.a>
        </div>
      </div>
    </section>
  );
}
