
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req) {
  try {
    // Check the count of admin users
    const adminCount = await db.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount >= 2) {
      return NextResponse.json(
        { message: 'Maximum number of admin users reached (2)' },
        { status: 403 }
      );
    }

    // Parse the incoming request body
    const body = await req.json();
    const { email, password, name } = body;

    // Basic validation
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

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const adminUser = await db.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name ? name.trim() : null, // optional name
        role: 'ADMIN',
      },
    });

    // Safe user object (exclude password)
    const safeAdmin = {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      createdAt: adminUser.createdAt,
    };

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        admin: safeAdmin,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}