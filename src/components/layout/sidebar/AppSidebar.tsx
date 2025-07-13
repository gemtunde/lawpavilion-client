"use client";

import * as React from "react";
import {
  AudioWaveform,
  CreditCard,
  History,
  Home,
  Send,
  Shield,
  Users,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

// This is sample data.
const data = {
  user: {
    name: "Tunde Elesho",
    email: "tunde@impactpay.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "Law Pavilion",
    logo: AudioWaveform,
    plan: "₦igeria Exchange",
  },

  navMain: [
    { title: "Dashboard", url: "/home", icon: Home, isActive: true },
    { title: "Send Money", url: "/send", icon: Send },
    { title: "Fund Wallet", url: "/wallet", icon: Wallet },
    { title: "Transactions", url: "/transactions", icon: History },
    { title: "Payment Methods", url: "/payment", icon: CreditCard },
    { title: "Recipients", url: "/recipients", icon: Users },
    { title: "Security", url: "/security", icon: Shield },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
