import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  createOrGetPackageOrder,
  getPublicPackageById,
} from "@/lib/actions/subscriptions";
import PackageBankTransferForm from "@/components/packages/PackageBankTransferForm";

interface PackageBankTransferPageProps {
  params: Promise<{ id: string }>;
}

export default async function PackageBankTransferPage({
  params,
}: PackageBankTransferPageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/signin?callbackUrl=/packages/${id}/checkout/bank-transfer`);
  }

  const pkg = await getPublicPackageById(id);

  if (!pkg) {
    redirect("/packages");
  }

  const order = await createOrGetPackageOrder(id);

  if (!order?.invoice) {
    redirect(`/packages/${id}/checkout`);
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Bank Transfer</h1>
        <p className="text-gray-600">
          Complete your transfer using the invoice details below and submit proof of payment.
        </p>
      </div>

      <div className="border rounded-xl p-6 bg-white shadow-sm space-y-3">
        <h2 className="text-xl font-semibold">{pkg.name}</h2>
        <p className="text-2xl font-bold">₦{pkg.price.toLocaleString()}</p>
        <p className="text-sm text-gray-600">
          Invoice Number: <span className="font-medium">{order.invoice.invoiceNumber}</span>
        </p>

        <div className="space-y-1 text-sm text-gray-700">
          <p><span className="font-medium">Bank:</span> Example Bank</p>
          <p><span className="font-medium">Account Name:</span> C Solar Ltd</p>
          <p><span className="font-medium">Account Number:</span> 0123456789</p>
        </div>
      </div>

      <PackageBankTransferForm packageId={pkg.id} />
    </div>
  );
}