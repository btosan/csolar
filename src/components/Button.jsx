"use client"
import { RiArrowRightUpLine } from "react-icons/ri"
import Link from 'next/link'

const Button = ({text, href}) => {
    return (
        <Link href={href} className="w-52.5 md:w-60 lg:w-64 xl:w-72 h-auto  py-1.25 md:py-2 lg:py-2.5 xl:py-3 pl-2.5 pr-1.25 flex items-center justify-between min-w-50 group bg-accent">
            <div className="flex-1 text-center tracking-[1.2px] font-primary font-bold text-primary 
            text-sm md:text-base lg:text-lg xl:text-xl  uppercase">{text}</div>
            <div className="w-11 h-11 bg-primary flex items-center justify-center">
                <RiArrowRightUpLine className="text-white text-xl group-hover:rotate-45 transition-all duration-200" />
            </div>
        </Link>
    )
}

export default Button