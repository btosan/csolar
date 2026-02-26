"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"
import SliderBtns from "./SliderBtns"
import { testimonials } from "@/lib/data/testimonialsData" 

const Slider = () => {
  return (
    <Swiper className="bg-white shadow w-full max-w-157.5 h-50">
      {testimonials.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="py-16 md:pl-15 flex items-center gap-9 h-full">
            <div className="relative xl:flex w-22 h-22">
              <Image
                src={item.picture} 
                fill
                className="object-contain"
                alt=""
              />
            </div>
            <div className="flex-1 xl:max-w-85 flex flex-col gap-2">
              <p>{item.comment}</p>
              <p className="font-primary font-semibold text-primary">
                {item.name} – {item.location}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <SliderBtns />
    </Swiper>
  )
}

export default Slider