import { CourseProduct, DigitalProduct, SubscriptionProduct } from "./ProductModels";

export const sampleProducts = {
  digital: {
    id: BigInt(1),
    name: "DigitalProduct / Download",
    price: BigInt(1), // $ 1
    body: "Option to offer content for download",
    downloadUrl: "https://example.com/web3-toolkit-pro",
    fileSize: "2.5GB",
    fileFormat: "ZIP",
    licenseType: "commercial",
  } as DigitalProduct,

  course: {
    id: BigInt(2),
    name: "Course / Access",
    price: BigInt(3), // $ 3
    body: "Option to offer access to a course for a limited time",
    accessDuration: 365, // 1 year access
    courseLevel: "advanced",
    modules: [
      "Includes video, text, and interactive content",
      "Module 1: Introduction to Web3",
      "Module 2: Smart Contracts",
      "Module 3: Decentralized Applications",
      "Module 4: Blockchain Security",
      "Module 5: Advanced Topics",
    ],
    includesSupport: true,
    accessType: "Full Access",
    contentType: "hybrid",
  } as CourseProduct,

  subscription: {
    id: BigInt(3),
    name: "Subscription / Access",
    price: BigInt(5), // $5
    body: "Option to offer access to a subscription service for a limited time",
    billingCycle: "monthly",
    features: [
      "Early Access to New Features",
      "Premium Development Tools",
      "Monthly Workshop Access",
      "Private Discord Community",
      "Custom Smart Contract Templates",
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
