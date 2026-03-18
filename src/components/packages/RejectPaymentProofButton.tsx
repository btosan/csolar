"use client";

import { useTransition } from "react";
import { rejectPaymentProof } from "@/lib/actions/subscriptions";

interface RejectPaymentProofButtonProps {
  proofId: string;
}

export default function RejectPaymentProofButton({
  proofId,
}: RejectPaymentProofButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await rejectPaymentProof(proofId);
          } catch (err: any) {
            alert(err.message || "Failed to reject payment proof.");
          }
        });
      }}
      className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isPending ? "Rejecting..." : "Reject"}
    </button>
  );
}