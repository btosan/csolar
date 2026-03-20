import OpenAI from "openai";

interface SystemInsightInput {
  systemName: string;
  score: number;
  summary: string;
  productionScore: number;
  inverterScore: number;
  batteryScore: number;
  activeAlerts: number;
  notes?: string;
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
          content: `
You are an expert solar monitoring analyst for residential and small commercial solar systems.

Your task is to generate a noticeably more advanced recommendation than a basic package would provide.

Rules:
- Return VALID JSON only.
- Be specific, practical, diagnostic, and noticeably more detailed than a basic AI response.
- Use the system metrics to explain what is likely happening.
- If user notes are provided, incorporate them directly into the analysis and recommendations.
- Mention likely causes where reasonable, but do not invent unavailable measurements.
- Distinguish clearly between generation issues, inverter issues, battery issues, and user-observed symptoms.
- The summary should feel like an expert interpretation, not a generic sentence.
- The action plan should be detailed, structured, and operationally useful.
- The action plan should include:
  1. Immediate checks
  2. Likely interpretation
  3. Probable root cause
  4. Recommended corrective actions
  5. Monitoring / follow-up guidance
  6. Extra notes based on user observations when available
  7. If urgency is HIGH, include a technician scope explaining what a technician should specifically inspect or fix
- Keep the tone clear, helpful, and professional.
          `.trim(),
        },
        {
          role: "user",
          content: `
Analyze this solar system and produce a detailed advanced maintenance and optimization recommendation.

System Name: ${input.systemName}
Overall Health Score: ${input.score}/100
Production Score: ${input.productionScore}/100
Inverter Score: ${input.inverterScore}/100
Battery Score: ${input.batteryScore}/100
Active Alerts: ${input.activeAlerts}
System Summary Context: ${input.summary}
Customer Self-Check Notes / Unusual Behavior: ${input.notes?.trim() || "None provided"}

Important:
- Use the notes if present.
- If notes mention unusual behavior like blinking lights, beeping, no power output, sudden shutdowns, overheating, unusual noise, error codes, reduced backup time, swelling, not charging, acid leak, odor, odour, fast charging, fast discharging, power drops, hot spots, physical damage, sparking, hot batteries, burning smell, strange noise, low output, heat, fast battery drain, or inconsistent performance, reflect that directly in the explanation and recommendations.
- Make the analysis richer than the basic package.
- Explain which area looks weakest and why.
- Mention whether the issue appears mostly production-related, inverter-related, battery-related, or mixed.
- If the notes reinforce the weakest metrics, explicitly say so.
- Avoid vague wording.

Return ONLY valid JSON in this exact shape:
{
  "summary": "A detailed but readable expert summary in 2-4 sentences.",
  "actionPlan": "1. Immediate checks: ...\\n2. Likely interpretation: ...\\n3. Probable root cause: ...\\n4. Recommended actions: ...\\n5. Monitoring and follow-up: ...\\n6. Extra note: ...\\n7. Technician scope (if urgency is HIGH): ...",
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
  const productionScore = input.productionScore ?? 0;
  const inverterScore = input.inverterScore ?? 0;
  const batteryScore = input.batteryScore ?? 0;
  const notes = input.notes?.trim();

  let urgency: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (score < 50 || alerts > 3 || inverterScore < 50 || batteryScore < 50) {
    urgency = "HIGH";
  } else if (score < 70 || alerts > 0 || productionScore < 70) {
    urgency = "MEDIUM";
  }

  const weakestValue = Math.min(productionScore, inverterScore, batteryScore);

  const weakestArea =
    weakestValue === productionScore
      ? "production"
      : weakestValue === inverterScore
        ? "inverter"
        : "battery";

  const performanceType =
    productionScore < 70 && inverterScore < 70 && batteryScore < 70
      ? "mixed performance issue"
      : weakestArea === "production"
        ? "production-related issue"
        : weakestArea === "inverter"
          ? "inverter-related issue"
          : "battery-related issue";

  const probableRootCause =
    weakestArea === "production"
      ? "lower-than-expected generation, shading or soiling effects, panel-side losses, or a mismatch between expected and actual output"
      : weakestArea === "inverter"
        ? "reduced inverter efficiency, thermal stress, warning-state operation, or unstable conversion performance"
        : "battery health decline, charging and discharging imbalance, temperature-related stress, or reduced storage effectiveness";

  const technicianScope =
    urgency === "HIGH"
      ? `7. Technician scope: A technician should carry out a detailed inspection of the ${weakestArea} side of the system, including wiring integrity, connector condition, component behavior under load, visible thermal stress, and any fault indicators related to ${weakestArea}. The technician should also confirm whether the customer-reported symptoms can be reproduced during operation.`
      : null;

  return {
    summary: `Advanced review for "${input.systemName}": overall health is ${score}/100 with ${alerts} active alert${alerts !== 1 ? "s" : ""}. The weakest area appears to be ${weakestArea}, which suggests a likely ${performanceType}. ${notes ? `The self-check notes report: "${notes}". This user observation should be treated as an additional diagnostic clue and may help explain the current performance pattern.` : "No unusual behavior was reported during the self-check, so the recommendation is based mainly on performance metrics and active alerts."}`,
    actionPlan: [
      `1. Immediate checks: Review active alerts, confirm whether the latest readings are stable, and inspect the ${weakestArea} side of the system first. Pay close attention to any mismatch between expected generation and actual output, inverter condition, and battery condition.`,
      `2. Likely interpretation: Production score is ${productionScore}/100, inverter score is ${inverterScore}/100, and battery score is ${batteryScore}/100. This indicates that the main current limitation is around ${weakestArea}, and the overall pattern points to a ${performanceType}.`,
      `3. Probable root cause: The current data most strongly suggests ${probableRootCause}.${notes ? ` The reported unusual behavior ("${notes}") may support this interpretation if it happens during low-output periods, inverter events, or unstable battery performance.` : ""}`,
      `4. Recommended actions: Check for loose or degraded wiring, inverter warning indicators, abnormal battery behavior, thermal stress, and recent drops in output. If the issue continues after basic inspection and reset checks, schedule a technician visit for deeper diagnosis.`,
      `5. Monitoring and follow-up: Compare the next few days of generation, inverter readings, battery behavior, and alert activity against expected performance. If readings remain unstable or continue trending downward, escalate maintenance priority.`,
      `6. Extra note: ${notes ? `Customer-reported unusual behavior should be included in diagnosis: "${notes}". If this symptom started recently or appears intermittently, document when it occurs and whether it matches low production periods, inverter events, or battery discharge events.` : "No additional unusual behavior was reported by the user."}`,
      ...(technicianScope ? [technicianScope] : []),
    ].join("\n"),
    urgency,
  };
}