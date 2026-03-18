"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  PaymentProofStatus,
  PaymentStatus,
  Role,
} from "@prisma/client";

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
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (!order.package) {
    throw new Error("Package order not found.");
  }

  const user = await db.user.findUnique({
    where: { id: order.customer.userId },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const existingActive = await db.subscription.findFirst({
    where: {
      userId: user.id,
      packageId: order.package.id,
      active: true,
    },
  });

  if (existingActive) {
    return existingActive;
  }

  const now = new Date();
  const endDate = addDays(now, order.package.durationDays);

  const subscription = await db.$transaction(async (tx) => {
    await tx.subscription.updateMany({
      where: {
        userId: user.id,
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

    return tx.subscription.create({
      data: {
        userId: user.id,
        packageId: order.package.id,
        startDate: now,
        endDate,
        active: true,
        paymentId: paymentId ?? undefined,
      },
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/packages");
  revalidatePath(`/packages/${order.package.id}/checkout`);

  return subscription;
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
      packageId: pkg.id,
      status: {
        in: ["DRAFT", "PENDING"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      payment: true,
      paymentProof: true,
      package: true,
    },
  });

  if (existing) {
    return existing;
  }

  const order = await db.order.create({
    data: {
      customerId: customer.id,
      packageId: pkg.id,
      status: "PENDING",
      totalAmount: pkg.price,
    },
    include: {
      payment: true,
      paymentProof: true,
      package: true,
    },
  });

  revalidatePath(`/packages/${packageId}/checkout`);

  return order;
}

export async function createFreeSubscription(packageId: string) {
  const user = await requireUser();
  const customer = await getUserCustomer(user.id);

  const pkg = await db.package.findUnique({
    where: { id: packageId },
  });

  if (!pkg) {
    throw new Error("Package not found.");
  }

  if (pkg.price > 0) {
    throw new Error("This package is not free.");
  }

  const order = await db.order.create({
    data: {
      customerId: customer.id,
      packageId: pkg.id,
      status: "PAID",
      totalAmount: 0,
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

  if (!order.package) {
    throw new Error("Order package not found.");
  }

  if (order.package.price <= 0) {
    throw new Error("Free package does not require Paystack.");
  }

  const reference = `pkg-${order.id}-${Date.now()}`;

  let payment = await db.payment.findUnique({
    where: {
      orderId: order.id,
    },
  });

  if (!payment) {
    payment = await db.payment.create({
      data: {
        orderId: order.id,
        amount: order.totalAmount,
        status: PaymentStatus.INITIATED,
        paystackRef: reference,
      },
    });
  } else if (!payment.paystackRef) {
    payment = await db.payment.update({
      where: { id: payment.id },
      data: {
        paystackRef: reference,
      },
    });
  }

  return {
    email: user.email,
    amount: order.totalAmount,
    reference: payment.paystackRef,
    orderId: order.id,
    packageName: order.package.name,
  };
}

export async function verifyPackagePayment(reference: string) {
  const user = await requireUser();

  const payment = await db.payment.findUnique({
    where: {
      paystackRef: reference,
    },
    include: {
      order: {
        include: {
          customer: true,
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
    throw new Error("Not authorized to verify this payment.");
  }

  if (payment.status === PaymentStatus.SUCCESS && payment.subscription) {
    return {
      success: true,
      alreadyVerified: true,
      packageId: payment.order.packageId,
    };
  }

  await db.payment.update({
    where: { id: payment.id },
    data: {
      status: PaymentStatus.SUCCESS,
    },
  });

  await activateSubscriptionFromOrder(payment.orderId, payment.id);

  revalidatePath("/dashboard");
  revalidatePath(`/packages/${payment.order.packageId}/checkout`);

  return {
    success: true,
    alreadyVerified: false,
    packageId: payment.order.packageId,
  };
}

export async function submitPackagePaymentProof(data: {
  packageId: string;
  proofUrl: string;
}) {
  const user = await requireUser();

  if (!data.proofUrl.trim()) {
    throw new Error("Payment proof is required.");
  }

  const order = await createOrGetPackageOrder(data.packageId);

  if (!order.package) {
    throw new Error("Package order not found.");
  }

  const existingProof = await db.paymentProof.findUnique({
    where: {
      orderId: order.id,
    },
  });

  if (existingProof) {
    throw new Error("Payment proof has already been submitted for this order.");
  }

  const proof = await db.paymentProof.create({
    data: {
      userId: user.id,
      packageId: data.packageId,
      orderId: order.id,
      proofUrl: data.proofUrl.trim(),
      status: PaymentProofStatus.PENDING,
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
      order: true,
    },
  });
}

export async function approvePaymentProof(proofId: string) {
  await requireAdmin();

  const proof = await db.paymentProof.findUnique({
    where: { id: proofId },
    include: {
      order: true,
      package: true,
    },
  });

  if (!proof) {
    throw new Error("Payment proof not found.");
  }

  if (proof.status !== PaymentProofStatus.PENDING) {
    throw new Error("This proof has already been processed.");
  }

  await db.paymentProof.update({
    where: { id: proofId },
    data: {
      status: PaymentProofStatus.APPROVED,
    },
  });

  await db.order.update({
    where: { id: proof.orderId },
    data: {
      status: "PAID",
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
  });

  if (!proof) {
    throw new Error("Payment proof not found.");
  }

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

  revalidatePath("/admin/payment-proofs");

  return { success: true };
}