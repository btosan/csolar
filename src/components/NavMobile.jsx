"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

import { useState } from "react"
import Link from "next/link"

import { RiMenu3Fill } from "react-icons/ri"
import { MdClose } from "react-icons/md"

import Logo from "./Logo"
import Socials from "./Socials"

const links = [
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Solar & Inverter Installation", href: "/services/installation" },
      { name: "Maintenance & Repairs", href: "/services/maintenance" },
      { name: "System Assessment & Upgrades", href: "/services/upgrades" },
      { name: "Consulting & Energy Planning", href: "/services/consulting" },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions",
    submenu: [
      { name: "Solar Health Monitoring", href: "/solutions/health-monitoring" },
      { name: "Smart Alerts & Diagnostics", href: "/solutions/alerts" },
      { name: "Maintenance Tracking", href: "/solutions/tracking" },
      { name: "Performance Insights", href: "/solutions/insights" },
    ],
  },
  {
    name: "Products",
    href: "/products",
    submenu: [
      { name: "Solar Panels", href: "/products/solar-panels" },
      { name: "Inverters", href: "/products/inverters" },
      { name: "Batteries & Storage", href: "/products/batteries" },
      { name: "Complete Solar Packages", href: "/products/packages" },
    ],
  },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
]


const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Hamburger */}
      <SheetTrigger className="text-white text-3xl">
        <RiMenu3Fill />
      </SheetTrigger>

      {/* Drawer */}
      <SheetContent
        side="left"
        className="bg-primary border-none text-white w-72 px-6 [&>button]:hidden overflow-y-auto"
      >
        <div className="flex flex-col h-full pt-6 pb-8">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between mb-8">
            <SheetTitle>
              <Logo />
            </SheetTitle>

            <SheetClose asChild>
              <button className="text-white text-2xl hover:rotate-90 transition">
                <MdClose />
              </button>
            </SheetClose>
          </SheetHeader>

          {/* Navigation */}
          <ul className="flex flex-col gap-6 flex-1">
            {links.map((link, index) => (
              <li key={index}>
                {/* Parent link */}
                <div className="flex justify-between items-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="uppercase font-primary tracking-[1.2px] hover:text-accent"
                  >
                    {link.name}
                  </Link>

                  {link.submenu && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-xl"
                    >
                      {expanded === index ? "−" : "+"}
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {link.submenu && expanded === index && (
                  <ul className="mt-4 ml-4 flex flex-col gap-3 text-sm text-white/80">
                    {link.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="hover:text-accent transition"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {/* Contact */}
            <li className="pt-6">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-white text-primary px-8 py-4 uppercase font-primary font-bold tracking-[1.2px]"
              >
                Contact Us
              </Link>
            </li>

            {/* Login */}
            <li className="pt-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-[1.2px] text-white/70 hover:text-white"
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
