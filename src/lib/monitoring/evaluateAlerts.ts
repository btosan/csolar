// lib/monitoring/evaluateAlerts.ts

import { PrismaClient, AlertSeverity } from "@prisma/client"

export async function evaluateAlerts(
  tx: PrismaClient,
  systemId: string
) {
  const snapshot = await tx.monitoringSnapshot.findFirst({
    where: { systemId },
    orderBy: { date: "desc" },
  })

  if (!snapshot) return

  // LOW PRODUCTION
  if (
    snapshot.expectedGenerationKwh &&
    snapshot.estimatedGenerationKwh &&
    snapshot.estimatedGenerationKwh <
      snapshot.expectedGenerationKwh * 0.7
  ) {
    await tx.alert.create({
      data: {
        systemId,
        type: "LOW_PRODUCTION",
        message: "Energy generation significantly below expected levels.",
        severity: AlertSeverity.MEDIUM,
        actionHint: "Inspect panels for shading or debris.",
      },
    })
  }

  // HIGH BATTERY TEMP
  if (snapshot.batteryTempC && snapshot.batteryTempC > 55) {
    await tx.alert.create({
      data: {
        systemId,
        type: "HIGH_BATTERY_TEMP",
        message: "Battery temperature exceeds safe threshold.",
        severity: AlertSeverity.HIGH,
        actionHint: "Immediate inspection recommended.",
      },
    })
  }

  // LOW INVERTER EFFICIENCY
  if (
    snapshot.inverterEfficiency &&
    snapshot.inverterEfficiency < 85
  ) {
    await tx.alert.create({
      data: {
        systemId,
        type: "LOW_INVERTER_EFFICIENCY",
        message: "Inverter efficiency below optimal level.",
        severity: AlertSeverity.MEDIUM,
        actionHint: "Check inverter diagnostics.",
      },
    })
  }
}