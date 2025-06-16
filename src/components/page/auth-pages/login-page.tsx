import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/auth/useLogin";
import {toast} from  'react-toastify'
import { Link } from "react-router";
import Spinner from "@/components/spinner";

export default function LoginPage() {
  const {data , loading, handleLogin} = useLogin()
  
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password :  z.string().min(5,{ message : "field must contain atleast 5 words"})
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password : ""
    },
  });

  function onSubmit(values: { username: string; password: string }) {
      const data = values
      console.log("login-submit : ", data)
      handleLogin(data)
  }

  return (
    <Card className="mx-auto max-w-sm self-center mt-50 justify-center">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">{ loading ? <Spinner/> : 'Submit'}</Button>
          </form>
        </Form>
        <div className="mt-4 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
        what to verify your account?{" "}
        <Link to="/verify-email" className="text-blue-600 hover:underline">
          verify email
        </Link>
        </div>
      </CardContent>
    </Card>
    
  );
}
