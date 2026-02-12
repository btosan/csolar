"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { RiArrowUpLine } from "react-icons/ri"
import Logo from "./Logo"
import NavMobile from "./NavMobile"

const navLinks = [
  {
    name: "Services",
    href: "/services",
    submenu: [
      {
        title: "Solar & Inverter Installation",
        description: "Professional installation tailored to your energy needs.",
        image: "/assets/csolar/solar-installation1.jpg",
        href: "/services/installation",
      },
      {
        title: "Maintenance & Repairs",
        description: "Preventive care and rapid repairs for reliable performance.",
        image: "/assets/csolar/solar-repair1.jpg",
        href: "/services/maintenance",
      },
      {
        title: "System Assessment & Upgrades",
        description: "Optimize and expand existing solar systems.",
        image: "/assets/csolar/solar-audits.jpg",
        href: "/services/upgrades",
      },
      {
        title: "Consulting & Energy Planning",
        description: "Expert guidance for smarter solar decisions.",
        image: "/assets/csolar/solar-consulting.jpg",
        href: "/services/consulting",
      },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions",
    submenu: [
      {
        title: "Solar Health Monitoring",
        description: "Real-time visibility into system performance and condition.",
        image: "/assets/csolar/monitoring2.jpg",
        href: "/solutions/health-monitoring",
      },
      {
        title: "Smart Alerts & Diagnostics",
        description: "Early issue detection to prevent downtime.",
        image: "/assets/csolar/diagnostics2.jpg",
        href: "/solutions/alerts",
      },
      {
        title: "Maintenance Tracking",
        description: "Service reminders and technician records in one place.",
        image: "/assets/csolar/maintenance.jpg",
        href: "/solutions/tracking",
      },
      {
        title: "Performance Insights",
        description: "Usage trends and optimization recommendations.",
        image: "/assets/csolar/performance.jpg",
        href: "/solutions/insights",
      },
    ],
  },
  {
    name: "Products",
    href: "/products",
    submenu: [
      {
        title: "Solar Panels",
        description: "High-efficiency panels built for durability.",
        image: "/assets/panels/solarpanel.jpg",
        href: "/products/solar-panels",
      },
      {
        title: "Inverters",
        description: "Stable energy conversion for hybrid and off-grid systems.",
        image: "/assets/inverters/inverters1.jpg",
        href: "/products/inverters",
      },
      {
        title: "Batteries & Storage",
        description: "Reliable backup power solutions.",
        image: "/assets/batteries/batteries-deep-cycle.jpg",
        href: "/products/batteries",
      },
      {
        title: "Complete Solar Packages",
        description: "Integrated solar systems ready for deployment.",
        image: "/assets/csolar/portable-solar-power.avif",
        href: "/products/packages",
      },
    ],
  },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
]



const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="bg-primary py-4 sticky top-0 z-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center hover:cursor-pointer">
            <Logo />
            <Link href="/">
              <span className="ml-2 mr-1 font-medium text-white xl:text-2xl text-xl">
                CONTAINED
              </span>
              <span className="text-accent xl:text-2xl text-xl font-bold">
                SOLAR
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            <ul className="flex items-center">
              {navLinks.map((link, i) => (
                <li
                  key={i}
                  className="relative group text-white text-sm uppercase font-primary font-medium tracking-[1.2px]
                  after:content-['/'] after:mx-4 last:after:content-none after:text-accent"
                >
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>

                  {/* Dropdown */}
                {link.submenu && (
                  <div
                    className={`fixed left-0 ${
                      isScrolled ? "top-20" : "top-28"
                    } w-screen h-[90vh] bg-gray-200
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 z-90`}
                  >

                    <div className="container mx-auto h-full py-6">
                      <div className="grid grid-cols-2 gap-10 h-full">
                        {link.submenu.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
                          >
                            {/* Image */}
                            <div className="2xl:h-64 lg:h-56 w-full overflow-hidden ">
                              <Image
                                src={sub.image}
                                alt={sub.title}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover group-hover:scale-105 hover:scale-75 transition duration-300"
                              />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-primary mb-2">
                                {sub.title}
                              </h3>
                              <p className="text-sm text-black">
                                {sub.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                </li>
              ))}
            </ul>

            {/* Contact CTA */}
            <Link href="/contact">
              <button
                className="w-48 h-13.5 py-1.25 px-2.5 flex items-center 
                justify-between bg-white group"
              >
                <div className="flex-1 text-center tracking-[1.2px] font-primary font-bold text-primary text-sm uppercase">
                  Contact Us
                </div>
                <div className="w-11 h-11 bg-primary flex items-center justify-center">
                  <RiArrowUpLine className="text-white text-xl group-hover:rotate-45 transition-all duration-200" />
                </div>
              </button>
            </Link>

            {/* Login */}
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
