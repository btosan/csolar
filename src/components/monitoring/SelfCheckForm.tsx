// src/components/monitoring/SelfCheckForm.tsx
"use client";

import { useTransition } from "react";

interface SelfCheckFormProps {
  systemId: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function SelfCheckForm({ systemId, onSubmit }: SelfCheckFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await onSubmit(formData);
      } catch (err: any) {
        if (err?.digest?.includes("NEXT_REDIRECT")) {
          throw err; // allow redirect to work
        }

        console.error("Form error:", err);
        alert("Failed to save self-check. Please try again.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold">Run System Self Check</h2>

      {/* Production */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Estimated Generation (kWh)</label>
        <input
          name="estimatedGenerationKwh"
          type="number"
          step="0.01"
          className="w-full border rounded-md p-2"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Expected Generation (kWh)</label>
        <input
          name="expectedGenerationKwh"
          type="number"
          step="0.01"
          className="w-full border rounded-md p-2"
          disabled={isPending}
        />
      </div>

      {/* Inverter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Inverter Efficiency (%)</label>
        <input
          name="inverterEfficiency"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Inverter Temperature (°C)</label>
        <input
          name="inverterTempC"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
          disabled={isPending}
        />
      </div>

      {/* Battery */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Battery Charge (%)</label>
        <input
          name="batteryChargePercent"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Battery Temperature (°C)</label>
        <input
          name="batteryTempC"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
          disabled={isPending}
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Anything unusual?</label>
        <textarea
          name="notes"
          rows={4}
          className="w-full border rounded-md p-2"
          placeholder="Strange noise, low output, blinking lights..."
          disabled={isPending}
        />
      </div>

      {/* Progress bar + Submit button */}
      <div className="space-y-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-6 py-2 rounded-md disabled:opacity-50 w-full sm:w-auto"
        >
          {isPending ? "Running System Check..." : "Run System Check"}
        </button>

        {isPending && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full animate-pulse"
              style={{ width: "45%", transition: "width 1.5s ease-in-out" }}
            ></div>
          </div>
        )}
      </div>
    </form>
  );
}