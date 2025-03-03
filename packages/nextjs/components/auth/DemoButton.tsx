"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DemoButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoAccess = async () => {
    try {
      setIsLoading(true);

      // Store demo state and demo user data
      localStorage.setItem("demoMode", "true");
      localStorage.setItem(
        "demoUser",
        JSON.stringify({
          id: "demo-user",
          createdAt: new Date().toISOString(),
          linkedAccounts: [],
          payed: false,
        }),
      );

      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error entering demo mode:", error);
      localStorage.removeItem("demoMode");
      localStorage.removeItem("demoUser");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn btn-secondary btn-lg px-4 sm:px-10 py-2 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-base-content/40"
      onClick={handleDemoAccess}
      disabled={isLoading}
    >
      {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Try Demo"}
    </button>
  );
};

export default DemoButton;
