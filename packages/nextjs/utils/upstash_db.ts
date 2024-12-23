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

// User interface
interface User {
  _id: string;
  //   email: string;
  //   wallet: string;
  name: string;
  payed: boolean;
}

export const db = {
  // Enter new user to database
  async writeUser(key: string, user: User) {
    try {
      const userData = JSON.stringify(user);
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
      console.log("Raw data from Redis:", userData);
      return null;
    } catch (error) {
      console.error("Read error:", error);
      throw error;
    }
  },
};

const user = await db.readUser("user:123");
console.log(user);
