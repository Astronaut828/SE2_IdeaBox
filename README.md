# 🏗 IdeaBox - A decentralized platform for creators to sell digital content and subscription services

## 📚 Documentation Links

-   [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io/)
-   [Privy Documentation](https://docs.privy.io/)
-   [Stripe API Reference](https://stripe.com/docs/api)
-   [Upstash Redis Docs](https://docs.upstash.com/redis)

# 🛍️ Web3 Content Marketplace

A decentralized platform for creators to sell digital content and subscription services, built on [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2).

## 🎯 Project Overview

This platform enables creators to:

-   Sell downloadable digital content
-   Offer subscription-based services
-   Receive payments in both crypto and fiat currencies
-   Store user data and session management with Redis

## 🔧 Technical Stack

### Core Infrastructure

-   [**Scaffold-ETH 2**](https://github.com/scaffold-eth/scaffold-eth-2) - Ethereum development stack
    -   Built-in contract verification
    -   Automated contract deployment
    -   Local chain management
    -   Fast dApp development

### Authentication & Payments

-   [**Privy**](https://www.privy.io/) - Web3 Authentication

    -   Embedded wallet creation
    -   Social login integration
    -   Multi-wallet support
    -   Email authentication

-   [**Stripe**](https://stripe.com/docs/api) - Payment Processing
    -   Fiat payment integration
    -   Subscription management
    -   Payment webhook handling
    -   Secure checkout flow

### Database & Caching

-   [**Upstash Redis**](https://upstash.com/) - Serverless Redis Database
    -   Session management
    -   Rate limiting
    -   Caching layer
    -   Real-time data updates

## 🌟 Key Features

-   **Content Marketplace**

    -   Upload and sell digital content
    -   Content preview functionality

-   **Subscription System**

    -   Time-based access control
    -   Recurring payment handling
    -   Membership benefits management

-   **Payment Options**
    -   Cryptocurrency payments (USDC)
    -   Fiat currency integration via Stripe
    -   Automated revenue distribution

## 🚀 Quick Start of the project / Scaffold-ETH 2 app

## Prerequisites

Before you begin, you need to install the following tools:

-   [Node (>= v18.18)](https://nodejs.org/en/)
-   [Yarn (v1 or v2+)](https://yarnpkg.com/getting-started/install)
-   [Git](https://git-scm.com/downloads)

Create a `.env` file in the root directory:

````

## Start your NextJS app

```bash
yarn start
```

Visit your app at: http://localhost:3000

## 📝 Additional Commands

```bash
# Rebuild contracts if you make changes
yarn contracts:build

# Run contract tests
yarn test

# Build for production
yarn build
```

### 2. Service Account Setup

#### Privy Setup

1. Go to [Privy Dashboard](https://console.privy.io/)
2. Create a new project
3. Copy your `APP_ID` from the dashboard
4. Configure allowed redirect URLs in Privy dashboard:
    - `http://localhost:3000` (development)
    - Your production URL

#### Stripe Setup

1. Create a [Stripe Account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Enable webhooks for:
    - `payment_intent.succeeded`
    - `customer.subscription.created`
    - `customer.subscription.updated`

#### Upstash Redis Setup

1. Create account at [Upstash](https://console.upstash.com/)
2. Create new Redis database
3. Get your REST URL and TOKEN from the database details page
````
