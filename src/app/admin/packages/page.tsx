import { getAllPackages } from "@/lib/actions/packages";
import EditPackageForm from "@/components/admin/packages/EditPackageForm";
import DeletePackageButton from "@/components/admin/packages/DeletePackageButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AdminPackagesPage() {
  const session = await getServerSession(authOptions);

  // 🔐 Not logged in
  if (!session?.user) {
    redirect("/login"); // adjust if your login route differs
  }

  // 🔐 Not admin
  if (session.user.role !== Role.ADMIN) {
    redirect("/"); // or dashboard
  }

  const packages = await getAllPackages();

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Manage Packages</h1>
        <p className="text-gray-600">
          Edit existing subscription packages or remove unused ones.
        </p>
      </div>

      {packages.length === 0 ? (
        <p className="text-gray-600">No packages found.</p>
      ) : (
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-lg p-6 space-y-4 bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{pkg.name}</h2>
                  <p className="text-sm text-gray-500">
                    Created {new Date(pkg.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <DeletePackageButton id={pkg.id} />
              </div>

              <EditPackageForm pkg={pkg} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}