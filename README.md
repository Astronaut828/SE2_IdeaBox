# 🏗 IdeaBox (WIP)

A platform for creators to sell digital content and subscription services payment via USDC and Credit Card, built on [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2).

## 📚 Documentation Links

-   [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io/)
-   [Privy Documentation](https://docs.privy.io/)
-   [Stripe API Reference](https://stripe.com/docs/api)
-   [Upstash Redis Docs](https://docs.upstash.com/redis)

## 🎯 Project Overview

This platform enables creators to:

-   Sell downloadable digital content
-   Offer subscription-based services
-   Receive payments in both crypto and fiat currencies
-   Store user data and session management with Redis

## 🔧 Technical Stack

### Core Infrastructure

-   [**Scaffold-ETH 2**](https://github.com/scaffold-eth/scaffold-eth-2) - Ethereum development stack

### Authentication & Payments

-   [**Privy**](https://www.privy.io/) - Web3 Authentication

-   [**Stripe**](https://stripe.com/docs/api) - Payment Processing

### Database & Caching

-   [**Upstash Redis**](https://upstash.com/) - Serverless Redis Database

## 🌟 Key Features

-   **Content Marketplace**

    -   Upload and sell digital content
    -   Content preview functionality

-   **Subscription System**

    -   Time-based access control
    -   Recurring payment handling
    -   Membership benefits management
    -   Subscription management

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

### 1. Create a `.env.local` file in the packages/nextjs directory:

## Service Account Setup

#### Privy Setup

1. Go to [Privy Dashboard](https://console.privy.io/)
2. Create a new project
3. Copy your `APP_ID` from the dashboard

#### Stripe Setup

1. Create a [Stripe Account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

#### Upstash Redis Setup

1. Create account at [Upstash](https://console.upstash.com/)
2. Create new Redis database
3. Get your REST URL and TOKEN from the database details page

### 2. Start a local chain

```bash
yarn chain
```

### 3. Start your NextJS app

in a new terminal, run:

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
