import React from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { AuthFormCard } from "@/components/form/AuthFormCard";
import { Lock, Shield } from "lucide-react";
import { ServiceType } from "../../register/page";

export default function ResetPassword() {
  const services: ServiceType[] = [
    {
      id: 1,
      name: "Strong Security",
      description: "Use uppercase, numbers & symbols",
      icon: Lock,
    },
    {
      id: 2,
      name: "Encrypted Storage",
      description: "Your password is safely encrypted",
      icon: Shield,
    },
  ];
  return (
    <AuthFormCard
      titleBanner="Secure password recovery"
      descriptionBanner="We'll help you regain access to your account safely and securely."
      url="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      services={services}
    >
      <ResetPasswordForm />
    </AuthFormCard>
  );
}
