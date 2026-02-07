"use client"

import Link from "next/link"
import { RiArrowUpLine } from "react-icons/ri"
import Logo from "./Logo"
import NavMobile from "./NavMobile"

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
]


const Header = () => {
  return (
    <header className="bg-primary py-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Logo />
            <span className="ml-2 mr-1 font-medium text-white xl:text-3xl text-xl md:text-2xl ">CONTAINED</span>
            <span className="text-accent xl:text-3xl md:text-2xl text-xl tracking-wide font-bold">SOLAR</span>
          </div>
          {/* Logo */}
          

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-10">
            {/* Main Nav */}
            <ul className="flex">
              {navLinks.map((link, i) => (
                <li
                  key={i}
                  className="text-white text-sm uppercase font-primary font-medium 
                  tracking-[1.2px] after:content-['/'] after:mx-4 last:after:content-none after:text-accent"
                >
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact CTA */}
            <Link href="/contact">
              <button
                className="w-50 h-13.5 py-1.25 px-2.5 flex items-center 
                justify-between bg-white group hover:cursor-pointer"
              >
                <div className="flex-1 text-center tracking-[1.2px] font-primary font-bold text-primary text-sm uppercase ">
                  Contact Us
                </div>
                <div className="w-11 h-11 bg-primary flex items-center justify-center">
                  <RiArrowUpLine className="text-white text-xl group-hover:rotate-45 transition-all duration-200" />
                </div>
              </button>
            </Link>

            {/* Login (secondary) */}
            <Link
              href="/login"
              className="text-sm text-white/70 uppercase font-primary tracking-[1.2px] hover:text-white transition-colors"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="xl:hidden">
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
