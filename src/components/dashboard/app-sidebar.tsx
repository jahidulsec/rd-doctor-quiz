"use client";

import * as React from "react";
import { Brain, List, LogOut, Rows3, Users } from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { logout } from "@/features/admin/actions/admin";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next";

const data = {
  teams: [
    {
      name: "World Brain Day",
      logo: Brain,
      plan: "Special Quiz",
    },
  ],
  navMain: [
    {
      title: "Doctor",
      url: "/dashboard",
      icon: Users,
      isActive: true,
    },
    {
      title: "Question",
      url: "/dashboard/question",
      icon: Rows3,
    },
    {
      title: "Result",
      url: "/dashboard/result",
      icon: List,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [pending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const response = logout();
                toast.promise(response, {
                  loading: "Loading...",
                  success: (data) => {
                    if (!data.success) throw data.error;
                    router.replace("/login");
                    return data.success;
                  },
                  error: (data) => {
                    return data.error;
                  },
                });
              });
            }}
          >
            <LogOut /> Logout
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
