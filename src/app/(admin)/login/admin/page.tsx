import LoginForm from "@/features/admin/components/login-form";
import NavRegister from "@/features/nav-bar/components/nav-register";
import React from "react";

export default function AdminLoginPage() {
  return (
    <div>
      <NavRegister />
      <main className="min-h-[calc(100svh-64px)] w-full flex flex-col justify-center items-center px-6 relative">
        <div className="flex flex-col mb-10 items-center">
          <h1 className="text-2xl text-center max-w-80 mx-auto font-semibold">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Login with your account
          </p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
