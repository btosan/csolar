import { evaluateUpgradeOpportunities } from "@/lib/monitoring/evaluateUpgradeOpportunities";
import { generateAdvancedSystemInsight } from "@/lib/ai/generateAdvancedSystemInsight";

interface GenerateAiRecommendationInput {
  systemId: string;
  systemName: string;
  score: number;
  productionScore: number;
  inverterScore: number;
  batteryScore: number;
  activeAlerts: number;
  tx: any;
}

type AiUrgency = "LOW" | "MEDIUM" | "HIGH";

type GenerateAiRecommendationResult = {
  summary: string;
  actionPlan: string;
  urgency: AiUrgency;
};

function normalizeUrgency(value: unknown): AiUrgency {
  if (value === "LOW" || value === "MEDIUM" || value === "HIGH") {
    return value;
  }
  return "MEDIUM";
}

export async function generateAiRecommendation(
  input: GenerateAiRecommendationInput,
): Promise<GenerateAiRecommendationResult> {
  const {
    systemId,
    systemName,
    score,
    productionScore,
    inverterScore,
    batteryScore,
    activeAlerts,
    tx,
  } = input;

  const upgrades = await evaluateUpgradeOpportunities(tx, systemId);
  const upgradeText =
    upgrades.length > 0
      ? upgrades.join("\n- ")
      : "No immediate upgrade opportunities identified.";

  try {
    const ai = await generateAdvancedSystemInsight({
      systemName,
      score,
      summary: `Production: ${productionScore}/100, Inverter: ${inverterScore}/100, Battery: ${batteryScore}/100. Upgrade considerations: ${upgradeText}`,
      productionScore,
      inverterScore,
      batteryScore,
      activeAlerts,
    });

    return {
      summary: `${ai.summary}\n\nUpgrade considerations: ${upgradeText}`,
      actionPlan: ai.actionPlan,
      urgency: normalizeUrgency(ai.urgency),
    };
  } catch (err) {
    console.error("[generateAiRecommendation] Advanced AI failed:", err);

    return {
      summary: `
System "${systemName}" health score: ${score}/100.
Production: ${productionScore}, Inverter: ${inverterScore}, Battery: ${batteryScore}.
Active alerts: ${activeAlerts}.
Upgrades: ${upgradeText}
      `.trim(),
      actionPlan: `
1. Inspect and resolve active alerts promptly.
2. Review upgrade recommendations: ${upgradeText}
3. Continue regular monitoring and self-checks.
      `.trim(),
      urgency:
        score < 50 || activeAlerts > 3
          ? "HIGH"
          : score < 70 || activeAlerts > 0
            ? "MEDIUM"
            : "LOW",
    };
  }
}