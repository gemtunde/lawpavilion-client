"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeft, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { passwordStrength } from "@/lib/helpers";
import { FormInput } from "../form/FormInput";
import { FormSubmitButton } from "../form/FormSubmitButton";
import { useParams, useRouter } from "next/navigation";
import useResetPassword from "@/hooks/mutations/auth/useResetPassword";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  console.log("ToKEN", token);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    //formState: { isSubmitting },
  } = form;
  const password = watch("password");

  // Calculate password strength
  const strength = passwordStrength(password || "");

  const ResetPasswordMutation = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log("Reset Password:", data);
      ResetPasswordMutation.mutate(
        {
          token,
          newPassword: data?.password,
        },
        {
          onSuccess: async (res) => {
            toast.success(res.data.message ?? "Password reset was successful");
            router.push("/auth/login");
          },
          onError: (error) => {
            toast.error(error?.message ?? "An error occured. Pls try again");
          },
        }
      );
    } catch (error) {
      console.error("Reset Password error:", error);
    }
  };
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <FormInput
                name="password"
                label="Password"
                placeholder="Enter password"
                control={control}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {password && (
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        strength >= level
                          ? strength === 1
                            ? "bg-red-500"
                            : strength === 2
                            ? "bg-orange-500"
                            : strength === 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Password strength:{" "}
                  {strength === 1
                    ? "Weak"
                    : strength === 2
                    ? "Fair"
                    : strength === 3
                    ? "Good"
                    : strength === 4
                    ? "Strong"
                    : "Too short"}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                control={control}
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform mt-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <FormSubmitButton
            icon={<Lock className="h-4 w-4" />}
            iconPosition="start"
          >
            Reset Password
          </FormSubmitButton>
        </form>
      </FormProvider>

      <div className="flex items-center justify-center w-[30%] mx-auto mt-6 ">
        <ArrowBigLeft className="h-4 w-4" />
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
