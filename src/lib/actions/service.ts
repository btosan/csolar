"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ServiceStatus } from "@prisma/client";

type CreateServiceRequestInput = {
  systemId: string;
  issueType: string;
  description?: string;
  priority?: number;
};

export async function createServiceRequest(data: CreateServiceRequestInput) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  if (!data.systemId || !data.issueType?.trim()) {
    throw new Error("System and issue type are required");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { customer: true },
  });

  if (!user?.customer) {
    throw new Error("Customer profile not found");
  }

  const system = await db.solarSystem.findFirst({
    where: {
      id: data.systemId,
      customerId: user.customer.id,
    },
  });

  if (!system) {
    throw new Error("System not found or access denied");
  }

  const serviceRequest = await db.serviceRequest.create({
    data: {
      issueType: data.issueType.trim(),
      description: data.description?.trim() || null,
      priority: data.priority ?? 2,
      status: ServiceStatus.OPEN,
      systemId: data.systemId,
    },
  });

  return serviceRequest.id;
}