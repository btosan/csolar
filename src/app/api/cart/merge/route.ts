import { NextResponse } from "next/server";
import { mergeGuestCart } from "@/lib/actions/cart-merge";

export async function POST(req: Request) {
  try {
    const items = await req.json();

    await mergeGuestCart(items);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
    });
  }
}