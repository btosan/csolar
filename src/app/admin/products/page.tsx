import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllProducts } from "@/lib/actions/products";
import ProductTable from "@/components/admin/products/ProductTable";
import Link from "next/link";

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
          Update and manage store products.
        </p>
        <Link href='/admin' className="p-4 w-fit mx-auto bg-accent text-xl lg:text-2xl text-primary">Admin  Dashboard</Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}

