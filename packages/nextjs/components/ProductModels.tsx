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

// Consulting Product (e.g., expert sessions, advisory services)
export interface ConsultingProduct extends BaseProduct {
  sessionDuration: number; // minutes
  expertiseLevel: "junior" | "senior" | "principal";
  availability: {
    timeZone: string;
    availableDays: string[];
    availableHours: string[];
  };
  deliverables: string[];
  consultationType: "one-time" | "ongoing" | "retainer";
  communicationChannel: "video" | "phone" | "in-person" | "chat";
  cancellationWindow: number; // hours before session
  expertise: string[];
}

// Software License Product (e.g., enterprise software, development tools)
export interface SoftwareLicenseProduct extends BaseProduct {
  licenseType: "perpetual" | "subscription" | "floating";
  maxUsers: number;
  validityPeriod: number; // days
  features: {
    name: string;
    included: boolean;
    description?: string;
  }[];
  supportLevel: "basic" | "premium" | "enterprise";
  updatePolicy: "lifetime" | "limited" | "none";
  deploymentType: "cloud" | "on-premise" | "hybrid";
  apiAccess: boolean;
  customizationAllowed: boolean;
}

// Membership Product (e.g., community access, exclusive groups)
export interface MembershipProduct extends BaseProduct {
  tier: "bronze" | "silver" | "gold" | "platinum";
  duration: number; // days
  benefits: string[];
  accessiblePlatforms: string[];
  exclusiveContent: {
    type: string;
    frequency: "daily" | "weekly" | "monthly";
    description: string;
  }[];
  membershipPerks: string[];
  votingRights: boolean;
  referralBenefits: boolean;
  maxMembers?: number;
}

// NFT Product (e.g., digital collectibles, art)
export interface NFTProduct extends BaseProduct {
  collection: string;
  tokenId: string;
  blockchain: "ethereum" | "polygon" | "solana" | "other";
  metadata: {
    image: string;
    attributes: {
      trait_type: string;
      value: string;
      rarity?: number;
    }[];
  };
  royaltyPercentage: number;
  edition: {
    total: number;
    number: number;
  };
  provenance: string;
  utilityFeatures: string[];
  transferRestrictions?: string[];
}

// API Access Product (e.g., data services, web3 APIs)
export interface APIAccessProduct extends BaseProduct {
  tier: "free" | "basic" | "pro" | "enterprise";
  rateLimit: {
    requestsPerSecond: number;
    requestsPerMonth: number;
  };
  endpoints: {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    description: string;
  }[];
  authentication: "api_key" | "oauth" | "jwt";
  supportSLA: string;
  dataRetention: number; // days
  customization: boolean;
  uptime: number;
  sandboxAccess: boolean;
}
