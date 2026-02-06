import { Facebook, Instagram, Youtube, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70 py-12 px-6 md:px-16 border-t border-zinc-800/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* === CONTACT === */}
        <div>
          <Link href='/contact' className="text-purple-100 font-semibold mb-3">Contact</Link> 
          <p className="mt-3">
            Serving businesses in Lagos, Abuja, Port Harcourt, and throughout Nigeria, with remote services available to clients around the world.
          </p> <br />
          <p>
            <a
              href="tel:+2349123631219"
              className="hover:text-purple-50 transition-all"
            >
              +234 912 363 1219
            </a>
          </p>
          <p>
            <a
              href="mailto:ofashi.com@gmail.com"
              className="hover:text-purple-50 transition-all"
            >
              ofashi.com@gmail.com
            </a>
          </p>
        </div>

        {/* === EXPLORE === */}
        <div>
          <h3 className="text-purple-100 font-semibold mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-purple-50 transition-all">
                About the Agency
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-purple-50 transition-all">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-purple-50 transition-all">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-50 transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* === SOCIAL MEDIA === */}
        <div>
          <h3 className="text-purple-100 font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-purple-50 transition-all"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-purple-50 transition-all"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-purple-50 transition-all"
            >
              <Youtube size={20} />
            </a>
            <a
              href="#"
              aria-label="X (formerly Twitter)"
              className="hover:text-purple-50 transition-all"
            >
              <X size={20} />
            </a>
          </div>
        </div>

        {/* === NEWSLETTER === */}
        <div>
          <h3 className="text-purple-100 font-semibold mb-3">Insights & Updates</h3>
          <p className="text-sm mb-3">
            Get tips on web design, automation, and scaling your business online.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-zinc-900 px-3 py-2 rounded-l-xl w-full focus:outline-none focus:ring-1 focus:ring-purple-100"
            />
            <button
              type="submit"
              className="bg-purple-100 text-black px-4 py-2 rounded-r-xl font-semibold hover:bg-purple-50 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* === COPYRIGHT === */}
      <div className="text-center text-xs text-white/70 mt-10">
        © {new Date().getFullYear()} Ofashi — Web Development, Automation & AI Integration.
      </div>
    </footer>
  );
}
