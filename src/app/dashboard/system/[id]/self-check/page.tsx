// src/app/dashboard/system/[id]/self-check/page.tsx

import { redirect } from 'next/navigation';
import SelfCheckForm from '@/components/monitoring/SelfCheckForm';
import { createMonitoringSnapshot } from '@/lib/actions/monitoring';
import type { CreateSnapshotInput } from '@/lib/actions/monitoring';
import { MonitoringSource } from '@prisma/client';
import { db } from '@/lib/db';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SelfCheckPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch system name for display
  const system = await db.solarSystem.findUnique({
    where: { id },
    select: { name: true },
  });

  const displayName = system?.name || `System ${id}`;

  async function handleSelfCheck(formData: FormData) {
    'use server';

    const parseNumber = (value: FormDataEntryValue | null) => {
      if (!value) return undefined;
      const num = Number(value);
      return isNaN(num) ? undefined : num;
    };

    const input: CreateSnapshotInput = {
      systemId: id,
      source: MonitoringSource.MANUAL,

      estimatedGenerationKwh: parseNumber(formData.get('estimatedGenerationKwh')),
      expectedGenerationKwh: parseNumber(formData.get('expectedGenerationKwh')),
      consumptionKwh: parseNumber(formData.get('consumptionKwh')),

      inverterTempC: parseNumber(formData.get('inverterTempC')),
      inverterEfficiency: parseNumber(formData.get('inverterEfficiency')),
      inverterOutputKw: parseNumber(formData.get('inverterOutputKw')),

      batteryChargePercent: parseNumber(formData.get('batteryChargePercent')),
      batteryTempC: parseNumber(formData.get('batteryTempC')),
      batteryCycles: parseNumber(formData.get('batteryCycles')),
      batteryHealthPercent: parseNumber(formData.get('batteryHealthPercent')),

      notes: (formData.get('notes') as string) || undefined,
    };

    try {
      await createMonitoringSnapshot(input);
      redirect(`/dashboard/system/${id}`);
    } catch (error) {
      // Only log REAL errors — ignore the intentional redirect throw
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        throw error; // Let Next.js handle the redirect silently
      }

      // Real failure (DB error, etc.)
      console.error('Self-check failed (real error):', error);
      throw new Error("Failed to save self-check. Please try again.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-medium mb-6">
        Run Self Check for <span className="font-bold">{displayName}</span>
      </h1>

      <SelfCheckForm systemId={id} onSubmit={handleSelfCheck} />
    </div>
  );
}