"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"
import SliderBtns from "./SliderBtns"

const Slider = () => {
    return (
        <Swiper className="bg-white shadow w-full max-w-157.5 h-50">
            <SwiperSlide>
                <div className="py-16 md:pl-15 flex items-center gap-9 h-full">
                    <div className="relative xl:flex w-22 h-22">
                        <Image src='/assets/img/testimonials/avatar.jpg' fill className="object-contain" alt="" />
                    </div>
                    <div className="flex-1 xl:max-w-85 flex flex-col gap-2">
                        <p>
                            Contained Solar handled everything from installation to after-sales support. Our system has been stable, and their maintenance follow-up gives us peace of mind.
                        </p>
                        <p className="font-primary font-semibold text-primary">
                            Adewale O. – Lagos
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="py-16 md:pl-15 flex items-center gap-9 h-full">
                    <div className="relative xl:flex w-22 h-22">
                        <Image src='/assets/img/testimonials/avatar.jpg' fill className="object-contain" alt="" />
                    </div>
                    <div className="flex-1 xl:max-w-85 flex flex-col gap-2">
                        <p>
                            What stood out was their honesty. They didn’t oversell. They recommended what actually fits our power needs and explained everything clearly.
                        </p>
                        <p className="font-primary font-semibold text-primary">
                            Ifunanya C. – Abuja
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="py-16 md:pl-15 flex items-center gap-9 h-full">
                    <div className="relative xl:flex w-22 h-22">
                        <Image src='/assets/img/testimonials/avatar.jpg' fill className="object-contain" alt="" />
                    </div>
                    <div className="flex-1 xl:max-w-85 flex flex-col gap-2">
                        <p>
                            We already had an inverter before meeting Contained Solar. They helped us assess it, fixed existing issues, and now monitor the system properly.
                        </p>
                        <p className="font-primary font-semibold text-primary">
                            Musa A. – Ilorin
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="py-16 md:pl-15 flex items-center gap-9 h-full">
                    <div className="relative xl:flex w-22 h-22">
                        <Image src='/assets/img/testimonials/avatar.jpg' fill className="object-contain" alt="" />
                    </div>
                    <div className="flex-1 xl:max-w-85 flex flex-col gap-2">
                        <p>
                            Since installation, we’ve had fewer power interruptions and better battery performance. Their maintenance reminders are very helpful.
                        </p>
                        <p className="font-primary font-semibold text-primary">
                            Blessing E. – Port Harcourt
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="py-16 md:pl-15 flex items-center gap-9 h-full">
                    <div className="relative xl:flex w-22 h-22">
                        <Image src='/assets/img/testimonials/avatar.jpg' fill className="object-contain" alt="" />
                    </div>
                    <div className="flex-1 xl:max-w-85 flex flex-col gap-2">
                        <p>
                            They treat solar like a long-term system, not a one-time job. Anytime we have questions or need service, they respond quickly.
                        </p>
                        <p className="font-primary font-semibold text-primary">
                            Tunde S. – Ibadan
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            <SliderBtns />
        </Swiper>
    )
}

export default Slider
