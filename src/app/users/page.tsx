import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/profile');
  }

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
          <p className="mt-2 text-muted-foreground">{users.length} registered users</p>
        </div>
        <Link
          href="/admin"
          className="text-primary hover:underline text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium">User</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Role</th>
              <th className="text-left p-4 font-medium">Joined</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {user.name?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                    <span className="font-medium">{user.name || '—'}</span>
                  </div>
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      user.role === 'ADMIN'
                        ? 'bg-red-100 text-red-800'
                        : user.role === 'TECHNICIAN'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right space-x-3">
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                  <form
                    action={`/api/admin/${encodeURIComponent(user.email)}`}
                    method="DELETE"
                    className="inline"
                    onSubmit={async (e) => {
                      if (!confirm('Delete this user permanently?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            No users found in the system.
          </div>
        )}
      </div>
    </div>
  );
}