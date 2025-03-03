"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HomeContent } from "../components/HomeContent";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "~~/components/auth";

const Home = () => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const demoMode = localStorage.getItem("demoMode") === "true";
    setIsDemoMode(demoMode);
  }, []);

  useEffect(() => {
    if (ready && !authenticated && !isDemoMode) {
      router.push("/login");
    }
  }, [ready, authenticated, isDemoMode, router]);

  if (!ready && !isDemoMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!authenticated && !isDemoMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Please login to continue</h1>
          <Button />
        </div>
      </div>
    );
  }

  return <HomeContent />;
};

export default Home;
