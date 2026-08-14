# Charteris

## What It Is
Charteris is a property-aware digital host for holiday rental guests. Guests scan a QR code on arrival (or receive a pre-arrival link with their booking confirmation) and get a unified experience: AI concierge for house and local destination questions, personalised experience recommendations based on their group type and stay context, a lightweight itinerary builder, and proactive reminders for quiet hours, bin night, and checkout. The product is sold to property management agencies as a SaaS subscription.

> **Product principle**: Charteris does not give guests more choices. It reduces the number of choices they have to make.

## Why It Exists
Short-stay property managers spend significant time on repetitive guest queries. Guests spend time making decisions that a well-informed local concierge could handle in seconds. Charteris automates both, while surfacing revenue opportunities via curated local experiences.

## Target Market
- **Launch region:** Mornington Peninsula, Victoria, Australia
- **Buyer:** Property management agencies (Jellis Craig ShortStays, Property Mums, Coast & Country Getaways)
- **End user:** Guests at short-stay properties — luxury estates through to standard holiday rentals
- **Demo property:** Sorrento Ridge Estate (fictional full-featured prototype)

## Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Testing:** Vitest + React Testing Library (unit/component), Playwright (E2E, iPad viewport)
- **Database:** Supabase (Sprint 2)
- **AI Concierge:** Claude API — RAG over property knowledge + curated destination content (Sprint 2)
- **SMS:** Twilio — quiet hours, bin night, checkout reminders with opt-out (Sprint 2)
- **Payments:** Stripe Subscriptions (Sprint 3)
- **Deployment:** Vercel — atomic zero-downtime deployments, instant rollback, preview URLs per PR

## Running Locally
```bash
cp .env.local.example .env.local
npm install
npm run dev           # http://localhost:3000
npm test              # unit + component tests (Vitest)
npm run test:coverage # with coverage report
npm run test:e2e      # Playwright e2e
npm run type-check    # TypeScript strict check
```

## Deployment
Every PR creates a Vercel preview deployment. Merge to main deploys atomically — zero downtime. Rollback via Vercel dashboard in under 60 seconds.

## Sprint 1 — Guest UI Shell + Foundation ✓ COMPLETE

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#1](https://github.com/uzat/charteris/issues/1) | CHR-01: Project Foundation & Vercel Deployment | 2 |
| [#2](https://github.com/uzat/charteris/issues/2) | CHR-02: Core Guest Page Layout | 2 |
| [#3](https://github.com/uzat/charteris/issues/3) | CHR-03: Quiet Hours Banner | 3 |
| [#4](https://github.com/uzat/charteris/issues/4) | CHR-04: Guest Session Onboarding | 3 |
| [#5](https://github.com/uzat/charteris/issues/5) | CHR-05: Curated Experience Grid | 5 |
| [#6](https://github.com/uzat/charteris/issues/6) | CHR-06: House Manual Collapsible Panels | 2 |
| [#7](https://github.com/uzat/charteris/issues/7) | CHR-07: AI Concierge Search Bar (UI Only) | 3 |
| [#21](https://github.com/uzat/charteris/issues/21) | CHR-21: CI/CD Pipeline | 3 |
| [#22](https://github.com/uzat/charteris/issues/22) | CHR-22: Testing Infrastructure | 3 |
| [#23](https://github.com/uzat/charteris/issues/23) | CHR-23: Sprint 1 Test Suite | 5 |
| | **Total** | **31** |

## Current Sprint — Sprint 2: Live Data, AI, Notifications & Itinerary

| Issue | Story | Points | Status |
| :--- | :--- | :---: | :--- |
| [#8](https://github.com/uzat/charteris/issues/8) | CHR-08: Supabase Schema & Property Config API | 5 | ✓ Done |
| [#9](https://github.com/uzat/charteris/issues/9) | CHR-09: Multi-Property Support via URL Slug | 3 | ✓ Done |
| [#10](https://github.com/uzat/charteris/issues/10) | CHR-10: Claude API RAG Concierge | 5 |
| [#11](https://github.com/uzat/charteris/issues/11) | CHR-11: Guest Notification Preferences & SMS Opt-Out | 3 |
| [#12](https://github.com/uzat/charteris/issues/12) | CHR-12: Twilio SMS Automation | 5 |
| [#45](https://github.com/uzat/charteris/issues/45) | CHR-13: In-App Transient Banners | 2 | In progress |
| [#24](https://github.com/uzat/charteris/issues/24) | CHR-24: Staging Environment & Migrations | 3 |
| [#25](https://github.com/uzat/charteris/issues/25) | CHR-25: Pre-Arrival Access Link | 3 |
| [#26](https://github.com/uzat/charteris/issues/26) | CHR-26: Local Concierge — Destination Knowledge | 5 |
| [#27](https://github.com/uzat/charteris/issues/27) | CHR-27: Richer Booking Context | 3 |
| [#28](https://github.com/uzat/charteris/issues/28) | CHR-28: Lightweight Itinerary Builder | 8 |
| [#29](https://github.com/uzat/charteris/issues/29) | CHR-29: Issue Reporting | 3 |
| [#30](https://github.com/uzat/charteris/issues/30) | CHR-30: Redirectable QR Identifiers | 3 |
| | **Total** | **51** |

## Sprint 3 Backlog — Agency Admin, Integrations & Billing

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#14](https://github.com/uzat/charteris/issues/14) | CHR-14: Agency Admin Portal | 8 |
| [#15](https://github.com/uzat/charteris/issues/15) | CHR-15: Batch Property Operations | 5 |
| [#16](https://github.com/uzat/charteris/issues/16) | CHR-16: CSV Bulk Import | 3 |
| [#17](https://github.com/uzat/charteris/issues/17) | CHR-17: FareHarbor / Rezdy Integration | 5 |
| [#18](https://github.com/uzat/charteris/issues/18) | CHR-18: Stripe Billing | 5 |
| [#19](https://github.com/uzat/charteris/issues/19) | CHR-19: Compliance Reporting | 5 |
| [#20](https://github.com/uzat/charteris/issues/20) | CHR-20: Experience Revenue Reporting | 3 |
| [#31](https://github.com/uzat/charteris/issues/31) | CHR-31: Configurable Branding / White-Label | 3 |
| [#32](https://github.com/uzat/charteris/issues/32) | CHR-32: Knowledge Approval & Versioning | 5 |
| [#33](https://github.com/uzat/charteris/issues/33) | CHR-33: PWA & Offline Resilience | 5 |
| | **Total** | **47** |

## Sprint 4 Backlog — Scale, Analytics & PMS

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#34](https://github.com/uzat/charteris/issues/34) | CHR-34: Operational Intelligence | 5 |
| [#35](https://github.com/uzat/charteris/issues/35) | CHR-35: Weather-Aware Recommendations | 3 |
| [#36](https://github.com/uzat/charteris/issues/36) | CHR-36: PMS / Channel Manager Integration | 8 |
| | + Property owner portal, Stripe Connect payouts, feedback loop | TBD |

## Documentation
- [Product Roadmap](docs/roadmap.md)
- [Use Cases by User Type](docs/use-cases.md)
- [Master Rollout Checklist](docs/checklist.md)
