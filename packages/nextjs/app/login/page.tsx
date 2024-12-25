"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { LoginButton } from "~~/components/auth";

export default function LoginPage() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to IdeaBox</h1>
        <LoginButton />
      </div>
    </div>
  );
}
