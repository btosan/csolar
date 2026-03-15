import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const products = await db.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      take: 40, // safety limit — we only display 20 max anyway
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        brand: true,
        model: true,
        mainImageUrl: true,
        price: true,
        rating: true,
        active: true,
        featured: true,
        // add wattage, kva, ah, etc. if ProductCard needs them
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}