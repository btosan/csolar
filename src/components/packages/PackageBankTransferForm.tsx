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
          payerName: formData.get("payerName") as string,
          payerEmail: (formData.get("payerEmail") as string) || undefined,
          payerPhone: (formData.get("payerPhone") as string) || undefined,
          bankName: (formData.get("bankName") as string) || undefined,
          transferAmount: formData.get("transferAmount")
            ? Number(formData.get("transferAmount"))
            : undefined,
          transferDate: (formData.get("transferDate") as string) || undefined,
          senderReference:
            (formData.get("senderReference") as string) || undefined,
          notes: (formData.get("notes") as string) || undefined,
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
        <h2 className="text-xl font-semibold">Submit Proof of Payment</h2>
        <p className="text-sm text-gray-600">
          Fill in your transfer details and submit your receipt or proof link.
        </p>
      </div>

      <input
        name="payerName"
        placeholder="Payer Name"
        required
        className="w-full border rounded p-2"
      />

      <input
        name="payerEmail"
        type="email"
        placeholder="Payer Email"
        className="w-full border rounded p-2"
      />

      <input
        name="payerPhone"
        placeholder="Payer Phone"
        className="w-full border rounded p-2"
      />

      <input
        name="bankName"
        placeholder="Sender Bank Name"
        className="w-full border rounded p-2"
      />

      <input
        name="transferAmount"
        type="number"
        placeholder="Transfer Amount (naira)"
        className="w-full border rounded p-2"
      />

      <input
        name="transferDate"
        type="datetime-local"
        className="w-full border rounded p-2"
      />

      <input
        name="senderReference"
        placeholder="Transfer Reference / Session ID"
        className="w-full border rounded p-2"
      />

      <textarea
        name="notes"
        rows={4}
        placeholder="Additional notes"
        className="w-full border rounded p-2"
      />

      <input
        name="proofUrl"
        placeholder="Proof URL"
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
        className="bg-black text-white px-6 py-3 rounded hover:cursor-pointer"
      >
        {isPending ? "Submitting..." : "Submit Proof"}
      </button>
    </form>
  );
}