'use client';

import { updateUserRole } from '@/lib/actions/users';
import { Role } from '@prisma/client';

interface Props {
  userId: string;
  currentRole: Role;
}

export function RoleSelect({ userId, currentRole }: Props) {
  return (
    <form
      action={async (formData: FormData) => {
        const role = formData.get('role') as string;
        await updateUserRole(userId, role);
      }}
    >
      <select
        name="role"
        defaultValue={currentRole}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="px-2 py-1 border rounded-md text-xs"
      >
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </form>
  );
}