"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/validations/auth";
import { FormInput } from "../form/FormInput";
import { FormSubmitButton } from "../form/FormSubmitButton";
import useForgotPassword from "@/hooks/mutations/auth/useForgotPassword";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [showNotice, setShowNotice] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    control,
    handleSubmit,
    watch,

    //formState: { isSubmitting },
  } = form;
  const email = watch("email");
  const ForgotPasswordMutation = useForgotPassword();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log("Forgot Password:", data);
      ForgotPasswordMutation.mutate(
        {
          email: data?.email,
        },
        {
          onSuccess: async (res) => {
            toast.success(res.data.message ?? "Email sent was successful");
            //router.push('/home')
          },
          onError: (error) => {
            toast.error(error?.message ?? "An error occured. Pls try again");
          },
        }
      );
      setShowNotice(true);
    } catch (error) {
      console.error("Forgot Password error:", error);
    }
  };
  return (
    <div>
      {showNotice ? (
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-lg font-bold">Check Your Email</h1>
          <p className="mt-2 text-gray-600">
            A password reset email has been sent to {email}. Click the link to
            <Link
              className="ml-1 text-green-700 font-semibold cursor-pointer"
              href="/auth/login"
            >
              login page
            </Link>
          </p>
        </div>
      ) : (
        <>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                control={control}
                type="email"
              />

              <FormSubmitButton
                icon={<Mail className="h-4 w-4" />}
                iconPosition="start"
              >
                Send Reset Link
              </FormSubmitButton>
            </form>
          </FormProvider>

          <div className="flex items-center justify-center w-[50%] mx-auto mt-6 ">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <Link
              href="/auth/login"
              className=" text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Sign In
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
