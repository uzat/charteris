# Sprint 2 — CHR-08: Supabase Schema & Property Config API

Issue: [#8](https://github.com/uzat/charteris/issues/8)
Branch: `story/CHR-08-supabase-schema-property-config-api`
PR: [#43](https://github.com/uzat/charteris/pull/43)

---

## What changed

### New: Supabase database schema (`supabase/migrations/001_initial_schema.sql`)

First migration for the project. Creates five tables:

| Table | Purpose | RLS anon access |
|---|---|---|
| `properties` | One row per short-stay property — config, branding, quiet hours | SELECT allowed |
| `experiences` | Curated experiences per property | SELECT allowed |
| `house_manual_sections` | House manual content per property | SELECT allowed |
| `agencies` | Property management agency accounts | None (service role only) |
| `sms_logs` | Outbound SMS audit trail | None (service role only) |

All tables have RLS enabled. `agencies` and `sms_logs` have no policies, making them inaccessible to the anon key — any future read/write from these tables must use the service role client.

Composite indexes on `experiences(property_id, display_order)` and `house_manual_sections(property_id, display_order)` support ordered fetches without a full table scan.

**Backwards-compatibility:** This is the initial schema — no existing tables are altered.

### New: Seed data (`supabase/seed.sql`)

Inserts Sorrento Ridge Estate as the demo property, including all 4 experiences and 12 house manual sections from the Sprint 1 demo fixture. Run against any Supabase project to get a working demo state.

### New: Service-role Supabase client (`lib/supabase/server.ts`)

Exports a single function `createServiceClient()` that constructs a `@supabase/supabase-js` client using the service role key. Throws `Error` at call time if either `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is absent. `auth.persistSession` is set to `false` — no tokens are cached.

This module is server-only. It must never be imported by client components; doing so would expose the service role key in the browser bundle.

### New: Property config data layer (`lib/data/getPropertyConfig.ts`)

Async server-only function `getPropertyConfig(slug: string): Promise<PropertyConfig | null>` replaces the synchronous `getPropertyConfig` in `lib/config/demo-property.ts` as the active call site in the guest page.

**Execution path when Supabase is configured:**
1. Call `createServiceClient()`
2. `SELECT * FROM properties WHERE slug = $1 LIMIT 1` — returns null if not found
3. Parallel fetch: `experiences` and `house_manual_sections` ordered by `display_order`
4. Map flat DB rows → nested `PropertyConfig` domain type (see mapping rules below)

**Execution path when Supabase env vars are absent** (CI, local dev without `.env.local`):
- Delegates to `getDemoConfig(slug)` from `lib/config/demo-property.ts` — returns the static fixture. This fallback is removed once `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are present.

**DB → domain mapping rules:**

| DB column(s) | Domain field | Rule |
|---|---|---|
| `properties.name` | `branding.propertyName` | Direct |
| `properties.agency_name` | `branding.agencyName` | `NULL` → `undefined` |
| `properties.accent_color` | `branding.accentColor` | `NULL` → `undefined` |
| `properties.quiet_hours_start_hour` | `quietHours.startHour` | Direct (`smallint`) |
| `properties.quiet_hours_end_hour` | `quietHours.endHour` | Direct (`smallint`) |
| `properties.quiet_hours_message` | `quietHours.message` | `NULL` → `''` |
| `properties.checkout_time` | `checkoutTime` | JSONB `{ hour, minute }` or `undefined` |
| `properties.bin_night` | `binNight` | JSONB `{ day, type }` or `undefined` |
| `experiences.suitable_for` | `suitableFor` | `[]` → `'all'`; non-empty → passed through |
| `experiences.price_from` | `priceFrom` | `NULL` → `0` |
| `experiences.currency` | `currency` | `NULL` → `'AUD'` |
| `branding.attribution` | `branding.attribution` | Hardcoded `'co-branded'` — no DB column yet (CHR-31) |

### Modified: Guest page (`app/stay/[slug]/page.tsx`)

Page function is now `async`. Import swapped from `lib/config/demo-property` to `lib/data/getPropertyConfig`. No change to props, rendering, or component tree.

### Extended: `PropertyConfig` type (`lib/types/property.ts`)

Two optional fields added to `PropertyConfig`:

```typescript
checkoutTime?: { hour: number; minute: number };
binNight?: { day: number; type: string };
```

These are populated from the `checkout_time` and `bin_night` JSONB columns on the `properties` table. They are `undefined` when the DB column is `NULL`. No existing consumers of `PropertyConfig` are broken — the fields are optional and were absent before.

---

## New endpoints

No new HTTP endpoints this sprint.

---

## Configuration additions

| Variable | Default | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | — | Yes (production) | Supabase project URL, exposed to the browser for anon-key reads |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | — | Yes (production) | Supabase anon key for future client-side use |
| `SUPABASE_SERVICE_ROLE_KEY` | — | Yes (production) | Service role key for server-side reads; never exposed to the browser |

When all three are absent, the app runs against the static demo fixture (Sprint 1 behaviour). When any one of `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is set but not both, `createServiceClient()` throws at request time — partial configuration is not silently tolerated.

Add to `.env.local` (see `.env.local.example` for the full list).

---

## Behaviour changes

- **`/stay/[slug]`** previously returned property data synchronously from a module-level constant. It now performs two async Supabase queries per page render. Response time increases by one round-trip to Supabase (typically < 50ms on same-region deployments). When env vars are absent, behaviour is identical to Sprint 1.
- **Unknown slugs** still result in a Next.js 404 — now via a `null` DB result rather than a fixture lookup miss.

---

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY` has no `NEXT_PUBLIC_` prefix — Next.js excludes it from the client bundle at build time.
- `agencies` and `sms_logs` tables are deny-all for anon — no policy = no access. Verified in migration.
- Slug parameter is passed to `.eq()` on the Supabase JS client — parameterised query, no SQL injection risk.
- `auth: { persistSession: false }` on the service client — no tokens cached in memory or storage.

---

## Prerequisites and build steps

To run against real Supabase data:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor (or via `supabase db push` once CHR-24 sets up the CLI project link)
3. Optionally run `supabase/seed.sql` to load Sorrento Ridge demo data
4. Add the three env vars above to `.env.local`
5. `npm run dev` — the real data path activates automatically

Without step 4, the app runs the demo fixture fallback. No build step changes.

---

## Tests summary

| Category | Count |
|---|---|
| New tests — `getPropertyConfig` unit tests | 9 |
| CI fix test adjustment (throw → demo fallback) | −1 old / +2 new (net +1) |
| **Net new tests this sprint** | **9** |
| Full suite before | 87 |
| Full suite after | 96 |

All 96 tests green locally and in CI (PR #43). Coverage: 97.66% statements, 80.15% branches (threshold: 80%).

New tests cover: known slug → full `PropertyConfig` returned, unknown slug → null, `suitable_for []` → `'all'`, non-empty `suitable_for` → pass-through, empty experiences/sections → empty arrays, `HouseManualSection` mapping, `checkoutTime`/`binNight` mapping, demo fallback when env vars absent (known slug), demo fallback when env vars absent (unknown slug).

---

## Not changed this sprint

- No Claude API integration (CHR-10)
- No Twilio SMS (CHR-12)
- No multi-property slug routing (CHR-09)
- No Supabase CLI project link or migration runner (CHR-24)
- No agency admin portal (Sprint 3)
- No changes to E2E specs, CI workflow YAML, or Vercel configuration
