// app/admin/profile/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Profile from '@/components/profiles/Profile'; 

export const dynamic = 'force-dynamic';

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/profile');
  }

  return <Profile />;
}