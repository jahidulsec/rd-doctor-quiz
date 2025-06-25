import NavRegister from "@/features/nav-bar/components/nav-register";
import React, { PropsWithChildren } from "react";

export default function DoctorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavRegister />
      <main className="min-h-[calc(100svh-64px)] w-full flex justify-center items-center px-6">
        {children}
      </main>
    </>
  );
}
