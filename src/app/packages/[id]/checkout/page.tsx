import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  createOrGetPackageOrder,
  getPublicPackageById,
} from "@/lib/actions/subscriptions";
import PackageCheckout from "@/components/packages/PackageCheckout";

interface PackageCheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function PackageCheckoutPage({
  params,
}: PackageCheckoutPageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/signin?callbackUrl=/packages/${id}/checkout`);
  }

  const pkg = await getPublicPackageById(id);

  if (!pkg) {
    redirect("/packages");
  }

  const order = await createOrGetPackageOrder(id);

  return (
    <div className="py-12">
      <PackageCheckout pkg={pkg} orderId={order.id} />
    </div>
  );
}