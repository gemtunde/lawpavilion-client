"use client";

import * as React from "react";
import { AudioWaveform, Home, Shield } from "lucide-react";

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
    email: "tunde@lawpavilion.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "Law Pavilion",
    logo: AudioWaveform,
    plan: "Legal Tech",
  },

  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: Home, isActive: true },

    { title: "Settings", url: "/dashboard/settings", icon: Shield },
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
