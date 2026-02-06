// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ProjectHighlightCarousel from '@/components/ProjectHighlightCarousel'

// Demo project data – replace with real DB/data fetch
const projects = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    image: '/assets/byd/song-plus-3qv.jpg',
    gallery: [
      '/assets/byd/song-plus-3qv.jpg',
      '/assets/byd/song-plus-back.jpg',
      '/assets/byd/song-plus-bonnet.jpg',
      '/assets/byd/song-plus-dashboard.jpg',
    ],
    description: 'Full-stack online store with Paystack integration and real-time inventory.',
    tagline: 'Sell Online, Grow Fast',
    specs: [
      { label: "Tech Stack", value: "Next.js, FastAPI, React, Tailwind" },
      { label: "Features", value: "User login, payments, admin panel" },
      { label: "Delivery", value: "2-4 weeks" }
    ],
    features: [
      "Secure Paystack integration",
      "Mobile-responsive design",
      "Hand-coded admin panel",
      "SEO optimized",
      "Fast loading times"
    ],
    slug: 'ecommerce-platform'
  },
  {
    id: '2',
    name: 'Business Dashboard',
    image: '/assets/byd/song-plus-back.jpg',
    gallery: [
      '/assets/byd/song-plus-back.jpg',
      '/assets/byd/song-plus-dashboard.jpg',
      '/assets/byd/song-plus-others.jpg',
      '/assets/byd/song-plus-front.jpg',
    ],
    description: 'Custom analytics dashboard with real-time data and AI insights.',
    tagline: 'Real-Time Insights',
    specs: [
      { label: "Tech Stack", value: "Django, React, Chart.js" },
      { label: "Features", value: "AI predictions, login" },
      { label: "Delivery", value: "3-5 weeks" }
    ],
    features: [
      "Interactive charts",
      "Role-based access",
      "Automated reports",
      "Secure authentication",
      "Scalable backend"
    ],
    slug: 'business-dashboard'
  },
  {
    id: '3',
    name: 'Corporate Website',
    image: '/assets/byd/song-plus-bonnet.jpg',
    gallery: [
      '/assets/byd/song-plus-bonnet.jpg',
      '/assets/byd/song-plus-dashboard.jpg',
      '/assets/byd/song-plus-front.jpg',
      '/assets/byd/song-plus-others.jpg',
    ],
    description: 'Modern responsive corporate site with SEO and content management.',
    tagline: 'Professional Presence',
    specs: [
      { label: "Tech Stack", value: "Next.js, Tailwind" },
      { label: "Features", value: "CMS, SEO, forms" },
      { label: "Delivery", value: "1-3 weeks" }
    ],
    features: [
      "Advanced SEO optimization",
      "Contact forms",
      "Blog integration",
      "Responsive design",
      "Fast loading"
    ],
    slug: 'corporate-website'
  },
  {
    id: '4',
    name: 'SaaS Landing Page',
    image: '/assets/byd/song-plus-dashboard.jpg',
    gallery: [
      '/assets/byd/song-plus-dashboard.jpg',
      '/assets/byd/song-plus-others.jpg',
      '/assets/byd/song-plus-front.jpg',
      '/assets/byd/song-plus-back.jpg',
    ],
    description: 'High-conversion landing page with animations and lead capture.',
    tagline: 'Convert Visitors',
    specs: [
      { label: "Tech Stack", value: "Next.js, Framer Motion" },
      { label: "Features", value: "Animations, forms" },
      { label: "Delivery", value: "1-2 weeks" }
    ],
    features: [
      "Smooth animations",
      "Lead capture forms",
      "WhatsApp integration",
      "A/B testing support",
      "Mobile optimized"
    ],
    slug: 'saas-landing-page'
  },
  {
    id: '5',
    name: 'AI-Powered Tool',
    image: '/assets/byd/songplus.jpg',
    gallery: [
      '/assets/byd/songplus.jpg',
      '/assets/byd/song-plus-others.jpg',
      '/assets/byd/song-plus-dashboard.jpg',
      '/assets/byd/song-plus-front.jpg',
    ],
    description: 'Web app with custom AI models for content generation.',
    tagline: 'Intelligent Automation',
    specs: [
      { label: "Tech Stack", value: "FastAPI, React, OpenAI" },
      { label: "Features", value: "AI content generation" },
      { label: "Delivery", value: "2-4 weeks" }
    ],
    features: [
      "Custom AI models",
      "Content generation",
      "User dashboard",
      "Secure API",
      "Scalable backend"
    ],
    slug: 'ai-powered-tool'
  },
  {
    id: '6',
    name: 'Mobile-First Site',
    image: '/assets/byd/song-plus-others.jpg',
    gallery: [
      '/assets/byd/song-plus-others.jpg',
      '/assets/byd/song-plus-dashboard.jpg',
      '/assets/byd/song-plus-front.jpg',
      '/assets/byd/song-plus-back.jpg',
    ],
    description: 'Lightning-fast progressive web app for local business.',
    tagline: 'Mobile-First Experience',
    specs: [
      { label: "Tech Stack", value: "Next.js, PWA, Tailwind" },
      { label: "Features", value: "Offline support" },
      { label: "Delivery", value: "1-2 weeks" }
    ],
    features: [
      "Progressive Web App",
      "Offline functionality",
      "Push notifications",
      "Instant loading",
      "Mobile optimized"
    ],
    slug: 'mobile-first-site'
  },
];

// Function to generate highlight cards for a specific project
function generateProjectHighlights(project: typeof projects[0]) {
  const highlights = project.features.map((feature, index) => ({
    id: `${project.id}-${index}`,
    type: 'image' as const,
    url: project.gallery[index % project.gallery.length] || project.image,
    alt: `${project.name} Highlight ${index + 1}`,
    title: feature.split(' ').slice(0, 3).join(' '),
    description: `Experience the ${feature.toLowerCase()} of the ${project.name}, enhancing your digital presence with cutting-edge technology.`,
  }));

  // Ensure at least 3 highlights
  while (highlights.length < 3) {
    const index = highlights.length;
    highlights.push({
      id: `${project.id}-generic-${index}`,
      type: 'image' as const,
      url: project.gallery[index % project.gallery.length] || project.image,
      alt: `${project.name} Highlight ${index + 1}`,
      title: `${project.name} Excellence`,
      description: `Discover the ${project.name}'s ${project.tagline.toLowerCase()}, designed for superior performance and style.`,
    });
  }

  return highlights;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(m => m.slug === slug);
  if (!project) return notFound();

  const highlights = generateProjectHighlights(project);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-tr from-gray-100 via-white to-gray-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-10 md:py-20 px-4 md:px-10 gap-12 md:gap-16">
          {/* Image */}
          <div className="flex-1 flex flex-col items-center justify-center lg:-mt-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-black mb-6 pt-6 text-center">
              {project.name}
            </h1>
            <div className="relative w-85 h-50 md:w-120 md:h-75 lg:w-140 lg:h-90 rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </div>
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col gap-6 justify-center lg:pt-8">
            <span className="inline-block uppercase tracking-wider text-sm font-bold text-gray-500 mb-1">
              {project.tagline}
            </span>
            <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-xl">
              {project.description}
            </p>
            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-w-md">
              {project.specs?.map(spec => (
                <div
                  key={spec.label}
                  className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-2 flex flex-col items-center"
                >
                  <span className="text-xs text-gray-500">{spec.label}</span>
                  <span className="font-semibold text-black text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
            {/* CTAs */}
            <div className="w-full mx-auto flex flex-col items-center justify-center sm:flex-row gap-4">
              <Link
                href={`/?type=project&slug=${project.slug}#enquiry`}
                className="inline-block px-8 py-3 rounded-full font-bold hover:text-white text-black bg-transparent border-2 border-gray-800/70 hover:bg-black hover:border-black transition-all text-lg uppercase tracking-wide"
              >
                Enquire Now
              </Link>
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/2348038168949?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(project.name)}%20project`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-full font-bold text-white bg-green-600 hover:bg-green-700 shadow border-2 border-green-700 transition-all text-lg uppercase tracking-wide"
              >
                WhatsApp Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlight Section */}
      <ProjectHighlightCarousel highlights={highlights} />

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="w-full bg-gray-50 py-10">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-black mb-6 text-center">
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <div key={img} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <Image
                    src={img}
                    alt={`${project.name} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover hover:object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {project.features && (
        <section className="w-full bg-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Features
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {project.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg border border-gray-200 p-4"
                >
                  <span className="inline-block mt-1 h-3 w-3 rounded-full bg-purple-600 shrink-0"></span>
                  <span className="text-gray-800 text-base">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 bg-black border-t border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Project
          </h2>
          <div>
            <Link
              href={`/?type=project&slug=${project.slug}#enquiry`}
              className="inline-block px-6 sm:px-8 py-3 rounded-full font-bold text-white bg-purple-600 hover:bg-purple-500 border-2 border-purple-600 hover:border-purple-500 transition-all text-base sm:text-lg uppercase tracking-wide"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}