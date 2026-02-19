import { DM_Sans, Barlow } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"
import Header from "@/components/Header"
import Topbar from "@/components/Topbar"
import Footer from "@/components/Footer"
import NextAuthProviders from './NextAuthProviders';
import HolyLoader from "holy-loader";

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title:
    "Contained Solar | Solar Installation, Inverters & Energy Solutions",

  description:
    "Contained Solar provides reliable solar power solutions including solar panel installation, inverter systems, energy storage, maintenance, and consulting for homes and businesses. We deliver efficient, safe, and long-lasting renewable energy systems tailored to real energy needs.",

  keywords:
    "Contained Solar, solar installation, solar panels, inverter systems, solar energy solutions, renewable energy, off-grid solar, hybrid solar systems, solar maintenance, solar consulting, residential solar, commercial solar",

  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${barlow.variable} antialiased`}
      >
        <HolyLoader color="#ffca3b" />
        <NextAuthProviders>
          <TooltipProvider>
          <Topbar />
          <Header />
            <main>
              {children}
            </main>
          <Footer />
          </TooltipProvider>
        </NextAuthProviders>
      </body>
    </html>
  )
}
