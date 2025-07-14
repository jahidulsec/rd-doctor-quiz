import { LogoFull } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/features/doctor/components/register-form";
import { BadgeInfo } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  const activeRegister = process.env.NEXT_PUBLIC_REGISTER_ACTIVE;

  if (activeRegister === "0")
    return (
      <div className="flex flex-col justify-center items-center gap-5">
        <BadgeInfo size={100} className="text-primary/50 fill-primary/40" />
        <p className="text-muted-foreground">Registration has Ended!</p>
      </div>
    );

  return (
    <div className="my-6">
      <LogoFull className="text-primary mb-10" width={250} />
      <h1 className="mb-14 text-2xl text- max-w-80 mx-auto font-medium">
        Register for the World Brain Day Special{" "}
        <span className="text-primary">Quiz</span>
      </h1>
      <RegisterForm />

      <div className="flex justify-center items-center gap-2 my-3 text-sm">
        <p>Already have an account?</p>
        <Button variant={"link"} className="p-0" asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  );
}
