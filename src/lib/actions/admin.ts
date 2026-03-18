"use server";

import { db } from "@/lib/db";
import { PaymentProofStatus } from "@prisma/client";

export async function getPendingPaymentProofCount() {
  return db.paymentProof.count({
    where: {
      status: PaymentProofStatus.PENDING,
    },
  });
}