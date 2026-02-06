'use client'

import { BydModel } from '@/types'
import { Button } from './button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface ModelCardProps {
  model: BydModel
  isOpen?: boolean
}

export function ModelCard({ model, isOpen = true }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      style={{ height: '90vh' }}
    >
      <div className="relative flex w-full max-w-7xl gap-8 px-4">
        <div className="flex flex-1 flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-white">{model.name}</h2>
          <p className="text-xl text-gray-300">{model.description}</p>
          <div className="flex space-x-4">
            <Link href={`/models/${model.slug}`}>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
            <Link href={`/order/${model.slug}`}>
              <Button variant="default" size="lg">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </motion.div>
  )
}