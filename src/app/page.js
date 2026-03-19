import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";
import ProductCategory from "@/components/products/ProductCategories";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import ProductsSection from "@/components/products/ProductsSection";
import SolutionsBanner from "@/components/SolutionsBanner";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";

export const metadata = {
  title: "Contained Energy | Contained Solar – Smart Renewable Energy Solutions",
  description:
    "Contained Solar delivers professional solar panel installation, inverter systems, energy storage, and renewable energy solutions for residential and commercial properties. Power your future with clean, reliable energy.",
  keywords: [
    "Contained Solar",
    "Contained Energy",
    "Contained Energy Services Ltd",
    "solar energy company",
    "solar installation services",
    "solar panels",
    "inverter systems",
    "energy storage solutions",
    "renewable energy company",
    "solar solutions for homes",
    "commercial solar systems",
  ],
  openGraph: {
    title: "Contained Solar | Renewable Energy & Solar Solutions",
    description:
      "Professional solar installation, inverter systems, and energy storage solutions tailored for homes and businesses.",
    url: "https://containedsolar.com", 
    siteName: "Contained Solar",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Contained Solar Renewable Energy Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contained Solar | Solar & Energy Solutions",
    description:
      "Reliable solar panel installation and energy systems for homes and businesses.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <SolutionsBanner />
      <HowItWorks />
      <div className="container pb-8 -mt-12 md:-mt-16 lg:-mt-20 bg-gray-50 w-full mx-auto flex items-center justify-center">
        <Link 
          href='/packages' 
          className="font-primary font-bold text-black text-sm md:text-base lg:text-lg xl:text-xl  uppercase underline underline-offset-8 decoration-dotted hover:text-gray-900 hover:text-lg md:hover:text-xl lg:hover:text-2xl hover:decoration-0 ">
          See Our Packages
        </Link>
      </div>
      <FeaturedProducts />
      <div className="my-12.5 sm:my-20">
        <ProductCategory />
      </div>
      <ProductsSection />
      <About />
      <Stats />
      <Work />
      <FeaturedProjects />
      <Testimonials />
      <Contact />
    </div>
  );
}