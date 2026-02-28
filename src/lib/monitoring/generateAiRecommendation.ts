// src/lib/ai/generateAiRecommendation.ts
import { OpenAI } from "openai"
import { evaluateUpgradeOpportunities } from "@/lib/monitoring/evaluateUpgradeOpportunities"

interface GenerateAiRecommendationInput {
  systemId: string
  systemName: string
  score: number
  productionScore: number
  inverterScore: number
  batteryScore: number
  activeAlerts: number
  tx: any // Prisma transaction
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
  } = input

  // -----------------------------
  // 1️⃣ Upgrade suggestions
  // -----------------------------
  const upgrades = await evaluateUpgradeOpportunities(tx, systemId)
  const upgradeText = upgrades.length > 0 ? upgrades.join(" ") : "No immediate upgrade needed."

  // -----------------------------
  // 2️⃣ AI Summary generation
  // Here you could call OpenAI / OpenRouter for natural text
  // -----------------------------
  const summary = `
System "${systemName}" health score: ${score}/100.
Production: ${productionScore}, Inverter: ${inverterScore}, Battery: ${batteryScore}.
Active alerts: ${activeAlerts}.
${upgradeText}
`

  // -----------------------------
  // 3️⃣ Action plan suggestion
  // -----------------------------
  const actionPlan = `
1. Inspect active alerts and resolve issues promptly.
2. Follow the upgrade recommendations: ${upgradeText}
3. Schedule regular monitoring checks to maintain system health.
`

  // -----------------------------
  // 4️⃣ Urgency based on score
  // -----------------------------
  let urgency: "LOW" | "MEDIUM" | "HIGH" = "LOW"
  if (score < 50 || activeAlerts > 3) urgency = "HIGH"
  else if (score < 70 || activeAlerts > 0) urgency = "MEDIUM"

  return { summary, actionPlan, urgency }
}