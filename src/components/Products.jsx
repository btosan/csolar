"use client"

import Link from "next/link"
import Image from "next/image"
import PreTitle from "./PreTitle"
import Button from "./Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const products = [
  {
    title: "Durable Solar Panels",
    description: "Built for long-term efficiency",
    image: "/assets/panels/solarpanel.jpg",
    href: "/products/solar-panels",
  },
  {
    title: "Advanced Inverters",
    description: "Stable hybrid energy control",
    image: "/assets/inverters/inverters1.jpg",
    href: "/products/inverters",
  },
  {
    title: "Battery Storage Systems",
    description: "Reliable backup power storage",
    image: "/assets/batteries/batteries-deep-cycle.jpg",
    href: "/products/batteries",
  },
  {
    title: "Complete Solar Packages",
    description: "Ready-to-deploy energy systems",
    image: "/assets/csolar/portable-solar-power.avif",
    href: "/products/packages",
  },
]

const ProductSection = () => {
  return (
    <section className="pt-16 xl:pt-32 bg-white">
      <div className="container mx-auto">

        {/* Section heading */}
        <div className="text-center max-w-135 mx-auto lg:mb-20 md:mb-16 mb-12">
          <PreTitle text="Our Products" center />
          <h2 className="h2 mb-1">Featured Products</h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-3">
             Engineered solar components built for performance and reliability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-16">

          {products.map((product, i) => (
            <div
              key={i}
              className="group flex flex-col gap-5 "
            >
              {/* Text block */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-2">
                  {product.title}
                </h3>

                <p className="text-sm lg:text-lg text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Image */}
              <Link
                href={product.href}
                className="relative h-72 overflow-hidden rounded-sm"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500 "
                />
              </Link>

              {/* CTA */}
              <Link
                href={product.href}
                className="inline-flex items-center gap-2 text-primary text-base md:text-lg xl:text-xl font-semibold hover:gap-3 transition-all"
              >
                View product
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default ProductSection
