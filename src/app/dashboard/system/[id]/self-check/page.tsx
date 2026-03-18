import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SelfCheckForm from "@/components/monitoring/SelfCheckForm";
import { createMonitoringSnapshot } from "@/lib/actions/monitoring";
import type { CreateSnapshotInput } from "@/lib/actions/monitoring";
import { MonitoringSource } from "@prisma/client";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SelfCheckPage({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const system = await db.solarSystem.findUnique({
    where: { id },
    select: {
      name: true,
      customer: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!system || system.customer.userId !== session.user.id) {
    redirect("/dashboard");
  }

  const displayName = system.name || `System ${id}`;

  async function handleSelfCheck(formData: FormData) {
    "use server";

    const currentSession = await getServerSession(authOptions);

    if (!currentSession?.user?.id) {
      throw new Error("Unauthorized");
    }

    const activeSubscription = await db.subscription.findFirst({
      where: {
        userId: currentSession.user.id,
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
      throw new Error("You need an active package to run self-checks.");
    }

    if (activeSubscription.package.selfCheckLimit !== null) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const monthlyChecks = await db.monitoringSnapshot.count({
        where: {
          system: {
            customer: {
              userId: currentSession.user.id,
            },
          },
          source: MonitoringSource.MANUAL,
          createdAt: {
            gte: startOfMonth,
          },
        },
      });

      if (monthlyChecks >= activeSubscription.package.selfCheckLimit) {
        throw new Error(
          `You have reached your monthly self-check limit for the ${activeSubscription.package.name} package.`
        );
      }
    }

    const parseNumber = (value: FormDataEntryValue | null) => {
      if (!value) return undefined;
      const num = Number(value);
      return isNaN(num) ? undefined : num;
    };

    const input: CreateSnapshotInput = {
      systemId: id,
      source: MonitoringSource.MANUAL,
      aiTier: activeSubscription.package.aiTier,

      estimatedGenerationKwh: parseNumber(formData.get("estimatedGenerationKwh")),
      expectedGenerationKwh: parseNumber(formData.get("expectedGenerationKwh")),
      consumptionKwh: parseNumber(formData.get("consumptionKwh")),

      inverterTempC: parseNumber(formData.get("inverterTempC")),
      inverterEfficiency: parseNumber(formData.get("inverterEfficiency")),
      inverterOutputKw: parseNumber(formData.get("inverterOutputKw")),

      batteryChargePercent: parseNumber(formData.get("batteryChargePercent")),
      batteryTempC: parseNumber(formData.get("batteryTempC")),
      batteryCycles: parseNumber(formData.get("batteryCycles")),
      batteryHealthPercent: parseNumber(formData.get("batteryHealthPercent")),

      notes: (formData.get("notes") as string) || undefined,
    };

    try {
      await createMonitoringSnapshot(input);
      redirect(`/dashboard/system/${id}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        throw error;
      }

      console.error("Self-check failed:", error);
      throw new Error("Failed to save self-check. Please try again.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-medium mb-6">
        Run Self Check for <span className="font-bold">{displayName}</span>
      </h1>

      <SelfCheckForm systemId={id} onSubmit={handleSelfCheck} />
    </div>
  );
}