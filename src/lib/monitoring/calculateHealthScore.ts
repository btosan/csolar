// lib/monitoring/calculateHealthScore.ts

import { Prisma, SystemStatus } from "@prisma/client"

export async function recalculateHealthScore(
  tx: Prisma.TransactionClient,
  systemId: string
) {
  // ----------------------------------
  // 1️⃣ Get Latest Snapshot
  // ----------------------------------
  const latestSnapshot = await tx.monitoringSnapshot.findFirst({
    where: { systemId },
    orderBy: { date: "desc" },
  })

  if (!latestSnapshot) return null

  // ----------------------------------
  // 2️⃣ Count Active Alerts
  // ----------------------------------
  const activeAlerts = await tx.alert.count({
    where: {
      systemId,
      status: { not: "RESOLVED" },
    },
  })

  // ----------------------------------
  // 3️⃣ Production Score
  // ----------------------------------
  let productionScore = 100

  if (
    latestSnapshot.expectedGenerationKwh &&
    latestSnapshot.estimatedGenerationKwh
  ) {
    const ratio =
      latestSnapshot.estimatedGenerationKwh /
      latestSnapshot.expectedGenerationKwh

    productionScore = Math.max(0, Math.min(100, ratio * 100))
  }

  // ----------------------------------
  // 4️⃣ Inverter Score
  // ----------------------------------
  let inverterScore = 100

  if (latestSnapshot.inverterEfficiency !== null &&
      latestSnapshot.inverterEfficiency !== undefined) {
    inverterScore = Math.max(
      0,
      Math.min(100, latestSnapshot.inverterEfficiency)
    )
  }

  // ----------------------------------
  // 5️⃣ Battery Score
  // ----------------------------------
  let batteryScore = 100

  if (latestSnapshot.batteryHealthPercent !== null &&
      latestSnapshot.batteryHealthPercent !== undefined) {
    batteryScore = Math.max(
      0,
      Math.min(100, latestSnapshot.batteryHealthPercent)
    )
  }

  // ----------------------------------
  // 6️⃣ Alert Penalty
  // ----------------------------------
  const alertPenalty = Math.min(100, activeAlerts * 5)

  // ----------------------------------
  // 7️⃣ Final Weighted Score
  // ----------------------------------
  const finalScore =
    productionScore * 0.35 +
    inverterScore * 0.25 +
    batteryScore * 0.25 -
    alertPenalty * 0.15

  const normalizedScore = Math.max(
    0,
    Math.min(100, Math.round(finalScore))
  )

  // ----------------------------------
  // 8️⃣ Summary Logic
  // ----------------------------------
  let summary = "System operating normally."

  if (normalizedScore < 50) {
    summary = "System requires immediate technical attention."
  } else if (normalizedScore < 70) {
    summary = "System performance below optimal levels."
  }

  // ----------------------------------
  // 9️⃣ Confidence (base value for now)
  // ----------------------------------
  const confidence = 85

  // ----------------------------------
  // 🔟 Create HealthScore Record
  // ----------------------------------
  const healthRecord = await tx.healthScore.create({
    data: {
      systemId,
      score: normalizedScore,
      summary,
      confidence,
      productionScore,
      inverterScore,
      batteryScore,
      alertPenalty,
    },
  })

  // ----------------------------------
  // 🔥 11️⃣ AUTO UPDATE SYSTEM STATUS
  // ----------------------------------
  let newStatus: SystemStatus

  if (normalizedScore < 50) {
    newStatus = SystemStatus.NEEDS_ATTENTION
  } else {
    newStatus = SystemStatus.ACTIVE
  }

  await tx.solarSystem.update({
    where: { id: systemId },
    data: { status: newStatus },
  })

  // ----------------------------------
  // 12️⃣ Return Useful Data
  // ----------------------------------
  return {
    score: normalizedScore,
    status: newStatus,
    healthRecordId: healthRecord.id,
  }
}