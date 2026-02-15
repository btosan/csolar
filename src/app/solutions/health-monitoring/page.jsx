import SolutionPage from "@/components/pages/Solutions"

const data = {
  preTitle: "Solar Health Monitoring",
  title: "Solar Health Monitoring",
  heroTitle: "Understand Your Solar System at a Glance",
  heroText:
    "Track system condition, detect performance drops, and maintain long-term reliability.",
  heroImage: "/assets/csolar/monitoring2.jpg",
  sideImage: "/assets/csolar/performance.jpg",
  liveLink: "/monitoring/live",

  sectionTitle: "Continuous System Visibility",
  sectionText:
    "Your system health is summarized clearly — no technical overload.",

  features: [
    "Solar health scoring",
    "Battery condition tracking",
    "Inverter status monitoring",
    "Performance benchmarking",
    "Issue detection",
  ],

  processTitle: "Monitoring Flow",

  process: [
    { title: "System Input", description: "Enter system details." },
    { title: "Health Analysis", description: "Performance evaluated." },
    { title: "Score Generation", description: "Clear system status shown." },
    { title: "Action Guidance", description: "Maintenance suggestions." },
  ],
}

export default function Page() {
  return (
    <div className="">
        <SolutionPage data={data} />
    </div>
  
)
}
