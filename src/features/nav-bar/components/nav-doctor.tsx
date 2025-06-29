import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function NavDoctor() {
  return (
    <div className="container mx-auto py-4 p-6 md:px-6">
      <div className="flex items-center justify-between gap-5">
        {/* user */}
        <div className="flex items-center gap-3">
          {/* image */}
          <div className="relative w-10 aspect-square rounded-full overflow-hidden border border-secondary">
            <Image
              fill
              src={"/images/logo_full.svg"}
              alt=""
              objectFit="cover"
              className="scale-75"
            />
          </div>

          {/* name */}
          <h2 className="font-bold">Dr. John</h2>
        </div>

        {/* button */}
        <Button variant={"ghost"} className="bg-accent hover:bg-accent/40">
          <LogOut className="text-secondary" />
          Logout
        </Button>
      </div>
    </div>
  );
}
