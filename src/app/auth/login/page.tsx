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
      name: "Bank-level Security",
      description: "  256-bit SSL encryption & CBN licensed",
      icon: Shield,
    },
    {
      id: 2,
      name: "Best Exchange Rates",
      description: "   Save up to 85% on transfer fees",
      icon: TrendingUp,
    },
    {
      id: 3,
      name: "Trusted by Millions",
      description: "Over ₦50B transferred safely",
      icon: Users,
    },
  ];
  return (
    <AuthFormCard
      //   title="Welcome back"
      //   description="Sign in to your account to continue sending money"
      titleBanner="Send money to Nigeria with confidence"
      descriptionBanner="Join over 500,000 users who trust SwiftNaira for fast, secure, and affordable transfers to Nigeria."
      url="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      services={services}
    >
      <LoginForm />
    </AuthFormCard>
  );
}
