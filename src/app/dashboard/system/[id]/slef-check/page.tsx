// src/app/dashboard/system/[id]/self-check/page.tsx
import { redirect } from 'next/navigation';
import SelfCheckForm from '@/components/monitoring/SelfCheckForm';
import { createMonitoringSnapshot } from '@/lib/actions/monitoring';
import { MonitoringSource } from '@prisma/client';

export default function SelfCheckPage({ params }: { params: { id: string } }) {
  const systemId = params.id;

  // Server Action – runs on server, redirects on success
  async function handleSelfCheck(formData: FormData) {
    'use server';

    const parseNumber = (value: FormDataEntryValue | null) => {
      if (!value) return undefined;
      const num = Number(value);
      return isNaN(num) ? undefined : num;
    };

    const input: CreateSnapshotInput = {
      systemId,
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
      // Success → redirect server-side (recommended)
      redirect(`/dashboard/system/${systemId}`);
    } catch (error) {
      console.error('Self-check submission failed:', error);
      // In production you might want better error handling:
      // - throw new Error("Submission failed")
      // - or return { error: "..." } and show message in client
      throw error;
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Run Self Check – System {systemId}</h1>
      
      <SelfCheckForm 
        systemId={systemId} 
        onSubmit={handleSelfCheck}
      />
    </div>
  );
}