"use client";

import Link from "next/link";
import { StripePaymentButton } from "./StripePaymentButton";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "~~/components/db";

export const HomeContent = () => {
  const { address: connectedAddress } = useAccount();
  const { user, authenticated, ready } = usePrivy();

  const renderUserDetails = () => {
    if (!user) return null;

    return (
      <div className="bg-base-200 p-6 rounded-lg mb-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Complete User Information</h2>

        {/* Raw User Data with Syntax Highlighting */}
        <div className="bg-base-100 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(
              {
                user,
                authenticated,
                ready,
                connectedAddress,
                linkedAccounts: user?.linkedAccounts,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">IdeaBox</span>
        </h1>
        <div className="mt-4 flex justify-center">
          <StripePaymentButton />
        </div>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">{renderUserDetails()}</div>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <UserAuth />
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
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
  );
};
