"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MonitoringSource } from "@prisma/client";
import { createMonitoringSnapshot } from "@/lib/actions/monitoring";

interface Props {
  systemId: string;
}

export default function SelfCheckForm({ systemId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const parseNumber = (value: FormDataEntryValue | null) => {
      if (!value) return undefined;
      const num = Number(value);
      return isNaN(num) ? undefined : num;
    };

    startTransition(async () => {
      await createMonitoringSnapshot({
        systemId,
        source: MonitoringSource.MANUAL,

        estimatedGenerationKwh: parseNumber(
          formData.get("estimatedGenerationKwh")
        ),
        expectedGenerationKwh: parseNumber(
          formData.get("expectedGenerationKwh")
        ),
        consumptionKwh: parseNumber(formData.get("consumptionKwh")),

        inverterTempC: parseNumber(formData.get("inverterTempC")),
        inverterEfficiency: parseNumber(
          formData.get("inverterEfficiency")
        ),
        inverterOutputKw: parseNumber(formData.get("inverterOutputKw")),

        batteryChargePercent: parseNumber(
          formData.get("batteryChargePercent")
        ),
        batteryTempC: parseNumber(formData.get("batteryTempC")),
        batteryCycles: parseNumber(formData.get("batteryCycles")),
        batteryHealthPercent: parseNumber(
          formData.get("batteryHealthPercent")
        ),

        notes: (formData.get("notes") as string) || undefined,
      });

      router.push(`/dashboard/system/${systemId}`);
      router.refresh();
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-semibold">Run System Self Check</h2>

      {/* Production */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Estimated Generation (kWh)
        </label>
        <input
          name="estimatedGenerationKwh"
          type="number"
          step="0.01"
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Expected Generation (kWh)
        </label>
        <input
          name="expectedGenerationKwh"
          type="number"
          step="0.01"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Inverter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Inverter Efficiency (%)
        </label>
        <input
          name="inverterEfficiency"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Inverter Temperature (°C)
        </label>
        <input
          name="inverterTempC"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Battery */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Battery Charge (%)
        </label>
        <input
          name="batteryChargePercent"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Battery Temperature (°C)
        </label>
        <input
          name="batteryTempC"
          type="number"
          step="0.1"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Anything unusual?
        </label>
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