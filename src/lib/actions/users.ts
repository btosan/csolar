'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

/////////////////////////////////////////////////////
// DELETE USER (HARDENED)
/////////////////////////////////////////////////////

export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/profile');
  }

  // ❌ Prevent deleting yourself
  if (session.user.id === userId) {
    throw new Error('You cannot delete your own account.');
  }

  const userToDelete = await db.user.findUnique({
    where: { id: userId },
  });

  if (!userToDelete) return;

  // ❌ Prevent deleting last ADMIN
  if (userToDelete.role === Role.ADMIN) {
    const adminCount = await db.user.count({
      where: { role: Role.ADMIN },
    });

    if (adminCount <= 1) {
      throw new Error('Cannot delete the last admin.');
    }
  }

  await db.user.delete({
    where: { id: userId },
  });

  revalidatePath('/admin/users');
}

/////////////////////////////////////////////////////
// UPDATE USER ROLE (HARDENED)
/////////////////////////////////////////////////////

export async function updateUserRole(userId: string, newRole: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/profile');
  }

  // ✅ Validate role strictly against Prisma enum
  if (!Object.values(Role).includes(newRole as Role)) {
    throw new Error('Invalid role.');
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return;

  // ❌ Prevent changing your own role
  if (session.user.id === userId) {
    throw new Error('You cannot change your own role.');
  }

  // ❌ Prevent demoting last ADMIN
  if (user.role === Role.ADMIN && newRole !== Role.ADMIN) {
    const adminCount = await db.user.count({
      where: { role: Role.ADMIN },
    });

    if (adminCount <= 1) {
      throw new Error('Cannot demote the last admin.');
    }
  }

  await db.user.update({
    where: { id: userId },
    data: { role: newRole as Role },
  });

  revalidatePath('/admin/users');
}