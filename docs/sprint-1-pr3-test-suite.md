# Sprint 1 PR-3 — Test Suite & Onboarding Refactor Technical Note

Issues: #23 (CHR-23)
Branch: `story/chr-23-sprint-1-test-suite`
PR: [#41](https://github.com/uzat/charteris/pull/41)

Also documents: `fix/booking-type-url-param` (merged to main before this PR — see below).

---

## What changed

### fix/booking-type-url-param — Onboarding replaced with URL param

The `GuestSessionProvider` render-prop and `OnboardingOverlay` modal introduced in PR-2 were removed and replaced with a URL query parameter approach.

**Removed:**
- `components/features/onboarding/GuestSessionProvider.tsx`
- `components/features/onboarding/OnboardingOverlay.tsx`

**Added:**

**`lib/utils/bookingType.ts`**
Pure function `parseBookingType(value: string | string[] | undefined): BookingType`. Accepts a raw `searchParams` value (string, string array, or undefined), extracts the first string, validates it against the 7 known `BookingType` values, and returns `'general'` as the fallback for missing or unrecognised values.

**`app/stay/[slug]/page.tsx`** (updated)
Now accepts `searchParams: { group?: string | string[] }` as a second prop. Calls `parseBookingType(searchParams.group)` and passes the result directly to `GuestPageContent`. No session state, no overlay, no client-side hydration delay.

**`components/features/GuestPageContent.tsx`** (updated)
No longer wraps children in `GuestSessionProvider`. Accepts `bookingType: BookingType` as a direct prop. Caches the value to `sessionStorage` on mount (`useEffect`) so subsequent in-session navigations without the param retain the guest's group type.

**Behaviour change for engineers:**
- Before: guests landed on the full-screen overlay on first visit, selected a group type, then saw the experience grid.
- After: the QR code URL encodes the group type (`/stay/sorrento-ridge?group=family`). No overlay. Guests land directly in a pre-filtered experience. `'general'` is used if the param is absent or invalid.

**Tests updated:**
- `__tests__/components/GuestPageContent.test.tsx` — replaced `GuestSessionProvider` and `OnboardingOverlay` tests. Now tests: immediate render without overlay, filtering by `bookingType` prop, concierge section presence, house manual presence, `sessionStorage` cache on mount.
- `__tests__/unit/lib/utils/bookingType.test.ts` — 12 tests: valid types accepted, undefined → `'general'`, empty string → `'general'`, unrecognised value → `'general'`, array with valid first element → extracted, array with invalid values → `'general'`.
- Deleted: `__tests__/components/GuestSessionProvider.test.tsx`, `__tests__/components/OnboardingOverlay.test.tsx`.

---

### CHR-23 — E2E test specs

**`e2e/guest-journey.spec.ts`**
6 Playwright specs, iPad portrait viewport (768×1024).

| Test | What is asserted |
|---|---|
| Loads without overlay | `role="main"` visible; zero `role="dialog"` elements |
| Experience grid — family | "Peninsula Helicopter Tour" and "Peninsula Hot Springs" visible |
| Experience grid — hen_party | Helicopter visible; Hot Springs and Studio & Co not visible (restricted) |
| Wi-Fi accordion expands | Click Wi-Fi button → "SorrentoRidge5G" becomes visible |
| Concierge submit | `/api/concierge` intercepted via `page.route`; question and mocked answer visible |
| No dialog on reload | No `role="dialog"` after hard reload (sessionStorage has no overlay to suppress) |

**`e2e/quiet-hours.spec.ts`**
3 Playwright specs, iPad portrait viewport. System time mocked via `page.addInitScript` using a `MockDate` class that overrides the zero-arg `Date` constructor and `Date.now()`.

| Test | Mocked time | Expected |
|---|---|---|
| Active | 23:30 AEDT (12:30 UTC) | "Active Now" badge, `role="alert"` |
| Upcoming | 21:30 AEDT (10:30 UTC) | "Quiet Hours Starting Soon", `role="status"` |
| Inactive | 14:00 AEDT (03:00 UTC) | Zero `role="alert"`, zero `role="status"` |

Date mock implementation note: the injected script extends `Date` rather than replacing it, so existing `Date` static methods (`.parse`, `.UTC`) continue to work. Only zero-arg construction and `Date.now()` return the frozen time.

---

### vitest.config.ts — Coverage threshold and exclusions

**Coverage threshold** added (all four dimensions, 80% minimum):
```ts
thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 }
```

**Coverage exclusions** — files excluded from the instrumented source set:
- Next.js and build infrastructure: `next.config.mjs`, `next-env.d.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `playwright.config.ts`, `vitest.config.ts`, `vitest.setup.ts`
- Next.js route shells (covered by E2E, not unit tests): `app/layout.tsx`, `app/page.tsx`, `app/stay/**`
- Type definitions (no runtime code): `lib/types/**`
- Static demo data (no logic): `lib/config/demo-property.ts`
- Test infrastructure: `__tests__/**`, `e2e/**`, `node_modules/**`, `.next/**`

**Test discovery exclusion** added at `test.exclude`:
```ts
exclude: ['node_modules/**', '.next/**', 'e2e/**']
```
Prevents Playwright spec files from being picked up by Vitest's jsdom runner.

---

## Test results

87 unit/component tests across 15 suites, all green. 9 E2E specs in 2 suites (require live dev server — run with `npm run test:e2e`). Previous baseline: 79.

| Change | Delta |
|---|---|
| Deleted: GuestSessionProvider.test.tsx (3), OnboardingOverlay.test.tsx (7) | −10 |
| Added: GuestPageContent.test.tsx (6), bookingType.test.ts (12) | +18 |
| Net unit/component change | +8 |
| Added: E2E specs | +9 |

Statement coverage of instrumented source files: **98.15%** (threshold: 80%).

---

## Sprint 1 complete

All Sprint 1 stories are implemented, tested, and closed:

| Issue | Story | Status |
|---|---|---|
| #1 CHR-01 | Project Foundation & Vercel Deployment | ✅ closed |
| #2 CHR-02 | Core Guest Page Layout | ✅ closed |
| #3 CHR-03 | Quiet Hours Banner | ✅ closed |
| #4 CHR-04 | Guest Session Onboarding | ✅ closed (replaced by URL param approach) |
| #5 CHR-05 | Curated Experience Grid | ✅ closed |
| #6 CHR-06 | House Manual Collapsible Panels | ✅ closed |
| #7 CHR-07 | AI Concierge Search Bar (UI Only) | ✅ closed |
| #21 CHR-21 | CI/CD Pipeline | ✅ closed |
| #22 CHR-22 | Testing Infrastructure | ✅ closed |
| #23 CHR-23 | Sprint 1 Test Suite | ✅ tested, PR open |

Next: **Sprint 2** — Supabase schema (CHR-08) is the dependency anchor for all Sprint 2 stories.

---

## Not changed this sprint

- No Supabase schema or live data (Sprint 2)
- No Claude API integration (Sprint 2, CHR-10)
- No Twilio SMS (Sprint 2, CHR-12)
- No agency admin portal (Sprint 3)
