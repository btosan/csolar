'use client';

import { deleteUser } from '@/lib/actions/users';

export function DeleteUserButton({ userId }: { userId: string }) {
  return (
    <form
      action={async () => {
        if (confirm('Delete this user permanently?')) {
          await deleteUser(userId);
        }
      }}
      className="inline"
    >
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
      >
        Delete
      </button>
    </form>
  );
}