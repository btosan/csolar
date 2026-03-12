"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY!;

export default function Checkout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin?callbackUrl=/checkout");
      return;
    }

    async function fetchCart() {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (!data.items || data.items.length === 0) {
        router.push("/cart");
        return;
      }
      setCart(data);
      setLoading(false);
    }

    if (status === "authenticated") fetchCart();
  }, [status, router]);

  if (loading) return <p>Loading checkout...</p>;
  if (!cart) return null;

  const totalAmount = cart.items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.product.price,
    0
  );

  const handlePaystackPayment = async () => {
    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: session?.user?.email,
      amount: totalAmount * 100, // in kobo
      currency: "NGN",
      ref: `cs-${Date.now()}`,
      callback: function (response: any) {
        toast({
          title: "Payment successful",
          description: `Reference: ${response.reference}`,
        });
        // Optionally redirect to thank you page
        router.push("/orders/thank-you");
      },
      onClose: function () {
        toast({
          title: "Payment cancelled",
          description: "You closed the Paystack popup.",
          variant: "destructive",
        });
      },
    });
    handler.openIframe();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <ul>
          {cart.items.map((item: any) => (
            <li key={item.productId} className="flex justify-between mb-2">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>₦{(item.quantity * item.product.price).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold mt-4 flex justify-between">
          <span>Total:</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handlePaystackPayment}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Pay with Paystack
      </button>
    </div>
  );
}