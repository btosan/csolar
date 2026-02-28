import SelfCheckForm from "@/components/monitoring/SelfCheckForm";

interface Props {
  params: { systemId: string };
}

export default function SelfCheckPage({ params }: Props) {
  return (
    <div className="p-6">
      <SelfCheckForm systemId={params.systemId} />
    </div>
  );
}