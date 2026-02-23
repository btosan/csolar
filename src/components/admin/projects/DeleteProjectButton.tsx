"use client";

import { useTransition } from "react";
import { deleteProject } from "@/lib/actions/projects";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm("Are you sure you want to delete this project?"))
          return;

        startTransition(async () => {
          await deleteProject(id);
        });
      }}
      disabled={isPending}
      className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:opacity-90 transition disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}