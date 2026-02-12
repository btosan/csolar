
import About from "@/components/About";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Topbar from "@/components/Topbar";
import Work from "@/components/Work";
import TrustSection from "@/components/TrustSection";
import ProductSection from "../components/Products";


export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <ProductSection />
      <About />
      <Stats />
      <TrustSection />
      <Work />
      <Testimonials />
      <Faq />
      <Contact />
    </div>
  )
}
