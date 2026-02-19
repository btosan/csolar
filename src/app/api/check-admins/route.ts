import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const count = await db.user.count({
      where: { role: 'ADMIN' },
    });

    return NextResponse.json({ adminsExist: count > 0 });
  } catch (error) {
    console.error('Failed to check admin count:', error);
    return NextResponse.json({ adminsExist: false }, { status: 500 });
  }
}