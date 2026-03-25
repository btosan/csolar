'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { mergeGuestCart } from "@/lib/actions/cart-merge";

export default function PostLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handlePostLogin = async () => {
      if (status === "loading") return;

      if (!session?.user) {
        router.push("/signin");
        return;
      }

      // ✅ 1. Merge guest cart
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      if (guestCart.length > 0) {
        try {
          await mergeGuestCart(guestCart);
          localStorage.removeItem("guest_cart");
        } catch (err) {
          console.error("Cart merge failed:", err);
        }
      }

      // ✅ 2. Role-based redirect
      if (session.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    };

    handlePostLogin();
  }, [session, status, router]);

  return <p className="text-center mt-10">Signing you in...</p>;
}