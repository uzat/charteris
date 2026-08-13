# Sprint 1 PR-1 — Foundation Technical Note

Issues: #1 (CHR-01), #21 (CHR-21), #22 (CHR-22)
Branch: `story/CHR-01-21-22-foundation`

## What changed

### New modules

**`lib/types/property.ts`**
Central type definitions. No runtime logic — import-only.

| Type | Description |
|---|---|
| `BookingType` | Union of 7 guest group categories: `family`, `couples`, `friends`, `corporate`, `hen_party`, `birthday`, `general` |
| `AvailabilityState` | Union of 6 states: `available`, `limited`, `booked_out`, `seasonal`, `on_request`, `check_availability` |
| `PropertyTier` | `luxury` \| `premium` \| `standard` |
| `Experience` | Full experience record including `suitableFor: BookingType[] \| 'all'`, `restrictions: BookingType[]`, and optional scheduling fields |
| `PropertyConfig` | Root config passed from server component to all client components |

**`lib/config/demo-property.ts`**
Static `PropertyConfig` for Sorrento Ridge Estate (slug: `sorrento-ridge`, tier: `luxury`). Contains 4 experiences and 12 house manual sections. Exported via `getPropertyConfig(slug: string): PropertyConfig | null` — the single call site for the config swap pattern (Sprint 2: replace body with Supabase query, no component changes required).

**`lib/utils/quietHours.ts`**
Pure function `getQuietHoursStatus(config, mockDate?)`. Returns a discriminated union:
- `{ state: 'active', message }` — current time is within quiet hours
- `{ state: 'upcoming', minutesUntilStart, message }` — within 60 minutes of start
- `{ state: 'inactive' }` — outside quiet hours and more than 60 minutes away

Always uses `Intl.DateTimeFormat` with `timeZone: config.timezone` (`'Australia/Melbourne'`). Never reads device time. Accepts an optional `mockDate` for deterministic testing.

**`lib/utils/experienceFilter.ts`**
Pure function `filterExperiences(experiences, bookingType)`. Filter logic:
1. Exclude if `bookingType` is in `experience.restrictions` (takes priority)
2. Include if `experience.suitableFor === 'all'`
3. Include if `bookingType` is in `experience.suitableFor` array

**`lib/utils/sessionStorage.ts`**
`getStoredBookingType()`, `setStoredBookingType(type)`, `clearStoredBookingType()` — all wrapped in `try/catch` for iOS Safari private mode resilience. Storage key: `charteris_booking_type`.

### App Router changes

**`app/page.tsx`** — Root route now calls `redirect('/stay/sorrento-ridge')`.

**`app/stay/[slug]/page.tsx`** — Server component. Calls `getPropertyConfig(params.slug)`, returns `notFound()` for unknown slugs. Renders a minimal shell (header + footer) with a placeholder `<main>` — feature components arrive in PR-2.

**`app/globals.css`** — Replaces default Next.js variables with Charteris design tokens:
```
--navy:      #1B2A3B
--sand:      #E8DCC8
--white:     #FFFFFF
--gold:      #C9A96E
--amber:     #F59E0B
--navy-dark: #0D1F2D
```

**`tailwind.config.ts`** — Tokens mapped to utility classes: `bg-navy`, `text-sand`, `text-gold`, `bg-amber`, `bg-navy-dark`, `font-sans`, `font-mono`.

### CI/CD

**`.github/workflows/ci.yml`** — PR gate triggered on `pull_request` to `main`. Steps in order: install → lint → type-check → unit tests (`vitest --run`) → build → Playwright install → E2E (Desktop Chrome only in CI). Vercel handles all production and preview deployments natively — no deploy step in this workflow.

**`vercel.json`** — Declares framework `nextjs`, uses `npm ci` for installs, enables `cleanUrls`.

### Testing infrastructure

**`vitest.config.ts`** — jsdom environment, globals enabled, setup file `vitest.setup.ts`. Coverage reporter: `text` + `lcov`. Global thresholds deferred to PR-3 (when component tests bring all layers above 80%).

**`playwright.config.ts`** — Three projects: iPad Pro 11 landscape (1024×768, primary demo viewport), iPhone 14, Desktop Chrome. `webServer` auto-starts `npm run dev` if not already running. Retries: 2 in CI, 0 locally.

**`package.json`** — New scripts: `type-check`, `test`, `test:coverage`, `test:e2e`. New devDependencies: `vitest ^2.1.0`, `@vitest/coverage-v8 ^2.1.0`, `@vitejs/plugin-react ^4.3.0`, `jsdom ^25.0.0`, `@playwright/test ^1.48.0`, `@testing-library/react ^16.0.0`, `@testing-library/jest-dom ^6.6.0`, `@testing-library/user-event ^14.5.0`.

### Stack supplement

**`docs/stacks/NEXTJS_TYPESCRIPT.md`** — Documents the server/client component boundary rule, file organisation, styling conventions, timezone rule, config swap pattern, environment variables, and all package scripts. Reference for CODER on all future PRs.

## Test results

19 unit tests across 3 suites, all green. Previous baseline: 0.

| Suite | Tests | Coverage (source files only) |
|---|---|---|
| `quietHours` | 7 | 94.59% stmts, 61.53% branches, 100% funcs |
| `experienceFilter` | 6 | 100% all metrics |
| `sessionStorage` | 6 | 95.23% stmts, 85.71% branches, 100% funcs |

## Configuration required (human action)

- Connect `uzat/charteris` to Vercel (completed)
- Set environment variable `NEXT_PUBLIC_PROPERTY_SLUG=sorrento-ridge` in Vercel project settings
- Post production URL as comment on issue #1

## Not changed this sprint

- No Supabase schema (Sprint 2)
- No API routes or middleware
- No guest UI feature components (PR-2)
- No component or E2E tests (PR-3)
