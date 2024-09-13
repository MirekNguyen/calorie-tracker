"use client";

import { submitLogin } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/hooks/form/useLoginForm";
import { LoginData } from "@/types/login/loginSchema";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { FormProvider } from "react-hook-form";

export default function Login() {
  const form = useLoginForm();
  const { control, handleSubmit } = form;
  const [, setCookie] = useCookies(['jwt']);
  const router = useRouter();
  const onSubmit = (data: LoginData) => {
    submitLogin(data).then(({data: token}) => {
      setCookie('jwt', token, { path: '/', maxAge: 3600 });
      router.push('/');
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
