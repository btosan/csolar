// src/lib/actions/monitoring.ts
import { db } from "@/lib/db";
import { MonitoringSource } from "@prisma/client";
import { recalculateHealthScore } from "@/lib/monitoring/calculateHealthScore";
import { evaluateAlerts } from "@/lib/monitoring/evaluateAlerts";
import { generateAiRecommendation } from "@/lib/monitoring/generateAiRecommendation";

export type CreateSnapshotInput = {
  systemId: string;
  source: MonitoringSource;

  estimatedGenerationKwh?: number;
  expectedGenerationKwh?: number;
  consumptionKwh?: number;

  inverterTempC?: number;
  inverterEfficiency?: number;
  inverterOutputKw?: number;

  batteryChargePercent?: number;
  batteryTempC?: number;
  batteryCycles?: number;
  batteryHealthPercent?: number;

  notes?: string;
};

/**
 * Safe number parser – clamps values to realistic ranges and returns undefined for invalid input
 */
function safeNumber(
  value: unknown,
  min: number = -Infinity,
  max: number = Infinity,
): number | undefined {
  if (typeof value !== "number" || isNaN(value)) return undefined;
  return Math.max(min, Math.min(max, value));
}

/**
 * Safe integer parser
 */
function safeInteger(value: unknown): number | undefined {
  if (typeof value !== "number" || isNaN(value) || !Number.isInteger(value)) {
    return undefined;
  }
  return value;
}

export async function createMonitoringSnapshot(
  rawInput: CreateSnapshotInput,
): Promise<{ id: string; date: Date }> {
  const systemId = rawInput.systemId;

  // Sanitize / normalize input values before saving
  const input: CreateSnapshotInput = {
    systemId,
    source: rawInput.source,

    estimatedGenerationKwh: safeNumber(rawInput.estimatedGenerationKwh, 0),
    expectedGenerationKwh: safeNumber(rawInput.expectedGenerationKwh, 0),
    consumptionKwh: safeNumber(rawInput.consumptionKwh, 0),

    inverterTempC: safeNumber(rawInput.inverterTempC, -20, 100),
    inverterEfficiency: safeNumber(rawInput.inverterEfficiency, 0, 100),
    inverterOutputKw: safeNumber(rawInput.inverterOutputKw, 0),

    batteryChargePercent: safeNumber(rawInput.batteryChargePercent, 0, 100),
    batteryTempC: safeNumber(rawInput.batteryTempC, -20, 80),
    batteryCycles: safeInteger(rawInput.batteryCycles),
    batteryHealthPercent: safeNumber(rawInput.batteryHealthPercent, 0, 100),

    notes: rawInput.notes?.trim() || undefined,
  };

  try {
    // ────────────────────────────────────────────────
    // 1. Transaction: snapshot + alerts + health score
    // ────────────────────────────────────────────────
    const result = await db.$transaction(
      async (tx) => {
        const snapshot = await tx.monitoringSnapshot.create({
          data: {
            ...input,
            date: new Date(),
          },
        });

        await evaluateAlerts(tx, systemId);

        const health = await recalculateHealthScore(tx, systemId);

        return { snapshot, health };
      },
      {
        timeout: 15000,   // 15 seconds max for the whole transaction (default: 5000ms)
        maxWait: 5000,    // 5 seconds max wait to get a transaction slot (default: 2000ms)
        // isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted, // optional if needed
      }
    );

    // ────────────────────────────────────────────────
    // 2. AI Recommendation (non-critical – failure is tolerated)
    // ────────────────────────────────────────────────
    if (result.health) {
      try {
        const system = await db.solarSystem.findUnique({
          where: { id: systemId },
          select: { name: true },
        });

        const activeAlerts = await db.alert.count({
          where: {
            systemId,
            status: { not: "RESOLVED" },
          },
        });

        const ai = await generateAiRecommendation({
          systemId,
          systemName: system?.name || "Solar System",
          score: result.health.score,
          productionScore: result.health.productionScore,
          inverterScore: result.health.inverterScore,
          batteryScore: result.health.batteryScore,
          activeAlerts,
          tx: db,
        });

        await db.aiRecommendation.create({
          data: {
            systemId,
            healthScoreId: result.health.healthRecordId,
            summary: ai.summary,
            actionPlan: ai.actionPlan,
            urgency: ai.urgency,
          },
        });
      } catch (aiError) {
        console.error("[createMonitoringSnapshot:AI] Failed", {
          systemId,
          error:
            aiError instanceof Error ? aiError.message : String(aiError),
          stack: aiError instanceof Error ? aiError.stack : undefined,
        });
        // Do NOT re-throw – snapshot should still be considered successful
      }
    }

    return {
      id: result.snapshot.id,
      date: result.snapshot.date,
    };
  } catch (error) {
    console.error("[createMonitoringSnapshot] Failed", {
      systemId,
      source: rawInput.source,
      inputFields: Object.keys(rawInput).filter((k) => rawInput[k] != null),
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    throw new Error("Failed to save system self-check. Please try again.");
  }
}