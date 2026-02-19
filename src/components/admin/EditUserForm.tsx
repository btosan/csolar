'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppButton } from '@/components/ui/AppButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  role: z.enum(['CUSTOMER', 'TECHNICIAN', 'ADMIN']),
});

type FormValues = z.infer<typeof formSchema>;

interface EditUserFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    image: string | null;
    createdAt?: Date | string
  };
  currentAdminEmail: string;
}
// render
export default function EditUserForm({ user, currentAdminEmail }: EditUserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: user.role as 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/${encodeURIComponent(user.email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: values.role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      toast.success('User role updated successfully');
      router.push('/admin/users');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isSelf = user.email === currentAdminEmail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-none shadow-none">
        <CardHeader className=''>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Edit User Profile</CardTitle>
              <CardDescription className=''> 
                Change role or view user details
              </CardDescription>
            </div>
            <AppButton
              variant="outline"
              size="sm"
              onClick={() => router.push('/admin/users')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to List
            </AppButton>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* User Info Header */}
          <div className="flex items-center gap-6 pb-6 border-b">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.image ?? undefined} alt={user.name ?? ''} className=''/>
              <AvatarFallback className=''>
                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-xl font-semibold">
                {user.name || 'Unnamed User'}
              </h3>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Joined: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Select */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }: any) => (
                  <FormItem className=''>
                    <FormLabel className="text-base font-medium">User Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSelf} // prevent admin from demoting themselves
                    >
                      <FormControl className=''>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=''>
                        <SelectItem value="CUSTOMER" className=''>Customer</SelectItem>
                        <SelectItem value="TECHNICIAN" className=''>Technician</SelectItem>
                        <SelectItem value="ADMIN" className=''>Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='' />
                    {isSelf && (
                      <p className="text-sm text-amber-600 mt-1">
                        You cannot change your own role from this interface.
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="pt-4">
                <AppButton
                  type="submit"
                  variant="glow"
                  isLoading={isLoading}
                  disabled={isLoading || isSelf}
                  className="w-full md:w-auto"
                >
                  Save Role Changes
                </AppButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}