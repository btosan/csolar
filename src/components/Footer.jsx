"use client";

import Image from "next/image";
import Link from "next/link";
import { RiMapPin2Fill, RiPhoneFill, RiMailFill, RiArrowRightLine } from "react-icons/ri";
import Socials from "./Socials";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import Logo from "./Logo";

const Footer = () => {
  const phoneNumber = "+2348033319391";
  const emailAddress = "containedsolar@gmail.com";
  const officeAddress = "No 91/93 Aina Street, Ojodu Berger, Lagos, Nigeria";

  return (
    <motion.footer
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
      className=" bg-primary"
    >
      <div className="container mx-auto">
        <div className="py-16 xl:py-25 flex flex-col xl:flex-row gap-15 xl:gap-7.5">
          
          {/* Logo & About */}
          <div className="flex-1">
            <div className="flex mb-6">
              <div className="flex items-center justify-center">
                <Logo />
                <span className="ml-1 mr-0.5 font-medium text-white xl:text-2xl text-lg md:text-xl">CONTAINED</span>
                <span className="text-accent xl:text-2xl text-lg md:text-xl tracking-wide font-bold">SOLAR</span>
              </div>
            </div>
            <p className="text-border max-w-67.5">
              Contained Solar is committed to simplifying solar ownership in Nigeria. We provide end-to-end solar solutions, from installation and maintenance to system monitoring, ensuring your solar system stays reliable today and tomorrow.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex-1 text-border">
            <h4 className="h4 text-white mb-10">Contact</h4>
            <ul className="flex flex-col ">
              <li className="flex items-center gap-4">
                <RiMapPin2Fill className="text-accent text-xl" />
                <p>{officeAddress}</p>
              </li>
              <li className="flex items-center gap-4">
                <RiMailFill className="text-accent text-xl" />
                <a  href={`mailto:${emailAddress}`} >{emailAddress}</a>
              </li>
              <li className="flex items-center gap-4">
                <RiPhoneFill className="text-accent text-xl" />
                <a href={`tel:${phoneNumber}`} >{phoneNumber}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 text-border">
            <h4 className="h4 text-white mb-10">Newsletter</h4>
            <p>
              Stay updated on solar innovations, energy tips, and exclusive offers. Subscribe to our newsletter for insights that keep your solar system performing at its best.
            </p>
            <div className="relative max-w-92.5">
              <input
                type="text"
                placeholder="Enter your email"
                className="bg-[#222427] h-16 w-full pl-7 rounded-none outline-none flex items-center"
              />
              <button className="bg-accent w-12 h-12 absolute right-2 top-2 bottom-2 text-primary text-xl flex items-center justify-center">
                <RiArrowRightLine />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto py-12 xl:px-0 border-t border-border/10 flex flex-col gap-6 xl:flex-row items-center justify-between">
        <p className="text-border">
          Copyright © {new Date().getFullYear()} Contained Solar. All rights reserved.
        </p>
        <Socials containerStyles="flex gap-6 text-white" iconsStyles="hover:text-accent transition-all" />
      </div>
    </motion.footer>
  );
};

export default Footer;
