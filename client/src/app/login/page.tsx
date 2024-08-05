'use client';

import { submitLogin } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLoginForm } from '@/hooks/form/useLoginForm';
import { LoginData } from '@/types/login/loginSchema';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';

export default function Login() {
  const form = useLoginForm();
  const { control, handleSubmit } = form;
  const router = useRouter();
  const onSubmit = (data: LoginData) => {
    submitLogin(data);
    router.push('/');
  };

  return (
    <Card className="w-[350px]">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
