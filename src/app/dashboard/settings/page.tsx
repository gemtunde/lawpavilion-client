"use client";
import React from "react";
import { useAuth } from "@/context/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormSubmitButton } from "@/components/form/FormSubmitButton";
import { UserPlus } from "lucide-react";
import { ProfileFormData, profileSchema } from "@/lib/validations/auth";
import useUpdateProfile from "@/hooks/mutations/auth/useUpdateProfile";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useAuth();
  console.log("User in Settings:", user);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });
  const {
    control,
    handleSubmit,
    //formState: { isSubmitting },
  } = form;
  const updateProfileMutation = useUpdateProfile();
  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log("update prfile:", data);
      updateProfileMutation.mutate(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data?.email,
        },
        {
          onSuccess: async (res) => {
            console.log("Profile Update successful:", res.data);
            toast.success(res.data.message ?? "Profile Update was successful");
          },
          onError: (error) => {
            toast.error(error?.message ?? "An error occured. Pls try again");
          },
        }
      );

      //    setShowNotice(true);
    } catch (error) {
      console.error("Profile Update error:", error);
    }
  };
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Settings
              </h1>
              <p className="text-gray-600">
                Manage your account preferences and settings
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormProvider {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 p-6"
                  >
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

                    <FormSubmitButton
                      icon={<UserPlus className="h-4 w-4" />}
                      iconPosition="start"
                      isLoading={updateProfileMutation.isPending}
                    >
                      Update Profile
                    </FormSubmitButton>
                  </form>
                </FormProvider>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
