import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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

import axiosClient from "@/lib/exios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useHandleVerifyEmail from "@/hooks/auth/useVerifyEmail";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks";
import Spinner from "@/components/spinner";
import { useNavigate } from 'react-router-dom'

export default function VerifyEmailPage() {
  const { data, loading, handleVerifyEmail } = useHandleVerifyEmail();
  const { data: signupData } = useAppSelector((state) => state.auth.signup);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);
 
  const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    otp: z.string().min(4, { message: "OTP must be at least 4 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: signupData?.email || "",
      otp: "",
    },
  });

  async function handleResendOtp(email: string) {
    try {
      setResendOtpLoading(true);
      console.log("resent-ptp-request : ", email)
      const data = {email}
      const response = await axiosClient.post("http://localhost:8000/auth/resend-otp", data);
      toast.success(response.data.message || "OTP resent successfully");
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.detail || "Failed to resend OTP. Try again.";
      toast.error(errMsg);
      console.log("resent-ptp-error : ", error)
    } finally {
      setResendOtpLoading(false);
    }
  }

  const handleResendOtpClick = () => {
    const email = form.getValues("email");
    if (!email) {
      toast.error("Email is required to resend OTP");
      return;
    }
    handleResendOtp(email);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleVerifyEmail(values);
  }

  return (
    <Card className="mx-auto max-w-sm self-center mt-20 justify-center">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
        <CardDescription>Verify your email using the OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter your registered email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter OTP" {...field} />
                  </FormControl>
                  <FormDescription>Check your inbox for the OTP</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? <><Spinner /> Verifying...</> : "Verify"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOtpClick}
                disabled={resendOtpLoading}
              >
                {resendOtpLoading ? <><Spinner /> Resending...</> : "Resend OTP"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
