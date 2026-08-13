# Stack Supplement — Next.js 14 / TypeScript / Tailwind CSS

## Runtime

- Next.js 14 App Router
- TypeScript strict mode (`"strict": true` in `tsconfig.json`)
- Node 20 (CI), Node 20 LTS (local)

## Server / Client Component Boundary

- `app/stay/[slug]/page.tsx` is the root server component — fetches `PropertyConfig`, passes as props
- Components using browser APIs (`sessionStorage`, `window`, `useState`, `useEffect`) must declare `'use client'`
- Never call Anthropic, Supabase, or Twilio SDKs from client components

## File Organisation

```
lib/types/        — TypeScript interfaces only (no logic)
lib/config/       — Static data configs, swappable to DB in Sprint 2
lib/utils/        — Pure functions, no React, no side effects
components/       — React components (thin UI logic, import from lib/)
app/              — Next.js App Router routes and layouts
__tests__/unit/   — Vitest unit tests mirroring lib/ structure
__tests__/components/ — Vitest + RTL component tests
e2e/              — Playwright end-to-end specs
```

## Styling

- Tailwind CSS v3 with CSS custom property tokens in `app/globals.css`
- Tokens: `--navy #1B2A3B`, `--sand #E8DCC8`, `--gold #C9A96E`, `--amber #F59E0B`, `--navy-dark #0D1F2D`
- Tailwind maps: `bg-navy`, `text-sand`, `text-gold`, `bg-amber`, `bg-navy-dark`
- No inline styles except for dynamic values (e.g. `style={{ color: config.branding.accentColor }}`)
- Max content width: `max-w-[960px]` on all page containers

## Testing

- **Vitest + React Testing Library**: unit and component tests
- **Playwright**: E2E at iPad, Mobile Safari, Desktop Chrome viewports
- 80% coverage gate on lines, functions, branches, statements
- `getQuietHoursStatus` accepts optional `mockDate` — always use it in tests, never mock `Date.now()`
- `sessionStorage` tested via `vi.spyOn(Storage.prototype, 'getItem/setItem')`

## Timezone

- Always use `Intl.DateTimeFormat` with `timeZone: 'Australia/Melbourne'`
- Never use `new Date().getHours()` (device time) for quiet hours logic

## Config Swap Pattern (Sprint 1 → Sprint 2)

Components receive `PropertyConfig` as props — they never import config directly.
The swap from static to Supabase is contained to `app/stay/[slug]/page.tsx`.

## Environment Variables

```
NEXT_PUBLIC_PROPERTY_SLUG=sorrento-ridge   # Sprint 1 demo slug
SUPABASE_URL=                              # Sprint 2
SUPABASE_ANON_KEY=                         # Sprint 2
TWILIO_ACCOUNT_SID=                        # Sprint 2
TWILIO_AUTH_TOKEN=                         # Sprint 2
ANTHROPIC_API_KEY=                         # Sprint 2
```

## Package Scripts

```
dev           next dev
build         next build
start         next start
lint          next lint
type-check    tsc --noEmit
test          vitest
test:coverage vitest run --coverage
test:e2e      playwright test
```
