"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check for demo mode in localStorage
    const demoMode = localStorage.getItem("demoMode") === "true";
    setIsDemoMode(demoMode);
  }, []);

  if (pathname === "/" || pathname === "/login") {
    return <>{children}</>;
  }
  if (!ready && !isDemoMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Protect other routes
  if (!authenticated && !isDemoMode) {
    router.replace("/login");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
