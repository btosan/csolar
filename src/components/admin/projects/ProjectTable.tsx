"use client";

import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";
import Image from "next/image";

type AdminProjectListItem = {
  id: string;
  title: string;
  location?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  projectDate: Date;
  images: {
    id: string;
    url: string;
  }[];
};

interface ProjectTableProps {
  projects: AdminProjectListItem[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  if (projects.length === 0) {
    return (
      <div className="bg-white shadow rounded-2xl p-8 text-center text-gray-500">
        No projects found.
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto">
      <div className="hidden lg:block bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Project</th>
              <th className="px-6 py-4 text-left">Gallery</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  {project.imageUrl && (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  )}

                  <div>
                    <div className="font-semibold text-primary">
                      {project.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.location ?? "—"}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {project.images.length} images
                </td>

                <td className="px-6 py-4">
                  {new Date(project.projectDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.featured
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {project.featured ? "Featured" : "Standard"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90 transition"
                  >
                    Edit
                  </Link>

                  <DeleteProjectButton id={project.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}