"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { assignTechnicianToRequest } from "@/lib/actions/admin";

type FormState = {
  success?: boolean;
  error?: string;
};

interface TechnicianOption {
  id: string;
  name: string | null;
  email: string;
}

interface AssignTechnicianFormProps {
  serviceRequestId: string;
  technicians: TechnicianOption[];
}

export default function AssignTechnicianForm({
  serviceRequestId,
  technicians,
}: AssignTechnicianFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      try {
        const technicianId = formData.get("technicianId") as string;

        await assignTechnicianToRequest({
          serviceRequestId,
          technicianId,
        });

        return { success: true };
      } catch (err: any) {
        return {
          error: err?.message || "Failed to assign technician.",
        };
      }
    },
    {}
  );

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: "Technician assigned successfully.",
      });

      router.refresh();
    }

    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, router, toast]);

  return (
    <form action={formAction} className="flex flex-col sm:flex-row gap-3">
      <select
        name="technicianId"
        required
        defaultValue=""
        className="border rounded-lg px-3 py-2 min-w-60"
        disabled={isPending}
      >
        <option value="" disabled>
          Select technician
        </option>

        {technicians.map((tech) => (
          <option key={tech.id} value={tech.id}>
            {tech.name || tech.email}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Assigning..." : "Assign Technician"}
      </button>
    </form>
  );
}