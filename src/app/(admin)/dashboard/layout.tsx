import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <div className="flex items-center border-b py-2 px-4 gap-5">
          <SidebarTrigger />
          <Separator orientation="vertical" className="max-h-5" />
          <div className={"flex justify-between items-center gap-5 w-full"}>
            <Image
              src={"/images/Radiant Digital Health Logo.png"}
              alt="Radiant Digital Health"
              width={150}
              height={100}
            />

            <div className="relative w-16 aspect-video">
              <Image
                src={"/images/Rivotril-1.svg"}
                alt="Radiant Digital Health"
                fill
              />
            </div>
          </div>
        </div>
        <div className="px-4 p-2 flex flex-col gap-4 md:container md:mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
