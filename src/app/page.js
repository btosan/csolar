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
      <FeaturedProducts />
      <div className="my-12.5 sm:my-20">
        <ProductCategory />
      </div>
      <Services />
      <About />
      <Stats />
      <Work />
      <FeaturedProjects />
      <Testimonials />
      <Contact />
    </div>
  );
}