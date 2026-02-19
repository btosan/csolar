import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Users, User, Settings, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/profile');
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back, {session.user.name || 'Admin'}. Manage the system here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Link href="/admin/profile">
          <div className="border rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">My Admin Profile</h3>
            </div>
            <p className="text-muted-foreground">
              Update your name, photo, and account settings
            </p>
          </div>
        </Link>
        <Link href="/admin/users">
          <div className="border rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Manage Users</h3>
            </div>
            <p className="text-muted-foreground">
              View all users, change roles, delete accounts
            </p>
          </div>
        </Link>

        {/* Future cards – you can add more later */}
        <div className="border rounded-xl p-6 opacity-60 cursor-not-allowed">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold">System Settings</h3>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>

        <div className="border rounded-xl p-6 opacity-60 cursor-not-allowed">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Settings className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold">Alerts & Monitoring</h3>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}