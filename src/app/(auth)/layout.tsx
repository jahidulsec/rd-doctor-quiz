import NavRegister from "@/features/nav-bar/components/nav-register";
import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="dark min-h-dvh max-h-dvh overflow-y-auto bg-linear-to-br from-indigo-950 via-purple-950 to-indigo-950">
      <NavRegister />
      <div className="min-h-[calc(100svh-64px)] w-full container mx-auto px-6 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
