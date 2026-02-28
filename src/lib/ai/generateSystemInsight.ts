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

export async function generateSystemInsight(
  input: SystemInsightInput,
): Promise<SystemInsightOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  if (!apiKey) {
    console.error("[generateSystemInsight] Missing GROQ_API_KEY — using fallback");
    return fallbackInsight(input);
  }

  const prompt = `
You are a solar monitoring assistant that ALWAYS responds with NOTHING but valid JSON. 
No explanations, no markdown, no extra text, no fences like \`\`\`json — only the raw JSON object.

System status:
- Name: ${input.systemName}
- Health Score: ${input.score}/100
- Production Score: ${input.productionScore}/100
- Inverter Score: ${input.inverterScore}/100
- Battery Score: ${input.batteryScore}/100
- Active Alerts: ${input.activeAlerts}
- Additional context: ${input.summary || "No extra information"}

Output exactly this JSON structure (use \\n for line breaks inside strings):
{
  "summary": "One or two sentence explanation of current system health",
  "actionPlan": "1. First recommended action\\n2. Second action\\n3. Third action if needed",
  "urgency": "LOW" | "MEDIUM" | "HIGH"
}

Your entire response must be valid parseable JSON — start with { and end with }.
`;

  try {
    console.log("[generateSystemInsight] Sending request to Groq", {
      model,
      promptLength: prompt.length,
      temperature: 0.3,
      maxTokens: 280,
    });

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model,
        messages: [
          {
            role: "system",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 280,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }
    );

    let content = response.data.choices[0].message.content.trim();

    content = content
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/i, "")
      .replace(/^`\s*/i, "")
      .replace(/\s*`$/i, "")
      .trim();

    console.log("[generateSystemInsight] Raw Groq content:", content.substring(0, 200) + "...");

    const parsed = JSON.parse(content);

    if (
      typeof parsed.summary !== "string" ||
      typeof parsed.actionPlan !== "string" ||
      !["LOW", "MEDIUM", "HIGH"].includes(parsed.urgency)
    ) {
      console.warn("[generateSystemInsight] Parsed but invalid structure — fallback", parsed);
      return fallbackInsight(input);
    }

    return {
      summary: parsed.summary.trim(),
      actionPlan: parsed.actionPlan.trim(),
      urgency: parsed.urgency
    };

  } catch (error: any) {
    console.error("[generateSystemInsight] Groq request failed:", {
      status: error.response?.status,
      groqMessage: error.response?.data?.error?.message || error.response?.data || error.message,
      code: error.code,
      fullError: error.toString()
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
    summary: `System "${input.systemName}" has health score ${score}/100 and ${alerts} active alert${alerts !== 1 ? "s" : ""}.`,
    actionPlan: "1. Review alerts in dashboard.\n2. Check inverter/battery readings.\n3. Contact support if unresolved.",
    urgency
  };
}