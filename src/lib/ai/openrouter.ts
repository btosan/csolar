import axios from "axios"

export async function generateSystemInsight(input: {
  systemName: string
  score: number
  summary: string
  productionScore: number
  inverterScore: number
  batteryScore: number
  activeAlerts: number
}) {
  const prompt = `
You are a solar energy system diagnostic assistant.

System: ${input.systemName}
Health Score: ${input.score}
Summary: ${input.summary}

Production Score: ${input.productionScore}
Inverter Score: ${input.inverterScore}
Battery Score: ${input.batteryScore}
Active Alerts: ${input.activeAlerts}

Provide:
1. A short explanation (customer friendly)
2. A recommended action plan
3. Urgency level: LOW, MEDIUM, HIGH

Respond in JSON:
{
  "summary": "...",
  "actionPlan": "...",
  "urgency": "LOW|MEDIUM|HIGH"
}
`

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  )

  const text = response.data.choices[0].message.content

  try {
    return JSON.parse(text)
  } catch {
    return {
      summary: "AI analysis unavailable.",
      actionPlan: "Please consult technician.",
      urgency: "LOW",
    }
  }
}