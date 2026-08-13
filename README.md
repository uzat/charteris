# Charteris

## What It Is
Charteris is a QR-code-delivered guest experience app for short-stay properties. Guests scan a code on arrival and get instant answers to house manual questions via an AI concierge, a prominent compliance banner for local quiet hours rules, and a curated marketplace of local experiences tailored to their group type and property tier. The product is sold to property agencies as a SaaS subscription — it reduces operational burden (fewer guest calls) and turns properties into passive revenue drivers via experience affiliate commissions.

## Why It Exists
Short-stay property managers spend significant time on repetitive guest queries and noise complaint mitigation. Municipal fines for quiet hour breaches put listing permits at risk. Charteris automates both problems while simultaneously surfacing revenue opportunities the host would otherwise miss.

## Target Market
- **Launch region:** Mornington Peninsula, Victoria, Australia
- **Buyer:** Property agencies (Jellis Craig ShortStays, Property Mums, Coast & Country Getaways)
- **End user:** Guests at short-stay properties — luxury estates through to standard holiday rentals
- **Pricing:** $69 AUD/month per property (Pro Tier) + 50% of 15% affiliate commission on experience bookings

## Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database:** Supabase (planned Sprint 2)
- **AI Concierge:** Claude API / OpenAI — RAG over house manual content (planned Sprint 2)
- **SMS:** Twilio — automated quiet hour nudges (planned Sprint 2)
- **Payments:** Stripe Subscriptions — $69 AUD/month per property (planned Sprint 3)
- **Deployment:** Vercel

## Running Locally
```bash
cp .env.local.example .env.local
npm install
npm run dev
# http://localhost:3000
```

## Current Sprint — Sprint 1: Guest UI Shell

Building a fully interactive guest experience demo, deployable to Vercel and demonstrable on iPad. All data is static this sprint — no backend, no AI API, no Twilio.

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#1](https://github.com/uzat/charteris/issues/1) | CHR-01: Project Foundation & Vercel Deployment | 2 |
| [#2](https://github.com/uzat/charteris/issues/2) | CHR-02: Core Guest Page Layout | 2 |
| [#3](https://github.com/uzat/charteris/issues/3) | CHR-03: Quiet Hours Compliance Banner | 3 |
| [#4](https://github.com/uzat/charteris/issues/4) | CHR-04: Guest Session Onboarding — Booking Type Capture | 3 |
| [#5](https://github.com/uzat/charteris/issues/5) | CHR-05: Curated Experience Grid | 5 |
| [#6](https://github.com/uzat/charteris/issues/6) | CHR-06: House Manual Collapsible Panels | 2 |
| [#7](https://github.com/uzat/charteris/issues/7) | CHR-07: AI Concierge Search Bar (UI Only) | 3 |
| | **Total** | **20** |

## Backlog

**Sprint 2 — Live Data & AI**
- Supabase schema: properties, experiences, manual sections, compliance logs
- Multi-property support keyed by URL slug / QR code
- Claude API RAG concierge against house manual content
- Twilio SMS quiet-hour nudges

**Sprint 3 — Integrations**
- FareHarbor/Rezdy availability API (real-time experience availability)
- Stripe Subscriptions ($69 AUD/month per property)
- Agency billing portal via Stripe Customer Portal

**Sprint 4 — Scale & Analytics**
- Agency admin dashboard (compliance logs, experience revenue reporting)
- Performance optimisation and load testing
- Audit logging
