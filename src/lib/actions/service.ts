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
  phoneNumber: string;
  whatsappNumber?: string;
};

export async function createServiceRequest(data: CreateServiceRequestInput) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const issueType = data.issueType?.trim();
  const phoneNumber = data.phoneNumber?.trim();
  const whatsappNumber = data.whatsappNumber?.trim() || null;
  const description = data.description?.trim() || null;

  if (!data.systemId || !issueType) {
    throw new Error("System and issue type are required");
  }

  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  const priority =
    data.priority && [1, 2, 3].includes(data.priority) ? data.priority : 2;

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
      issueType,
      description,
      priority,
      status: ServiceStatus.OPEN,
      systemId: data.systemId,
      phoneNumber,
      whatsappNumber,
    },
  });

  return serviceRequest.id;
}