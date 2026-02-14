'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppButton } from '@/components/ui/AppButton';
import { PasswordInput } from '@/components/ui/PasswordInput';
import GoogleSignInButton from '@/components/Buttons/GoogleSignInButton';

// ────────────────────────────────────────────────
// Zod schema – matches backend + client-side confirm password
// ────────────────────────────────────────────────
const formSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    name: z.string().max(100, 'Name is too long').optional(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name?.trim() || undefined,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Account created successfully!');
      router.push('/signin');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight text-primary">
          Create an account
        </h1>
        <p className="text-sm xl:text-lg text-gray-500">
          Enter your details to get started
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">

            {/* Full Name (optional) */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg font-medium text-primary">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="h-11 bg-gray-50 border-gray-300 focus:border-primary/50 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg font-medium text-primary">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="mail@example.com"
                      className="h-11 bg-gray-50 border-gray-300 focus:border-primary/50 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg font-medium text-primary">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Create a strong password"
                      className="h-11 bg-gray-50 border-gray-300 focus:border-primary/50 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg font-medium text-primary">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Confirm your password"
                      className="h-11 bg-gray-50 border-gray-300 focus:border-primary/50 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs xl:text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <AppButton
            type="submit"
            size="full"
            variant="glow"
            className="hover:cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create account
          </AppButton>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm xl:text-lg">
              <span className="px-3 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton>Sign up with Google</GoogleSignInButton>

          <p className="text-center text-sm xl:text-lg text-gray-600">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignUpForm;