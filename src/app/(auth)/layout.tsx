import NavRegister from "@/features/nav-bar/components/nav-register";
import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <NavRegister />
      <div className="min-h-[calc(100svh-64px)] w-full container mx-auto px-6 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
