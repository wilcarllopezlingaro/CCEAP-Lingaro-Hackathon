# CCEAP Access Guardian

A [Next.js](https://nextjs.org) dashboard that monitors Azure Key Vault secrets
(secrets, keys, and certificates) and flags their refresh/expiry validity by risk.

## Risk Classification

Risk is computed from the number of days remaining until a secret's expiry date:

| Days Remaining | Risk Level | Color    |
|-----------------|------------|----------|
| 0 - 7            | Critical   | 🔴 Red    |
| 8 - 15           | High       | 🟠 Orange |
| 16 - 30          | Warning    | 🟡 Amber  |
| More than 30     | Healthy    | 🟢 Green  |

The classification rules and color mapping live in a single source of truth:
`src/lib/risk.ts` (`RISK_CONFIG`, `getRiskLevel`).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   └── page.tsx            # Dashboard page (Server Component, fetches data)
├── components/
│   └── dashboard/
│       ├── DashboardHeader.tsx   # Title + live/mock data indicator
│       ├── SummaryCards.tsx      # KPI cards per risk level
│       ├── RiskLegend.tsx        # Explains the color coding rules
│       ├── FilterBar.tsx         # Search + risk level filter chips (client)
│       ├── DashboardClient.tsx   # Client-side filter state + table wiring
│       ├── SecretsTable.tsx      # Color-coded secrets table
│       └── RiskBadge.tsx         # Reusable risk pill/badge
└── lib/
    ├── types.ts             # AzureSecret / SecretWithRisk / RiskSummary types
    ├── risk.ts              # Risk thresholds, color config, computation helpers
    ├── mock-secrets.ts      # Static mock dataset (placeholder for the real API)
    └── api.ts               # Data access layer (switches mock ⇄ live API)
```

## Data Source: Mock → Live API

The dashboard currently renders from a static mock dataset
(`src/lib/mock-secrets.ts`) covering all four risk buckets plus an expired
example, so the UI is fully demoable without a backend.

To connect a real Azure secrets monitoring API once it's available:

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SECRETS_API_URL` to the API's base URL.
3. Ensure the endpoint `GET {NEXT_PUBLIC_SECRETS_API_URL}/secrets` returns a
   JSON array matching the `AzureSecret` interface in `src/lib/types.ts`.

No component changes are required — `src/lib/api.ts` automatically switches
from mock data to the live API based on that environment variable, and falls
back to mock data if the live call fails.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
