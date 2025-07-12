import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { AuthFormCard } from "@/components/form/AuthFormCard";
import React from "react";
import { ServiceType } from "../register/page";
import { Clock, Shield } from "lucide-react";

export default function ForgotPassword() {
  const services: ServiceType[] = [
    {
      id: 1,
      name: "Secure Process",
      description: "Bank-level security for password reset",
      icon: Shield,
    },
    {
      id: 2,
      name: "Quick Recovery",
      description: "Reset link delivered instantly",
      icon: Clock,
    },
  ];
  return (
    <AuthFormCard
      title="Forgot your password?"
      description="Enter your email and we'll send you a reset link"
      titleBanner="Secure password recovery"
      descriptionBanner="We'll help you regain access to your account safely and securely."
      url="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      services={services}
    >
      <ForgotPasswordForm />
    </AuthFormCard>
  );
}
