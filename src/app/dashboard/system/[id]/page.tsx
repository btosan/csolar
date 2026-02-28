// app/dashboard/system/[id]/page.tsx

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"

interface Props {
  params: { id: string }
}

export default async function SystemDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!user) redirect("/login")

  const system = await db.solarSystem.findFirst({
    where: {
      id: params.id,
      customer: {
        userId: user.id,           // ← nested relation filter
      },
    },
    include: {
      healthScores: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      alerts: {
        where: { status: { not: "RESOLVED" } },
        orderBy: { createdAt: "desc" },
      },
      aiRecommendations: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  })

  if (!system) notFound()

  const health = system.healthScores[0]
  const recommendation = system.aiRecommendations[0]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/dashboard" className="text-sm text-gray-500 mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">{system.name}</h1>

      {/* Health Card */}
      <div className="bg-white shadow rounded-2xl p-8 mb-8">
        {health ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">System Health</h2>

              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  health.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {health.status}
              </span>
            </div>

            <p className="text-5xl font-bold mb-2">
              {health.score}
              <span className="text-lg text-gray-500">/100</span>
            </p>

            <p className="text-gray-500">
              Last updated {new Date(health.createdAt).toLocaleString()}
            </p>
          </>
        ) : (
          <p>No health data available yet.</p>
        )}
      </div>

      {/* Active Alerts */}
      <div className="bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>

        {system.alerts.length === 0 ? (
          <p className="text-gray-500">No active alerts.</p>
        ) : (
          <ul className="space-y-3">
            {system.alerts.map((alert) => (
              <li
                key={alert.id}
                className="border rounded-xl p-4 flex justify-between"
              >
                <div>
                  <p className="font-medium">{alert.type}</p>
                  <p className="text-sm text-gray-500">{alert.message}</p>
                </div>
                <span className="text-sm text-red-600 font-semibold">
                  {alert.severity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* AI Recommendation */}
      <div className="bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">AI System Insight</h2>

        {recommendation ? (
          <>
            <p className="mb-4">{recommendation.summary}</p>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-medium mb-2">Recommended Actions:</p>
              <p className="text-sm whitespace-pre-line">
                {recommendation.actionPlan}
              </p>
            </div>

            <p className="text-sm font-semibold">
              Urgency: {recommendation.urgency}
            </p>
          </>
        ) : (
          <p className="text-gray-500">
            No AI insights generated yet.
          </p>
        )}
      </div>

      {/* Request Technician */}
      <div className="text-right">
        <Link
          href={`/dashboard/system/${system.id}/request-service`}
          className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
        >
          Request Technician
        </Link>
      </div>
    </div>
  )
}
