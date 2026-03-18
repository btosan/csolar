"use client";

import { useTransition } from "react";
import { approvePaymentProof } from "@/lib/actions/subscriptions";

interface ApprovePaymentProofButtonProps {
  proofId: string;
}

export default function ApprovePaymentProofButton({
  proofId,
}: ApprovePaymentProofButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await approvePaymentProof(proofId);
          } catch (err: any) {
            alert(err.message || "Failed to approve payment proof.");
          }
        });
      }}
      className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isPending ? "Approving..." : "Approve"}
    </button>
  );
}