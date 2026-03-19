"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { completeAssignedServiceVisit } from "@/lib/actions/technician";

type FormState = {
  success?: boolean;
  error?: string;
};

interface CompleteAssignedVisitFormProps {
  serviceRequestId: string;
}

export default function CompleteAssignedVisitForm({
  serviceRequestId,
}: CompleteAssignedVisitFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      try {
        await completeAssignedServiceVisit({
          serviceRequestId,
          findings: (formData.get("findings") as string) || undefined,
          actionsTaken: (formData.get("actionsTaken") as string) || undefined,
          partsReplaced: (formData.get("partsReplaced") as string) || undefined,
          followUpRequired: formData.get("followUpRequired") === "on",
        });

        return { success: true };
      } catch (err: any) {
        return {
          error:
            err?.message || "Failed to save service visit. Please try again.",
        };
      }
    },
    { success: false }
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="border-t pt-5 space-y-4">
      <h3 className="text-sm font-semibold">Update Visit</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Findings</label>
        <textarea
          name="findings"
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="What did you observe?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Actions Taken</label>
        <textarea
          name="actionsTaken"
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="What did you do?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Parts Replaced</label>
        <textarea
          name="partsReplaced"
          rows={2}
          className="w-full border rounded-lg p-3"
          placeholder="Any replaced parts"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="followUpRequired" />
        Follow-up required
      </label>

      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Visit"}
      </button>
    </form>
  );
}