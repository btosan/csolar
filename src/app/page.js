
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Topbar from "@/components/Topbar";
import Work from "@/components/Work";
import TrustSection from "@/components/TrustSection";
// import ProductSection from "../components/Products";
import ProductCategory from "@/components/products/ProductCategories";


export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="my-12.5 sm:my-20">
        <ProductCategory />
      </div>
      <Services />
      <About />
      <Stats />
      <TrustSection />
      <Work />
      <Testimonials />
      <Contact />
    </div>
  )
}
