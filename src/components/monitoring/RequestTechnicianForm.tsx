"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createServiceRequest } from "@/lib/actions/service"
import Link from "next/link"

type FormState = {
  success?: boolean
  requestId?: string
  error?: string
}

interface RequestTechnicianFormProps {
  systemId: string
  systemName: string
}

export default function RequestTechnicianForm({
  systemId,
  systemName,
}: RequestTechnicianFormProps) {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      try {
        const priorityValue = formData.get("priority")

        const requestId = await createServiceRequest({
          systemId,
          issueType: formData.get("issueType") as string,
          description: (formData.get("description") as string) || undefined,
          priority: priorityValue ? Number(priorityValue) : undefined,
          phoneNumber: formData.get("phoneNumber") as string,
          whatsappNumber:
            (formData.get("whatsappNumber") as string) || undefined,
        })

        return { success: true, requestId }
      } catch (err: any) {
        return {
          error:
            err?.message ||
            "Failed to submit service request. Please try again.",
        }
      }
    },
    { success: false }
  )

  useEffect(() => {
    if (state.success && state.requestId) {
      router.push(`/dashboard/system/${systemId}?request=success`)
      router.refresh()
    }
  }, [state.success, state.requestId, systemId, router])

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-6 mx-auto px-4 py-8"
    >
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-center">
        Request Technician for{" "}
        <span className="text-gray-700">{systemName}</span>
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Describe the issue — our team will get in touch soon.
      </p>

      {/* Phone Number */}
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number <span className="text-red-600">*</span>
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          required
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black focus:border-black"
          placeholder="e.g. 08012345678"
        />
      </div>

      {/* WhatsApp Number */}
      <div>
        <label
          htmlFor="whatsappNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          WhatsApp Number{" "}
          <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="whatsappNumber"
          name="whatsappNumber"
          type="tel"
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black focus:border-black"
          placeholder="e.g. 08012345678"
        />
      </div>

      {/* Issue Type */}
      <div>
        <label
          htmlFor="issueType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Issue Type <span className="text-red-600">*</span>
        </label>
        <select
          id="issueType"
          name="issueType"
          required
          defaultValue=""
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black focus:border-black"
        >
          <option value="" disabled>
            Select issue type
          </option>
          <option value="NO_POWER">No power output</option>
          <option value="LOW_GENERATION">
            Lower than expected generation
          </option>
          <option value="BATTERY_ISSUE">
            Battery not charging / draining fast
          </option>
          <option value="INVERTER_FAULT">
            Inverter error / beeping
          </option>
          <option value="PANEL_DAMAGE">
            Panel damage / dirt
          </option>
          <option value="WIRING">
            Wiring / connection problem
          </option>
          <option value="OTHER">Other (please describe)</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description / Additional Details
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black focus:border-black"
          placeholder="E.g., inverter shows error code E05, started after heavy rain..."
        />
      </div>

      {/* Priority */}
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue="2"
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-black focus:border-black"
        >
          <option value="1">Low – can wait a few days</option>
          <option value="2">Normal</option>
          <option value="3">High – urgent issue</option>
        </select>
      </div>

      {/* Error */}
      {state.error && (
        <p className="text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
          {state.error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 font-medium"
        >
          {isPending ? "Submitting..." : "Submit Request"}
        </button>

        <Link
          href={`/dashboard/system/${systemId}`}
          className="flex-1 text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}