"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useState } from "react"
import Link from "next/link"

import { RiMenu3Fill } from "react-icons/ri"
import { MdClose } from "react-icons/md"

import Logo from "./Logo"
import Socials from "./Socials"

const links = [
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
]

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Hamburger */}
      <SheetTrigger className="text-white text-3xl">
        <RiMenu3Fill />
      </SheetTrigger>

      {/* LEFT drawer */}
      <SheetContent
        side="left"
        className="bg-primary border-none text-white w-[280px] [&>button]:hidden"
      >

        <div className="flex flex-col h-full pt-6 pb-8">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between mb-10">
            <SheetTitle>
              <Logo />
            </SheetTitle>

            <SheetClose asChild>
              <button className="text-white text-2xl hover:rotate-90 transition-transform">
                <MdClose />
              </button>
            </SheetClose>
          </SheetHeader>

          {/* Navigation */}
          <ul className="flex flex-col gap-8 text-center flex-1 justify-center">
            {links.map((link, index) => (
              <li
                key={index}
                className="uppercase font-primary font-medium tracking-[1.2px]"
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Contact – primary action */}
            <li className="pt-6">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-white text-primary px-8 py-4 uppercase font-primary font-bold tracking-[1.2px]"
              >
                Contact Us
              </Link>
            </li>

            {/* Login – secondary */}
            <li className="pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase font-primary tracking-[1.2px] text-white/70 hover:text-white transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>

          {/* Socials */}
          <div className="mt-auto">
            <Socials containerStyles="text-white text-xl flex gap-6 justify-center" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NavMobile
