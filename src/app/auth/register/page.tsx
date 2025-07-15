import RegisterForm from "@/components/auth/RegisterForm";
import { AuthFormCard } from "@/components/form/AuthFormCard";
import { Clock, LucideProps, Shield } from "lucide-react";
import React from "react";

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export default function Register() {
  const services: ServiceType[] = [
    {
      id: 1,
      name: "Quick Setup",
      description: "Account ready in under 5 minutes",
      icon: Clock,
    },
    {
      id: 2,
      name: "Secure & Compliant",
      description: "KYC verified & fully regulated",
      icon: Shield,
    },
  ];

  return (
    <AuthFormCard
      titleBanner="Join the future of Legal Tenhnology"
      descriptionBanner="Create your account in seconds."
      url="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      services={services}
    >
      <RegisterForm />
    </AuthFormCard>
  );
}
