"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ServiceStatus } from "@prisma/client";
import { updateServiceRequestStatus } from "@/lib/actions/admin";

type FormState = {
  success?: boolean;
  error?: string;
};

interface ServiceRequestQuickActionsProps {
  serviceRequestId: string;
  currentStatus: ServiceStatus;
}

function StatusButton({
  serviceRequestId,
  status,
  label,
  className,
}: {
  serviceRequestId: string;
  status: ServiceStatus;
  label: string;
  className: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async () => {
      try {
        await updateServiceRequestStatus({
          serviceRequestId,
          status,
        });

        return { success: true };
      } catch (err: any) {
        return {
          error: err?.message || "Failed to update request status.",
        };
      }
    },
    {}
  );

  useEffect(() => {
    if (state.success) {
      const description =
        status === "IN_PROGRESS"
          ? "Request marked as in progress."
          : status === "CANCELLED"
          ? "Request cancelled successfully."
          : status === "COMPLETED"
          ? "Request marked as completed."
          : "Request updated successfully.";

      toast({
        title: "Success",
        description,
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
  }, [state, status, router, toast]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className={`${className} disabled:opacity-50`}
      >
        {isPending ? "Updating..." : label}
      </button>
    </form>
  );
}

export default function ServiceRequestQuickActions({
  serviceRequestId,
  currentStatus,
}: ServiceRequestQuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {currentStatus === "OPEN" && (
        <StatusButton
          serviceRequestId={serviceRequestId}
          status="IN_PROGRESS"
          label="Mark In Progress"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
        />
      )}

      {currentStatus !== "COMPLETED" && currentStatus !== "CANCELLED" && (
        <StatusButton
          serviceRequestId={serviceRequestId}
          status="CANCELLED"
          label="Cancel Request"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:opacity-90"
        />
      )}
    </div>
  );
}