// src/lib/monitoring/evaluateUpgradeOpportunities.ts
import { PrismaClient } from "@prisma/client"

export async function evaluateUpgradeOpportunities(
  tx: PrismaClient,
  systemId: string
) {
  // Get last 5 snapshots for trend analysis
  const snapshots = await tx.monitoringSnapshot.findMany({
    where: { systemId },
    orderBy: { date: "desc" },
    take: 5,
  })

  if (snapshots.length === 0) return []

  const suggestions: string[] = []

  // -----------------------------
  // Production consistently low?
  // -----------------------------
  const productionIssues = snapshots.filter(
    (s) =>
      s.expectedGenerationKwh &&
      s.estimatedGenerationKwh &&
      s.estimatedGenerationKwh < s.expectedGenerationKwh * 0.8
  )

  if (productionIssues.length >= 3) {
    suggestions.push(
      "Consider adding more panels or repositioning existing panels to improve energy generation."
    )
  }

  // -----------------------------
  // Battery consistently low / heavily cycled?
  // -----------------------------
  const batteryIssues = snapshots.filter(
    (s) =>
      (s.batteryChargePercent !== undefined && s.batteryChargePercent < 20) ||
      (s.batteryCycles !== undefined && s.batteryCycles > 500)
  )

  if (batteryIssues.length >= 3) {
    suggestions.push(
      "Consider upgrading battery capacity or adding an additional battery to maintain reliable storage."
    )
  }

  return suggestions
}