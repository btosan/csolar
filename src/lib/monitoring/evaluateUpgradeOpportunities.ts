// src/lib/monitoring/evaluateUpgradeOpportunities.ts
import { PrismaClient } from "@prisma/client";

export async function evaluateUpgradeOpportunities(
  tx: PrismaClient,
  systemId: string
) {
  const snapshots = await tx.monitoringSnapshot.findMany({
    where: { systemId },
    orderBy: { date: "desc" },
    take: 5,
  });

  if (snapshots.length === 0) return [];

  const suggestions: string[] = [];

  // Production issues (unchanged – already safe)
  const productionIssues = snapshots.filter(
    (s) =>
      s.expectedGenerationKwh &&
      s.estimatedGenerationKwh &&
      s.estimatedGenerationKwh < s.expectedGenerationKwh * 0.8
  );

  if (productionIssues.length >= 3) {
    suggestions.push(
      "Consider adding more panels or repositioning existing panels to improve energy generation."
    );
  }

  // Battery issues – FIXED with safe access
  const batteryIssues = snapshots.filter((s) => {
    const charge = s.batteryChargePercent;
    const cycles = s.batteryCycles;

    return (
      (charge != null && charge < 20) ||   // null/undefined safe
      (cycles != null && cycles > 500)
    );
  });

  if (batteryIssues.length >= 3) {
    suggestions.push(
      "Consider upgrading battery capacity or adding an additional battery to maintain reliable storage."
    );
  }

  return suggestions;
}