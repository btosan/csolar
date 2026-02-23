"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";

type Project = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  imageUrl: string | null;
  projectDate: string; // API returns ISO string
  featured: boolean;
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects/featured");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch featured projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-16">
        <p>Loading featured projects...</p>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center uppercase">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            data={{
              ...project,
              projectDate: new Date(project.projectDate), 
            }}
          />
        ))}
      </div>
    </section>
  );
}