"use client"
import Image from "next/image"
import PreTitle from "./PreTitle"
import Button from "./Button"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"


const About = () => {
  return (
    <div id="about" className="pt-16 xl:pt-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12 xl:gap-0 xl:flex-row xl:items-center">
          <div className="flex-1 ">
            <motion.div variants={fadeIn("right",0.2)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.2}} className="max-w-135">
              <PreTitle text="About us"  />
              <h2 className="h3 mb-6">Focused on Reliability Across Every Solar System</h2>
              <p className="mb-11">Our commitment goes beyond installation. Every system we design, sell, or maintain is approached with long-term performance in mind. From selecting the right components to monitoring system health and providing ongoing support, we take responsibility for making sure your solar system works reliably today and continues to perform as your needs evolve.</p>
              <div className="w-max flex flex-col text-right mb-10">
                <Image src="/assets/img/about/signature.svg" className="w-auto h-16" width={500} height={30} alt="" />
                <p>Company CEO</p>
              </div>
              <Button href="/about" text="Contact us" />
            </motion.div>
          </div>
          <motion.div variants={fadeIn("left",0.2)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.2}} className="flex-1 xl:flex xl:justify-center">
            <div className="xl:w-111 xl:h-123.25 relative">
              <div className="hidden xl:flex w-111 h-123.25 bg-accent absolute -top-4 -left-4 -z-10"></div>
              <Image src={"/assets/people/csolar-group2.jpg"} width={444} height={492} alt="" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About