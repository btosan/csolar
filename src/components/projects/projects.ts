export type ProjectType =
  | "full-stack"
  | "frontend"
  | "ai"
  | "website"
  | "automation";

export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  type: ProjectType;
  isNew?: boolean;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    excerpt: "Full-stack online store with payments, inventory, and admin control.",
    image: "/assets/backend.png",
    type: "full-stack",
    isNew: true,
    liveUrl: "#",
  },
  {
    slug: "business-dashboard",
    title: "Business Dashboard",
    excerpt: "Analytics dashboard with real-time data, reports, and insights.",
    image: "/assets/web/ecommerce1.jpg",
    type: "frontend",
    liveUrl: "#",
  },
  {
    slug: "corporate-website",
    title: "Corporate Website",
    excerpt: "Professional business website with SEO and content management.",
    image: "/assets/web/ecommerce.jpg",
    type: "website",
    liveUrl: "#",
  },
  {
    slug: "saas-landing-page",
    title: "SaaS Landing Page",
    excerpt: "High-conversion landing page built for growth and lead capture.",
    image: "/assets/web/software.jpg",
    type: "frontend",
    liveUrl: "#",
  },
  {
    slug: "ai-powered-tool",
    title: "AI-Powered Tool",
    excerpt: "Custom AI system for automation and intelligent content generation.",
    image: "/assets/backend.png",
    type: "ai",
    liveUrl: "#",
  },
  {
    slug: "mobile-first-site",
    title: "Mobile-First Site",
    excerpt: "Progressive web app optimized for speed, offline use, and mobile.",
    image: "/assets/web/ecommerce1.jpg",
    type: "automation",
    liveUrl: "#",
  },
];
