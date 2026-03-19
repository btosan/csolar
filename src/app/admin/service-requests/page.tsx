import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Role, ServiceStatus } from "@prisma/client";
import {
  assignTechnicianToRequest,
  updateServiceRequestStatus,
} from "@/lib/actions/admin";
import CompleteServiceVisitForm from "@/components/admin/CompleteServiceVisitForm";

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

  const [requests, technicians] = await Promise.all([
    db.serviceRequest.findMany({
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
        visits: {
          include: {
            technician: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    }),
    db.user.findMany({
      where: {
        role: Role.TECHNICIAN,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Technician Requests
          </h1>
          <p className="mt-2 text-muted-foreground">
            View, assign, and manage customer service requests.
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
          <h2 className="text-xl font-semibold mb-2">
            No service requests yet
          </h2>
          <p className="text-muted-foreground">
            Customer technician requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => {
            const latestVisit = request.visits[0];

            return (
              <div
                key={request.id}
                className="border rounded-2xl p-6 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">
                        {request.issueType.replaceAll("_", " ")}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Request ID: {request.id}
                      </p>

                      <p className="text-sm">
                        <span className="font-medium">System:</span>{" "}
                        {request.system.name}
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
                        {request.phoneNumber ||
                          request.system.customer.phone ||
                          "N/A"}
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
                        <span className="font-medium">Submitted:</span>{" "}
                        {new Date(request.createdAt).toLocaleString()}
                      </p>

                      {request.description && (
                        <div className="pt-2">
                          <p className="text-sm font-medium mb-1">
                            Description:
                          </p>
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

                      <Link
                        href={`/admin/monitoring/systems/${request.system.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View system
                      </Link>
                    </div>
                  </div>

                  <div className="border-t pt-5">
                    <h3 className="text-sm font-semibold mb-3">
                      Assign Technician
                    </h3>

                    <form
                      action={async (formData) => {
                        "use server";
                        await assignTechnicianToRequest({
                          serviceRequestId: request.id,
                          technicianId: formData.get("technicianId") as string,
                        });
                      }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <select
                        name="technicianId"
                        required
                        defaultValue=""
                        className="border rounded-lg px-3 py-2 min-w-60"
                      >
                        <option value="" disabled>
                          Select technician
                        </option>
                        {technicians.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name || tech.email}
                          </option>
                        ))}
                      </select>

                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
                      >
                        Assign Technician
                      </button>
                    </form>

                    {latestVisit?.technician && (
                      <p className="text-sm mt-3">
                        <span className="font-medium">Assigned to:</span>{" "}
                        {latestVisit.technician.name ||
                          latestVisit.technician.email}
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-5">
                    <h3 className="text-sm font-semibold mb-3">
                      Quick Actions
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {request.status === "OPEN" && (
                        <form
                          action={async () => {
                            "use server";
                            await updateServiceRequestStatus({
                              serviceRequestId: request.id,
                              status: ServiceStatus.IN_PROGRESS,
                            });
                          }}
                        >
                          <button
                            type="submit"
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                          >
                            Mark In Progress
                          </button>
                        </form>
                      )}

                      {request.status !== "COMPLETED" &&
                        request.status !== "CANCELLED" && (
                          <form
                            action={async () => {
                              "use server";
                              await updateServiceRequestStatus({
                                serviceRequestId: request.id,
                                status: ServiceStatus.CANCELLED,
                              });
                            }}
                          >
                            <button
                              type="submit"
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:opacity-90"
                            >
                              Cancel Request
                            </button>
                          </form>
                        )}
                    </div>
                  </div>

                  {request.status !== "COMPLETED" &&
                    request.status !== "CANCELLED" && (
                      <CompleteServiceVisitForm
                        serviceRequestId={request.id}
                      />
                    )}

                  {latestVisit && (
                    <div className="border-t pt-5">
                      <h3 className="text-sm font-semibold mb-3">
                        Latest Visit Record
                      </h3>

                      <div className="space-y-2 text-sm">
                        {latestVisit.technician && (
                          <p>
                            <span className="font-medium">Technician:</span>{" "}
                            {latestVisit.technician.name ||
                              latestVisit.technician.email}
                          </p>
                        )}

                        {latestVisit.findings && (
                          <p>
                            <span className="font-medium">Findings:</span>{" "}
                            {latestVisit.findings}
                          </p>
                        )}

                        {latestVisit.actionsTaken && (
                          <p>
                            <span className="font-medium">Actions Taken:</span>{" "}
                            {latestVisit.actionsTaken}
                          </p>
                        )}

                        {latestVisit.partsReplaced && (
                          <p>
                            <span className="font-medium">Parts Replaced:</span>{" "}
                            {latestVisit.partsReplaced}
                          </p>
                        )}

                        <p>
                          <span className="font-medium">
                            Follow-up Required:
                          </span>{" "}
                          {latestVisit.followUpRequired ? "Yes" : "No"}
                        </p>

                        <p>
                          <span className="font-medium">Visit Created:</span>{" "}
                          {new Date(latestVisit.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}