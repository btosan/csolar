// app/dashboard/page.tsx

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  // Get user with role + customer relation
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      role: true,
      customer: {
        select: { id: true },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  /**
   * 🔒 PRODUCTION-SAFE FIX
   * If role = CUSTOMER but no Customer row exists,
   * create one automatically.
   */
  if (!user.customer) {
    if (user.role === "CUSTOMER") {
      await db.customer.create({
        data: {
          userId: user.id,
          name: user.name ?? "Customer",
        },
      })

      // Reload so relation is available
      redirect("/dashboard")
    }

    // ADMIN / TECHNICIAN without customer should not access this page
    redirect("/login")
  }

  const systems = await db.solarSystem.findMany({
    where: { customerId: user.customer.id },
    include: {
      healthScores: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      alerts: {
        where: { status: { not: "RESOLVED" } },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="w-full mx-auto flex items-center justify-center text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
        Welcome back{user.name ? `, ${user.name}` : ""}
      </h1>

      {systems.length === 0 ? (
        <div className="bg-white shadow rounded-2xl p-8 text-center">
          <p className="text-gray-600 mb-4">
            You don’t have any registered solar systems yet.
          </p>
          <Link
            href="/dashboard/system/self-check"
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
          >
            Register System
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {systems.map((system) => {
            const latestHealth = system.healthScores[0]
            const activeAlertsCount = system.alerts.length

            return (
              <Link
                key={system.id}
                href={`/dashboard/system/${system.id}`}
                className="block bg-white shadow hover:shadow-lg transition rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{system.name}</h2>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      system.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : system.status === "NEEDS_ATTENTION"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {system.status}
                  </span>
                </div>

                {latestHealth ? (
                  <div className="mb-3">
                    <p className="text-4xl font-bold">
                      {latestHealth.score}
                      <span className="text-lg font-medium text-gray-500">
                        /100
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      System Health Score
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-3">
                    No health data yet.
                  </p>
                )}

                {activeAlertsCount > 0 && (
                  <p className="text-sm text-red-600 font-medium">
                    {activeAlertsCount} Active Alert
                    {activeAlertsCount > 1 ? "s" : ""}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}


// import { notFound } from "next/navigation"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { db } from "@/lib/db"
// import Link from "next/link"
// import { SystemStatus } from "@prisma/client"

// interface Props {
//   params: { systemId: string }
// }

// export default async function SystemDashboardPage({ params }: Props) {
//   const session = await getServerSession(authOptions)

//   if (!session?.user?.email) {
//     notFound()
//   }

//   // Get user + customer
//   const user = await db.user.findUnique({
//     where: { email: session.user.email },
//     include: { customer: true },
//   })

//   if (!user?.customer) {
//     notFound()
//   }

//   // Fetch system
//   const system = await db.solarSystem.findFirst({
//     where: {
//       id: params.systemId,
//       customerId: user.customer.id,
//     },
//     include: {
//       healthScores: {
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       },
//       alerts: {
//         where: {
//           status: { not: "RESOLVED" },
//         },
//         orderBy: { createdAt: "desc" },
//       },
//       aiRecommendations: {
//         orderBy: { createdAt: "desc" },
//         take: 1,
//       },
//     },
//   })

//   if (!system) {
//     notFound()
//   }

//   const latestHealth = system.healthScores[0]
//   const latestAI = system.aiRecommendations[0]

//   const statusColor =
//     system.status === SystemStatus.ACTIVE
//       ? "bg-green-100 text-green-700"
//       : system.status === SystemStatus.NEEDS_ATTENTION
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-red-100 text-red-700"

//   return (
//     <div className="p-6 space-y-8 max-w-5xl mx-auto">

//       {/* System Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">{system.name}</h1>
//           <p className="text-sm text-gray-500">{system.location}</p>
//         </div>

//         <span
//           className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor}`}
//         >
//           {system.status.replace("_", " ")}
//         </span>
//       </div>

//       {/* Health Score Card */}
//       <div className="border rounded-xl p-6 shadow-sm bg-white">
//         <h2 className="text-lg font-semibold mb-4">System Health</h2>

//         {latestHealth ? (
//           <div className="space-y-3">
//             <div className="text-4xl font-bold">
//               {latestHealth.score}%
//             </div>
//             <p className="text-gray-600">
//               {latestHealth.summary}
//             </p>

//             <div className="text-sm text-gray-500">
//               Confidence: {latestHealth.confidence}%
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">
//             No monitoring data available yet.
//           </p>
//         )}
//       </div>

//       {/* Active Alerts */}
//       <div className="border rounded-xl p-6 shadow-sm bg-white">
//         <h2 className="text-lg font-semibold mb-4">
//           Active Alerts
//         </h2>

//         {system.alerts.length > 0 ? (
//           <ul className="space-y-3">
//             {system.alerts.map((alert) => (
//               <li
//                 key={alert.id}
//                 className="p-3 border rounded-md bg-red-50"
//               >
//                 <div className="font-medium">
//                   [{alert.severity}] {alert.type}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   {alert.message}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">
//             No active alerts.
//           </p>
//         )}
//       </div>

//       {/* AI Recommendation Placeholder */}
//       <div className="border rounded-xl p-6 shadow-sm bg-white">
//         <h2 className="text-lg font-semibold mb-4">
//           AI System Insights
//         </h2>

//         {latestAI ? (
//           <div className="space-y-3">
//             <p className="font-medium">{latestAI.summary}</p>
//             <p className="text-sm text-gray-600">
//               {latestAI.actionPlan}
//             </p>
//             <span className="text-xs text-gray-500">
//               Urgency: {latestAI.urgency}
//             </span>
//           </div>
//         ) : (
//           <p className="text-gray-500">
//             No AI recommendations generated yet.
//           </p>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex gap-4">
//         <Link
//           href={`/dashboard/system/${system.id}/self-check`}
//           className="px-6 py-2 rounded-md border"
//         >
//           Run Self-Check
//         </Link>

//         <Link
//           href={`/dashboard/system/${system.id}/request-service`}
//           className="px-6 py-2 rounded-md bg-black text-white"
//         >
//           Request Technician
//         </Link>
//       </div>
//     </div>
//   )
// }