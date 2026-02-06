import React from "react";
import PortfolioSection from "@/components/PortfolioSection";

const projects = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    image: '/assets/byd/song-plus-3qv.jpg',
    description: 'Full-stack Next.js + FastAPI online store with Paystack integration.',
    slug: 'ecommerce-platform'
  },
  {
    id: '2',
    name: 'Business Dashboard',
    image: '/assets/byd/song-plus-back.jpg',
    description: 'Custom analytics dashboard with real-time data and AI insights.',
    slug: 'business-dashboard'
  },
  {
    id: '3',
    name: 'Corporate Website',
    image: '/assets/byd/song-plus-bonnet.jpg',
    description: 'Modern responsive site with advanced SEO and content management.',
    slug: 'corporate-website'
  },
  {
    id: '4',
    name: 'SaaS Landing Page',
    image: '/assets/byd/song-plus-dashboard.jpg',
    description: 'High-conversion landing page with animations and lead forms.',
    slug: 'saas-landing-page'
  },
  {
    id: '5',
    name: 'AI-Powered Tool',
    image: '/assets/byd/songplus.jpg',
    description: 'Web app integrating custom AI models for content generation.',
    slug: 'ai-powered-tool'
  },
  {
    id: '6',
    name: 'Mobile-First Site',
    image: '/assets/byd/song-plus-others.jpg',
    description: 'Lightning-fast progressive web app for local business.',
    slug: 'mobile-first-site'
  },
];

export default function ProjectsPage() {
  return (
    <div>
      {/* 1️⃣ Showcase (visual proof) */}
      <PortfolioSection />

      {/* 2️⃣ Agency Process + Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              How We Build High-Impact Digital Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every project follows a proven framework that blends strategy,
              design, and engineering to deliver scalable digital solutions.
            </p>
          </div>

          {/* 2️⃣ OUR PROCESS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24 text-center">
            {[
              {
                step: "01",
                title: "Strategy",
                desc: "Research, planning and product direction aligned with business goals.",
              },
              {
                step: "02",
                title: "Design",
                desc: "UI/UX crafted for clarity, usability, and high conversion.",
              },
              {
                step: "03",
                title: "Development",
                desc: "Modern, scalable code built for speed and performance.",
              },
              {
                step: "04",
                title: "Launch & Scale",
                desc: "Deployment, optimization and long-term growth support.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-200/60"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 3️⃣ WHAT WE BUILD */}
          <div className="text-center mb-14">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What We Specialize In
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              We design and build digital systems that solve real business
              problems and scale with growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Web Applications",
                desc: "Dashboards, SaaS platforms, business tools and internal systems.",
              },
              {
                title: "AI Integrations",
                desc: "Automation, smart features, and AI-powered user experiences.",
              },
              {
                title: "E-Commerce Systems",
                desc: "Conversion-focused online stores with secure payment flows.",
              },
              {
                title: "Corporate Websites",
                desc: "High-performance marketing websites built for trust and SEO.",
              },
              {
                title: "Automation Systems",
                desc: "Workflow automation that saves time and reduces manual tasks.",
              },
              {
                title: "Product Design",
                desc: "User-centered UI/UX systems built for engagement and clarity.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 bg-white rounded-xl shadow-sm border border-gray-200/60 text-center hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ CTA */}
      <section className="py-20 bg-black text-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Have an idea you want to build?
        </h3>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Let’s turn your concept into a powerful digital product.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
        >
          Start a Project
        </a>
      </section>
    </div>
  );
}
