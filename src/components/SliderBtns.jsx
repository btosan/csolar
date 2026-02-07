"use client"
import { useSwiper } from "swiper/react"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"

const SliderBtns = () => {
    const swiper = useSwiper()
    return (
        <div className="absolute bottom-2 left-0 lg:left-auto lg:right-2 w-max flex gap-1 z-10 ">
            <button className="bg-accent text-primary text-[22px] w-10.5 h-10.5 flex justify-center items-center transition-all cursor-pointer" onClick={() => swiper.slidePrev()}><RiArrowLeftLine /></button>
            <button className="bg-accent text-primary text-[22px] w-10.5 h-10.5 flex justify-center items-center transition-all cursor-pointer" onClick={() => swiper.slideNext()}><RiArrowRightLine /></button>
        </div>
    )
}

export default SliderBtns