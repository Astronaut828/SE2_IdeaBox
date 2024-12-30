"use client";

import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { sampleProducts } from "./SampleProducts";
import { usePrivy } from "@privy-io/react-auth";
// import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "~~/components/db";

export const HomeContent = () => {
  const { user } = usePrivy();

  const renderUserDetails = () => {
    if (!user) return null;

    // Extract Privy from linkedAccount
    const simplifiedAccount = user?.linkedAccounts?.map(account => {
      const baseAccount = {
        address: "address" in account ? account.address : null,
        type: account.type,
        firstVerifiedAt: account.firstVerifiedAt,
        latestVerifiedAt: account.latestVerifiedAt,
      };

      // Only add wallet-specific fields if they exist
      if ("walletClientType" in account) {
        return {
          ...baseAccount,
          walletClientType: account.walletClientType,
          // Only add connectorType if it exists (for wallet accounts)
          ...("connectorType" in account && { connectorType: account.connectorType }),
        };
      }

      return baseAccount;
    });

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Complete User Information</h2>

        {/* Raw User Data with Syntax Highlighting */}
        <div className="bg-base-100 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(
              {
                id: user?.id,
                createdAt: user?.createdAt,
                linkedAccounts: simplifiedAccount,
                /// Full return data from Privy: ///
                // user,
                // authenticated,
                // ready,
                // connectedAddress,
                // linkedAccount: user?.linkedAccounts, // Will keep this
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
    <div className="flex items-center flex-col flex-grow pt-5 sm:pt-10">
      <div className="px-2 sm:px-5 w-full">
        <h1 className="text-center mb-8">
          <span className="block text-xl sm:text-2xl mb-2">Welcome to</span>
          <span className="block text-3xl sm:text-4xl font-bold">IdeaBox</span>
        </h1>
        {/* Products */}
        <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-16">
          {/* All Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-2 sm:px-6">
            <ProductCard product={sampleProducts.digital} />
            <ProductCard product={sampleProducts.course} />
            <ProductCard product={sampleProducts.subscription} />
          </div>
        </div>
        {/* Privy User Details */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12 rounded-3xl">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">{renderUserDetails()}</div>
        </div>

        {/* Redis */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12 rounded-3xl">
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
