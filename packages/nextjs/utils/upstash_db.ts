import { Redis } from "@upstash/redis";

// env variables
const url = process.env.NEXT_PUBLIC_KV_REST_API_URL;
const token = process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;

if (!url || !token) {
  throw new Error("Missing Redis environment variables");
}

const redis = new Redis({
  url,
  token,
});

// Function to test Redis connection
export const testRedisConnection = async () => {
  try {
    const testKey = "test:key";
    const testValue = "testValue";

    await redis.set(testKey, testValue);
    const retrievedValue = await redis.get<string>(testKey);

    if (retrievedValue === testValue) {
      console.log("Redis connection is working correctly.");
    } else {
      console.error("Redis connection test failed: Retrieved value does not match.");
    }
  } catch (error) {
    console.error("Redis connection test failed:", error);
  }
};

// Export all interfaces
export interface LinkedAccount {
  address: string | null;
  type: string;
  firstVerifiedAt: Date | null;
  latestVerifiedAt: Date | null;
  walletClientType?: string;
  connectorType?: string;
}

export interface PrivyData {
  id: string;
  createdAt: Date;
  linkedAccounts: LinkedAccount[];
}

export interface PaymentDetail {
  id: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: Date;
  type: "stripe" | "crypto";
  subscriptionId: string;
  subscription: boolean;
  subscriptionEndsAt: Date;
  productId: string;
  productDownloaded: boolean;
}

export interface User {
  _id: string; // Internal UUID
  payed: boolean;
  privy: PrivyData;
  payments: PaymentDetail[];
}

export const db = {
  // Enter new user to database
  async writeUser(key: string, user: User) {
    try {
      // Convert dates to ISO strings before saving
      const serializedUser = {
        ...user,
        privy: {
          ...user.privy,
          createdAt: user.privy.createdAt.toISOString(),
          linkedAccounts: user.privy.linkedAccounts.map(account => ({
            ...account,
            firstVerifiedAt: account.firstVerifiedAt?.toISOString() || null,
            latestVerifiedAt: account.latestVerifiedAt?.toISOString() || null,
          })),
        },
        payments: user.payments.map(payment => ({
          ...payment,
          timestamp: payment.timestamp.toISOString(),
          subscriptionEndsAt: payment.subscriptionEndsAt.toISOString(),
        })),
      };
      const userData = JSON.stringify(serializedUser);
      return await redis.set(key, userData);
    } catch (error) {
      console.error("Write error:", error);
      throw error;
    }
  },

  // Read user from database
  async readUser(key: string): Promise<User | null> {
    try {
      const userData = await redis.get<string>(key);
      if (!userData) return null;

      let parsedUser;
      if (typeof userData === "string") {
        parsedUser = JSON.parse(userData);
      } else {
        parsedUser = userData;
      }

      // Convert ISO strings back to Date objects
      return {
        ...parsedUser,
        privy: {
          ...parsedUser.privy,
          createdAt: new Date(parsedUser.privy.createdAt),
          linkedAccounts: parsedUser.privy.linkedAccounts.map((account: any) => ({
            ...account,
            firstVerifiedAt: account.firstVerifiedAt ? new Date(account.firstVerifiedAt) : null,
            latestVerifiedAt: account.latestVerifiedAt ? new Date(account.latestVerifiedAt) : null,
          })),
        },
        payments: parsedUser.payments.map((payment: any) => ({
          ...payment,
          timestamp: new Date(payment.timestamp),
          subscriptionEndsAt: new Date(payment.subscriptionEndsAt),
        })),
      };
    } catch (error) {
      console.error("Read error:", error);
      throw error;
    }
  },
};
