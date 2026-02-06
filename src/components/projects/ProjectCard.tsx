"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "./projects";

interface Props {
  project: Project;
}

const typeColors: Record<Project["type"], string> = {
  "full-stack": "bg-purple-50 text-black dark:bg-purple-900/40 dark:text-purple-300",
  frontend: "bg-indigo-50 text-black dark:bg-indigo-900/40 dark:text-indigo-300",
  ai: "bg-pink-50 text-black dark:bg-pink-900/40 dark:text-pink-300",
  website: "bg-green-50 text-black dark:bg-green-900/40 dark:text-green-300",
  automation: "bg-orange-50 text-black dark:bg-orange-900/40 dark:text-orange-300",
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="group h-full flex flex-col rounded-lg overflow-hidden bg-gray-950 shadow-sm ring-1 ring-white/30 transition hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        <span
          className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-sm backdrop-blur ${typeColors[project.type]}`}
        >
          {project.type}
        </span>

        {project.isNew && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/50 text-white">
            NEW
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        <h3 className="text-lg font-semibold text-gray-100">
          {project.title}
        </h3>

        <p className="text-sm text-slate-100 line-clamp-3 flex-1">
          {project.excerpt}
        </p>

        {/* Buttons */}
        <div className="mt-2 flex gap-2 pointer-events-auto">
          <a
            href={project.liveUrl || "#"}
            target="_blank"
            className="flex-1 text-center text-sm font-medium py-2 rounded-xs bg-linear-to-br from-indigo-800 via-purple-800 to-purple-600 text-white transition hover:bg-gradient-to-tl"
            onPointerDown={(e) => e.stopPropagation()} 
          >
            Live Demo
          </a>

          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center text-sm text-gray-100 font-medium py-2 rounded-xs border border-purple-300/30 hover:border-white/5 hover:bg-purple-100 dark:hover:bg-white/5 hover:text-black transition"
            onPointerDown={(e) => e.stopPropagation()} 
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
