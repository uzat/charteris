## Charteris — Product Roadmap

This document tracks active development phases, completed architecture, current sprint, and future backlog for the Charteris platform.

> **Commercial note**: Pricing ($69 AUD/month, 15% experience commission, 50/50 host split) and revenue projections are working hypotheses to be validated during the pilot. The architecture supports these models but the numbers should not be treated as confirmed economics.

---

## North Star

Charteris evolves from:

**Digital house manual** → **Property-aware AI host** → **Stay-aware local concierge** → **Availability-aware planning platform** (only where justified by usage)

The long-term opportunity is the combination of: **property context + booking context + guest intent + curated local knowledge + trusted availability + low-friction fulfilment.**

---

## Phase Status Overview

| Phase | Core Objective | Status | Timeline |
| :--- | :--- | :---: | :---: |
| **Phase 1: Foundation** | Infrastructure, CI/CD, guest UI demo | 🟡 In Progress | Current |
| **Phase 2: Core Platform** | Live data, AI concierge, SMS, itinerary builder | 🔵 Planned | Next |
| **Phase 3: Integration** | Agency admin, batch ops, Stripe, availability APIs | 🔵 Planned | Next Sprint |
| **Phase 4: Optimization** | Scale, analytics, PMS integrations, owner portal | 🔵 Backlog | Future |

---

## Sprint 1 — Guest UI Shell (In Progress)

Goal: A Vercel-deployed, mobile-first guest experience ready for iPad demo at agency pitches. Demo property: **Sorrento Ridge Estate**. All data static — no backend, no AI API, no Twilio.

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#1](https://github.com/uzat/charteris/issues/1) | CHR-01: Project Foundation & Vercel Deployment | 2 |
| [#2](https://github.com/uzat/charteris/issues/2) | CHR-02: Core Guest Page Layout | 2 |
| [#3](https://github.com/uzat/charteris/issues/3) | CHR-03: Quiet Hours Banner | 3 |
| [#4](https://github.com/uzat/charteris/issues/4) | CHR-04: Guest Session Onboarding — Booking Type | 3 |
| [#5](https://github.com/uzat/charteris/issues/5) | CHR-05: Curated Experience Grid | 5 |
| [#6](https://github.com/uzat/charteris/issues/6) | CHR-06: House Manual Collapsible Panels | 2 |
| [#7](https://github.com/uzat/charteris/issues/7) | CHR-07: AI Concierge Search Bar (UI Only) | 3 |
| [#21](https://github.com/uzat/charteris/issues/21) | CHR-21: CI/CD Pipeline — GitHub Actions + Vercel | 3 |
| [#22](https://github.com/uzat/charteris/issues/22) | CHR-22: Testing Infrastructure — Vitest + Playwright | 3 |
| [#23](https://github.com/uzat/charteris/issues/23) | CHR-23: Sprint 1 Test Suite | 5 |
| | **Total** | **31** |

---

## Sprint 2 — Live Data, AI, Notifications & Itinerary Builder

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#8](https://github.com/uzat/charteris/issues/8) | CHR-08: Supabase Schema & Property Config API | 5 |
| [#9](https://github.com/uzat/charteris/issues/9) | CHR-09: Multi-Property Support via URL Slug | 3 |
| [#10](https://github.com/uzat/charteris/issues/10) | CHR-10: Claude API RAG Concierge | 5 |
| [#11](https://github.com/uzat/charteris/issues/11) | CHR-11: Guest Notification Preferences & SMS Opt-Out | 3 |
| [#12](https://github.com/uzat/charteris/issues/12) | CHR-12: Twilio SMS Automation | 5 |
| [#13](https://github.com/uzat/charteris/issues/13) | CHR-13: In-App Transient Notification Banners | 2 |
| [#24](https://github.com/uzat/charteris/issues/24) | CHR-24: Staging Environment & Migrations | 3 |
| [#25](https://github.com/uzat/charteris/issues/25) | CHR-25: Pre-Arrival Access Link | 3 |
| [#26](https://github.com/uzat/charteris/issues/26) | CHR-26: Local Concierge — Destination Knowledge Layer | 5 |
| [#27](https://github.com/uzat/charteris/issues/27) | CHR-27: Richer Booking Context (Party Size, Dates, Children) | 3 |
| [#28](https://github.com/uzat/charteris/issues/28) | CHR-28: Lightweight Itinerary Builder | 8 |
| [#29](https://github.com/uzat/charteris/issues/29) | CHR-29: Issue Reporting — Guest Property Issue Submission | 3 |
| [#30](https://github.com/uzat/charteris/issues/30) | CHR-30: Redirectable QR Identifiers | 3 |
| | **Total** | **51** |

---

## Sprint 3 — Agency Admin, Integrations & Billing

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#14](https://github.com/uzat/charteris/issues/14) | CHR-14: Agency Admin Portal | 8 |
| [#15](https://github.com/uzat/charteris/issues/15) | CHR-15: Batch Property Operations | 5 |
| [#16](https://github.com/uzat/charteris/issues/16) | CHR-16: CSV Property Bulk Import | 3 |
| [#17](https://github.com/uzat/charteris/issues/17) | CHR-17: FareHarbor / Rezdy Availability Integration | 5 |
| [#18](https://github.com/uzat/charteris/issues/18) | CHR-18: Stripe Billing | 5 |
| [#19](https://github.com/uzat/charteris/issues/19) | CHR-19: Compliance Reporting Dashboard | 5 |
| [#20](https://github.com/uzat/charteris/issues/20) | CHR-20: Experience Revenue Reporting | 3 |
| [#31](https://github.com/uzat/charteris/issues/31) | CHR-31: Configurable Branding / White-Label | 3 |
| [#32](https://github.com/uzat/charteris/issues/32) | CHR-32: Knowledge Approval & Versioning | 5 |
| [#33](https://github.com/uzat/charteris/issues/33) | CHR-33: PWA & Offline Resilience | 5 |
| | **Total** | **47** |

---

## Sprint 4 — Scale, Analytics & PMS

| Issue | Story | Points |
| :--- | :--- | :---: |
| [#34](https://github.com/uzat/charteris/issues/34) | CHR-34: Operational Intelligence — Guest AI Analytics | 5 |
| [#35](https://github.com/uzat/charteris/issues/35) | CHR-35: Weather-Aware Recommendations | 3 |
| [#36](https://github.com/uzat/charteris/issues/36) | CHR-36: PMS / Channel Manager Integration | 8 |
| | + Property owner self-serve portal | TBD |
| | + Stripe Connect for automated owner cashback payouts | TBD |
| | + Recommendation feedback loop | TBD |
| | + Multi-region expansion beyond Mornington Peninsula | TBD |

---

## Product Principles

1. **Charteris reduces choices, not adds them** — recommend the best few things, not a directory
2. **Availability honesty** — never claim something is bookable without authoritative data. States: available, limited, on_request, check_availability, booked_out, seasonal
3. **Property rules are authoritative** — recommendations must never conflict with occupancy, noise, event, or permit conditions
4. **Commercial neutrality** — ranking driven by guest fit + availability + quality + logistics + value. Never by commission rate
5. **Trust over claims** — Charteris does not claim to be a compliance platform or legal shield. It communicates rules clearly and sends useful reminders
6. **Not luxury-only** — the tier system scales from luxury estates to standard holiday rentals. The core product works at every tier
7. **Local-first curation** — favour genuinely good regional operators over generic tourism databases
8. **Human fallback always present** — the AI will sometimes fail. A clear path to the property manager is always one tap away

---

## Validation Plan (Pilot)

Demo property: **Sorrento Ridge Estate** (fictional, full-featured prototype)

Target pilot: 5-10 Peninsula properties covering different archetypes:
- Premium/luxury estate (Sorrento, Portsea)
- Family beach house
- Couples retreat
- Large-group house
- Hinterland/wine-country property

Key pilot metrics:
- Guest activation rate (QR scans per booking)
- Pre-arrival link open rate
- Questions per stay and resolution rate
- Human escalation rate
- Itinerary generation and keep/swap rate
- Experience click-through rate
- Property onboarding time

Do not build Sprint 4+ features until pilot data shows where the value lies.
