"use client"
import { fadeIn } from "@/variants"
import Button from "./Button"


const Hero = () => {
  return (
    <section className="lg:h-[85vh] h-[80vh] bg-hero bg-no-repeat bg-cover bg-center relative">
      <div className="absolute inset-0 bg-linear-to-l from-black/0 via-black/50 to-black/70 z-10">
      </div>
        <div className="container mx-auto h-full flex items-center">
          <div className="z-20 text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-170">
            <h1  className="h1 text-white mb-4">
              <span className="text-accent">Reliable</span> Solar & Inverter Systems
            </h1>
            <p className="mb-9  text-base lg:text-lg">
              From solar panels and batteries to inverters and system monitoring, Contained Solar designs, installs, and maintains power solutions built for long-term performance.
            </p>
            <div className="">
             <Button className='' href="/solutions" text="Our Solutions" />
            </div>
          </div>
        </div>  
    </section>
  )
}

export default Hero