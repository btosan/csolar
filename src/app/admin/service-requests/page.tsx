import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { ServiceStatus } from "@prisma/client";

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

export default async function AdminServiceRequestsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/profile");
  }

  const requests = await db.serviceRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      system: {
        select: {
          id: true,
          name: true,
          location: true,
          customer: {
            select: {
              id: true,
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
  });

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technician Requests</h1>
          <p className="mt-2 text-muted-foreground">
            View all customer service and technician requests.
          </p>
        </div>

        <Link
          href="/admin"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to Admin Dashboard
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center bg-white">
          <h2 className="text-xl font-semibold mb-2">No service requests yet</h2>
          <p className="text-muted-foreground">
            Customer technician requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border rounded-2xl p-6 bg-white shadow-sm"
            >
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
                    <span className="font-medium">Location:</span> {request.system.location}
                  </p>

                  <p className="text-sm">
                    <span className="font-medium">Customer:</span> {request.system.customer.name}
                  </p>

                  {request.system.customer.phone && (
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {request.system.customer.phone}
                    </p>
                  )}

                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {request.system.customer.user.email}
                  </p>

                  <p className="text-sm">
                    <span className="font-medium">Priority:</span> {getPriorityLabel(request.priority)}
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
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(request.status)}`}
                  >
                    {request.status.replaceAll("_", " ")}
                  </span>

                  <Link
                    href={`/admin/monitoring/systems/${request.system.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View system
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}