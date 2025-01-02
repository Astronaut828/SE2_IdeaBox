"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "~~/components/auth";
import { db } from "~~/utils/upstash_db";

export default function LoginPage() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    const handleUserAuth = async () => {
      if (ready && authenticated && user) {
        try {
          // First check if user exists by Privy ID
          let existingUser = await db.readUser(user.id);

          // If no user found, check for matching accounts
          if (!existingUser) {
            const injectedWallets = user.linkedAccounts.filter(
              account =>
                account.type === "wallet" &&
                "address" in account &&
                ("walletClientType" in account || "connectorType" in account),
            );

            // Check for email accounts
            const emailAccounts = user.linkedAccounts.filter(
              account => account.type === "email" && "address" in account,
            );

            const keys = await db.getAllKeys();

            for (const key of keys) {
              const userData = await db.readUser(key);
              if (!userData) continue;

              // Check for matching wallet or email
              const hasMatchingAccount = userData.privy.linkedAccounts.some(dbAccount =>
                [...injectedWallets, ...emailAccounts].some(
                  userAccount =>
                    "address" in userAccount &&
                    dbAccount.address === userAccount.address &&
                    ((dbAccount.type === "wallet" && dbAccount.connectorType !== "embedded") ||
                      dbAccount.type === "email"),
                ),
              );

              if (hasMatchingAccount) {
                // Update the existing user's Privy ID
                userData.privy.id = user.id;
                await db.writeUser(user.id, userData);
                existingUser = userData;
                break;
              }
            }
          }

          if (!existingUser) {
            // Create new user with updated structure
            const newUser = {
              _id: crypto.randomUUID(),
              payed: false,
              privy: {
                id: user.id,
                createdAt: user.createdAt,
                linkedAccounts: user.linkedAccounts.map(account => ({
                  address: "address" in account ? account.address : null,
                  type: account.type,
                  firstVerifiedAt: account.firstVerifiedAt,
                  latestVerifiedAt: account.latestVerifiedAt,
                  ...("walletClientType" in account && {
                    walletClientType: account.walletClientType,
                    ...("connectorType" in account && { connectorType: account.connectorType }),
                  }),
                })),
              },
              payments: [],
            };

            await db.writeUser(user.id, newUser);
          }

          router.push("/");
        } catch (error) {
          console.error("Error handling user authentication:", error);
          router.push("/");
        }
      }
    };

    handleUserAuth();
  }, [ready, authenticated, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to IdeaBox</h1>
        <Button />
      </div>
    </div>
  );
}
