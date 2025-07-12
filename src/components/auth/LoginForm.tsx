"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { FormInput } from "../form/FormInput";
import { FormCheckbox } from "../form/FormCheckbox";
import { FormSubmitButton } from "../form/FormSubmitButton";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/mutations/auth/useLogin";
import { toast } from "sonner";
import { useAuth } from "@/context/useAuth";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const {
    control,
    handleSubmit,

    //formState: { isSubmitting },
  } = form;

  const { setUser } = useAuth();
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login:", data);
      loginMutation.mutate(
        {
          password: data?.password ?? "",
          email: data?.email,
        },
        {
          onSuccess: async (res) => {
            Cookies.set("accessToken", res.data.accessToken, {
              secure: true,
              sameSite: "strict",
              expires: 1,
            });
            Cookies.set("refreshToken", res.data.refreshToken, {
              secure: true,
              sameSite: "strict",
              expires: 7,
            });
            setUser(res.data.user);
            toast.success(res.data.message ?? "Login was successful");
            router.push("/dashboard");
          },
          onError: (error) => {
            toast.error(error?.message ?? "An error occured. Pls try again");
          },
        }
      );
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
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
                className="absolute right-3 top-1/2 transform mt-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between space-y-1">
            <FormCheckbox
              name="rememberMe"
              control={control}
              label={<>Remember me</>}
            />
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <FormSubmitButton
            icon={<UserPlus className="h-4 w-4" />}
            iconPosition="start"
            isLoading={loginMutation.isPending}
          >
            Sign In
          </FormSubmitButton>
        </form>
      </FormProvider>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
