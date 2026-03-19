"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ServiceStatus } from "@prisma/client";

async function requireTechnician() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "TECHNICIAN") {
    redirect("/profile");
  }

  return session;
}

export async function completeAssignedServiceVisit(input: {
  serviceRequestId: string;
  findings?: string;
  actionsTaken?: string;
  partsReplaced?: string;
  followUpRequired?: boolean;
}) {
  const session = await requireTechnician();

  if (!session.user.email) {
    throw new Error("Unauthorized");
  }

  const technician = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!technician) {
    throw new Error("Technician not found");
  }

  const request = await db.serviceRequest.findUnique({
    where: { id: input.serviceRequestId },
    include: {
      visits: {
        where: {
          technicianId: technician.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!request) {
    throw new Error("Service request not found");
  }

  const latestAssignedVisit = request.visits[0];

  if (!latestAssignedVisit) {
    throw new Error("No visit assigned to you for this request");
  }

  await db.serviceVisit.update({
    where: { id: latestAssignedVisit.id },
    data: {
      findings: input.findings?.trim() || null,
      actionsTaken: input.actionsTaken?.trim() || null,
      partsReplaced: input.partsReplaced?.trim() || null,
      followUpRequired: input.followUpRequired ?? false,
    },
  });

  await db.serviceRequest.update({
    where: { id: input.serviceRequestId },
    data: {
      status: input.followUpRequired
        ? ServiceStatus.IN_PROGRESS
        : ServiceStatus.COMPLETED,
    },
  });

  return { success: true };
}

export async function markAssignedRequestInProgress(serviceRequestId: string) {
  const session = await requireTechnician();

  if (!session.user.email) {
    throw new Error("Unauthorized");
  }

  const technician = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!technician) {
    throw new Error("Technician not found");
  }

  const assignedVisit = await db.serviceVisit.findFirst({
    where: {
      serviceRequestId,
      technicianId: technician.id,
    },
  });

  if (!assignedVisit) {
    throw new Error("This request is not assigned to you");
  }

  await db.serviceRequest.update({
    where: { id: serviceRequestId },
    data: {
      status: ServiceStatus.IN_PROGRESS,
    },
  });

  return { success: true };
}