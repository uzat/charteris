# Charteris — Use Cases by User Type

## Overview
Charteris serves four distinct actors. The primary commercial target is the **property management agency** — sold on bulk operational efficiency and compliance protection.

---

## 1. Guest
Arrives via QR code scan. No account. No login. Session-based.

| # | Use Case | Trigger | Notes |
| :--- | :--- | :--- | :--- |
| G-01 | Scan QR code and land on property experience | Physical standee / fridge magnet / door card | Entry point for all guest journeys |
| G-02 | Select group/booking type on arrival | First load onboarding | Personalises experience grid |
| G-03 | Ask AI concierge a house question | Free-text search | Wifi, checkout, rules, local tips, bin night |
| G-04 | Browse curated experience grid | Passive browse | Filtered by group type and availability |
| G-05 | Book an experience via affiliate link | Tap Book Now | Opens FareHarbor/Rezdy in new tab |
| G-06 | View quiet hours compliance notice | Always visible in-app banner | Non-dismissible — compliance feature, not a notification |
| G-07 | Receive in-app bin night reminder | Dismissible day-of banner | Shown on bin day if guest has app open |
| G-08 | Receive in-app checkout day reminder | Dismissible morning banner | Shown on departure day with checkout time |
| G-09 | Receive SMS quiet hours nudge | Automated at 10:45PM | Opt-out available. Twilio |
| G-10 | Receive SMS bin night reminder | Automated 3PM on collection day | Opt-out available. Twilio |
| G-11 | Receive SMS checkout reminder | Automated 8AM on departure day | Opt-out available. Twilio |
| G-12 | Manage SMS notification preferences | In-app preferences screen | Toggle each SMS type independently. Reply STOP also works |
| G-13 | Access house manual sections | Tap accordion panels | Wifi, rules, checkout, parking, emergencies |
| G-14 | Find emergency contacts | House manual panel | Property manager, nearest hospital, 000 |
| G-15 | View property-specific house rules | House manual panel | Pool, noise, pets, occupancy |

### Notification Design Principles
- **In-app quiet hours banner**: always visible, cannot be dismissed — compliance feature not a notification
- **In-app transient banners** (bin night, checkout): dismissible — guests are on holiday
- **SMS**: all opt-out via in-app toggle or Reply STOP (required under Australian Spam Act 2003)
- **Mandatory SMS override**: agency can flag compliance-critical properties where quiet hours SMS cannot be opted out of
- Tone of all automated messages: warm, brief, non-alarming

---

## 2. Property Owner
Individual landlord. Passive stakeholder. Cares about compliance protection and cashback earnings.

| # | Use Case | Trigger | Notes |
| :--- | :--- | :--- | :--- |
| O-01 | View cashback earnings from experience commissions | Monthly statement email | 50% of the platform 15% affiliate cut |
| O-02 | View compliance log for their property | Monthly email digest | Quiet hour incidents, SMS nudges sent |
| O-03 | See which experiences generated bookings | Monthly digest | |
| O-04 | Confirm property is active and QR code is live | Portal check | |

Note: A monthly email digest is sufficient for Sprint 2. Full owner portal is Sprint 4 scope.

---

## 3. Property Management Agency (Primary Buyer)
Manages 50-5,000 properties. Wants bulk operations, compliance visibility, minimal per-property overhead.

### Property and Portfolio Management

| # | Use Case | Batch | Notes |
| :--- | :--- | :---: | :--- |
| A-01 | Add a new property | — | Generates unique QR code and property URL slug |
| A-02 | Bulk import properties via CSV | Yes | Name, address, tier, manual content, bin day, checkout time |
| A-03 | Set property tier luxury/mid/standard | Yes | Determines experience catalogue shown to guests |
| A-04 | Batch update checkout time | Yes | e.g. all properties move to 10AM for peak season |
| A-05 | Batch update bin night schedule | Yes | e.g. all Sorrento properties move to Wednesday |
| A-06 | Batch update quiet hours | Yes | e.g. Shire bylaw changes curfew to 10:30PM |
| A-07 | Update house manual content for one property | — | New gate code, wifi password, pool rules |
| A-08 | Push a house manual update to all properties | Yes | Agency-wide policy change |
| A-09 | Deactivate a property | — | QR code shows graceful unavailable page |
| A-10 | Regenerate QR code for a property | — | If physical standee is damaged or stolen |
| A-11 | Preview guest view for a property | — | QA before go-live |

### Experience Management

| # | Use Case | Batch | Notes |
| :--- | :--- | :---: | :--- |
| A-12 | Add an experience to the agency portfolio | — | Available to assign to any property |
| A-13 | Assign experiences to a property | — | Choose from agency experience library |
| A-14 | Batch assign experience to all luxury tier properties | Yes | e.g. new heli operator pushed to all luxury |
| A-15 | Mark an experience as booked out | — | Updates availability across all affected properties |
| A-16 | Bulk mark seasonal experiences unavailable | Yes | e.g. hot springs closes in February |
| A-17 | Set experience suitability rules per property | — | Property-specific override |

### Notifications and Automation

| # | Use Case | Batch | Notes |
| :--- | :--- | :---: | :--- |
| A-18 | Configure quiet hours per property | Yes | Default 11PM-7AM Shire. Override per property |
| A-19 | Configure bin night schedule per property | Yes | Day of week plus waste type |
| A-20 | Batch configure bin nights by suburb or postcode | Yes | One action updates all affected properties |
| A-21 | Configure checkout reminder time | Yes | Default 8AM on departure day |
| A-22 | Flag a property as mandatory quiet-hours SMS | — | Disables guest opt-out for quiet hours SMS on this property |
| A-23 | View SMS delivery log | — | Guests, nudge type, timestamp, opt-out status |
| A-24 | Opt a property out of all SMS notifications | — | Some owners prefer no automated guest contact |

### Compliance and Reporting

| # | Use Case | Notes |
| :--- | :--- | :--- |
| A-25 | View compliance log across all properties | Quiet hour incidents, SMS sent, response rates |
| A-26 | Export compliance report PDF or CSV | Useful if council requests evidence |
| A-27 | View experience revenue by property | Commission earned, cashback owed to owner |
| A-28 | View aggregate experience revenue across portfolio | Total GMV, total commission |
| A-29 | View subscription status for all properties | Active, past-due, deactivated |

### Billing and Account

| # | Use Case | Notes |
| :--- | :--- | :--- |
| A-30 | Subscribe new properties to SaaS plan | 69 AUD/month per property via Stripe |
| A-31 | Manage agency billing via Stripe portal | Update card, view invoices, cancel properties |
| A-32 | Receive alert on failed payment | Email plus dashboard flag. Property deactivated after grace period |

---

## 4. Automated / System-Triggered
Scheduled jobs running against active bookings.

| # | Event | Timing | Channel | Opt-Out |
| :--- | :--- | :--- | :--- | :--- |
| S-01 | Quiet hours nudge | 10:45PM nightly during active stay | SMS + in-app persistent banner | Yes unless property flagged mandatory |
| S-02 | Bin night reminder | 3PM on collection day | SMS + in-app dismissible banner | Yes |
| S-03 | Checkout reminder | 8AM on departure day | SMS + in-app dismissible banner | Yes |
| S-04 | Monthly commission statement to agency | 1st of month | Email | No |
| S-05 | Monthly cashback statement to property owner | 1st of month | Email | No |
| S-06 | Failed payment alert to agency | Stripe webhook | Email plus dashboard flag | No |
| S-07 | Experience availability sync | Hourly Sprint 3 | FareHarbor/Rezdy API | N/A |

---

## Batch Operation Principles
All batch operations must:
- Be filterable by tier, suburb, postcode, or custom tag
- Show a preview count before execution: "This will affect 47 properties — confirm?"
- Be logged with timestamp and operator name for audit purposes
- Be reversible where possible with a 60-second undo window or explicit revert action