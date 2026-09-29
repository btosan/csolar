import type { Metadata } from "next";
import EnergyCabinetDetail from "@/components/products/EnergyCabinetDetail";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.containedsolar.com";

const PAGE_URL = `${BASE_URL}/products/175kwh-energy-storage-cabinet`;

export const metadata: Metadata = {
  title:
    "175kWh Commercial & Industrial Energy Storage Cabinet | Blue Carbon | Contained Solar | Exulted | Contained Energy",
  description:
    "Blue Carbon 175kWh all-in-one energy storage cabinet with built-in BMS, EMS and PCS. Off-grid, hybrid and peak shaving power for businesses and communities.",
  keywords: [
    "175kWh energy storage cabinet",
    "Blue Carbon", "Exulted",
    "commercial energy storage",
    "industrial energy storage",
    "C&I energy storage",
    "peak shaving",
    "off-grid energy storage",
    "hybrid energy storage",
    "Contained Solar",
  ],
  openGraph: {
    title: "175kWh Commercial & Industrial Energy Storage Cabinet | Blue Carbon",
    description:
      "All-in-one 175kWh cabinet with BMS, EMS and PCS for off-grid, hybrid and peak shaving power.",
    url: PAGE_URL,
    siteName: "Contained Solar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blue Carbon / Exulted 175kWh energy storage cabinet by Contained Solar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "175kWh Commercial & Industrial Energy Storage Cabinet",
    description:
      "All-in-one 175kWh cabinet with BMS, EMS and PCS for off-grid, hybrid and peak shaving power.",
    images: ["/og-image.png"],
  },
};

export default function EnergyCabinetPage() {
  return <EnergyCabinetDetail />;
}