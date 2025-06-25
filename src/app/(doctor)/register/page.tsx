import RegisterForm from "@/features/doctor/components/register-form";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="my-6">
      <h1 className="mb-14 text-2xl text-center max-w-80 mx-auto font-medium">
        Register for the World Brain Day Special {" "}
        <span className="text-secondary">Quiz</span>
      </h1>
      <RegisterForm />
    </div>
  );
}
