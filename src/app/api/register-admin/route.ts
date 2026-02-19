import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Strict: only allow creation when ZERO admins exist
    const adminCount = await db.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount > 0) {
      return NextResponse.json(
        { message: 'Admin accounts already exist. This registration is disabled.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, password, name, image } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await db.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name?.trim() || null,
        image: image || null,          // Cloudinary URL from frontend
        role: 'ADMIN',
      },
    });

    // Safe response
    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
          image: newAdmin.image,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}