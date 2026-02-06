// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script"; // ← Add this import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

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

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ← GOOGLE ANALYTICS / GTAG − START */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LR0RNH5DR9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LR0RNH5DR9', {
              page_path: window.location.pathname + window.location.search,
            });
          `}
        </Script>
        {/* ← END GOOGLE ANALYTICS */}
      </head>

      <body className=" bg-black text-gray-100 font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main className="pt-20 ">
          {children}
          <FloatingContact />
        </main>
        <Footer />
      </body>
    </html>
  );
}