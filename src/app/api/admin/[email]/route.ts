import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { email } = await params;
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { email } = await params;
    const { role } = await req.json();

    if (!['CUSTOMER', 'TECHNICIAN', 'ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { email },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return NextResponse.json({
      message: 'User role updated',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { email } = await params;

    // Optional: prevent self-deletion
    if (email === session.user.email) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 403 });
    }

    await db.user.delete({ where: { email } });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}