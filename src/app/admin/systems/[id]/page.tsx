// src/app/admin/systems/[id]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminSystemDetailPage(props: PageProps) {
  const { id } = await props.params;

  // Get session and check role
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard"); // or show 403 page
  }

  // Fetch system (no ownership check — admin sees all)
  const system = await db.solarSystem.findUnique({
    where: { id },
    include: {
      customer: {
        select: {
          name: true,
          phone: true,
          address: true,
          user: { select: { email: true, name: true } },
        },
      },
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
      panelArray: true,
      battery: true,
      inverter: true,
      monitoring: {
        orderBy: { date: "desc" },
        take: 5, // last 5 snapshots for quick view
      },
    },
  });

  if (!system) {
    notFound();
  }

  const health = system.healthScores[0];
  const recommendation = system.aiRecommendations[0];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/admin/monitoring"
        className="text-sm text-gray-500 mb-6 inline-block hover:underline"
      >
        ← Back to Monitoring Dashboard
      </Link>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{system.name}</h1>
          <p className="text-gray-600 mt-1">
            Customer: {system.customer?.name || "Unknown"} •{" "}
            {system.customer?.user?.email || "No user linked"}
          </p>
        </div>

        <span
          className={`px-4 py-2 text-sm font-medium rounded-full ${
            system.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : system.status === "NEEDS_ATTENTION"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {system.status}
        </span>
      </div>

      {/* System Type & Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500">Type</h3>
          <p className="text-xl font-semibold mt-1">{system.systemType}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500">Location</h3>
          <p className="text-xl font-semibold mt-1">{system.location}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500">Installed</h3>
          <p className="text-xl font-semibold mt-1">
            {new Date(system.installationDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* HEALTH CARD */}
      <div className="bg-white shadow rounded-2xl p-8 mb-8">
        {health ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Current Health Score</h2>
              <span className="text-sm text-gray-500">
                Updated {new Date(health.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <p className="text-6xl font-bold">{health.score}</p>
              <span className="text-2xl text-gray-500">/100</span>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Production</span>
                <p className="font-medium">{health.productionScore ?? "—"}</p>
              </div>
              <div>
                <span className="text-gray-500">Inverter</span>
                <p className="font-medium">{health.inverterScore ?? "—"}</p>
              </div>
              <div>
                <span className="text-gray-500">Battery</span>
                <p className="font-medium">{health.batteryScore ?? "—"}</p>
              </div>
              <div>
                <span className="text-gray-500">Confidence</span>
                <p className="font-medium">{health.confidence}%</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No health data available yet.
          </p>
        )}
      </div>

      {/* ACTIVE ALERTS */}
      <div className="bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">Active Alerts</h2>

        {system.alerts.length === 0 ? (
          <p className="text-gray-500">No unresolved alerts at this time.</p>
        ) : (
          <ul className="space-y-4">
            {system.alerts.map((alert) => (
              <li
                key={alert.id}
                className="border-l-4 pl-4 py-2 flex justify-between items-start gap-4"
                style={{
                  borderLeftColor:
                    alert.severity === "HIGH"
                      ? "#ef4444"
                      : alert.severity === "MEDIUM"
                      ? "#f59e0b"
                      : "#10b981",
                }}
              >
                <div className="flex-1">
                  <p className="font-medium text-lg">{alert.type}</p>
                  <p className="text-gray-700 mt-1">{alert.message}</p>
                  {alert.actionHint && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      Suggested: {alert.actionHint}
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    alert.severity === "HIGH"
                      ? "bg-red-100 text-red-700"
                      : alert.severity === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {alert.severity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* AI RECOMMENDATION */}
      <div className="bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">Latest AI Insight</h2>

        {recommendation ? (
          <>
            <p className="text-lg mb-6 leading-relaxed">
              {recommendation.summary}
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="font-medium text-gray-800 mb-3">
                Recommended Actions:
              </p>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {recommendation.actionPlan}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span
                className={`font-semibold px-4 py-1 rounded-full ${
                  recommendation.urgency === "HIGH"
                    ? "bg-red-100 text-red-700"
                    : recommendation.urgency === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Urgency: {recommendation.urgency}
              </span>
              <span className="text-gray-500">
                Generated {new Date(recommendation.createdAt).toLocaleString()}
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No AI recommendation generated yet.
          </p>
        )}
      </div>

      {/* Hardware Assets (admin-only visibility) */}
      <div className="bg-white shadow rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">Installed Hardware</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panels */}
          {system.panelArray && (
            <div className="border rounded-xl p-5">
              <h3 className="font-medium mb-2">Panel Array</h3>
              <p>
                <strong>Capacity:</strong> {system.panelArray.capacityKw} kW
              </p>
              <p>
                <strong>Quantity:</strong> {system.panelArray.quantity}
              </p>
              {system.panelArray.brand && (
                <p>
                  <strong>Brand/Model:</strong> {system.panelArray.brand}{" "}
                  {system.panelArray.model}
                </p>
              )}
            </div>
          )}

          {/* Battery */}
          {system.battery && (
            <div className="border rounded-xl p-5">
              <h3 className="font-medium mb-2">Battery</h3>
              <p>
                <strong>Type:</strong> {system.battery.type}
              </p>
              <p>
                <strong>Capacity:</strong> {system.battery.capacityKwh} kWh
              </p>
              {system.battery.brand && (
                <p>
                  <strong>Brand/Model:</strong> {system.battery.brand}{" "}
                  {system.battery.model}
                </p>
              )}
              {system.battery.healthEstimate && (
                <p>
                  <strong>Health Estimate:</strong>{" "}
                  {system.battery.healthEstimate}%
                </p>
              )}
            </div>
          )}

          {/* Inverter */}
          {system.inverter && (
            <div className="border rounded-xl p-5">
              <h3 className="font-medium mb-2">Inverter</h3>
              <p>
                <strong>Brand/Model:</strong> {system.inverter.brand}{" "}
                {system.inverter.model}
              </p>
              <p>
                <strong>Capacity:</strong> {system.inverter.capacityKw} kW
              </p>
              {system.inverter.serialNumber && (
                <p>
                  <strong>Serial:</strong> {system.inverter.serialNumber}
                </p>
              )}
              <p>
                <strong>Integration:</strong>{" "}
                {system.inverter.supportsIntegration ? "Yes" : "No"}
              </p>
            </div>
          )}
        </div>

        {!system.panelArray && !system.battery && !system.inverter && (
          <p className="text-gray-500 text-center py-8">
            No hardware details recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}