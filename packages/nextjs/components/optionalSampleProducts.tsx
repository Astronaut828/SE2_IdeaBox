import {
  APIAccessProduct,
  ConsultingProduct,
  MembershipProduct,
  NFTProduct,
  SoftwareLicenseProduct,
} from "./ProductModels";

export const optionalSampleProducts = {
  // Technical consulting session with a blockchain expert
  consulting: {
    id: BigInt(101),
    name: "Smart Contract Security Consultation",
    price: BigInt(150), // $150 per session
    body: "1-on-1 consultation with a blockchain security expert",
    sessionDuration: 60, // 60 minutes
    expertiseLevel: "senior",
    availability: {
      timeZone: "UTC",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      availableHours: ["09:00-12:00", "13:00-17:00"],
      nextAvailable: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
    },
    deliverables: ["Smart contract security audit report", "Recommendations document", "Follow-up email support"],
    consultationType: "one-time",
    communicationChannel: "video",
    cancellationWindow: 24, // 24 hours notice required
    expertise: ["Smart Contract Auditing", "DeFi Security", "Gas Optimization", "Solidity Best Practices"],
    features: [
      "60-minute Expert Consultation",
      "Security Audit Report",
      "Code Review & Recommendations",
      "2 Weeks Email Support",
      "Follow-up Session (15min)",
    ],
    supportLevel: "priority",
  } as ConsultingProduct,

  // Enterprise-grade software license
  softwareLicense: {
    id: BigInt(102),
    name: "Web3 Development Suite Pro",
    price: BigInt(999), // $999
    body: "Professional development toolkit for Web3 applications",
    licenseType: "subscription",
    maxUsers: 10,
    validityPeriod: 365, // 1 year
    features: [
      {
        name: "Unlimited Smart Contract Deployments",
        included: true,
        description: "Deploy unlimited smart contracts to any network",
      },
      {
        name: "Advanced Testing Suite",
        included: true,
        description: "Comprehensive testing tools",
      },
      {
        name: "24/7 Technical Support",
        included: true,
      },
      {
        name: "Custom Plugin Development",
        included: true,
      },
      {
        name: "Automated Security Scanning",
        included: true,
      },
    ],
    supportLevel: "premium",
    updatePolicy: "lifetime",
    deploymentType: "hybrid",
    apiAccess: true,
    customizationAllowed: true,
    validUntil: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
    lastUpdate: Date.now(),
  } as unknown as SoftwareLicenseProduct,

  // Premium community membership
  membership: {
    id: BigInt(103),
    name: "Web3 Builders Club",
    price: BigInt(50), // $50
    body: "Exclusive community for Web3 developers and entrepreneurs",
    tier: "gold",
    duration: 30, // 30 days
    benefits: [
      "Private Discord Access",
      "Weekly Developer Workshops",
      "Early Access to Features",
      "1-on-1 Mentoring Sessions",
      "Exclusive NFT Drops",
    ],
    accessiblePlatforms: ["Discord", "Telegram", "Forum"],
    exclusiveContent: [
      {
        type: "Technical Deep Dives",
        frequency: "weekly",
        description: "In-depth technical analysis of popular protocols",
      },
      {
        type: "Market Research",
        frequency: "monthly",
        description: "Comprehensive Web3 market analysis",
      },
    ],
    membershipPerks: ["Early access to new features", "Member-only events", "Exclusive educational content"],
    votingRights: true,
    referralBenefits: true,
    maxMembers: 1000,
    validUntil: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    memberSince: Date.now(),
  } as MembershipProduct,

  // Limited edition NFT
  nft: {
    id: BigInt(104),
    name: "Genesis Developer Badge",
    price: BigInt(75), // $75
    body: "Exclusive NFT for founding members of the platform",
    collection: "Web3 Builders Genesis",
    tokenId: "1",
    blockchain: "ethereum",
    metadata: {
      image: "https://example.com/nft/genesis-badge.png",
      attributes: [
        {
          trait_type: "Rarity",
          value: "Legendary",
          rarity: 0.1,
        },
        {
          trait_type: "Generation",
          value: "Genesis",
        },
      ],
    },
    royaltyPercentage: 2.5, // 2.5% royalty on secondary sales
    edition: {
      total: 100,
      number: 1,
    },
    provenance: "0x1234...5678", // Hash of original artwork
    utilityFeatures: [
      "Lifetime Platform Access",
      "Governance Voting Rights",
      "Revenue Sharing (2.5%)",
      "Exclusive Event Access",
      "Community Badge Status",
    ],
    transferRestrictions: ["7-day transfer lock after purchase"],
    mintDate: Date.now(),
    lastTransfer: Date.now(),
  } as NFTProduct,

  // API access package
  apiAccess: {
    id: BigInt(105),
    name: "Blockchain Data API Pro",
    price: BigInt(299), // $299
    body: "Professional access to blockchain data and analytics API",
    tier: "pro",
    rateLimit: {
      requestsPerSecond: 10,
      requestsPerMonth: 1000000,
    },
    endpoints: [
      {
        path: "/v1/transactions",
        method: "GET",
        description: "Fetch detailed transaction data",
      },
      {
        path: "/v1/analytics",
        method: "POST",
        description: "Generate custom analytics reports",
      },
    ],
    authentication: "api_key",
    supportSLA: "99.9% uptime, 24/7 support",
    dataRetention: 90, // 90 days
    customization: true,
    uptime: 99.9,
    sandboxAccess: true,
    features: [
      "1M API Calls per Month",
      "99.9% Uptime SLA",
      "Real-time Data Access",
      "Advanced Analytics",
      "Custom Endpoints",
    ],
    validUntil: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    lastUsage: Date.now(),
  } as APIAccessProduct,
};
