"use client";

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
import { useSession } from "next-auth/react"

import { RiMenu3Fill } from "react-icons/ri"
import { MdClose } from "react-icons/md"
import { CldImage } from 'next-cloudinary'
import { CircleUserIcon, X } from "lucide-react"   // ← added X icon import

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
  const [showProfilePanel, setShowProfilePanel] = useState(false)

  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const user = session?.user

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="text-white text-3xl">
        <RiMenu3Fill />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-primary border-none text-white w-72 px-6 [&>button]:hidden overflow-y-auto"
      >
        <div className="flex flex-col h-full pt-6 pb-8">
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

          <ul className="flex flex-col gap-6 flex-1">
            {links.map((link, index) => (
              <li key={index}>
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

            <li className="pt-6">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-white text-primary px-8 py-4 uppercase font-primary font-bold tracking-[1.2px]"
              >
                Contact Us
              </Link>
            </li>
{/* divide */}
            <li className="pt-2">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfilePanel(!showProfilePanel)}
                    className="flex items-center gap-3 w-full text-left hover:opacity-90 transition-opacity focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shadow-sm shrink-0">
                      {user.image ? (
                        <CldImage
                          src={user.image}
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="w-full h-full bg-white/20 flex items-center justify-center text-white text-base font-medium">
                          {user.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                    </div>
                    <span className="text-sm uppercase tracking-[1.2px] text-white/90">
                      {user.name || "Profile"}
                    </span>
                  </button>

                  {showProfilePanel && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setShowProfilePanel(false)}
                      />

                      <div className="
                        absolute left-6 right-6 bottom-10 z-50
                        bg-white rounded-lg shadow-2xl border border-gray-200
                        overflow-hidden
                      ">
                        {/* Close X button */}
                        <button
                          onClick={() => setShowProfilePanel(false)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition"
                        >
                          <X size={18} />
                        </button>

                        <div className="p-4 border-b border-gray-100">
                          <p className="font-medium text-gray-900 truncate">
                            {user.name || "User"}
                          </p>
                        </div>

                        {/* Divider line */}
                        <div className="border-t border-gray-200" />

                        <div className="py-1">
                          <Link
                            href={user.role === "ADMIN" ? "/admin/profile" : "/profile"}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                            onClick={() => {
                              setShowProfilePanel(false)
                              setIsOpen(false)
                            }}
                          >
                            Profile
                          </Link>

                          {user.role === "ADMIN" && (
                            <Link
                              href="/admin"
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                              onClick={() => {
                                setShowProfilePanel(false)
                                setIsOpen(false)
                              }}
                            >
                              Dashboard
                            </Link>
                          )}
                        </div>

                        <div className="absolute left-8 -top-2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-[1.2px] text-white hover:text-accent w-full flex mx-auto items-center gap-4 "
                >
                  <span>LOGIN</span>
                  <CircleUserIcon className="w-6 h-6"/>
                </Link>
              )}
            </li>
          </ul>

          <div className="mt-auto">
            <Socials containerStyles="text-white text-xl flex gap-6 justify-center" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NavMobile