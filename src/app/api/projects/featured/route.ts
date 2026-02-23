import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const projects = await db.project.findMany({
    where: {
      featured: true,
      deleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return NextResponse.json(projects);
}