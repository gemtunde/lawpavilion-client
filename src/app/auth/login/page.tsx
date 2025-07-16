import LoginForm from "@/components/auth/LoginForm";
import { AuthFormCard } from "@/components/form/AuthFormCard";
import React from "react";
//import { ServiceType } from './(auth)/register/page'
import { Shield, TrendingUp, Users } from "lucide-react";
import { ServiceType } from "../register/page";

export default function LoginPage() {
  const services: ServiceType[] = [
    {
      id: 1,
      name: "High-level Security",
      description: "256-bit SSL encryption licensed",
      icon: Shield,
    },
    {
      id: 2,
      name: "Best Service Rates",
      description: " Save up to 45% on service fees",
      icon: TrendingUp,
    },
    {
      id: 3,
      name: "Trusted by Millions",
      description: "Over 2 Million users monthly",
      icon: Users,
    },
  ];
  return (
    <AuthFormCard
      titleBanner="Law in Nigeria with confidence"
      descriptionBanner="Join over 500,000 users who trust Law Pavilion for fast, secure, and affordable law services in Nigeria."
      url="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      services={services}
    >
      <LoginForm />
    </AuthFormCard>
  );
}
