'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { AppButton } from '@/components/ui/AppButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const UpdateUserPasswordForm = ({ profile }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    const response = await fetch(`/api/users/update-password/${profile.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: values.password
      })
    })

    if(response.ok) {
      router.push('/email-update-logout')
    } else {
      console.error('Registration failed');
      setErrors("User with this email or username already exists.");
      setIsLoading(false);
      // return NextResponse.json({ message: "Registration failed"},{ status: 400} )
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {errors && <p className="text-danger mb-4 mt-2">{errors}</p>}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    className="text-sm mt-1 p-2 appearance-none block w-full dark:outline-0 bg-secondary2 dark:bg-primary5 border-secondary dark:border-primary5 rounded py-3 px-4 mb-1 leading-tight focus:outline-secondary dark:focus:outline-primary5 focus:bg-secondary dark:focus:bg-primary5 focus:border-secondary2 dark:focus:border-primary6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    {...field}
                    className="text-sm mt-1 p-2 appearance-none block w-full dark:outline-0 bg-secondary2 dark:bg-primary5 border-secondary dark:border-primary5 rounded py-3 px-4 mb-1 leading-tight focus:outline-secondary dark:focus:outline-primary5 focus:bg-secondary dark:focus:bg-primary5 focus:border-secondary2 dark:focus:border-primary6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AppButton
          disabled={isLoading}
          className="w-full mt-6 dark:bg-primary5 bg-primary3 hover:dark:bg-primary"
          type="submit"
        >
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-2 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
          Update password
        </AppButton>
      </form>
    </Form>
  );
};

export default UpdateUserPasswordForm;