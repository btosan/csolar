// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
// import WhyWebPresenceSection from "@/components/WhyWebPresence";
import TestimonialsSection from "@/components/Testimonials";
// import FeaturedPackages from "@/components/FeaturedPackages";
// import PortfolioSection from "@/components/PortfolioSection";
import WhyChooseUsSection from "@/components/WhyChooseUs";
// import PricingSection from "@/components/PricingSection";
// import DomainHostingNote from "@/components/DomainHostingNote";
// import FinalCTASection from "@/components/FinalCTA";
// import EnquiryForm from "@/components/Enquiry";
import BannerSection from "@/components/BannerSection";
import EnquirySection from "@/components/EnquirySection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/projects/ProjectsSection";

export const metadata: Metadata = {
  title:
    "Ofashi | AI-Powered Web Development, Automation & Custom Apps in Nigeria",

  description:
    "Ofashi builds AI-powered full-stack applications and custom websites that drive real business growth. We combine modern web development, smart automation, and exceptional UI/UX to create fast, scalable, and conversion-focused digital solutions for businesses in Nigeria and beyond.",

  keywords:
    "AI web development Nigeria, custom web applications Nigeria, AI automation services, AI integration, website design Nigeria, business process automation, Next.js developers, React developers, Django developers, FastAPI developers, AI integration services, Ofashi",

  icons: {
    icon: "/favicon.ico",
  },
};


export default function page() {
  return (
    <div className="bg-gray-950">
      <HeroSection />  
      <BannerSection />
      <ServicesSection />
      <ProjectsSection />
      {/* <PortfolioSection /> */}
      <AboutSection />
      <WhyChooseUsSection /> 
      <TestimonialsSection />
      {/* <FeaturedPackages />
      <PricingSection /> */}
      {/* <WhyWebPresenceSection />  */}
      {/* <FinalCTASection />  */}
      {/* <DomainHostingNote />                          */}
      <EnquirySection />                   
    </div>
  );
}