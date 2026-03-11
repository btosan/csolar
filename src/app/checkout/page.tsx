import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCart } from "@/lib/actions/cart";
import Checkout from "@/components/products/Checkout"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?redirect=/checkout");
  }

  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  return (
    <div className=" py-12">
      <Checkout />
    </div>
  );
}