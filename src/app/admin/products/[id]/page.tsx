import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import ProductForm from "@/components/admin/products/ProductForm";
import { Role } from "@prisma/client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditProductPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/signin");
  if (session.user.role !== Role.ADMIN) redirect("/");

  const product = await db.product.findUnique({
    where: { id },
    include: {
      gallery: true,
    },
  });

  if (!product) redirect("/admin/products");

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <p className="text-muted-foreground mb-6">
        Update product details
      </p>

      <ProductForm mode="edit" product={product} />
    </section>
  );
}