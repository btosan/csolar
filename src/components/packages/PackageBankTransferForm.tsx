"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitPackagePaymentProof } from "@/lib/actions/subscriptions";

interface PackageBankTransferFormProps {
  packageId: string;
}

export default function PackageBankTransferForm({
  packageId,
}: PackageBankTransferFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    { success?: boolean; error?: string },
    FormData
  >(
    async (_prevState, formData) => {
      try {
        await submitPackagePaymentProof({
          packageId,
          proofUrl: formData.get("proofUrl") as string,
        });

        return { success: true };
      } catch (err: any) {
        return {
          error:
            err.message || "Failed to submit payment proof. Please try again.",
        };
      }
    },
    { success: false }
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard?paymentProof=submitted");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="border rounded-xl p-6 bg-white shadow-sm space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Submit Payment Proof</h2>
        <p className="text-sm text-gray-600">
          Paste the uploaded receipt image URL or proof link below.
        </p>
      </div>

      <input
        name="proofUrl"
        placeholder="https://..."
        required
        className="w-full border rounded p-2"
      />

      {state.error && (
        <p className="text-red-600 bg-red-50 p-3 rounded">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {isPending ? "Submitting..." : "Submit Proof"}
      </button>
    </form>
  );
}