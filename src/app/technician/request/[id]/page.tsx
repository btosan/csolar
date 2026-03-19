import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { ServiceStatus } from "@prisma/client";
import { markAssignedRequestInProgress } from "@/lib/actions/technician";
import CompleteAssignedVisitForm from "@/components/technician/CompleteAssignedVisitForm";

export const dynamic = "force-dynamic";

function getPriorityLabel(priority?: number | null) {
  if (priority === 3) return "High";
  if (priority === 2) return "Normal";
  if (priority === 1) return "Low";
  return "Normal";
}

function getStatusColor(status: ServiceStatus) {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-700";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TechnicianRequestDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "TECHNICIAN") {
    redirect("/profile");
  }

  if (!session.user.email) {
    redirect("/signin");
  }

  const technician = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true },
  });

  if (!technician) {
    redirect("/signin");
  }

  const visit = await db.serviceVisit.findFirst({
    where: {
      serviceRequestId: id,
      technicianId: technician.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      serviceRequest: {
        include: {
          system: {
            select: {
              id: true,
              name: true,
              location: true,
              customer: {
                select: {
                  name: true,
                  phone: true,
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!visit) {
    notFound();
  }

  const request = visit.serviceRequest;

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Request Details
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and update your assigned request.
          </p>
        </div>

        <Link
          href="/technician"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to Technician Dashboard
        </Link>
      </div>

      <div className="border rounded-2xl p-6 bg-white shadow-sm space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              {request.issueType.replaceAll("_", " ")}
            </h2>

            <p className="text-sm text-muted-foreground">
              Request ID: {request.id}
            </p>

            <p className="text-sm">
              <span className="font-medium">System:</span> {request.system.name}
            </p>

            <p className="text-sm">
              <span className="font-medium">Location:</span>{" "}
              {request.system.location}
            </p>

            <p className="text-sm">
              <span className="font-medium">Customer:</span>{" "}
              {request.system.customer.name}
            </p>

            <p className="text-sm">
              <span className="font-medium">Phone:</span>{" "}
              {request.phoneNumber || request.system.customer.phone || "N/A"}
            </p>

            {request.whatsappNumber && (
              <p className="text-sm">
                <span className="font-medium">WhatsApp:</span>{" "}
                {request.whatsappNumber}
              </p>
            )}

            <p className="text-sm">
              <span className="font-medium">Email:</span>{" "}
              {request.system.customer.user.email}
            </p>

            <p className="text-sm">
              <span className="font-medium">Priority:</span>{" "}
              {getPriorityLabel(request.priority)}
            </p>

            <p className="text-sm">
              <span className="font-medium">Assigned Technician:</span>{" "}
              {visit.technician?.name || visit.technician?.email || "N/A"}
            </p>

            <p className="text-sm">
              <span className="font-medium">Submitted:</span>{" "}
              {new Date(request.createdAt).toLocaleString()}
            </p>

            {request.description && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-1">Description:</p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {request.description}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                request.status
              )}`}
            >
              {request.status.replaceAll("_", " ")}
            </span>
          </div>
        </div>

        {request.status === "OPEN" && (
          <div className="border-t pt-5">
            <h3 className="text-sm font-semibold mb-3">Quick Action</h3>

            <form
              action={async () => {
                "use server";
                await markAssignedRequestInProgress(request.id);
              }}
            >
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Mark In Progress
              </button>
            </form>
          </div>
        )}

        {request.status !== "CANCELLED" && (
          <CompleteAssignedVisitForm serviceRequestId={request.id} />
        )}

        <div className="border-t pt-5">
          <h3 className="text-sm font-semibold mb-3">Current Visit Record</h3>

          <div className="space-y-2 text-sm">
            {visit.findings && (
              <p>
                <span className="font-medium">Findings:</span> {visit.findings}
              </p>
            )}

            {visit.actionsTaken && (
              <p>
                <span className="font-medium">Actions Taken:</span>{" "}
                {visit.actionsTaken}
              </p>
            )}

            {visit.partsReplaced && (
              <p>
                <span className="font-medium">Parts Replaced:</span>{" "}
                {visit.partsReplaced}
              </p>
            )}

            <p>
              <span className="font-medium">Follow-up Required:</span>{" "}
              {visit.followUpRequired ? "Yes" : "No"}
            </p>

            <p>
              <span className="font-medium">Visit Created:</span>{" "}
              {new Date(visit.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}