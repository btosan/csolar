// src/lib/ai/generateAiRecommendation.ts
import { evaluateUpgradeOpportunities } from "@/lib/monitoring/evaluateUpgradeOpportunities";
import { generateSystemInsight } from "@/lib/ai/generateSystemInsight"; // ← reuse your existing OpenRouter function

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

export async function generateAiRecommendation(input: GenerateAiRecommendationInput) {
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
// adding nothing
  // 1. Get upgrade suggestions (keep this as-is)
  const upgrades = await evaluateUpgradeOpportunities(tx, systemId);
  const upgradeText =
    upgrades.length > 0
      ? upgrades.join("\n- ")
      : "No immediate upgrade opportunities identified.";

  // 2. Call your existing OpenRouter function for real AI generation
  try {
    const ai = await generateSystemInsight({
      systemName,
      score,
      summary: `Production: ${productionScore}/100, Inverter: ${inverterScore}/100, Battery: ${batteryScore}/100`,
      productionScore,
      inverterScore,
      batteryScore,
      activeAlerts,
    });

    // Optionally enrich the summary with upgrades (if you want)
    const enrichedSummary = `${ai.summary}\n\nUpgrade considerations: ${upgradeText}`;

    return {
      summary: enrichedSummary,
      actionPlan: ai.actionPlan,
      urgency: ai.urgency,
    };
  } catch (err) {
    console.error("[generateAiRecommendation] AI call failed:", err);

    // Fallback to your original static logic
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