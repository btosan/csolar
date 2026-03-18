import { redirect } from "next/navigation";
import { verifyPackagePayment } from "@/lib/actions/subscriptions";

interface PackagePaymentSuccessPageProps {
  searchParams: Promise<{ reference?: string }>;
}

export default async function PackagePaymentSuccessPage({
  searchParams,
}: PackagePaymentSuccessPageProps) {
  const { reference } = await searchParams;

  if (!reference) {
    redirect("/packages");
  }

  await verifyPackagePayment(reference);

  redirect("/dashboard?subscription=success");
}