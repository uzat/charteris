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
- **Database:** Supabase (Sprint 2)
- **AI Concierge:** Claude API — RAG over house manual content (Sprint 2)
- **SMS:** Twilio — automated quiet hour, bin night, and checkout reminders with opt-out (Sprint 2)
- **Payments:** Stripe Subscriptions — $69 AUD/month per property (Sprint 3)
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

## Sprint 2 Backlog — Live Data, AI & Notifications

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#8](https://github.com/uzat/charteris/issues/8) | CHR-08: Supabase Schema & Property Config API | 5 |
| [#9](https://github.com/uzat/charteris/issues/9) | CHR-09: Multi-Property Support via URL Slug | 3 |
| [#10](https://github.com/uzat/charteris/issues/10) | CHR-10: Claude API RAG Concierge (Live AI Responses) | 5 |
| [#11](https://github.com/uzat/charteris/issues/11) | CHR-11: Guest Notification Preferences & SMS Opt-Out | 3 |
| [#12](https://github.com/uzat/charteris/issues/12) | CHR-12: Twilio SMS Automation — Quiet Hours, Bin Night, Checkout | 5 |
| [#13](https://github.com/uzat/charteris/issues/13) | CHR-13: In-App Transient Notification Banners | 2 |
| | **Total** | **23** |

## Sprint 3 Backlog — Agency Admin, Integrations & Billing

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#14](https://github.com/uzat/charteris/issues/14) | CHR-14: Agency Admin Portal — Property Management Dashboard | 8 |
| [#15](https://github.com/uzat/charteris/issues/15) | CHR-15: Batch Property Operations | 5 |
| [#16](https://github.com/uzat/charteris/issues/16) | CHR-16: CSV Property Bulk Import | 3 |
| [#17](https://github.com/uzat/charteris/issues/17) | CHR-17: FareHarbor / Rezdy Availability Integration | 5 |
| [#18](https://github.com/uzat/charteris/issues/18) | CHR-18: Stripe Billing — Agency SaaS Subscriptions | 5 |
| [#19](https://github.com/uzat/charteris/issues/19) | CHR-19: Compliance Reporting Dashboard | 5 |
| [#20](https://github.com/uzat/charteris/issues/20) | CHR-20: Experience Revenue Reporting | 3 |
| | **Total** | **34** |

## Sprint 4 Backlog — Scale, Analytics & Owner Portal
- Advanced audit logging and query optimisation
- Property owner self-serve portal
- Stripe Connect for automated owner cashback payouts
- Load testing and caching layer
- Multi-region expansion (beyond Mornington Peninsula)

## Reference
- [Use Cases by User Type](docs/use-cases.md)
- [Roadmap](roadmap.md)