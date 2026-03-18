"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PaystackPop from "@paystack/inline-js";
import { AITier, Package } from "@prisma/client";
import { toast } from "@/hooks/use-toast";
import {
  createFreeSubscription,
  initializePackagePaystack,
} from "@/lib/actions/subscriptions";

interface PackageCheckoutProps {
  pkg: Package;
  orderId: string;
}

function formatAITier(aiTier: AITier) {
  switch (aiTier) {
    case "NONE":
      return "No AI";
    case "BASIC":
      return "Basic AI";
    case "ADVANCED":
      return "Advanced AI";
    default:
      return aiTier;
  }
}

export default function PackageCheckout({ pkg }: PackageCheckoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFreeActivation = async () => {
    try {
      setLoading(true);

      await createFreeSubscription(pkg.id);

      toast({
        title: "Subscription activated",
        description: `${pkg.name} has been activated successfully.`,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast({
        title: "Activation failed",
        description: err.message || "Unable to activate package.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackPayment = async () => {
    try {
      setLoading(true);

      const payment = await initializePackagePaystack(pkg.id);

      if (!payment.accessCode) {
        throw new Error("Missing Paystack access code.");
      }

      const popup = new PaystackPop();
      popup.resumeTransaction(payment.accessCode);

      toast({
        title: "Payment started",
        description: `Invoice: ${payment.invoiceNumber}`,
      });
    } catch (err: any) {
      toast({
        title: "Payment failed",
        description: err.message || "Unable to start payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBankTransfer = () => {
    router.push(`/packages/${pkg.id}/checkout/bank-transfer`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Package Checkout</h1>
        <p className="text-gray-600">
          Complete your subscription for the selected package.
        </p>
      </div>

      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{pkg.name}</h2>
          <p className="text-3xl font-bold">₦{pkg.price.toLocaleString()}</p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Max Systems:</span> {pkg.maxSystems}
          </p>
          <p>
            <span className="font-medium">Self Checks:</span>{" "}
            {pkg.selfCheckLimit === null
              ? "Unlimited"
              : `${pkg.selfCheckLimit} per month`}
          </p>
          <p>
            <span className="font-medium">AI:</span> {formatAITier(pkg.aiTier)}
          </p>
          <p>
            <span className="font-medium">Technician Access:</span>{" "}
            {pkg.hasTechnician ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Duration:</span> {pkg.durationDays} day
            {pkg.durationDays > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
        <h3 className="text-xl font-semibold">Choose Payment Method</h3>

        {pkg.price === 0 ? (
          <button
            onClick={handleFreeActivation}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Activating..." : "Activate Package"}
          </button>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handlePaystackPayment}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:cursor-pointer"
            >
              {loading ? "Processing..." : "Pay with Paystack"}
            </button>

            <button
              onClick={handleBankTransfer}
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg hover:cursor-pointer"
            >
              Continue with Bank Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}