## Executive Summary
This document tracks the active development phases, completed architecture, current initiatives, and future backlog for the Charteris platform.

---

## Phase Status Overview

| Phase | Core Objective | Key Deliverables | Status | Timeline |
| :--- | :--- | :--- | :---: | :---: |
| **Phase 1: Foundation** | Infrastructure Setup | Core domain model, database schema, base API structure | 🔴 Not Started | Current |
| **Phase 2: Core Platform** | Essential Workflows | Primary business logic, user auth, main client interface | 🔵 Planned | Next |
| **Phase 3: Integration** | Ecosystem Connections | External API integrations, automated background sync, reporting | 🔵 Planned | Next Sprint |
| **Phase 4: Optimization** | Scale & Polish | Performance tuning, advanced analytics, audit logging | 🔵 Backlog | Future |

---

## Sprint 1 — Guest UI Shell (In Progress)
**Goal:** A Vercel-deployed, mobile-first guest experience ready for iPad demo. All data is static — no backend, no AI API, no Twilio this sprint.

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

---

## Detailed Phase Breakdown

### Phase 1: Foundation & Core Setup 🔴
**Goal:** Establish project repository, core backend architecture, and foundational UI framework.

* **Database & Schema:** Define data models and Supabase schema (properties, experiences, bookings, compliance logs).
* **Authentication & Authorization:** Session management and role-based access (agency admin vs guest).
* **API Framework:** Next.js API routes for property config, experience availability, compliance logging.

---

### Phase 2: Core Workflows & Feature Set 🔵
**Goal:** Deliver end-to-end functionality for primary Charteris user journeys.

* **Planned Features:**
* Replace static demo data with live Supabase property configs.
* RAG-based AI Concierge (Claude API) against house manual content.
* Twilio SMS quiet-hour nudges.
* Multi-property support keyed by URL slug/QR code.

---

### Phase 3: External Integrations & Automation 🔵
**Goal:** Expand Charteris capabilities with third-party tools and automated background processing.

* **Planned Features:**
* FareHarbor/Rezdy availability API — real-time experience availability.
* Stripe Subscriptions — $69 AUD/month per property recurring billing.
* Stripe webhook handlers for subscription lifecycle (created, cancelled, past-due).
* Agency billing portal via Stripe Customer Portal.
* Automated job scheduling for compliance log reports.
* Note: Experience bookings handled via FareHarbor/Rezdy affiliate URLs — Stripe not required for guest-side transactions.

---

### Phase 4: Security, Analytics & Performance 🔵
**Goal:** Prepare platform for scale, security audits, and deep operational insight.

* **Planned Features:**
* Advanced reporting and dashboard metrics for agencies.
* Comprehensive audit logging and compliance tracking.
* Query optimisation, caching layer, and load testing.

---

## Next Immediate Steps
1. Complete Sprint 1 — guest UI shell deployed to Vercel, iPad demo-ready.
2. Begin Phase 1 foundation — Supabase schema, property config API.
3. Sprint 2 — wire live data, AI concierge, Twilio.
