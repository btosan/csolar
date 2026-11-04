import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await db.user.count({
      where: { role: 'ADMIN' },
    });

    return NextResponse.json({
      adminsExist: count > 0,
      // Registration stays open until the admin count is greater than 4
      registrationOpen: count <= 4,
    });
  } catch (error) {
    console.error('Failed to check admin count:', error);
    return NextResponse.json(
      { adminsExist: false, registrationOpen: false },
      { status: 500 }
    );
  }
}