import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavRegister from "@/features/nav-bar/components/nav-register";
import React from "react";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <div className="flex items-center px-4">
          <SidebarTrigger />
          <NavRegister className="border-b-0 flex justify-between flex-wrap" />
        </div>
        <div className="px-4 p-2 flex flex-col gap-4 md:container md:mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
