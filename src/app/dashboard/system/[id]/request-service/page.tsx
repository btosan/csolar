import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import RequestTechnicianForm from "@/components/monitoring/RequestTechnicianForm";

interface PageProps {
  params: { id: string };
}

export default async function RequestServicePage({ params }: PageProps) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) redirect("/signin");

  const system = await db.solarSystem.findFirst({
    where: {
      id,
      customer: { userId: user.id },
    },
    select: {
      id: true,
      name: true,
      location: true,
    },
  });

  if (!system) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href={`/dashboard/system/${system.id}`}
        className="text-sm text-gray-500 mb-6 inline-block hover:underline"
      >
        ← Back to System
      </Link>

      <h1 className="text-3xl font-bold mb-10">
        Request Technician Visit
      </h1>

      <div className="bg-white shadow rounded-2xl p-8">
        <RequestTechnicianForm
          systemId={system.id}
          systemName={system.name}
        />
      </div>
    </div>
  );
}