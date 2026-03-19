"use server";

import { db } from "@/lib/db";
import { PaymentProofStatus, ServiceStatus } from "@prisma/client";

export async function getPendingPaymentProofCount() {
  return db.paymentProof.count({
    where: {
      status: PaymentProofStatus.PENDING,
    },
  });
}

export async function getOpenServiceRequestCount() {
  return db.serviceRequest.count({
    where: {
      status: ServiceStatus.OPEN,
    },
  });
}