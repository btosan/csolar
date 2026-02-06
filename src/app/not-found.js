import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='lg:pt-40 pt-36 lg:px-36 md:px-28 px-12 flex flex-col items-center justify-center'>
       <h1 className='text-4xl md:text-5xl py-4 my-4'>Page Not Found</h1>
       <h2 className='underline underline-offset-8 pb-8'>
        <Link href='/'>
          Return to homepage
        </Link>
       </h2>
    </div>
  )

}

