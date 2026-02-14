'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
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
// Zod schema (unchanged – matches your backend/auth setup)
// ────────────────────────────────────────────────
const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        toast.error('Invalid email or password');
        return;
      }

      if (result?.ok) {
        toast.success('Signed in successfully!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500">
          Sign in to your account to continue
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-primary">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="mail@example.com"
                      className="h-11 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20"
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
                  <FormLabel className="text-sm font-medium text-primary">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Enter your password"
                      className="h-11 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary/50 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <AppButton
            type="submit"
            size="full"
            variant="glow"
            className="hover:cursor-pointer"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Sign in
          </AppButton>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton>Sign in with Google</GoogleSignInButton>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignInForm;