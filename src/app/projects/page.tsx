
import React from 'react'
import TrustSection from "@/components/TrustSection";
import { db } from "@/lib/db";
import ProjectCard from "@/components/projects/ProjectCard";

async function getProjects() {
  return db.project.findMany({
    where: {
      deleted: false,
    },
    orderBy: {
      projectDate: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
      imageUrl: true,
      projectDate: true,
      featured: true,
    },
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center uppercase">
        Our Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No projects available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
        </div>
      )}
        <div>
            <TrustSection />
        </div>
    </div>
  );
}