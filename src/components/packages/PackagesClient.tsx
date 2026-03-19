"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button"

type PackageItem = {
  id: string;
  name: string;
  price: number;
  maxSystems: number;
  selfCheckLimit: number | null;
  aiTier: string;
  hasTechnician: boolean;
  durationDays: number;
};

function formatAITier(aiTier: string) {
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

export default function PackagesClient() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages/public", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await res.json();
        setPackages(data);
      } catch (err) {
        setError("Unable to load packages right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <p className="text-center text-gray-600">Loading packages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Packages</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the package that fits your solar monitoring needs. Upgrade for
          more systems, advanced AI insights, and technician access.
        </p>
      </div>

      {packages.length === 0 ? (
        <p className="text-center text-gray-600">No packages available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
            >
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">{pkg.name}</h2>
                <p className="text-3xl font-bold">
                  ₦{pkg.price.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Max Systems:</span>{" "}
                  {pkg.maxSystems}
                </p>

                <p>
                  <span className="font-medium">Self Checks:</span>{" "}
                  {pkg.selfCheckLimit === null
                    ? "Unlimited"
                    : `${pkg.selfCheckLimit} per month`}
                </p>

                <p>
                  <span className="font-medium">AI:</span>{" "}
                  {formatAITier(pkg.aiTier)}
                </p>

                <p>
                  <span className="font-medium">Technician Access:</span>{" "}
                  {pkg.hasTechnician ? "Yes" : "No"}
                </p>

                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {pkg.durationDays} day{pkg.durationDays > 1 ? "s" : ""}
                </p>
              </div>

                <Button
                    href={`/packages/${pkg.id}/checkout`}
                    text="Choose Package"
                />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}