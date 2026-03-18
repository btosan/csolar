import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

import { getPendingPaymentProofs } from "@/lib/actions/subscriptions";
import ApprovePaymentProofButton from "@/components/admin/packages/ApprovePaymentProofButton";
import RejectPaymentProofButton from "@/components/admin/packages/RejectPaymentProofButton";

export default async function AdminPaymentProofsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  const proofs = await getPendingPaymentProofs();

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Payment Proofs</h1>
        <p className="text-gray-600">
          Review bank transfer submissions and activate subscriptions.
        </p>
      </div>

      {proofs.length === 0 ? (
        <p className="text-gray-600">No pending proofs found.</p>
      ) : (
        <div className="space-y-6">
          {proofs.map((proof) => (
            <div
              key={proof.id}
              className="border rounded-lg p-6 bg-white space-y-4"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{proof.package.name}</h2>
                <p className="text-sm text-gray-600">
                  User: {proof.user.name || proof.user.email}
                </p>
                <p className="text-sm text-gray-600">
                  Amount: ₦{proof.order.totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Submitted: {new Date(proof.createdAt).toLocaleDateString()}
                </p>
              </div>

              <a
                href={proof.proofUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-blue-600 underline"
              >
                View payment proof
              </a>

              <div className="flex gap-3">
                <ApprovePaymentProofButton proofId={proof.id} />
                <RejectPaymentProofButton proofId={proof.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}