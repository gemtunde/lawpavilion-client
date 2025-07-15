"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { passwordStrength } from "@/lib/helpers";
import { FormInput } from "../form/FormInput";
import { FormCheckbox } from "../form/FormCheckbox";
import { FormSubmitButton } from "../form/FormSubmitButton";
import useRegister from "@/hooks/mutations/auth/useRegister";
import { toast } from "sonner";
import { FormSelect } from "../form/FormSelect";
import { COUNTRIES } from "@/lib/constants";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      // phone: '',
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });
  const { control, handleSubmit, watch } = form;
  const password = watch("password");
  const email = watch("email");

  // Calculate password strength
  const strength = passwordStrength(password || "");
  const registerMutation = useRegister();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Register:", data);
      registerMutation.mutate(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data?.email,
          password: data?.password ?? "",
          country: data.country,
          //confirmPassword: string;
          // agreeTerms: data.agreeTerms,
        },
        {
          onSuccess: async (res) => {
            console.log("Registration successful:", res.data);
            toast.success(res.data.message ?? "Register was successful");
          },
          onError: (error) => {
            toast.error(error?.message ?? "An error occured. Pls try again");
          },
        }
      );

      setShowNotice(true);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div>
      {showNotice ? (
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-lg font-bold">Check Your Email</h1>
          <p className="mt-2 text-gray-600">
            A confirmation email has been sent to {email}. Click the link to
            <Link
              className="ml-1 text-green-700 font-semibold cursor-pointer"
              href="/auth/login"
            >
              Verify Email.
            </Link>
          </p>
        </div>
      ) : (
        <>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                control={control}
              />

              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                control={control}
              />
              <FormInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                control={control}
                type="email"
              />
              <FormSelect
                name="country"
                control={control}
                label="Country of Residence"
                placeholder="Select country"
                options={COUNTRIES}
              />

              {/* <FormInput
                name="phone"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                control={control}
                type="tel"
              /> */}

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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-4 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <FormCheckbox
                  name="agreeTerms"
                  control={control}
                  label={
                    <>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Privacy Policy
                      </Link>
                    </>
                  }
                />
              </div>
              <FormSubmitButton
                icon={<UserPlus className="h-4 w-4" />}
                iconPosition="start"
              >
                Sign Up
              </FormSubmitButton>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
