
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Profile from '@/components/profiles/Profile'; 

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return <Profile />;
}