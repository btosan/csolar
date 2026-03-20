import { db } from "@/lib/db";
import { AITier, MonitoringSource } from "@prisma/client";
import { recalculateHealthScore } from "@/lib/monitoring/calculateHealthScore";
import { evaluateAlerts } from "@/lib/monitoring/evaluateAlerts";

export type CreateSnapshotInput = {
  systemId: string;
  source: MonitoringSource;
  aiTier?: AITier;

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

type AiResult = {
  summary: string;
  actionPlan: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
};

function safeNumber(
  value: unknown,
  min: number = -Infinity,
  max: number = Infinity,
): number | undefined {
  if (typeof value !== "number" || isNaN(value)) return undefined;
  return Math.max(min, Math.min(max, value));
}

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

  const input: CreateSnapshotInput = {
    systemId,
    source: rawInput.source,
    aiTier: rawInput.aiTier ?? "NONE",

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
    const result = await db.$transaction(
      async (tx) => {
        const snapshot = await tx.monitoringSnapshot.create({
          data: {
            systemId: input.systemId,
            source: input.source,
            date: new Date(),

            estimatedGenerationKwh: input.estimatedGenerationKwh,
            expectedGenerationKwh: input.expectedGenerationKwh,
            consumptionKwh: input.consumptionKwh,

            inverterTempC: input.inverterTempC,
            inverterEfficiency: input.inverterEfficiency,
            inverterOutputKw: input.inverterOutputKw,

            batteryChargePercent: input.batteryChargePercent,
            batteryTempC: input.batteryTempC,
            batteryCycles: input.batteryCycles,
            batteryHealthPercent: input.batteryHealthPercent,

            notes: input.notes,
          },
        });

        await evaluateAlerts(tx, systemId);

        const health = await recalculateHealthScore(tx, systemId);

        return { snapshot, health };
      },
      {
        timeout: 15000,
        maxWait: 5000,
      },
    );

    if (result.health && input.aiTier !== "NONE") {
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

        let ai: AiResult;

        if (input.aiTier === "BASIC") {
          const { generateSystemInsight } = await import(
            "@/lib/ai/generateSystemInsight"
          );

          ai = (await generateSystemInsight({
            systemName: system?.name || "Solar System",
            score: result.health.score,
            summary: `Production: ${result.health.productionScore ?? 0}/100, Inverter: ${result.health.inverterScore ?? 0}/100, Battery: ${result.health.batteryScore ?? 0}/100`,
            productionScore: result.health.productionScore ?? 0,
            inverterScore: result.health.inverterScore ?? 0,
            batteryScore: result.health.batteryScore ?? 0,
            activeAlerts,
          })) as AiResult;
        } else {
          const { generateAiRecommendation } = await import(
            "@/lib/monitoring/generateAiRecommendation"
          );

          ai = await generateAiRecommendation({
            systemId,
            systemName: system?.name || "Solar System",
            score: result.health.score,
            productionScore: result.health.productionScore ?? 0,
            inverterScore: result.health.inverterScore ?? 0,
            batteryScore: result.health.batteryScore ?? 0,
            activeAlerts,
            notes: input.notes,
            tx: db,
          });
        }

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
          error: aiError instanceof Error ? aiError.message : String(aiError),
          stack: aiError instanceof Error ? aiError.stack : undefined,
        });
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
      inputFields: Object.keys(rawInput).filter(
        (k): k is keyof CreateSnapshotInput =>
          rawInput[k as keyof CreateSnapshotInput] != null,
      ),
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    throw new Error("Failed to save system self-check. Please try again later.");
  }
}