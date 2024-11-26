import RegisterForm from "@/app/(client)/(auth)/register/form";
import React from "react";

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-xl">Register</h3>
      </div>
      <RegisterForm />
    </>
  );
}
