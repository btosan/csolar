"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
import { ForwardIcon } from "@heroicons/react/24/solid";
import { baseURL } from "@/utils/baseurl";
import toast from "react-hot-toast";

const URL = baseURL;

const UpdateUserAdminForm = ({ profile }) => {
  const ref = useRef();
  const router = useRouter();

  const [role, setRole] = useState(profile?.role);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState("");

  const handleRole = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPending(true);

      const response = await fetch(`/api/users/admin/${profile.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      const result = await response.json();

      if (result.success) {
        setPending(false);
        toast.success("Role updated successfully");
        router.push(`/users/${profile.email}`);
        router.refresh();
      } else {
        setPending(false);
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      setPending(false);
      toast.error("Something went wrong");
      console.error('Error updating role:', error);
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="max-w-md mx-auto px-8 bg-secondary3 dark:bg-primary3 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-6">Update Role</h2>

      <div className="mb-4">
        <select
          onChange={handleRole}
          className="text-xl p-2 mt-1 dark:outline-0 bg-secondary dark:bg-primary5 border border-secondary dark:border-primary5 rounded py-3 px-4 mb-1 leading-tight focus:outline-secondary dark:focus:outline-primary5 focus:bg-secondary dark:focus:bg-primary5 focus:border-secondary2 dark:focus:border-primary5"
          type="text"
          id="role"
          name="role"
        >
          <option value="" className="text-sm capitalize">{role}</option>
          <option value="USER" className="text-xs">User</option>
          <option value="AUTHOR" className="text-xs">Author</option>
          <option value="ADMIN" className="text-xs">Admin</option>
        </select>
      </div>

      <div className="flex items-center justify-between w-full mx-auto pb-8 mb-8">
        {errors && <span className="text-red-600 mx-2 px-2">{errors}</span>}
        <button
          disabled={pending === true}
          className="bg-primary5 dark:bg-primary hover:bg-primary6 dark:hover:bg-primary6 text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {pending ? 'Updating' : 'Update'}
        </button>
        <Link href='/admin' className="flex items-center gap-3 font-bold">
          <span>Dashboard</span>
          <ForwardIcon className="w-4 h-4" />
        </Link>
      </div>
    </form>
  );
};

export default UpdateUserAdminForm;