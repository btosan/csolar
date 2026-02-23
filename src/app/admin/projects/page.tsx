import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllProjects } from "@/lib/actions/projects";
import ProjectTable from "@/components/admin/projects/ProjectTable";

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const projects = await getAllProjects();

  return (
    <div className="space-y-6 py-16">
      <div className="flex items-center justify-center flex-col gap-2 mx-auto w-full tect-center">
        <h1 className="h2">Project Management</h1>
        <p className="text-muted-foreground mb-6">
          Create, update, and manage store projects.
        </p>
      </div>

      <ProjectTable projects={projects} />
    </div>
  );
}

