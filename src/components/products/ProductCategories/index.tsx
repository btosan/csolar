import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import ProductCategoryCard from "./ProductCategoryCard";

const ProductCategory = () => {
  return (
    <div className="px-0 ">
      <section className="container w-full mx-auto bg-accent px-6 pb-6 pt-10 md:p-17.5 md:rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[32px] leading-9 md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          BROWSE BY CATEGORY
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-72.25 space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          <ProductCategoryCard
            title="Inverters"
            url="/products/inverters"
            className="md:max-w-65 lg:max-w-90 xl:max-w-101.75 h-160 bg-[url('/assets/csolar/solar-inverter.jpeg')]"
          />
          <ProductCategoryCard
            title="Storage System"
            url="/products/batteries"
            className="md:max-w-171 h-47.5 bg-[url('/assets/batteries/storage.png')]"
          />
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-72.25 space-y-5 sm:space-y-0 sm:space-x-5"
        >
          <ProductCategoryCard
            title="Solar Panels"
            url="/products/solar-panels"
            className="md:max-w-171 h-47.5 bg-[url('/assets/panels/solarpanels.jpg')]"
          />
          <ProductCategoryCard
            title="Complete Packages"
            url="/products/packages"
            className="md:max-w-65 lg:max-w-90 xl:max-w-101.75 h-47.5 bg-[url('/assets/csolar/portable-solar-power.avif')]"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default ProductCategory;
