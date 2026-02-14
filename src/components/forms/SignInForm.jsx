'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { toast } from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../ui/input';
import { AppButton } from '../ui/AppButton';
import Link from 'next/link';
import GoogleSignInButton from '../Buttons/GoogleSignInButton';
import { motion } from 'framer-motion';
import { PasswordInput } from '../ui/PasswordInput';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') ?? '/profile';

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  useEffect(() => {
    if (status === 'authenticated' && session) {
      if (session.user?.role === 'ADMIN') {
        router.replace('/admin');
      } else {
        router.replace(callbackUrl);
      }
    }
  }, [status, session, router, callbackUrl]);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError(null);

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

      toast.success('Signed in successfully!');
      router.refresh();
      router.replace(callbackUrl);

    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm xl:text-lg text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="mail@example.com"
                      className="h-11 bg-gray-50 border-gray-300 focus:border-primary/50 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm xl:text-lg font-medium">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                      className="h-11 bg-gray-50 border-gray-300 focus:border-primary/50 focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm xl:text-lg text-red-500 text-center"
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lightblue2 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm xl:text-lg">
              <span className="px-2 bg-secondary3 dark:bg-primary3 text-primary1 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton>Sign in with Google</GoogleSignInButton>

          <p className="text-center text-sm xl:text-lg text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary5 hover:text-primary6 dark:text-lightblue dark:hover:text-lightblue/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </motion.div>
  );
}