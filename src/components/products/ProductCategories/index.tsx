import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import ProductCategoryCard from "./ProductCategoryCard";

const ProductCategory = () => {
  return (
    <div className="px-0">
      <section
        className={cn(
          "container w-full mx-auto bg-white",
          "px-0 sm:px-4 lg:px-2 py-0 md:py-1 lg:py-2",
          "md:rounded-3xl lg:rounded-4xl",
          "shadow-md"
        )}
      >
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={cn(
            integralCF.className,
            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
            "font-bold tracking-tight mb-10 md:mb-12 lg:mb-16",
            "text-center text-gray-900 bg-white"
          )}
        >
          Browse by Category
        </motion.h2>

        {/* First row */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8 mb-5 md:mb-8"
        >
          <ProductCategoryCard
            title="Inverters"
            url="/products/inverters"
            className="aspect-4/3 md:aspect-auto md:h-80 lg:h-95 bg-[url('/assets/inverters/hybrid-inverter.jpeg')] bg-cover bg-center"
          />

          <ProductCategoryCard
            title="Storage System"
            url="/products/batteries"
            className="aspect-4/3 md:aspect-auto md:h-80 lg:h-95 bg-[url('/assets/batteries/storage.png')] bg-cover bg-center"
          />
        </motion.div>

        {/* Second row */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8"
        >
          <ProductCategoryCard
            title="Solar Panels"
            url="/products/solar-panels"
            className="aspect-4/3 md:aspect-auto md:h-80 lg:h-95 bg-[url('/assets/panels/solarpanels.jpg')] bg-cover bg-center"
          />

          <ProductCategoryCard
            title="Solar Accessories"
            url="/products/accessories"
            className="aspect-4/3 md:aspect-auto md:h-80 lg:h-95 bg-[url('/assets/accessories/accessories-solar.jpeg')] bg-cover bg-center"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default ProductCategory;