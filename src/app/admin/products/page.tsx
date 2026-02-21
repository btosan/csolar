import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllProducts } from "@/lib/actions/products";
import ProductTable from "@/components/admin/products/ProductTable";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const products = await getAllProducts();

  return (
    <div className="space-y-6 py-16">
      <div className="flex items-center justify-center flex-col gap-2 mx-auto w-full tect-center">
        <h1 className="h2">Product Management</h1>
        <p className="text-muted-foreground mb-6">
          Create, update, and manage store products.
        </p>
      </div>

      <ProductTable products={products} />
    </div>
  );
}

