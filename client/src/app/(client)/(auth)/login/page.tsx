import LoginForm from "@/app/(client)/(auth)/login/form";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-xl">Login</h3>
      </div>
      <LoginForm />
    </>
  );
}
