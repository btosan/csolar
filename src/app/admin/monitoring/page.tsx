// src/app/admin/monitoring/page.tsx
export const dynamic = 'force-dynamic';

import { db } from "@/lib/db";
import Link from "next/link";

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
    <div className=" max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-2xl font-bold">Monitoring Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Systems</h3>
          <p className="text-3xl font-bold mt-2">{totalSystems}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Health</h3>
          <p className="text-3xl font-bold mt-2">{Math.round(avgHealth)}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Needs Attention
          </h3>
          <p className="text-3xl font-bold mt-2">
            {systemsNeedingAttention.length}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-10 mb-6">Systems Overview</h2>

        {systems.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No solar systems found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system) => {
              const score = system.healthScores[0]?.score ?? 100;
              const alertCount = system.alerts.length;

              return (
                <Link
                  href={`/admin/systems/${system.id}`}
                  key={system.id}
                  className="block group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div
                    className=""
                  >
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                      {system.name}
                    </h3>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Score</span>
                      <span
                        className={`font-medium ${
                          score >= 80
                            ? "text-green-600"
                            : score >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {score}/100
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Alerts</span>
                      <span
                        className={`font-medium ${
                          alertCount === 0
                            ? "text-green-600"
                            : alertCount <= 2
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {alertCount}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>
                        {system.systemType} • {system.location}
                      </span>
                      <span>
                        {new Date(system.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}