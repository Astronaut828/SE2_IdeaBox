"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { sampleProducts } from "./SampleProducts";
import { usePrivy } from "@privy-io/react-auth";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "~~/components/db";

export const HomeContent = () => {
  const { user } = usePrivy();
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // If user is logged in, ensure demo mode is off
    if (user) {
      localStorage.removeItem("demoMode");
      localStorage.removeItem("demoUser");
      setIsDemoMode(false);
    } else {
      const demoMode = localStorage.getItem("demoMode") === "true";
      setIsDemoMode(demoMode);
    }
  }, [user]);

  const renderUserDetails = () => {
    if (!user && !isDemoMode) return null;

    const userId = isDemoMode ? "did:privy:cm5sma46v08hjoahlcuql688f" : user?.id;

    const handleCopy = () => {
      if (userId) {
        navigator.clipboard.writeText(userId);
      }
    };

    return (
      <div className="p-5 bg-base-100 border border-base-300 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">Current User</h2>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <span className="font-medium whitespace-nowrap">User ID: </span>
            <div className="flex items-center gap-2">
              <span className="text-sm my-auto">{userId}</span>
              <button onClick={handleCopy} className="btn btn-ghost btn-xs" title="Copy ID">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-5 sm:pt-10">
      <div className="px-2 sm:px-5 w-full">
        <h1 className="text-center mb-8">
          <span className="block text-3xl sm:text-4xl font-bold">IdeaBox</span>
        </h1>
        {/* Products */}
        <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-16">
          {/* All Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-2 sm:px-6">
            <ProductCard product={sampleProducts.digital} />
            <ProductCard product={sampleProducts.course} />
            <ProductCard product={sampleProducts.subscription} />
            <ProductCard product={sampleProducts.softwareLicense} />
            <ProductCard product={sampleProducts.membership} />
            <ProductCard product={sampleProducts.apiAccess} />
          </div>
        </div>
        {/* Redis */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12 rounded-3xl">
          {/* Privy User Details */}
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row pb-10">
            {renderUserDetails()}
          </div>
          <UserAuth />
        </div>
        {/* SE2 */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12 rounded-3xl">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
