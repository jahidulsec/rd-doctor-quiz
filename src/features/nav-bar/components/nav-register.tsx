import Image from "next/image";
import React from "react";

export default function NavRegister() {
  return (
    <header className="w-full border-b bg-background">
      <div className="flex justify-between items-center gap-5 container px-6 py-3 lg:p-0 mx-auto">
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
    </header>
  );
}
