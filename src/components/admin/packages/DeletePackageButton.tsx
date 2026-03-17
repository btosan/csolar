"use client";

import { useTransition } from "react";
import { deletePackage } from "@/lib/actions/packages";

interface DeletePackageButtonProps {
  id: string;
}

export default function DeletePackageButton({
  id,
}: DeletePackageButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this package?"
        );

        if (!confirmed) return;

        startTransition(async () => {
          try {
            await deletePackage(id);
          } catch (err: any) {
            alert(err.message || "Failed to delete package.");
          }
        });
      }}
      className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}