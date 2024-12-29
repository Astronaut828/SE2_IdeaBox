// Base Product Interface
export interface BaseProduct {
  id: bigint;
  name: string;
  price: bigint;
  body: string;
}

// Digital Product (e.g., software, ebooks, digital art, videos)
export interface DigitalProduct extends BaseProduct {
  downloadUrl: string;
  fileSize: string;
  fileFormat: string;
  licenseType: "personal" | "commercial" | "enterprise";
}

// Course/Access Product (e.g., online courses, gated content)
export interface CourseProduct extends BaseProduct {
  accessDuration: number; // duration in days
  courseLevel: "beginner" | "intermediate" | "advanced";
  modules: string[];
  includesSupport: boolean;
  accessType: "Full Access" | "Limited Access";
  contentType: "video" | "text" | "interactive" | "hybrid";
}

// Subscription Product (e.g., services, memberships)
export interface SubscriptionProduct extends BaseProduct {
  billingCycle: "monthly" | "quarterly" | "yearly";
  features: string[];
  trialPeriodDays: number;
  autoRenew: boolean;
  timeframe: {
    purchaseDate: number; // Unix timestamp of purchase
    startDate: number; // Unix timestamp when subscription begins
    endDate: number; // Unix timestamp when subscription expires
    lastRenewalDate?: number; // Optional: timestamp of last renewal
  };
}
