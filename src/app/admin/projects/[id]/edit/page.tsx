import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { Role } from "@prisma/client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditProjectPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/signin");
  if (session.user.role !== Role.ADMIN) redirect("/");

  const project = await db.project.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });

  if (!project) redirect("/admin/projects");

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <p className="text-muted-foreground mb-6">
        Update project details
      </p>

      <ProjectForm mode="edit" project={project} />
    </section>
  );
}