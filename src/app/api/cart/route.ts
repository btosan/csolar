// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCart } from "@/lib/actions/cart";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }

  const cart = await getCart();
  return NextResponse.json(cart ?? { items: [] });
}