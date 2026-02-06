"use client";
import { useState } from "react";
import {
  SiPython,
  SiDjango,
  SiFastapi,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiLaravel,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiOpenai,
  SiNodedotjs,
  SiPhp,
  SiExpress,
  SiPrisma,
  SiVercel,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiRedis,
  SiSqlite,
  SiHuggingface,
  SiZapier,
} from "react-icons/si";
import { Cpu, Database } from "lucide-react";


export default function TechStack() {

const stack = {
  Languages: [
    { name: "Python", icon: <SiPython /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "PHP", icon: <SiPhp /> },
  ], // 4

  Backend: [
    { name: "Django", icon: <SiDjango /> },
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "Laravel", icon: <SiLaravel /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "Prisma ORM", icon: <SiPrisma /> },
  ], // 7

  Frontend: [
    { name: "React.js", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS3", icon: <SiCss3 /> },
    { name: "Framer Motion", icon: <SiFramer /> },
    { name: "Vercel Deployment", icon: <SiVercel /> },
  ], // 7

  Databases: [
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Redis", icon: <SiRedis /> },
    { name: "SQLite", icon: <SiSqlite /> },
  ], // 5

  "AI & Automation": [
    { name: "OpenAI / GPT APIs", icon: <SiOpenai /> },
    { name: "LangChain Agentic Systems", icon: <Cpu /> },
    { name: "AI Workflow Automation", icon: <Cpu /> },
    { name: "AI Integrations & Agents", icon: <Cpu /> },
    { name: "Hugging Face Models", icon: <SiHuggingface /> },
    { name: "Vector Databases", icon: <Database /> },
    { name: "Zapier / API Automation", icon: <SiZapier /> },
    { name: "Custom AI Pipelines", icon: <Cpu /> },
  ]
};


  const categories = Object.keys(stack);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Our Technology Stack
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Modern technologies powering scalable applications, intelligent
            systems, and future-ready digital products.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-semibold hover:cursor-pointer whitespace-nowrap transition
                ${
                  activeTab === category
                    ? "bg-purple-800 text-white shadow-lg"
                    : "bg-gray-900 text-gray-300 border border-gray-700 lg:border-gray-500 hover:bg-gray-800"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active Tab Content — PERFECTLY CENTERED */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {stack[activeTab as keyof typeof stack].map((tech) => (
              <div
                key={tech.name}
                className="w-40 md:w-48 lg:w-56 xl:w-64 flex flex-col items-center justify-center bg-gray-950 border border-gray-700 lg:border-gray-700 rounded-xl p-6 hover:border-purple-200/60 transition"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl mb-4 text-purple-200">{tech.icon}</div>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg xl:text-xl font-normal text-center">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
