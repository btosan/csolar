"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

/////////////////////////////////////////////////
// 🔐 REQUIRE ADMIN (REUSED PATTERN)
/////////////////////////////////////////////////

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Not authenticated");
  if (session.user.role !== Role.ADMIN)
    throw new Error("Not authorized");

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

  if (data.price < 0) throw new Error("Price cannot be negative");
  if (data.maxSystems < 1) throw new Error("Max systems must be at least 1");

  const pkg = await db.package.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/admin/packages");

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
    hasAI?: boolean;
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

  const pkg = await db.package.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/packages");

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
// 🔴 DELETE PACKAGE (OPTIONAL SOFT DELETE)
/////////////////////////////////////////////////

export async function deletePackage(id: string) {
  await requireAdmin();

  // safer: prevent deleting if in use
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
}