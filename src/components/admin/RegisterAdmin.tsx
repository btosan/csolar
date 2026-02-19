'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CldUploadWidget } from 'next-cloudinary';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppButton } from '@/components/ui/AppButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, ShieldAlert } from 'lucide-react';

// ────────────────────────────────────────────────
// Zod Schema render
// ────────────────────────────────────────────────
const adminSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof adminSchema>;

export default function RegisterAdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [adminsExist, setAdminsExist] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      image: '',
    },
  });

  // Check if any admin already exists (client-side protection)
  useEffect(() => {
    async function checkAdminCount() {
      try {
        const res = await fetch('/api/check-admins');
        const data = await res.json();

        if (data.adminsExist) {
          setAdminsExist(true);
          toast.error('Admin accounts already exist. This page is disabled.');
          setTimeout(() => router.replace('/signin'), 2500);
        }
      } catch (err) {
        console.error('Failed to check admin count', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminCount();
  }, [router]);

  const handleUploadSuccess = (result: any) => {
    const uploadedUrl = result?.info?.secure_url;
    if (uploadedUrl) {
      form.setValue('image', uploadedUrl);
      setPreviewImage(uploadedUrl);
      toast.success('Image uploaded');
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email.trim(),
          name: values.name.trim(),
          password: values.password,
          image: values.image || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create admin');
      }

      toast.success('Admin account created successfully!');
      router.push('/signin');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Checking access...</div>
      </div>
    );
  }

  if (adminsExist) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <ShieldAlert className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <CardTitle className="text-2xl mb-4">Access Restricted</CardTitle>
          <CardDescription className="text-lg">
            Admin accounts already exist in the system.<br />
            This registration page is now disabled.
          </CardDescription>
          <AppButton
            className="mt-6"
            onClick={() => router.push('/signin')}
          >
            Go to Sign In
          </AppButton>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className=''>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Create First Admin</CardTitle>
            <CardDescription className="mt-2">
              This page is only available when no admin accounts exist
            </CardDescription>
          </CardHeader>

          <CardContent className=''>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: any) => (
                    <FormItem className=''>
                      <FormLabel className=''>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage className='' />
                    </FormItem>
                  )}
                />

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: any) => (
                    <FormItem className=''>
                      <FormLabel className=''>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage className='' />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: any) => (
                    <FormItem className=''>
                      <FormLabel className=''>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage className='' />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }: any) => (
                    <FormItem className=''>
                      <FormLabel className=''>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage className='' />
                    </FormItem>
                  )}
                />

                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }: any) => (
                    <FormItem className=''>
                      <FormLabel className=''>Profile Picture (optional)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <CldUploadWidget
                            uploadPreset="tosanxprofiles"
                            onSuccess={handleUploadSuccess}
                            options={{
                              maxFiles: 1,
                              resourceType: 'image',
                              clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                              maxFileSize: 5000000,
                              cropping: true,
                              croppingAspectRatio: 1,
                            }}
                          >
                            {({ open }) => (
                              <AppButton
                                type="button"
                                variant="outline"
                                onClick={() => open()}
                                className="w-full h-28 border-2 border-dashed "
                              >
                                <div className='flex flex-col items-center justify-center gap-2 '>
                                  <Upload className="h-6 w-6" />
                                  <span>Upload Profile Picture</span>
                                  <span className="text-xs text-muted-foreground">(PNG, JPG, max 5MB)</span>
                                </div>
                              </AppButton>
                            )}
                          </CldUploadWidget>

                          {previewImage && (
                            <div className="flex justify-center">
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className=''/>
                    </FormItem>
                  )}
                />

                <AppButton
                  type="submit"
                  variant="glow"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-6"
                >
                  Create Admin Account
                </AppButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}