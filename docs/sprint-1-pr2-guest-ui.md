# Sprint 1 PR-2 -- Guest UI Technical Note

Issues: #2 (CHR-02), #3 (CHR-03), #4 (CHR-04), #5 (CHR-05), #6 (CHR-06), #7 (CHR-07)
Branch: `story/CHR-02-07-guest-ui`
PR: [#39](https://github.com/uzat/charteris/pull/39)

## What changed

### New components

All components are in `components/features/` or `components/layout/`. All client components declare `'use client'`. None import config directly -- all receive typed props from `app/stay/[slug]/page.tsx`.

---

#### CHR-02 -- Core Guest Page Layout

**`components/layout/Header.tsx`** (`'use client'`)
Props: `{ propertyName: string }`. Sticky (`sticky top-0 z-50`) navy header with the "CHARTERIS" brand mark (bold, tracking-widest, `text-sand/80`) and the property name (`text-sand/50`). Max-width container `max-w-[960px]` matches page layout.

**`components/layout/Footer.tsx`**
No props. Renders "Powered by Charteris" in `text-sand/40`, centered, `py-6`.

**`app/stay/[slug]/page.tsx`** (updated)
Server component. Renders full guest page shell: Header -> GuestSessionProvider (render prop) -> main with all feature sections -> Footer. The render prop child receives `bookingType` and renders: QuietHoursBanner -> ConciergeSearch -> ExperienceGrid -> HouseManual.

---

#### CHR-03 -- Quiet Hours Banner

**`components/features/quiet-hours/QuietHoursBanner.tsx`** (`'use client'`)
Props: `{ config: QuietHoursConfig }`. Polls `getQuietHoursStatus(config)` every 60 seconds via `setInterval` (cleaned up on unmount). Returns `null` when inactive.

| State | Rendering |
|---|---|
| `inactive` | Nothing rendered (`null`) |
| `active` | Dark amber background (#2A1F0A), `role="alert"`, amber "Active Now" badge, config message |
| `upcoming` | Navy with `border-l-[3px] border-sand/60`, `role="status"`, countdown in minutes, config message |

Timezone resolved via `getQuietHoursStatus` -- the banner never reads device time directly.

---

#### CHR-04 -- Guest Session Onboarding

**`components/features/onboarding/GuestSessionProvider.tsx`** (`'use client'`)
Props: `{ children: (bookingType: BookingType) => React.ReactNode }` -- render prop pattern.

On mount (`useEffect`): reads `sessionStorage` via `getStoredBookingType()`. If a value is present, renders children immediately. If not, renders OnboardingOverlay. Once the overlay completes, sets internal state and renders children. The `!ready` guard prevents a flash of overlay on SSR hydration.

**`components/features/onboarding/OnboardingOverlay.tsx`** (`'use client'`)
Props: `{ onComplete: (type: BookingType) => void }`. Full-screen modal (`fixed inset-0 z-50`, `role="dialog"`, `aria-modal="true"`). Six booking type options in a 2-column grid, each button at `min-h-[56px]` for touch targets. Gold border idle; gold fill + navy text when selected (`aria-pressed`). Continue disabled until selection.

On Continue: calls `setStoredBookingType(type)` then `onComplete(type)`. On Skip: calls `setStoredBookingType('general')` then `onComplete('general')`.

Booking type options:

| Value | Label |
|---|---|
| `family` | Family |
| `couples` | Couples |
| `friends` | Friends |
| `corporate` | Corporate |
| `hen_party` | Hens Party |
| `birthday` | Birthday |

---

#### CHR-05 -- Curated Experience Grid

**`components/features/experiences/ExperienceGrid.tsx`** (`'use client'`)
Props: `{ experiences: Experience[], bookingType: BookingType }`. Calls `filterExperiences(experiences, bookingType)` and renders the result. Empty state copy shown when no experiences pass the filter. Shows `{n} available` count in gold. 2-column grid on sm+ breakpoint.

**`components/features/experiences/ExperienceCard.tsx`** (`'use client'`)
Props: `{ experience: Experience }`. Renders a card with image placeholder, category tag, title, description (2-line clamp), price, and a CTA link.

Availability state map (AVAILABILITY_CONFIG):

| State | Badge | CTA label | Opacity | CTA style |
|---|---|---|---|---|
| `available` | -- | Book Now | full | gold fill |
| `limited` | "Limited Availability" (amber) | Book Now | full | gold fill |
| `on_request` | "On Request" (gold border) | Request to Book | full | gold outline |
| `check_availability` | -- | Check Availability | full | sand outline |
| `booked_out` | "Fully Booked" (sand/15) | Fully Booked | 60% | aria-disabled, tabIndex=-1 |
| `seasonal` | "Seasonal" (sand/15) | Check Dates | full | sand outline |

Placeholder CTA: `console.warn('[Charteris] Booking CTA clicked for experience: {id}')` -- booking integration deferred to Sprint 2.

---

#### CHR-06 -- House Manual Collapsible Panels

**`components/features/house-manual/HouseManual.tsx`** (`'use client'`)
Props: `{ sections: HouseManualSection[] }`. Manages `openId: string | null` state. Single-open accordion: toggling an open panel closes it; opening any panel closes the previously open one.

**`components/features/house-manual/CollapsiblePanel.tsx`** (`'use client'`)
Props: `{ section, isOpen, onToggle }`. Stateless -- state managed by HouseManual. Transition: `maxHeight` CSS property animated `0px -> 600px` over `250ms ease-in-out`. Button carries `aria-expanded` and `aria-controls`.

Emergency contacts special case: when `section.id === 'emergency-contacts'`, border changes to `border-amber/30`, title to `text-amber-300`, and a "000 -- Emergency Services" callout (`text-base font-bold text-amber-300`) is prepended to content.

---

#### CHR-07 -- AI Concierge Search Bar

**`components/features/concierge/ConciergeSearch.tsx`** (`'use client'`)
Props: `{ bookingType: BookingType, propertyName: string }`. Maintains a local message thread (Message[]). On submit: appends user message optimistically, clears input, POSTs to `/api/concierge`, appends assistant response. Error displayed in `role="alert"` paragraph. Focus returned to input after each response.

Send button disabled when input is empty or loading. Message log in `role="log" aria-live="polite"` div. `propertyName` prefixed before each assistant message.

**`components/features/concierge/TypingIndicator.tsx`**
No props. Three dots (`h-1.5 w-1.5 rounded-full bg-gold`) with staggered `animate-bounce` (150ms delay per dot, 900ms duration). `role="status"`, `aria-label="Concierge is typing"`.

---

### New API route

**`app/api/concierge/route.ts`** -- Sprint 1 stub.

```
POST /api/concierge
Content-Type: application/json

Request:  { query: string, bookingType: BookingType }
200 OK:   { answer: string }
400 Err:  { error: string }
```

Input validation: `query` trimmed and checked for non-empty. Non-string `query` returns 400. `bookingType` accepted but not validated -- deferred to CHR-08.

Stub answer: "Thanks for your question! Our full concierge AI will be available soon. In the meantime, please call us on the number provided in your welcome pack."

Sprint 2 (CHR-08): replace stub with AsyncAnthropic call, add bookingType validation, add rate limiting.

---

### Page structure after PR-2

```
app/stay/[slug]/page.tsx      server component
  Header
  GuestSessionProvider        render prop, manages bookingType
    QuietHoursBanner          conditional, polls every 60s
    ConciergeSearch           chat UI -> /api/concierge
    ExperienceGrid            filtered by bookingType
      ExperienceCard x n
    HouseManual               single-open accordion
      CollapsiblePanel x 12
  Footer
```

---

## Test results

79 tests across 15 suites, all green. Previous baseline: 19.

New tests (60):

| Suite | Tests | Layer |
|---|---|---|
| Header.test.tsx | 3 | Frontend / UI |
| Footer.test.tsx | 2 | Frontend / UI |
| QuietHoursBanner.test.tsx | 5 | Frontend / UI |
| OnboardingOverlay.test.tsx | 7 | Frontend / UI |
| GuestSessionProvider.test.tsx | 3 | Frontend / UI |
| ExperienceCard.test.tsx | 8 | Frontend / UI |
| ExperienceGrid.test.tsx | 5 | Frontend / UI |
| CollapsiblePanel.test.tsx | 6 | Frontend / UI |
| HouseManual.test.tsx | 5 | Frontend / UI |
| TypingIndicator.test.tsx | 3 | Frontend / UI |
| ConciergeSearch.test.tsx | 9 | Frontend / UI |
| concierge.test.ts | 4 | API / middleware |

All 19 PR-1 unit tests continue to pass -- zero regressions.

---

## Not changed this sprint

- No lib/types/ or lib/utils/ changes -- all types and pure functions established in PR-1
- No Supabase schema or external API integration (Sprint 2)
- No Playwright E2E specs (PR-3, CHR-23)
- No 80% coverage threshold (deferred to PR-3 once component layer is covered)
