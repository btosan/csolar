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
        // NO router.push() needed here — server already redirected!
        // If you ever remove server redirect, then add:
        // router.push(`/dashboard/system/${systemId}`);
        // router.refresh();
      } catch (err) {
        console.error('Form error:', err);
        // Simple feedback — in real app use toast / error UI
        alert('Failed to save self-check. Please try again.');
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-semibold">Run System Self Check</h2>

      {/* Production */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Estimated Generation (kWh)</label>
        <input name="estimatedGenerationKwh" type="number" step="0.01" className="w-full border rounded-md p-2" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Expected Generation (kWh)</label>
        <input name="expectedGenerationKwh" type="number" step="0.01" className="w-full border rounded-md p-2" />
      </div>

      {/* Inverter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Inverter Efficiency (%)</label>
        <input name="inverterEfficiency" type="number" step="0.1" className="w-full border rounded-md p-2" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Inverter Temperature (°C)</label>
        <input name="inverterTempC" type="number" step="0.1" className="w-full border rounded-md p-2" />
      </div>

      {/* Battery */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Battery Charge (%)</label>
        <input name="batteryChargePercent" type="number" step="0.1" className="w-full border rounded-md p-2" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Battery Temperature (°C)</label>
        <input name="batteryTempC" type="number" step="0.1" className="w-full border rounded-md p-2" />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Anything unusual?</label>
        <textarea
          name="notes"
          rows={4}
          className="w-full border rounded-md p-2"
          placeholder="Strange noise, low output, blinking lights..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {isPending ? "Running System Check..." : "Run System Check"}
      </button>
    </form>
  );
}