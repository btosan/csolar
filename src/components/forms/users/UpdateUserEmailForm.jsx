"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ForwardIcon } from "@heroicons/react/24/solid";
import { baseURL } from "@/utils/baseurl";
import toast from "react-hot-toast";

const URL = baseURL;

const UpdateUserEmailForm = ({ profile }) => {
  const ref = useRef();
  const router = useRouter();

  const [email, setEmail] = useState(profile?.email);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPending(true);

      const response = await fetch(`/api/users/update-email/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Email updated successfully");
        ref?.current?.reset();
        router.push("/email-update-logout");

        // This is all you need — it refreshes the current page and re-fetches session/user data
        router.refresh();

        console.log("Email successfully updated!");
      } else {
        const errorData = await response.json();
        setErrors(errorData.message || "Something went wrong");
        toast.error("Update failed");
      }
    } catch (error) {
      setErrors("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-8 bg-secondary3 dark:bg-primary5 rounded shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Update email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="mt-1 flex w-full p-2 text-primary2 dark:text-white bg-white dark:bg-primary6 border border-white dark:border-primary5 focus:border-lightblue2 focus:ring-lightblue dark:focus:border-primary5 dark:focus:ring-primary5 focus:outline-none focus:ring focus:ring-opacity-40 rounded-md"
          required
        />
      </div>

      <div className="flex items-center justify-between w-full mx-auto">
        {errors && <span className="text-red-600 mx-2 px-2">{errors}</span>}

        <button
          disabled={pending}
          className="bg-primary5 dark:bg-primary hover:bg-primary6 text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline disabled:opacity-70"
          type="submit"
        >
          {pending ? "Updating..." : "Update"}
        </button>

        <Link href="/profile" className="flex items-center gap-3 font-bold">
          <span>Profile</span>
          <ForwardIcon className="w-4 h-4" />
        </Link>
      </div>
    </form>
  );
};

export default UpdateUserEmailForm;