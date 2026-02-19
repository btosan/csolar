'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppButton } from '@/components/ui/AppButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LogOut, User, Mail, ShieldCheck, Upload } from 'lucide-react';

// Zod schema – image is now just a string (Cloudinary secure_url)  render
const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // optimistic UI state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [optimisticName, setOptimisticName] = useState('');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      image: '',
    },
  });

  // Sync UI with session
  useEffect(() => {
    if (session?.user) {
      const currentImage = session.user.image || '';
      const currentName = session.user.name || '';

      form.reset({
        name: currentName,
        image: currentImage,
      });

      setPreviewImage(currentImage);
      setOptimisticName(currentName);
    }
  }, [session, form]);

  if (status === 'loading') return null;

  if (!session?.user) {
    router.replace('/signin');
    return null;
  }

  const user = session.user;
  const role = user.role as string;

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);

    // save previous state for rollback
    const previousName = optimisticName;
    const previousImage = previewImage;

    // optimistic update
    setOptimisticName(values.name);
    setPreviewImage(values.image || null);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          image: values.image?.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      // refresh session silently
      await update();
      router.refresh();

      toast.success('Profile updated!');

      setIsEditing(false);
    } catch (error) {
      // rollback if server fails
      setOptimisticName(previousName);
      setPreviewImage(previousImage || null);

      toast.error(
        error instanceof Error
          ? error.message
          : 'Update failed — reverted.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/signin' });
  };

  const handleUploadSuccess = (result: any) => {
    const uploadedUrl = result?.info?.secure_url as string | undefined;

    if (uploadedUrl) {
      form.setValue('image', uploadedUrl, { shouldValidate: true });
      setPreviewImage(uploadedUrl);
      toast.success('Image uploaded successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl lg:max-w-5xl mx-auto py-16 px-4 sm:px-6"
    >
      <div className="mb-8 flex items-center justify-center flex-col text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Your Profile</h1>
        <p className="mt-2 text-gray-500">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
        {/* Left – Avatar & Quick Info */}
        <Card className="h-fit">
          <CardHeader className="text-center pb-4">
            <Avatar className="w-28 h-28 mx-auto border-4 border-background shadow-xl">
              <AvatarImage className=''
                src={
                  previewImage && previewImage.trim() !== ''
                    ? previewImage
                    : user.image && user.image.trim() !== ''
                    ? user.image
                    : undefined
                }
                alt={user.name ?? 'User'}
              />
              <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                {user.name ? user.name[0].toUpperCase() : <User size={40} />}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 space-y-1">
              <CardTitle className="text-2xl">{user.name || 'User'}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1.5">
                <Mail size={16} className="text-muted-foreground" />
                {user.email}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="flex flex-col items-center gap-2">
              <Badge
                variant="outline"
                className="text-base px-4 py-1.5 font-medium flex items-center gap-1.5"
              >
                <ShieldCheck size={16} />
                {role === 'ADMIN'
                  ? 'Administrator'
                  : role === 'TECHNICIAN'
                  ? 'Technician'
                  : 'Customer'}
              </Badge>

              <p className="text-xs text-muted-foreground">
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>

            <Separator className="my-6" />

            <AppButton
              variant="outline"
              size="lg"
              className="w-fit mx-auto flex border text-destructive hover:text-destructive hover:bg-accent/10"
              onClick={handleSignOut}
            >
              <div className='mx-auto flex items-center justify-center gap-2'>
                <LogOut className="w-6 h-6" />
                <span> Sign out</span>
              </div>
            </AppButton>
          </CardContent>
        </Card>

        {/* Right – Edit Form */}
        <Card className=''>
          <CardHeader className=''>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className=''>Personal Information</CardTitle>
                <CardDescription className=''>Update your profile details</CardDescription>
              </div>
              {!isEditing && (
                <AppButton variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </AppButton>
              )}
            </div>
          </CardHeader>

          <CardContent className=''>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }: any) => (
                      <FormItem className=''>
                        <FormLabel className="text-base font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="Your full name"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage className=''/>
                      </FormItem>
                    )}
                  />

                  {/* Email – read only */}
                  <FormItem className=''>
                    <FormLabel className="text-base font-medium">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        value={user.email ?? ''}
                        disabled
                        className="h-11 bg-gray-50 cursor-not-allowed"
                      />
                    </FormControl>
                    <FormDescription className=''>This is your login email (cannot be changed)</FormDescription>
                  </FormItem>

                  {/* Profile Picture Upload */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }: any) => (
                      <FormItem className=''>
                        <FormLabel className="text-base font-medium">Profile Picture</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <div className="space-y-4">
                              <CldUploadWidget
                                uploadPreset="tosanxprofiles"
                                onSuccess={(result) => handleUploadSuccess(result)}
                                onQueuesEnd={() => toast.dismiss()} // optional
                                options={{
                                  maxFiles: 1,
                                  resourceType: 'image',
                                  clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                                  maxFileSize: 5000000, // 5MB
                                  cropping: true,
                                  croppingAspectRatio: 1,
                                  showSkipCropButton: false,
                                }}
                              >
                                {({ open }) => (
                                  <AppButton
                                    type="button"
                                    variant="outline"
                                    onClick={() => open()}
                                    className="w-full h-24 border-2 border-dashed "
                                  >
                                    <div className='flex flex-col items-center justify-center gap-2 mx-auto'>
                                      <Upload className='h-7 w-7' />
                                      <span>Upload or Drag Image</span>
                                      <span className="text-xs text-muted-foreground">
                                        (PNG, JPG, max 5MB)
                                      </span>
                                    </div>
                                  </AppButton>
                                )}
                              </CldUploadWidget>

                              {/* Show current / preview value */}
                              {previewImage && (
                                <div className="text-sm text-muted-foreground break-all">
                                  Current: {previewImage}
                                </div>
                              )}

                              <FormDescription className=''>
                                Click to upload a new profile picture. The image will be optimized and hosted by Cloudinary.
                              </FormDescription>
                            </div>
                          ) : (
                            <div className="flex flex-col items-start gap-1.5">
                              <Avatar className="w-16 h-16 border border-background shadow-lg">
                                <AvatarImage className=''
                                  src={
                                    previewImage?.trim() || user.image?.trim()
                                      ? (previewImage?.trim() || user.image!)
                                      : undefined
                                  }
                                  alt={user.name ?? 'Profile picture'}
                                />
                                <AvatarFallback className="text-xl bg-muted text-muted-foreground">
                                  <User className='h-6 w-6' />
                                </AvatarFallback>
                              </Avatar>

                              <p className="text-xs text-muted-foreground text-center max-w-35">
                                {previewImage?.trim() || user.image?.trim()
                                  ? 'Profile picture set'
                                  : 'No profile picture set • Click "Edit Profile" to add one'}
                              </p>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage className='' />
                      </FormItem>
                    )}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <AppButton
                      type="submit"
                      variant="glow"
                      isLoading={isLoading}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Save Changes
                    </AppButton>

                    <AppButton
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset();
                        setPreviewImage(session?.user?.image || null);
                      }}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Cancel
                    </AppButton>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}