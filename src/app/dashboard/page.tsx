import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";

interface DashboardPageProps {
  searchParams: Promise<{
    subscription?: string;
    paymentProof?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      role: true,
      customer: {
        select: { id: true },
      },
      subscriptions: {
        where: {
          active: true,
          endDate: {
            gte: new Date(),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          package: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/signin");
  }

  if (!user.customer) {
    if (user.role === "CUSTOMER") {
      await db.customer.create({
        data: {
          userId: user.id,
          name: user.name ?? "Customer",
        },
      });

      redirect("/dashboard");
    }

    redirect("/signin");
  }

  const activeSubscription = user.subscriptions[0] || null;

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
  });

  const canRegisterMoreSystems = activeSubscription
    ? systems.length < activeSubscription.package.maxSystems
    : false;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-lg md:text-xl lg:text-2xl w-full mx-auto flex items-center justify-center text-center">
          Welcome back{" "}
          <span className="font-semibold ">
            {user.name ? `, ${user.name}` : ""}
          </span>
        </h1>

        {canRegisterMoreSystems ? (
          <Link
            href="/dashboard/system/new"
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition whitespace-nowrap"
          >
            Register New System
          </Link>
        ) : (
          <Link
            href="/packages"
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition whitespace-nowrap"
          >
            Upgrade Package
          </Link>
        )}
      </div>

      {params.subscription === "success" && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          Your package has been activated successfully.
        </div>
      )}

      {params.paymentProof === "submitted" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
          Your payment proof has been submitted successfully. We’ll activate your package after admin review.
        </div>
      )}

      {activeSubscription ? (
        <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Current Package</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Plan:</span>{" "}
              {activeSubscription.package.name}
            </p>
            <p>
              <span className="font-medium">Max Systems:</span>{" "}
              {activeSubscription.package.maxSystems}
            </p>
            <p>
              <span className="font-medium">Self Checks:</span>{" "}
              {activeSubscription.package.selfCheckLimit === null
                ? "Unlimited"
                : `${activeSubscription.package.selfCheckLimit} per month`}
            </p>
            <p>
              <span className="font-medium">Expires:</span>{" "}
              {new Date(activeSubscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="text-xl font-semibold mb-2">No Active Package</h2>
          <p className="text-gray-700 mb-4">
            You need an active package before you can register systems and run self-checks.
          </p>
          <Link
            href="/packages"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl"
          >
            Choose a Package
          </Link>
        </div>
      )}

      {systems.length === 0 ? (
        <div className="bg-white shadow rounded-2xl p-8 text-center">
          <p className="text-gray-600 mb-6">
            You don’t have any registered solar systems yet. Get started by registering your first system.
          </p>

          {canRegisterMoreSystems ? (
            <Link
              href="/dashboard/system/new"
              className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
            >
              Register System
            </Link>
          ) : (
            <Link
              href="/packages"
              className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
            >
              Choose a Package
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="w-full mx-auto flex items-center justify-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold uppercase my-2">
                My Systems
              </p>
            </div>

            {systems.map((system) => {
              const latestHealth = system.healthScores[0];
              const activeAlertsCount = system.alerts.length;

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
                      <p className="text-sm text-gray-500">System Health Score</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-3">No health data yet.</p>
                  )}

                  {activeAlertsCount > 0 && (
                    <p className="text-sm text-red-600 font-medium">
                      {activeAlertsCount} Active Alert
                      {activeAlertsCount > 1 ? "s" : ""}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            {canRegisterMoreSystems ? (
              <Link
                href="/dashboard/system/new"
                className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition border border-gray-300"
              >
                + Register Another System
              </Link>
            ) : (
              <Link
                href="/packages"
                className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition border border-gray-300"
              >
                Upgrade Package
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
