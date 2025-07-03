"use client";

import { useRouter } from "@bprogress/next";
import Image from "next/image";
import React, { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="relative w-20 aspect-square">
        <Image fill src={"/images/gratitude.png"} alt="" />
      </div>
      <p className="text-center">
        Thank You for Registering for The{" "}
        <strong className="text-primary">Brainfest Challenge</strong>
      </p>
    </div>
  );
}
