import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { Role } from "@prisma/client";

export default async function AdminCreateProjectPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/signin");
  if (session.user.role !== Role.ADMIN) redirect("/");

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <p className="text-muted-foreground mb-6">
        Add a new project to the store
      </p>
      <ProjectForm mode="create"/>
    </section>
  );
}
