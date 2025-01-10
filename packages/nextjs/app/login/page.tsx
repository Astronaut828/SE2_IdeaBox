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
          const existingUser = await db.readUser(user.id);

          // If no user found, check for matching accounts
          if (!existingUser) {
            const filteredAccounts = await Promise.all(
              user.linkedAccounts.map(async account => {
                if ("address" in account && account.address) {
                  const exists = await db.checkAccountExists({
                    type: account.type,
                    address: account.address,
                  });
                  return exists ? null : account;
                }
                return account;
              }),
            );

            // Create new user with filtered accounts
            const newUser = {
              _id: crypto.randomUUID(),
              payed: false,
              privy: {
                id: user.id,
                createdAt: user.createdAt,
                linkedAccounts: filteredAccounts
                  .filter(account => account !== null)
                  .map(account => ({
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
