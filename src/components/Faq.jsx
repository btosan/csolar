"use client"

import { motion } from "framer-motion";
import FaqItem from "./FaqItem";
import PreTitle from "./PreTitle";
import { fadeIn } from "@/variants";

const Faq = () => {
  const faqItemsData = [
    {
      title: "Do you handle both new solar installations and existing systems?",
      descripton:
        "Yes. We install new solar and inverter systems, and we also support, monitor, and maintain systems installed by other providers.",
    },
    {
      title: "What types of solar systems do you install?",
      descripton:
        "We install grid-tied, off-grid, and hybrid solar systems for homes and businesses, based on your energy needs and usage patterns.",
    },
    {
      title: "Do you offer maintenance after installation?",
      descripton:
        "Absolutely. We provide preventive maintenance, on-demand repairs, and Annual Maintenance Contracts to ensure long-term system reliability.",
    },
    {
      title: "Can I monitor my solar or inverter system without IoT devices?",
      descripton:
        "Yes. Our monitoring approach works with or without full IoT integration, ensuring all customers can receive health checks and service recommendations.",
    },
    {
      title: "How do you know when my system needs service?",
      descripton:
        "We track system performance, battery health, and inverter status to detect early signs of issues and recommend service before failures occur.",
    },
    {
      title: "Do you sell solar panels, batteries, and inverters?",
      descripton:
        "Yes. We sell carefully selected solar panels, batteries, and inverters that are compatible, durable, and suitable for Nigerian conditions.",
    },
  ];

  const faqItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="pt-16 xl:pt-32 pb-8 lg:pb-24">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-135 mx-auto lg:mb-12"
        >
          <PreTitle text="Faq" center />
          <h2 className="h2 mb-2">Got Questions? We’ve Got You Covered</h2>
          <p className="mb-11 max-w-120 mx-auto">
            From installation and equipment selection to monitoring and long-term care,
            here are answers to the questions our customers ask most.
          </p>
        </motion.div>

        <ul className="w-full flex flex-col">
          {faqItemsData.map((item, index) => (
            <motion.li
              key={index}
              variants={faqItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.8 }}
              custom={index}
            >
              <FaqItem title={item.title} description={item.descripton} />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
