import LoginForm from "@/features/doctor/components/login-form";
import React from "react";

export default function LoginPage() {
  return (
    <div className="my-6">
      <div className="flex flex-col mb-10">
        <h1 className="text-2xl text-center max-w-80 mx-auto font-semibold">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">Login with your Apple or Google account</p>
      </div>

      <LoginForm />
    </div>
  );
}
