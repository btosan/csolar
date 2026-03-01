"use server"

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

type CreateServiceRequestInput = {
  systemId: string
  issueType: string
  description?: string
  priority?: number  // optional, e.g. 1=low, 3=high
}

export async function createServiceRequest(data: CreateServiceRequestInput) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { customer: true },
  })

  if (!user?.customer) {
    throw new Error("Customer profile not found")
  }

  // Security: verify the system belongs to this customer
  const system = await db.solarSystem.findFirst({
    where: {
      id: data.systemId,
      customerId: user.customer.id,
    },
  })

  if (!system) {
    throw new Error("System not found or access denied")
  }

  const serviceRequest = await db.serviceRequest.create({
    data: {
      issueType: data.issueType,
      description: data.description?.trim() || null,
      priority: data.priority ?? 2, // default medium
      status: "OPEN",
      systemId: data.systemId,
    },
  })

  // Optional: you could create an initial Alert here if you want
  // or send email/notification – but keeping it minimal for now

  return serviceRequest.id
}