"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPackage } from "@/lib/actions/packages";
import { AITier } from "@prisma/client";

export default function CreatePackageForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    { success?: boolean; error?: string },
    FormData
  >(
    async (_prevState, formData) => {
      try {
        await createPackage({
          name: formData.get("name") as string,
          price: Number(formData.get("price")),
          maxSystems: Number(formData.get("maxSystems")),
          selfCheckLimit: formData.get("selfCheckLimit")
            ? Number(formData.get("selfCheckLimit"))
            : null,
          aiTier: formData.get("aiTier") as AITier,
          hasTechnician: formData.get("hasTechnician") === "on",
          durationDays: Number(formData.get("durationDays")),
        });

        return { success: true };
      } catch (err: any) {
        return {
          error:
            err.message || "Failed to create package. Please try again.",
        };
      }
    },
    { success: false }
  );

  useEffect(() => {
    if (state.success) {
      router.push("/admin/packages");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold">Create Package</h2>

      <input
        name="name"
        placeholder="Package Name"
        required
        className="w-full border rounded p-2"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        required
        className="w-full border rounded p-2"
      />

      <input
        name="maxSystems"
        type="number"
        placeholder="Max Systems"
        required
        className="w-full border rounded p-2"
      />

      <input
        name="selfCheckLimit"
        type="number"
        placeholder="Self Check Limit (leave empty for unlimited)"
        className="w-full border rounded p-2"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">AI Level</label>
        <select
          name="aiTier"
          required
          className="w-full border rounded p-2"
          defaultValue="NONE"
        >
          <option value="NONE">No AI</option>
          <option value="BASIC">Basic AI</option>
          <option value="ADVANCED">Advanced AI</option>
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="hasTechnician" />
        Technician Access
      </label>

      <input
        name="durationDays"
        type="number"
        placeholder="Duration (days)"
        required
        className="w-full border rounded p-2"
      />

      {state?.error && (
        <p className="text-red-600 bg-red-50 p-3 rounded">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-6 py-3 rounded hover:cursor-pointer"
      >
        {isPending ? "Creating..." : "Create Package"}
      </button>
    </form>
  );
}