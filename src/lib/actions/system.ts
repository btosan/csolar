"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SystemType, BatteryType } from "@prisma/client";

type CreateSystemInput = {
  name: string;
  location: string;
  installationDate: string;
  systemType: SystemType;

  panelCapacity?: number;
  panelQuantity?: number;

  batteryType?: BatteryType;
  batteryCapacity?: number;

  inverterBrand?: string;
  inverterModel?: string;
  inverterCapacity?: number;
};

export async function createSolarSystem(data: CreateSystemInput) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { customer: true },
  });

  if (!user?.customer) {
    throw new Error("Customer record not found");
  }

  const activeSubscription = await db.subscription.findFirst({
    where: {
      userId: user.id,
      active: true,
      endDate: {
        gte: new Date(),
      },
    },
    include: {
      package: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!activeSubscription) {
    throw new Error("You need an active package to register a solar system.");
  }

  const systemCount = await db.solarSystem.count({
    where: {
      customerId: user.customer.id,
    },
  });

  if (systemCount >= activeSubscription.package.maxSystems) {
    throw new Error(
      `Your current package allows only ${activeSubscription.package.maxSystems} system(s). Please upgrade your package.`
    );
  }

  const system = await db.solarSystem.create({
    data: {
      name: data.name,
      location: data.location,
      installationDate: new Date(data.installationDate),
      systemType: data.systemType,
      customerId: user.customer.id,

      panelArray: data.panelCapacity
        ? {
            create: {
              capacityKw: data.panelCapacity,
              quantity: data.panelQuantity ?? 1,
            },
          }
        : undefined,

      battery: data.batteryCapacity
        ? {
            create: {
              type: data.batteryType ?? "LITHIUM",
              capacityKwh: data.batteryCapacity,
              installDate: new Date(data.installationDate),
            },
          }
        : undefined,

      inverter:
        data.inverterBrand && data.inverterModel
          ? {
              create: {
                brand: data.inverterBrand,
                model: data.inverterModel,
                capacityKw: data.inverterCapacity ?? 1,
              },
            }
          : undefined,
    },
  });

  return system.id;
}