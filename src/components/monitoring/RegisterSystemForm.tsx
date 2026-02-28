"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSolarSystem } from "@/lib/actions/system"

export default function RegisterSystemForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const systemId = await createSolarSystem({
        name: formData.get("name") as string,
        location: formData.get("location") as string,
        installationDate: formData.get("installationDate") as string,
        systemType: formData.get("systemType") as any,
        inverterModel: formData.get("inverterModel") as string,

        panelCapacity: Number(formData.get("panelCapacity")) || undefined,
        panelQuantity: Number(formData.get("panelQuantity")) || undefined,

        batteryCapacity: Number(formData.get("batteryCapacity")) || undefined,
        batteryType: formData.get("batteryType") as any,

        inverterBrand: formData.get("inverterBrand") as string,
        inverterCapacity:
          Number(formData.get("inverterCapacity")) || undefined,
      })

      router.push(`/dashboard/system/${systemId}`)
      router.refresh()
    })
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6">

      <h2 className="text-2xl font-semibold">Register Solar System</h2>

      <input
        name="name"
        placeholder="System Name"
        required
        className="w-full border rounded p-2"
      />

      <input
        name="location"
        placeholder="Installation Location"
        required
        className="w-full border rounded p-2"
      />

      <input
        name="installationDate"
        type="date"
        required
        className="w-full border rounded p-2"
      />

      <select
        name="systemType"
        required
        className="w-full border rounded p-2"
      >
        <option value="GRID">Grid-Tied</option>
        <option value="OFF_GRID">Off Grid</option>
        <option value="HYBRID">Hybrid</option>
      </select>

      <h3 className="font-semibold mt-6">Panel Array</h3>

      <input
        name="panelCapacity"
        type="number"
        step="0.1"
        placeholder="Panel Capacity (kW)"
        className="w-full border rounded p-2"
      />

      <input
        name="panelQuantity"
        type="number"
        placeholder="Panel Quantity"
        className="w-full border rounded p-2"
      />

      <h3 className="font-semibold mt-6">Battery</h3>

      <select name="batteryType" className="w-full border rounded p-2">
        <option value="">No Battery</option>
        <option value="LITHIUM">Lithium</option>
        <option value="LEAD_ACID">Lead Acid</option>
      </select>

      <input
        name="batteryCapacity"
        type="number"
        step="0.1"
        placeholder="Battery Capacity (kWh)"
        className="w-full border rounded p-2"
      />

      <h3 className="font-semibold mt-6">Inverter</h3>

      <input
        name="inverterBrand"
        placeholder="Inverter Brand"
        className="w-full border rounded p-2"
      />

      <input
        name="inverterModel"
        placeholder="Inverter Model"
        className="w-full border rounded p-2"
      />

      <input
        name="inverterCapacity"
        type="number"
        step="0.1"
        placeholder="Inverter Capacity (kW)"
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {isPending ? "Registering..." : "Register System"}
      </button>
    </form>
  )
}