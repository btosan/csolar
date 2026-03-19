"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { completeServiceVisit } from "@/lib/actions/admin";

type FormState = {
  success?: boolean;
  error?: string;
};

interface CompleteServiceVisitFormProps {
  serviceRequestId: string;
}

export default function CompleteServiceVisitForm({
  serviceRequestId,
}: CompleteServiceVisitFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      try {
        await completeServiceVisit({
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
            err?.message ||
            "Failed to complete service visit. Please try again.",
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
    <form
      action={formAction}
      className="border-t pt-5 space-y-4 bg-gray-50 p-4 rounded-xl"
    >
      <h3 className="text-sm font-semibold">Complete Visit</h3>

      {/* Findings */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Findings
        </label>
        <textarea
          name="findings"
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="What did the technician observe?"
        />
      </div>

      {/* Actions Taken */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Actions Taken
        </label>
        <textarea
          name="actionsTaken"
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="What was done to fix the issue?"
        />
      </div>

      {/* Parts Replaced */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Parts Replaced
        </label>
        <textarea
          name="partsReplaced"
          rows={2}
          className="w-full border rounded-lg p-3"
          placeholder="List any replaced parts (optional)"
        />
      </div>

      {/* Follow-up */}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="followUpRequired" />
        Follow-up required
      </label>

      {/* Error */}
      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {state.error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Visit & Complete"}
      </button>
    </form>
  );
}