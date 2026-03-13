import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const products = await db.product.findMany({
    where: {
      active: true,
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return NextResponse.json(products);
}