// src/app/admin/monitoring/page.tsx
export const dynamic = 'force-dynamic'; // ← ADD THIS LINE

import { db } from "@/lib/db";

export default async function AdminMonitoringPage() {
  const systems = await db.solarSystem.findMany({
    include: {
      healthScores: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      alerts: {
        where: { status: { not: "RESOLVED" } },
      },
    },
  });

  const totalSystems = systems.length;
  const avgHealth =
    systems.reduce((acc, s) => {
      const score = s.healthScores[0]?.score ?? 100;
      return acc + score;
    }, 0) / (totalSystems || 1);

  const systemsNeedingAttention = systems.filter(
    (s) => (s.healthScores[0]?.score ?? 100) < 60
  );

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Monitoring Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div>Total Systems: {totalSystems}</div>
        <div>Average Health: {Math.round(avgHealth)}</div>
        <div>Systems Needing Attention: {systemsNeedingAttention.length}</div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">Systems Overview</h2>

        <div className="space-y-4 mt-4">
          {systems.map((system) => {
            const score = system.healthScores[0]?.score ?? 100;

            return (
              <div key={system.id} className="border p-4 rounded">
                <div className="font-semibold">{system.name}</div>
                <div>Health Score: {score}</div>
                <div>Active Alerts: {system.alerts.length}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}