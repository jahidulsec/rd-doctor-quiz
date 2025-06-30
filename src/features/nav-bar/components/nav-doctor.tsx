import Image from "next/image";
import React from "react";
import { verifyAutuser } from "@/lib/dal";
import { getDoctor } from "@/features/doctor/servers/doctor";
import LogoutSection from "./logout-section";

export default async function NavDoctor() {
  const authUser = await verifyAutuser();
  const doctor = await getDoctor(authUser?.id ?? "");

  return (
    <div className="container mx-auto py-4 p-6 md:px-6">
      <div className="flex items-center justify-between gap-5">
        {/* user */}
        {doctor.data && (
          <div className="flex items-center gap-3">
            {/* image */}
            <div className="relative w-8 aspect-square rounded-full overflow-hidden border border-primary bg-accent">
              <Image
                fill
                src={`/api/image/${doctor.data.image.replace('/', '')}`}
                alt={doctor.data.full_name}
                objectFit="cover"
              />
            </div>

            {/* name */}
            <h2 className="font-semibold text-lg">{doctor.data?.full_name}</h2>
          </div>
        )}

        {/* button */}
        <LogoutSection />
      </div>
    </div>
  );
}
