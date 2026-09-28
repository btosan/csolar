"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

type GalleryImage = {
  src: string
  alt: string
}

type EnergyCabinetGalleryProps = {
  images?: GalleryImage[]
}

export default function EnergyCabinetGallery({
  images = [],
}: EnergyCabinetGalleryProps) {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  if (!images.length) return null

  return (
    <div className="w-full min-w-0">
      {/* Fixed height keeps the layout steady between images.
          object-contain shows each image in full, never cropped. */}
      <div className="relative w-full aspect-4/3 lg:aspect-auto lg:h-136">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-4 flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1 lg:justify-center"
        role="group"
        aria-label="Product images"
      >
        {images.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1} of ${images.length}`}
            aria-pressed={index === active}
            className={`relative shrink-0 w-16 h-16 md:w-24 md:h-24 overflow-hidden bg-gray-100 border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              index === active
                ? "border-accent opacity-100"
                : "border-gray-200 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}