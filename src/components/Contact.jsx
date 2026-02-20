"use client"

import { RiChat1Line, RiMapPin2Line, RiSmartphoneLine } from "react-icons/ri"
import Socials from "./Socials"
import Form from "./Form"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const Contact = () => {
  const phoneNumber = "+2348033319391"
  const whatsappNumber = "+2348033319391"
  const emailAddress = "containedsolar@gmail.com"

  return (
    <div className='pt-16 xl:pt-32 ' id='contact'>
      <div className="container mx-auto "
      >
        <div className="w-full shadow xl:px-22.5 py-24 lg:py-32 border-t-4 border-accent">
          <div className="flex flex-col xl:flex-row h-full gap-10 xl:gap-22.5">
            
            {/* Contact Info */}
            <div className="w-full xl:max-w-95 xl:pr-17.5 xl:border-r xl:border-border/40 h-160" >
              <h4 className="text-[26px] font-primary font-bold mb-6">Contact Us</h4>
              <p className="mb-9">
                Reach out to our solar experts anytime. We're available 24/7 to discuss your project needs, provide estimates, and answer questions.
              </p>

              <div className="flex flex-col gap-10 mb-16">

                {/* Email */}
                <div className="flex items-start gap-5">
                  <a 
                    href={`mailto:${emailAddress}`} 
                    className="flex items-start gap-5 hover:cursor-pointer hover:text-accent transition-colors"
                  >
                    <span>
                      <RiChat1Line className="text-[28px] text-accent"/>
                    </span>
                    <span className="">
                      <h5 className="text-[22px] font-semibold font-primary leading-none">Email</h5>
                      <p className="mb-2 lg:mb-4">Our friendly team is here to help.</p>
                      <p className="font-medium text-primary">{emailAddress}</p>
                    </span>
                  </a>
                </div>

                {/* Office */}
                <div className="flex items-start gap-5">
                  <div>
                    <RiMapPin2Line className="text-[28px] text-accent"/>
                  </div>
                  <div className="">
                    <h5 className="text-[22px] font-semibold font-primary leading-none">Office</h5>
                    <p className="mb-2 lg:mb-4">Come and say hello at our office</p>
                    <p className="font-medium text-primary">No 91/93 Aina Street, Ojodu Berger, Lagos, Nigeria</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <a 
                    href={`tel:${phoneNumber}`} 
                    className="flex items-start gap-5 hover:cursor-pointer hover:text-accent transition-colors"
                  >
                    <span>
                      <RiSmartphoneLine className="text-[28px] text-accent"/>
                    </span>
                    <span className="">
                      <h5 className="text-[22px] font-semibold font-primary leading-none">Phone</h5>
                      <p className="mb-2 lg:mb-4">Mon-Fri from 8am to 6pm</p>
                      <p className="font-medium text-primary">{phoneNumber}</p>
                    </span>
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-5">
                  <a 
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-5 hover:cursor-pointer hover:text-accent transition-colors"
                  >
                    <span>
                      <RiChat1Line className="text-[28px] text-accent"/>
                    </span>
                    <span className="">
                      <h5 className="text-[22px] font-semibold font-primary leading-none">WhatsApp</h5>
                      <p className="mb-2 lg:mb-4">Chat with us directly on WhatsApp.</p>
                      <p className="font-medium text-primary">{whatsappNumber}</p>
                    </span>
                  </a>
                </div>

              </div>
            </div>

            {/* Request Quote Form */}
            <div className="flex-1 pt-12">
              <h2 className="h3 mb-3">Request A Quote</h2>
              <p className="mb-9">
                Discuss your solar needs with our experts. We'll provide tailored solutions,
                transparent timelines, and competitive pricing. Share your project details below,
                and we'll prepare a comprehensive quote within 24 hours.
              </p>
              <Form />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
