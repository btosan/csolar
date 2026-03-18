import OpenAI from "openai";

interface SystemInsightInput {
  systemName: string;
  score: number;
  summary: string;
  productionScore: number;
  inverterScore: number;
  batteryScore: number;
  activeAlerts: number;
}

interface SystemInsightOutput {
  summary: string;
  actionPlan: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAdvancedSystemInsight(
  input: SystemInsightInput,
): Promise<SystemInsightOutput> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("[generateAdvancedSystemInsight] Missing OPENAI_API_KEY — using fallback");
    return fallbackInsight(input);
  }

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_ADVANCED_MODEL || "gpt-4.1",
      input: [
        {
          role: "system",
          content:
            "You are an expert solar monitoring analyst. Return valid JSON only.",
        },
        {
          role: "user",
          content: `
Analyze this solar system and produce a concise but useful maintenance and optimization recommendation.

System Name: ${input.systemName}
Health Score: ${input.score}/100
Production Score: ${input.productionScore}/100
Inverter Score: ${input.inverterScore}/100
Battery Score: ${input.batteryScore}/100
Active Alerts: ${input.activeAlerts}
Summary Context: ${input.summary}

Return ONLY valid JSON in this exact shape:
{
  "summary": "short explanation",
  "actionPlan": "1. step one\\n2. step two\\n3. step three",
  "urgency": "LOW" | "MEDIUM" | "HIGH"
}
          `.trim(),
        },
      ],
    });

    const text = response.output_text?.trim();

    if (!text) {
      return fallbackInsight(input);
    }

    const parsed = JSON.parse(text);

    if (
      typeof parsed.summary !== "string" ||
      typeof parsed.actionPlan !== "string" ||
      !["LOW", "MEDIUM", "HIGH"].includes(parsed.urgency)
    ) {
      return fallbackInsight(input);
    }

    return {
      summary: parsed.summary.trim(),
      actionPlan: parsed.actionPlan.trim(),
      urgency: parsed.urgency,
    };
  } catch (error) {
    console.error("[generateAdvancedSystemInsight] Failed:", error);
    return fallbackInsight(input);
  }
}

function fallbackInsight(input: SystemInsightInput): SystemInsightOutput {
  const score = input.score ?? 0;
  const alerts = input.activeAlerts ?? 0;

  let urgency: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (score < 50 || alerts > 3) urgency = "HIGH";
  else if (score < 70 || alerts > 0) urgency = "MEDIUM";

  return {
    summary: `Advanced review for "${input.systemName}": system health is ${score}/100 with ${alerts} active alert${alerts !== 1 ? "s" : ""}.`,
    actionPlan:
      "1. Review current alerts and performance drop.\n2. Check inverter and battery trends.\n3. Schedule maintenance if issues persist.",
    urgency,
  };
}