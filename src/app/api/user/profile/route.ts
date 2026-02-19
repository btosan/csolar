import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// ────────────────────────────────────────────────
// Validation schema (matches frontend form)
const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
  image: z
    .string()
    .url('Must be a valid URL')
    .or(z.literal(''))
    .nullable()
    .optional(),
});

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export async function PATCH(req: NextRequest) {
  try {
    // 1. Get current session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'You must be signed in to update your profile' },
        { status: 401 }
      );
    }

    // 2. Parse and validate incoming body
    const body = await req.json();
    const validated = updateProfileSchema.parse(body);

    // 3. Prepare data to update (only include fields that were sent)
    const updateData: Partial<UpdateProfileInput> = {};

    if (validated.name !== undefined) {
      updateData.name = validated.name.trim();
    }

    if (validated.image !== undefined) {
      // Allow empty string or null → clear image
      updateData.image = validated.image?.trim() || null;
    }

    // If nothing to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: 'No changes provided' },
        { status: 400 }
      );
    }

    // 4. Update user in database
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    // ────────────────────────────────────────────────
    // ← Add revalidatePath here (after successful DB update)
    revalidatePath('/profile');           // Invalidate the profile page
    // Optional: also invalidate root if name/image shown in header/layout
    // revalidatePath('/');

    // 5. Return updated data (frontend will use this + update session)
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Profile update error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}