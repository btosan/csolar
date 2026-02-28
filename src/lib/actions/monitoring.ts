import { db } from "@/lib/db"
import { MonitoringSource } from "@prisma/client"
import { recalculateHealthScore } from "@/lib/monitoring/calculateHealthScore"
import { evaluateAlerts } from "@/lib/monitoring/evaluateAlerts"
import { generateSystemInsight } from "@/lib/ai/openrouter"

type CreateSnapshotInput = {
  systemId: string
  source: MonitoringSource

  estimatedGenerationKwh?: number
  expectedGenerationKwh?: number
  consumptionKwh?: number

  inverterTempC?: number
  inverterEfficiency?: number
  inverterOutputKw?: number

  batteryChargePercent?: number
  batteryTempC?: number
  batteryCycles?: number
  batteryHealthPercent?: number

  notes?: string
}

export async function createMonitoringSnapshot(data: CreateSnapshotInput) {
  const result = await db.$transaction(async (tx) => {
    const snapshot = await tx.monitoringSnapshot.create({
      data: {
        ...data,
        date: new Date(),
      },
    })

    await evaluateAlerts(tx, data.systemId)

    const health = await recalculateHealthScore(tx, data.systemId)

    return { snapshot, health }
  })

  // 🧠 AI Layer (Outside Transaction)
  if (result.health && result.health.score < 80) {
    const system = await db.solarSystem.findUnique({
      where: { id: data.systemId },
      select: { name: true },
    })

    const activeAlerts = await db.alert.count({
      where: {
        systemId: data.systemId,
        status: { not: "RESOLVED" },
      },
    })

    const ai = await generateSystemInsight({
      systemName: system?.name || "Solar System",
      score: result.health.score,
      summary: "", // optional if you want
      productionScore: result.health.productionScore,
      inverterScore: result.health.inverterScore,
      batteryScore: result.health.batteryScore,
      activeAlerts,
    })

    await db.aiRecommendation.create({
      data: {
        systemId: data.systemId,
        healthScoreId: result.health.healthRecordId,
        summary: ai.summary,
        actionPlan: ai.actionPlan,
        urgency: ai.urgency,
      },
    })
  }

  return result.snapshot
}