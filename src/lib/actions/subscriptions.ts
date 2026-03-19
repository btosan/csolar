"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  PaymentMethod,
  PaymentProofStatus,
  PaymentStatus,
  Role,
} from "@prisma/client";
import { createInvoiceForOrder } from "@/lib/invoice";
// await activateSubscriptionFromOrder

async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }

  return session.user;
}

async function getUserCustomer(userId: string) {
  const customer = await db.customer.findUnique({
    where: { userId },
  });

  if (!customer) {
    throw new Error("Customer profile not found.");
  }

  return customer;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function activateSubscriptionFromOrder(orderId: string, paymentId?: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      package: true,
      invoice: true,
    },
  });

  if (!order) throw new Error("Order not found.");
  if (!order.package) throw new Error("Package not found.");

  const now = new Date();
  const endDate = addDays(now, order.package.durationDays);

  const existingActive = await db.subscription.findFirst({
    where: {
      userId: order.customer.userId,
      packageId: order.packageId!,
      active: true,
    },
  });

  if (existingActive) return existingActive;

  return db.$transaction(async (tx) => {
    await tx.subscription.updateMany({
      where: {
        userId: order.customer.userId,
        active: true,
      },
      data: {
        active: false,
      },
    });

    await tx.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
      },
    });

    if (order.invoice) {
      await tx.invoice.update({
        where: { id: order.invoice.id },
        data: {
          status: "PAID",
        },
      });
    }

    return tx.subscription.create({
      data: {
        userId: order.customer.userId,
        packageId: order.packageId!,
        startDate: now,
        endDate,
        active: true,
        paymentId: paymentId ?? undefined,
      },
    });
  });
}

export async function getPublicPackageById(id: string) {
  return db.package.findUnique({
    where: { id },
  });
}

export async function createOrGetPackageOrder(packageId: string) {
  const user = await requireUser();
  const customer = await getUserCustomer(user.id);

  const pkg = await db.package.findUnique({
    where: { id: packageId },
  });

  if (!pkg) {
    throw new Error("Package not found.");
  }

  const existing = await db.order.findFirst({
    where: {
      customerId: customer.id,
      packageId,
      status: {
        in: ["DRAFT", "PENDING"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      invoice: true,
      package: true,
      payment: true,
      paymentProof: true,
    },
  });

  if (existing) {
    if (!existing.invoice) {
      await createInvoiceForOrder(existing.id);
    }

    return db.order.findUnique({
      where: { id: existing.id },
      include: {
        invoice: true,
        package: true,
        payment: true,
        paymentProof: true,
      },
    });
  }

  const order = await db.order.create({
    data: {
      customerId: customer.id,
      packageId,
      status: "PENDING",
      totalAmount: pkg.price,
    },
  });

  await createInvoiceForOrder(order.id);

  return db.order.findUnique({
    where: { id: order.id },
    include: {
      invoice: true,
      package: true,
      payment: true,
      paymentProof: true,
    },
  });
}

export async function createFreeSubscription(packageId: string) {
  const user = await requireUser();
  const customer = await getUserCustomer(user.id);

  const pkg = await db.package.findUnique({
    where: { id: packageId },
  });

  if (!pkg) throw new Error("Package not found.");
  if (pkg.price > 0) throw new Error("This package is not free.");

  const order = await db.order.create({
    data: {
      customerId: customer.id,
      packageId,
      status: "PAID",
      totalAmount: 0,
    },
  });

  const invoice = await createInvoiceForOrder(order.id);

  await db.invoice.update({
    where: { id: invoice.id },
    data: {
      status: "PAID",
    },
  });

  await activateSubscriptionFromOrder(order.id);

  revalidatePath("/dashboard");
  revalidatePath("/packages");

  return { success: true };
}

export async function initializePackagePaystack(packageId: string) {
  const user = await requireUser();

  if (!user.email) {
    throw new Error("User email is required for payment.");
  }

  const order = await createOrGetPackageOrder(packageId);

  if (!order) throw new Error("Order not found.");
  if (!order.package) throw new Error("Package not found.");
  if (!order.invoice) throw new Error("Invoice not found.");

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing PAYSTACK_SECRET_KEY.");
  }

  // Always create a fresh reference for each initialize attempt
  const reference = `pkg-${order.id}-${Date.now()}`;

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      amount: order.totalAmount * 100, // Paystack expects kobo
      reference,
      currency: "NGN",
      metadata: {
        orderId: order.id,
        packageId: order.package.id,
        invoiceNumber: order.invoice.invoiceNumber,
        userId: user.id,
        source: "package_checkout",
      },
      callback_url: `${process.env.NEXTAUTH_URL}/packages/${packageId}/checkout/success`,
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.status || !payload.data) {
    throw new Error(
      payload?.message || "Failed to initialize Paystack transaction."
    );
  }

  let payment = await db.payment.findUnique({
    where: { orderId: order.id },
  });

  if (!payment) {
    payment = await db.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount * 100, // store in kobo here
        status: PaymentStatus.INITIATED,
        paystackRef: payload.data.reference,
      },
    });
  } else {
    payment = await db.payment.update({
      where: { id: payment.id },
      data: {
        amount: order.totalAmount * 100,
        status: PaymentStatus.INITIATED,
        paystackRef: payload.data.reference,
      },
    });
  }

  await db.invoice.update({
    where: { id: order.invoice.id },
    data: {
      paymentMethod: PaymentMethod.PAYSTACK,
      status: "PENDING",
    },
  });

  return {
    accessCode: payload.data.access_code as string,
    reference: payload.data.reference as string,
    authorizationUrl: payload.data.authorization_url as string,
    invoiceNumber: order.invoice.invoiceNumber,
    packageName: order.package.name,
  };
}

export async function verifyPackagePayment(reference: string) {
  const user = await requireUser();

  const payment = await db.payment.findUnique({
    where: { paystackRef: reference },
    include: {
      order: {
        include: {
          customer: true,
          invoice: true,
          package: true,
        },
      },
      subscription: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  if (payment.order.customer.userId !== user.id) {
    throw new Error("Not authorized.");
  }

  if (payment.status === PaymentStatus.SUCCESS && payment.subscription) {
    return { success: true };
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing PAYSTACK_SECRET_KEY.");
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    }
  );

  const payload = await response.json();

  if (!response.ok || !payload.status || !payload.data) {
    throw new Error(payload?.message || "Failed to verify payment.");
  }

  if (payload.data.status !== "success") {
    throw new Error(`Payment not successful. Current status: ${payload.data.status}`);
  }

  await db.payment.update({
    where: { id: payment.id },
    data: {
      status: PaymentStatus.SUCCESS,
      channel: payload.data.channel || undefined,
      authorizationCode: payload.data.authorization?.authorization_code || undefined,
    },
  });

  await activateSubscriptionFromOrder(payment.orderId, payment.id);

  // Safe revalidation - skip during render (when success page calls it directly)
  // This prevents the "during render" error while keeping behavior identical in real mutations
  if (!payment.subscription || payment.status !== PaymentStatus.SUCCESS) {
    revalidatePath("/dashboard");
    revalidatePath(`/packages/${payment.order.packageId}/checkout`);
  }

  return { success: true };
}

export async function submitPackagePaymentProof(data: {
  packageId: string;
  payerName: string;
  payerEmail?: string;
  payerPhone?: string;
  bankName?: string;
  transferAmount?: number;
  transferDate?: string;
  senderReference?: string;
  notes?: string;
  proofUrl: string;
}) {
  const user = await requireUser();

  if (!data.payerName.trim()) {
    throw new Error("Payer name is required.");
  }

  if (!data.proofUrl.trim()) {
    throw new Error("Proof of payment is required.");
  }

  const order = await createOrGetPackageOrder(data.packageId);

  if (!order) throw new Error("Order not found.");
  if (!order.invoice) throw new Error("Invoice not found.");

  const existingProof = await db.paymentProof.findUnique({
    where: { orderId: order.id },
  });

  if (existingProof) {
    throw new Error("Proof of payment has already been submitted.");
  }

  const proof = await db.paymentProof.create({
    data: {
      userId: user.id,
      packageId: data.packageId,
      orderId: order.id,
      invoiceId: order.invoice.id,
      payerName: data.payerName.trim(),
      payerEmail: data.payerEmail?.trim() || undefined,
      payerPhone: data.payerPhone?.trim() || undefined,
      bankName: data.bankName?.trim() || undefined,
      transferAmount: data.transferAmount,
      transferDate: data.transferDate ? new Date(data.transferDate) : undefined,
      senderReference: data.senderReference?.trim() || undefined,
      notes: data.notes?.trim() || undefined,
      proofUrl: data.proofUrl.trim(),
      status: PaymentProofStatus.PENDING,
    },
  });

  await db.invoice.update({
    where: { id: order.invoice.id },
    data: {
      paymentMethod: PaymentMethod.BANK_TRANSFER,
    },
  });

  revalidatePath(`/packages/${data.packageId}/checkout/bank-transfer`);
  revalidatePath("/admin/payment-proofs");

  return proof;
}

export async function getPendingPaymentProofs() {
  await requireAdmin();

  return db.paymentProof.findMany({
    where: {
      status: PaymentProofStatus.PENDING,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      package: true,
      order: {
        include: {
          invoice: true,
        },
      },
    },
  });
}

export async function approvePaymentProof(proofId: string) {
  await requireAdmin();

  const proof = await db.paymentProof.findUnique({
    where: { id: proofId },
    include: {
      order: {
        include: {
          invoice: true,
        },
      },
    },
  });

  if (!proof) throw new Error("Payment proof not found.");
  if (proof.status !== PaymentProofStatus.PENDING) {
    throw new Error("This proof has already been processed.");
  }

  await db.paymentProof.update({
    where: { id: proofId },
    data: {
      status: PaymentProofStatus.APPROVED,
    },
  });

  await activateSubscriptionFromOrder(proof.orderId);

  revalidatePath("/admin/payment-proofs");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function rejectPaymentProof(proofId: string) {
  await requireAdmin();

  const proof = await db.paymentProof.findUnique({
    where: { id: proofId },
    include: {
      order: {
        include: {
          invoice: true,
        },
      },
    },
  });

  if (!proof) throw new Error("Payment proof not found.");
  if (proof.status !== PaymentProofStatus.PENDING) {
    throw new Error("This proof has already been processed.");
  }

  await db.paymentProof.update({
    where: { id: proofId },
    data: {
      status: PaymentProofStatus.REJECTED,
    },
  });

  await db.order.update({
    where: { id: proof.orderId },
    data: {
      status: "FAILED",
    },
  });

  if (proof.order.invoice) {
    await db.invoice.update({
      where: { id: proof.order.invoice.id },
      data: {
        status: "CANCELLED",
      },
    });
  }

  revalidatePath("/admin/payment-proofs");

  return { success: true };
}