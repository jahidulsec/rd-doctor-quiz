import { Logo2 } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import LoginForm from "@/features/doctor/components/login-form";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="my-6 max-w-2xl">
      <div className="flex flex-col mb-8">
        <Logo2 width={250} />

        <h1 className="mt-10 text-2xl max-w-80 font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">Login with your account</p>
      </div>

      <LoginForm />

      <div className="flex justify-center items-center gap-2 my-3 text-sm text-foreground">
        <p>Create an account?</p>
        <Button variant={"link"} className="p-0" asChild>
          <Link href={"/register"}>Register</Link>
        </Button>
      </div>
    </div>
  );
}
