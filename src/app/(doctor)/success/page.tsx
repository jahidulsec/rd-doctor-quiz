import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 min-h-[50vh]">
      <div className="relative w-20 aspect-square">
        <Image
          src={"/images/success.png"}
          alt="success icon"
          fill
          objectFit="cover"
        />
      </div>
      <p>Your response is submitted</p>
      <Button asChild>
        <Link href={"/preview"}>Preview Response</Link>
      </Button>
    </div>
  );
}
