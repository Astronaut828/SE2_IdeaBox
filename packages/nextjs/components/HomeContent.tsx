"use client";

import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { CourseProduct, DigitalProduct, SubscriptionProduct } from "./ProductModels";
import { StripePaymentButton } from "./StripePaymentButton";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "~~/components/db";

export const HomeContent = () => {
  const { address: connectedAddress } = useAccount();
  const { user, authenticated, ready } = usePrivy();

  // Sample products data
  const sampleProducts = {
    digital: {
      id: BigInt(1),
      name: "Web3 Development Toolkit Pro",
      price: BigInt(1000000000000000000), // 1 ETH
      body: "Complete suite of professional Web3 development tools, including smart contract templates, testing frameworks, and deployment scripts.",
      downloadUrl: "https://example.com/web3-toolkit-pro",
      fileSize: "2.5GB",
      fileFormat: "ZIP",
      licenseType: "commercial",
    } as DigitalProduct,

    course: {
      id: BigInt(2),
      name: "Mastering Blockchain Development",
      price: BigInt(2000000000000000000), // 2 ETH
      body: "Comprehensive blockchain development course covering everything from basic concepts to advanced DApp architecture.",
      accessDuration: 365, // 1 year access
      courseLevel: "advanced",
      modules: [
        "Blockchain Fundamentals",
        "Smart Contract Development",
        "DApp Architecture",
        "Web3 Integration",
        "Security Best Practices",
        "Testing & Deployment",
        "Project Management",
      ],
      includesSupport: true,
      maxDevices: 3,
      accessType: "lifetime",
      contentType: "hybrid", // Includes video, text, and interactive content
    } as CourseProduct,

    subscription: {
      id: BigInt(3),
      name: "Web3 Developer Pro Suite",
      price: BigInt(500000000000000000), // 0.5 ETH
      body: "Professional subscription service for Web3 developers including premium tools, early access to new features, and dedicated support.",
      billingCycle: "monthly",
      features: [
        "24/7 Priority Support",
        "Early Access to New Features",
        "Premium Development Tools",
        "Monthly Workshop Access",
        "Private Discord Community",
        "Custom Smart Contract Templates",
        "Advanced Analytics Dashboard",
      ],
      trialPeriodDays: 14,
      autoRenew: true,
      timeframe: {
        purchaseDate: Date.now(),
        startDate: Date.now(),
        endDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        lastRenewalDate: Date.now(),
      },
    } as SubscriptionProduct,
  };

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
        {/* Products */}
        <div className="px-5 max-w-7xl w-full">
          <h2 className="text-3xl font-bold mb-8">Our Products</h2>
          {/* All Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            <ProductCard product={sampleProducts.digital} />
            <ProductCard product={sampleProducts.course} />
            <ProductCard product={sampleProducts.subscription} />
          </div>
        </div>
        {/* Stripe Payment Button */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12 rounded-3xl">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <StripePaymentButton />
            </div>
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
