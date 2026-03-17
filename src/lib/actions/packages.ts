"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AITier, Role } from "@prisma/client";

/////////////////////////////////////////////////
// 🔐 REQUIRE ADMIN
/////////////////////////////////////////////////

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Not authenticated");
  if (session.user.role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }

  return session.user;
}

/////////////////////////////////////////////////
// 🟢 CREATE PACKAGE
/////////////////////////////////////////////////

export async function createPackage(data: {
  name: string;
  price: number;
  maxSystems: number;
  selfCheckLimit?: number | null;
  aiTier: AITier;
  hasTechnician: boolean;
  durationDays: number;
}) {
  await requireAdmin();

  if (!data.name.trim()) throw new Error("Package name is required");
  if (data.price < 0) throw new Error("Price cannot be negative");
  if (data.maxSystems < 1) {
    throw new Error("Max systems must be at least 1");
  }
  if (data.durationDays < 1) {
    throw new Error("Duration must be at least 1 day");
  }
  if (data.selfCheckLimit !== null && data.selfCheckLimit !== undefined && data.selfCheckLimit < 1) {
    throw new Error("Self check limit must be at least 1 or left empty");
  }

  const pkg = await db.package.create({
    data: {
      name: data.name.trim(),
      price: data.price,
      maxSystems: data.maxSystems,
      selfCheckLimit: data.selfCheckLimit ?? null,
      aiTier: data.aiTier,
      hasTechnician: data.hasTechnician,
      durationDays: data.durationDays,
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  return pkg;
}

/////////////////////////////////////////////////
// 🟡 UPDATE PACKAGE
/////////////////////////////////////////////////

export async function updatePackage(
  id: string,
  data: {
    name?: string;
    price?: number;
    maxSystems?: number;
    selfCheckLimit?: number | null;
    aiTier?: AITier;
    hasTechnician?: boolean;
    durationDays?: number;
  }
) {
  await requireAdmin();

  if (data.price !== undefined && data.price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (data.maxSystems !== undefined && data.maxSystems < 1) {
    throw new Error("Max systems must be at least 1");
  }

  if (data.durationDays !== undefined && data.durationDays < 1) {
    throw new Error("Duration must be at least 1 day");
  }

  if (
    data.selfCheckLimit !== undefined &&
    data.selfCheckLimit !== null &&
    data.selfCheckLimit < 1
  ) {
    throw new Error("Self check limit must be at least 1 or left empty");
  }

  const pkg = await db.package.update({
    where: { id },
    data: {
      ...(data.name !== undefined ? { name: data.name.trim() } : {}),
      ...(data.price !== undefined ? { price: data.price } : {}),
      ...(data.maxSystems !== undefined ? { maxSystems: data.maxSystems } : {}),
      ...(data.selfCheckLimit !== undefined
        ? { selfCheckLimit: data.selfCheckLimit }
        : {}),
      ...(data.aiTier !== undefined ? { aiTier: data.aiTier } : {}),
      ...(data.hasTechnician !== undefined
        ? { hasTechnician: data.hasTechnician }
        : {}),
      ...(data.durationDays !== undefined
        ? { durationDays: data.durationDays }
        : {}),
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");

  return pkg;
}

/////////////////////////////////////////////////
// 🔵 GET ALL PACKAGES (ADMIN)
/////////////////////////////////////////////////

export async function getAllPackages() {
  await requireAdmin();

  return db.package.findMany({
    orderBy: { createdAt: "asc" },
  });
}

/////////////////////////////////////////////////
// 🔴 DELETE PACKAGE
/////////////////////////////////////////////////

export async function deletePackage(id: string) {
  await requireAdmin();

  const activeSubs = await db.subscription.count({
    where: { packageId: id },
  });

  if (activeSubs > 0) {
    throw new Error("Cannot delete package in use");
  }

  await db.package.delete({
    where: { id },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
}

export async function getPublicPackages() {
  return db.package.findMany({
    orderBy: {
      price: "asc",
    },
  });
}