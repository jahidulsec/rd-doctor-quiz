import NavDoctor from "@/features/nav-bar/components/nav-doctor";
import NavRegister from "@/features/nav-bar/components/nav-register";
import React, { PropsWithChildren } from "react";

export default async function DoctorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavRegister />
      <NavDoctor  />
      <main className="min-h-[calc(100svh-150px)] w-full container mx-auto px-6">
        {children}
      </main>
    </>
  );
}
