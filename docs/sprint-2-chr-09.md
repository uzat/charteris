# Sprint 2 — CHR-09: Multi-Property Support via URL Slug

Issue: [#9](https://github.com/uzat/charteris/issues/9)
Branch: `story/CHR-09-multi-property-slug`
PR: [#44](https://github.com/uzat/charteris/pull/44)

---

## What changed

### New: Segment-scoped not-found page (`app/stay/[slug]/not-found.tsx`)

A static server component rendered by Next.js when `notFound()` is called from `app/stay/[slug]/page.tsx`. The component accepts no props and receives no slug value — it cannot leak or reflect the slug back to the guest.

Displayed content:
- Heading: `Property not found`
- Body: `Contact your host or property manager for the correct link`
- Link: `Return to home` → `/`

Styling: navy full-screen background (`bg-navy`), centred card, consistent with the Sprint 1 guest UI shell. No JavaScript, no data fetching, no client components.

This page is activated by the `notFound()` call that was already present in `app/stay/[slug]/page.tsx` from CHR-08. No changes to `page.tsx` were required this sprint.

**ADR-004**: Segment-scoped not-found pages are the pattern for all future route segments requiring branded error states. The component must never render any user-supplied URL segment value.

---

## New endpoints

No new HTTP endpoints this sprint.

---

## Configuration additions

No new environment variables this sprint.

---

## Behaviour changes

- **`/stay/<unknown-slug>`** previously returned the Next.js default 404 page (white, unbranded). It now returns the Charteris-branded not-found page with status 404.
- The HTTP status code is unchanged — 404 in both cases. Only the rendered HTML changes.
- No behaviour change to `/stay/sorrento-ridge` or any other known slug.

---

## Security notes

- The not-found component receives no props. The slug from the URL is never passed to it and cannot appear in the rendered output — confirmed by E2E test `slug value is not rendered anywhere on the not-found page`.
- No user-supplied input is rendered, reflected, or stored. XSS risk: none.

---

## Prerequisites and build steps

No prerequisites beyond what CHR-08 established. No new dependencies, no migration, no env var changes.

---

## Tests summary

| Category | Count |
|---|---|
| New E2E specs (`e2e/not-found.spec.ts`) | 2 |
| New unit tests | 0 (static component, no logic) |
| **Net new tests this sprint** | **2** |
| Vitest suite before | 96 |
| Vitest suite after | 96 |
| Playwright E2E before | 12 |
| Playwright E2E after | 14 |

All 96 Vitest tests and 14 Playwright E2E specs pass. CI on PR #44 green.

New E2E tests cover:
- `unknown slug returns 404 with branded heading and contact text` — verifies HTTP 404 status, heading visibility, contact text visibility, zero JS page errors
- `slug value is not rendered anywhere on the not-found page` — XSS safety: `xss-attempt` slug does not appear in page body

Multi-property unit scenario (distinct configs for distinct slugs) is covered by the existing `getPropertyConfig.test.ts` suite introduced in CHR-08.

---

## Not changed this sprint

- No changes to `lib/data/getPropertyConfig.ts`, Supabase schema, or migrations
- No changes to `app/stay/[slug]/page.tsx`
- No Claude API integration (CHR-10)
- No Twilio SMS (CHR-12)
- No Supabase CLI project link or migration runner (CHR-24)
- No agency admin portal (Sprint 3)
- No CI workflow YAML or Vercel configuration changes
