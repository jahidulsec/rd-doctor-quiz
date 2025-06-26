import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavRegister from "@/features/nav-bar/components/nav-register";
import React from "react";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavRegister className="px-4 p-2 flex justify-between flex-wrap" />
        <div className="px-4 p-2 flex flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
