// src/lib/ai/generateSystemInsight.ts
import axios from "axios";

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

// Debug logs — remove later if you want
console.log("=== generateSystemInsight LOADED ===");
console.log("OPENROUTER_API_KEY exists:", !!process.env.OPENROUTER_API_KEY);
console.log("OPENROUTER_MODEL:", process.env.OPENROUTER_MODEL || "NOT SET");
console.log("=== END DEBUG ===");

export async function generateSystemInsight(
  input: SystemInsightInput,
): Promise<SystemInsightOutput> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  // Debug: log every time the function is called
  console.log("[generateSystemInsight] Called with input:", {
    systemName: input.systemName,
    score: input.score,
    activeAlerts: input.activeAlerts,
  });

  if (!apiKey) {
    console.error("[generateSystemInsight] Missing OPENROUTER_API_KEY — using fallback");
    return fallbackInsight(input);
  }

  const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";

  console.log("[generateSystemInsight] Using model:", model);

  const prompt = `
You are an expert solar energy diagnostic assistant for homeowners and technicians.

System details:
- Name: ${input.systemName}
- Overall Health Score: ${input.score}/100
- Production Score: ${input.productionScore}/100
- Inverter Score: ${input.inverterScore}/100
- Battery Score: ${input.batteryScore}/100
- Active unresolved alerts: ${input.activeAlerts}
- Additional context: ${input.summary || "No additional details provided"}

Task:
Respond ONLY with valid JSON. No extra text, no explanations, no markdown.

{
  "summary": "Short, friendly, customer-oriented explanation (2-4 sentences)",
  "actionPlan": "Numbered list of clear next steps (3-6 items max)",
  "urgency": "LOW" | "MEDIUM" | "HIGH"
}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages: [
          {
            role: "system",
            content: "Respond strictly in JSON format only. No extra text.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 500,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );

    const content = response.data.choices?.[0]?.message?.content?.trim() || "";

    if (!content) {
      throw new Error("Empty response from OpenRouter");
    }

    console.log("[generateSystemInsight] Raw AI response:", content.substring(0, 200) + "...");

    const parsed = JSON.parse(content);

    if (
      typeof parsed.summary !== "string" ||
      typeof parsed.actionPlan !== "string" ||
      !["LOW", "MEDIUM", "HIGH"].includes(parsed.urgency)
    ) {
      throw new Error("Invalid AI response structure");
    }

    console.log("[generateSystemInsight] Success — returning real AI output");
    return parsed as SystemInsightOutput;
  } catch (error: any) {
    console.error("[generateSystemInsight] Failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
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
    summary: `Your system "${input.systemName}" has a health score of ${score}/100 with ${alerts} active alerts. We're currently unable to generate detailed AI insights.`,
    actionPlan:
      "1. Review alerts in the dashboard.\n2. Check system readings manually.\n3. Contact support if needed.",
    urgency,
  };
}