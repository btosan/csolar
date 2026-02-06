import ContactSection from '@/components/Contact'
import React, { Suspense } from 'react'

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="bg-black text-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl text-purple-100">Loading contact form...</div>
        </div>
      </div>
    }>
      <ContactSection />
    </Suspense>
  )
}