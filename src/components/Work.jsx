"use client"
import { RiArrowRightUpLine, RiCheckboxCircleFill } from "react-icons/ri"
import PreTitle from "./PreTitle"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeIn } from "@/variants"

const workData = [
  {
    img: "/assets/img/work/restoration.jpg",
    name: "restoration",
    description: "Your short description",
    href: ""
  },
  {
    img: "/assets/img/work/construction.jpg",
    name: "construction",
    description: "Your short description",
    href: ""
  },
  {
    img: "/assets/img/work/renovation.jpg",
    name: "renovation",
    description: "Your short description",
    href: ""
  },
  {
    img: "/assets/img/work/consulting.jpg",
    name: "consulting",
    description: "Your short description",
    href: ""
  },
]



const Work = () => {
  return (
    <div id="projects" className="py-16 xl:32 ">
      <div className="container mx-auto">
        <motion.div 
         variants={fadeIn("up",0.2)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.2}} className="text-center max-w-135 mx-auto xl:mb-20">
          <PreTitle text="Our work" center />
          <h2 className="h2 mb-3">Discover Our projects</h2>
          <p className="mb-11 max-w-120 mx-auto ">Providing expert services designer to deliver quality and innovation in every project we undertake.</p>
        </motion.div>
      </div>
      <motion.div  variants={fadeIn("up",0.1)} initial='hidden' whileInView="show" viewport={{once:false,amount:0.1}} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {workData.map((item, i) => (
          <div className="w-full h-123 flex-1 relative overflow-hidden group flex justify-center"
            key={i}>
            <Image src={item.img} fill className="object-cover" alt='' quality={100} />
            <div className="w-[90%] h-21 bg-primary absolute bottom-4 flex justify-between items-center text-white md:translate-y-27 md:group-hover:translate-y-0 transition-all duration-500">
              <div className="pl-8">
                <h4 className="text-white font-primary font-semibold tracking-[1px] uppercase">{item.name}</h4>
                <div className="flex items-center gap-1">
                  <RiCheckboxCircleFill className="text-accent text-xl" />
                  <p>{item.description}</p>
                </div>
              </div>
              <Link href={item.href} className="w-11 xl:w-15 xl:h-15 bg-accent text-primary text-2xl flex justify-center items-center absolute right-3">
                <RiArrowRightUpLine />
              </Link>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Work