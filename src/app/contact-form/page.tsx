import GoogleEnquiryForm from '@/components/GoogleEnquiryForm'
import React, { Suspense } from 'react'

function ContactFormPage() {
  return (
    <div className='pb-16 pt-8 px-5 md:px-0 bg-gray-900'>
      <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading form...</div>}>
        <GoogleEnquiryForm />
      </Suspense>
    </div>
  )
}

export default ContactFormPage