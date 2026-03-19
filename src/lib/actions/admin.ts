"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  PaymentProofStatus,
  Role,
  ServiceStatus,
} from "@prisma/client";

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/profile");
  }

  return session;
}

export async function getPendingPaymentProofCount() {
  await requireAdmin();

  return db.paymentProof.count({
    where: {
      status: PaymentProofStatus.PENDING,
    },
  });
}

export async function getOpenServiceRequestCount() {
  await requireAdmin();

  return db.serviceRequest.count({
    where: {
      status: ServiceStatus.OPEN,
    },
  });
}

export async function assignTechnicianToRequest(input: {
  serviceRequestId: string;
  technicianId: string;
}) {
  await requireAdmin();

  if (!input.serviceRequestId || !input.technicianId) {
    throw new Error("Service request and technician are required");
  }

  const request = await db.serviceRequest.findUnique({
    where: { id: input.serviceRequestId },
    include: {
      visits: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!request) {
    throw new Error("Service request not found");
  }

  const technician = await db.user.findFirst({
    where: {
      id: input.technicianId,
      role: Role.TECHNICIAN,
    },
  });

  if (!technician) {
    throw new Error("Technician not found");
  }

  const existingUnfinishedVisit = request.visits.find(
    (visit) => !visit.findings && !visit.actionsTaken && !visit.partsReplaced
  );

  if (existingUnfinishedVisit) {
    await db.serviceVisit.update({
      where: { id: existingUnfinishedVisit.id },
      data: {
        technicianId: input.technicianId,
      },
    });
  } else {
    await db.serviceVisit.create({
      data: {
        serviceRequestId: input.serviceRequestId,
        technicianId: input.technicianId,
      },
    });
  }

  await db.serviceRequest.update({
    where: { id: input.serviceRequestId },
    data: {
      status: ServiceStatus.IN_PROGRESS,
    },
  });

  return { success: true };
}

export async function updateServiceRequestStatus(input: {
  serviceRequestId: string;
  status: ServiceStatus;
}) {
  await requireAdmin();

  if (!input.serviceRequestId || !input.status) {
    throw new Error("Service request and status are required");
  }

  const request = await db.serviceRequest.findUnique({
    where: { id: input.serviceRequestId },
  });

  if (!request) {
    throw new Error("Service request not found");
  }

  await db.serviceRequest.update({
    where: { id: input.serviceRequestId },
    data: {
      status: input.status,
    },
  });

  return { success: true };
}

export async function completeServiceVisit(input: {
  serviceRequestId: string;
  findings?: string;
  actionsTaken?: string;
  partsReplaced?: string;
  followUpRequired?: boolean;
}) {
  await requireAdmin();

  if (!input.serviceRequestId) {
    throw new Error("Service request is required");
  }

  const request = await db.serviceRequest.findUnique({
    where: { id: input.serviceRequestId },
    include: {
      visits: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!request) {
    throw new Error("Service request not found");
  }

  const latestVisit = request.visits[0];

  if (!latestVisit) {
    throw new Error("No assigned visit found for this request");
  }

  await db.serviceVisit.update({
    where: { id: latestVisit.id },
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