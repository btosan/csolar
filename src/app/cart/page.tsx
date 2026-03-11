import { getCart } from "@/lib/actions/cart";
import GuestCart from "@/components/products/cart/GuestCart";
import Image from "next/image";
import Link from "next/link";
import CartQuantity from "@/components/products/cart/CartQuantity";
import RemoveCartItem from "@/components/products/cart/RemoveCartItem";

export default async function CartPage() {
  const cart = await getCart();

  // Guest user
  if (!cart) {
    return <GuestCart />;
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 ">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 border-b pb-6"
          >
            <Image
              src={item.product.mainImageUrl || "/placeholder.png"}
              width={120}
              height={120}
              alt={item.product.name}
            />

            <div className="flex-1">
              <h2 className="font-semibold">
                {item.product.name}
              </h2>

              <p className="text-gray-500">
                ₦{(item.product.price / 100).toLocaleString()}
              </p>

              <CartQuantity
                cartItemId={item.id}
                quantity={item.quantity}
              />

              <RemoveCartItem cartItemId={item.id} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex lg:flex-row flex-col lg:justify-between justify-center items-center gap-6 lg:gap-0">
        <h2 className="text-xl font-semibold">
          Total: ₦{(total / 100).toLocaleString()}
        </h2>

        <Link
          href="/checkout"
          className="bg-black text-white text-lg px-6 py-3 rounded-lg"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}