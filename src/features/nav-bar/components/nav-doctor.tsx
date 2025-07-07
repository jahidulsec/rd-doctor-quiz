import React from "react";
import { verifyAutuser } from "@/lib/dal";
import { getDoctor } from "@/features/doctor/servers/doctor";
import LogoutSection from "./logout-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function NavDoctor() {
  const authUser = await verifyAutuser();
  const doctor = await getDoctor(authUser?.id ?? "");

  return (
    <div className="border-b mb-3 bg-background">
      <div className="flex items-center justify-between gap-5 container mx-auto p-6 py-2 md:px-6">
        {/* user */}
        {doctor.data && (
          <div className="flex items-center gap-3">
            {/* image */}
            <Avatar>
              <AvatarImage
                src={`/api/image/${doctor.data.image.replace("/", "")}`}
                alt={doctor.data.full_name}
                className="bg-muted p-1"
              />
              <AvatarFallback>{doctor.data.full_name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* name */}
            <h2 className="font-semibold text-lg line-clamp-1">
              {doctor.data?.full_name}
            </h2>
          </div>
        )}

        {/* button */}
        {doctor.data && <LogoutSection />}
      </div>
    </div>
  );
}
