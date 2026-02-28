import { AlertSeverity, AlertStatus, Prisma } from "@prisma/client";

export async function evaluateAlerts(
  tx: Prisma.TransactionClient,
  systemId: string
) {
  const snapshot = await tx.monitoringSnapshot.findFirst({
    where: { systemId },
    orderBy: { date: "desc" },
  });

  if (!snapshot) return;

  // Helper: ensure alert exists OR resolve it
  async function handleAlert(
    type: string,
    condition: boolean,
    severity: AlertSeverity,
    message: string,
    actionHint: string
  ) {
    const existing = await tx.alert.findFirst({
      where: {
        systemId,
        type,
        status: { not: AlertStatus.RESOLVED },
      },
    });

    if (condition) {
      // Create only if no active one exists
      if (!existing) {
        await tx.alert.create({
          data: {
            systemId,
            type,
            message,
            severity,
            actionHint,
          },
        });
      }
    } else {
      // Resolve existing active alerts if condition is no longer true
      if (existing) {
        await tx.alert.updateMany({
          where: {
            systemId,
            type,
            status: { not: AlertStatus.RESOLVED },
          },
          data: {
            status: AlertStatus.RESOLVED,
          },
        });
      }
    }
  }

  // LOW PRODUCTION
  await handleAlert(
    "LOW_PRODUCTION",
    !!(
      snapshot.expectedGenerationKwh &&
      snapshot.estimatedGenerationKwh &&
      snapshot.estimatedGenerationKwh <
        snapshot.expectedGenerationKwh * 0.7
    ),
    AlertSeverity.MEDIUM,
    "Energy generation significantly below expected levels.",
    "Inspect panels for shading or debris."
  );

  // HIGH BATTERY TEMP
  await handleAlert(
    "HIGH_BATTERY_TEMP",
    !!(snapshot.batteryTempC && snapshot.batteryTempC > 55),
    AlertSeverity.HIGH,
    "Battery temperature exceeds safe threshold.",
    "Immediate inspection recommended."
  );

  // LOW INVERTER EFFICIENCY
  await handleAlert(
    "LOW_INVERTER_EFFICIENCY",
    !!(snapshot.inverterEfficiency && snapshot.inverterEfficiency < 85),
    AlertSeverity.MEDIUM,
    "Inverter efficiency below optimal level.",
    "Check inverter diagnostics."
  );
}