import { getDoctor } from "@/features/doctor/servers/doctor";
import NavDoctor from "@/features/nav-bar/components/nav-doctor";
import NavFooter from "@/features/nav-bar/components/nav-footer";
import NavRegister from "@/features/nav-bar/components/nav-register";
import { verifyAutuser } from "@/lib/dal";
import React, { PropsWithChildren } from "react";

export default async function DoctorLayout({ children }: PropsWithChildren) {
  const authUser = await verifyAutuser();
  const doctor = await getDoctor(authUser?.id ?? "");

  return (
    <div className="max-h-dvh overflow-y-auto  bg-linear-to-br from-purple-100 to-indigo-50">
      <NavRegister />
      <NavDoctor />
      <main className="min-h-[calc(100svh-150px)] w-full container mx-auto px-6">
        {children}
      </main>
      {doctor.data && <NavFooter />}
    </div>
  );
}
