import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db"; 
import * as z from "zod";


const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  name: z
    .string()
    .max(100, "Name cannot exceed 100 characters")
    .optional()
    .transform((val) => (val?.trim() || null)),
});

export async function POST(req: Request) {
  try {
    // Parse and validate incoming JSON
    const body = await req.json();
    const { email, password, name } = registerSchema.parse(body);

    // Normalize email (consistent casing)
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check for existing user by email
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the new user
    const newUser = await db.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name,   
        image: null,    
      },
    });

    // 4. Remove sensitive data from response
    const { password: removedPassword, ...safeUser } = newUser;

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: safeUser.id,
          email: safeUser.email,
          name: safeUser.name,
          role: safeUser.role,
          createdAt: safeUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Zod validation errors
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      return NextResponse.json(
        { message: firstIssue.message },
        { status: 400 }
      );
    }

    // Log unexpected errors (in production consider proper logging)
    console.error("[REGISTER_ERROR]", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}