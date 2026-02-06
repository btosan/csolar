'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneCall, X } from 'lucide-react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

interface MobileNavProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  models: {
    id: string
    name: string
    slug: string
  }[]
}

export function MobileNav({ isOpen, setIsOpen, models }: MobileNavProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex w-full justify-end">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-full max-w-[90%]">
                  <div className="flex h-full flex-col overflow-hidden bg-gray-950">
                    <div className="flex h-20 items-center justify-between px-6 border-b border-gray-800">
                      <Link href="/" onClick={() => setIsOpen(false)}>
                        <Image
                          src="/logo/evlogo.png"
                          alt="BYD Logo"
                          width={0}
                          height={0}
                          className="md:h-32 h-24 w-auto"
                        />
                      </Link>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close Menu"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="relative mt-6 flex-1 px-6">
                      <div className="space-y-4">
                        {/* Models Section */}
                        <div className="border-b border-gray-800 pb-4">
                          <button
                            onClick={() => setActiveSubmenu(activeSubmenu === 'models' ? null : 'models')}
                            className="flex w-full items-center justify-between py-2 text-xl font-medium text-white hover:text-gray-300 transition-colors"
                          >
                            Vehicles
                            <span className={`transform transition-transform p-2 text-3xl leading-none ${activeSubmenu === 'models' ? 'rotate-45' : ''}`}>
                              +
                            </span>
                          </button>
                          <Transition
                            show={activeSubmenu === 'models'}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-1"
                          >
                            <div className="space-y-4 py-4 pl-4">
                              <Link
                                href="/models"
                                onClick={() => setIsOpen(false)}
                                className="block uppercase border-b border-t border-gray-800 py-4 text-xl font-medium text-white hover:text-gray-300 transition-colors"
                              >
                                EV Models
                              </Link>
                              {models.map((model) => (
                                <Link
                                  key={model.id}
                                  href={`/models/${model.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-lg text-gray-300 hover:text-white transition-colors"
                                >
                                  {model.name}
                                </Link>
                              ))}
                            </div>
                          </Transition>
                        </div>

                        {/* Global Link */}
                        <Link
                          href="/about"
                          onClick={() => setIsOpen(false)}
                          className="block border-b border-gray-800 py-4 text-xl font-medium text-white hover:text-gray-300 transition-colors"
                        >
                          About
                        </Link>

                        {/* Contact Link */}
                        <Link
                          href="/contact"
                          onClick={() => setIsOpen(false)}
                          className="block border-b border-gray-800 py-4 text-xl font-medium text-white hover:text-gray-300 transition-colors"
                        >
                          Contact
                        </Link>
                      </div>

                      {/* Contact Info */}
                      <div className="mt-8 space-y-4 text-gray-300">
                        <a href="tel:+2348063887516" className="flex items-center space-x-4 hover:text-white transition-colors">
                          <PhoneCall className='w-5 h-5'/>
                          <span className=''> +2348063887516</span>
                          
                        </a>
                        <a href="mailto:info@keketuktuk.com" className="flex items-center space-x-4 hover:text-white transition-colors">
                          <EnvelopeIcon className='w-5 h-5'/>
                          <span>info@keketuktuk.com </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}