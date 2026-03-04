import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { updateUserRole } from '@/lib/actions/users';
import { Role } from '@prisma/client';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/profile');
  }

  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    redirect('/admin/users');
  }

  const isEditingSelf = session.user.id === user.id;

  return (
    <div className="container max-w-xl mx-auto py-10 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <Link
          href="/admin/users"
          className="text-sm text-primary hover:underline"
        >
          ← Back to Users
        </Link>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        {/* NAME */}
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{user.name || '—'}</p>
        </div>

        {/* EMAIL */}
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        {/* ROLE UPDATE FORM */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Role</p>

          {isEditingSelf ? (
            <div className="text-sm text-yellow-600">
              You cannot change your own role.
            </div>
          ) : (
            <form
              action={async (formData: FormData) => {
                'use server';
                const newRole = formData.get('role') as string;
                await updateUserRole(user.id, newRole);
              }}
              className="flex items-center gap-3"
            >
              <select
                name="role"
                defaultValue={user.role}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white text-sm rounded-md hover:opacity-90"
              >
                Update Role
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}