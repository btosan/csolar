import { NextResponse } from "next/server";
import { getPublicPackages } from "@/lib/actions/packages";

export async function GET() {
  try {
    const packages = await getPublicPackages();
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load packages" },
      { status: 500 }
    );
  }
}