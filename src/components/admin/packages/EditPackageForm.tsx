"use client";

import { useActionState } from "react";
import { AITier, Package } from "@prisma/client";
import { updatePackage } from "@/lib/actions/packages";

interface EditPackageFormProps {
  pkg: Package;
}

export default function EditPackageForm({ pkg }: EditPackageFormProps) {
  const [state, formAction, isPending] = useActionState<
    { success?: boolean; error?: string },
    FormData
  >(
    async (_prevState, formData) => {
      try {
        await updatePackage(pkg.id, {
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
          error: err.message || "Failed to update package. Please try again.",
        };
      }
    },
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          defaultValue={pkg.name}
          placeholder="Package Name"
          required
          className="w-full border rounded p-2"
        />

        <input
          name="price"
          type="number"
          defaultValue={pkg.price}
          placeholder="Price"
          required
          className="w-full border rounded p-2"
        />

        <input
          name="maxSystems"
          type="number"
          defaultValue={pkg.maxSystems}
          placeholder="Max Systems"
          required
          className="w-full border rounded p-2"
        />

        <input
          name="selfCheckLimit"
          type="number"
          defaultValue={pkg.selfCheckLimit ?? ""}
          placeholder="Self Check Limit (leave empty for unlimited)"
          className="w-full border rounded p-2"
        />

        <select
          name="aiTier"
          defaultValue={pkg.aiTier}
          required
          className="w-full border rounded p-2"
        >
          <option value="NONE">No AI</option>
          <option value="BASIC">Basic AI</option>
          <option value="ADVANCED">Advanced AI</option>
        </select>

        <input
          name="durationDays"
          type="number"
          defaultValue={pkg.durationDays}
          placeholder="Duration (days)"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasTechnician"
          defaultChecked={pkg.hasTechnician}
        />
        Technician Access
      </label>

      {state?.error && (
        <p className="text-red-600 bg-red-50 p-3 rounded">{state.error}</p>
      )}

      {state?.success && !state?.error && (
        <p className="text-green-700 bg-green-50 p-3 rounded">
          Package updated successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-5 py-2 rounded"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}