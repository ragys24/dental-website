# Invisalign GBP and Conversion Pack

**Practice:** Uplift Dental & Orthodontics  
**Status:** Prepared offline only — no GBP edit, post, citation, host, DNS, or public submission has been made.  
**Use:** Review the checklist after browser access recovers, then obtain final approval before publishing or editing the Business Profile.

## 1. GBP Invisalign Service Audit Checklist

Google states that complete, accurate Business Profile information helps relevance; local visibility is influenced by relevance, distance, and prominence.[1] This checklist is designed to keep the profile accurate without creating attribution noise after the August 14 category update.

| Profile surface | Required final state | Do not add |
|---|---|---|
| Primary category | Keep the current verified `Dentist` primary category. | Another category change during the 30-day measurement period. |
| Invisalign service | `Invisalign consultations` or the closest current factual service label, with the confirmed **Platinum Invisalign Provider** designation in the service description only if the field supports it. | Diamond wording, price, fixed treatment time, coverage guarantee, or individual result claim. |
| Orthodontic services | Confirm factual availability of orthodontic consultations, braces, retainers, and clear-aligner consultations. | Any service that a provider does not currently offer or schedule. |
| Description | Use the current verified practice facts: West Garden Grove, all-age consultations, board-certified orthodontic guidance, digital scans when appropriate, PPO-information review, and Cherry financing discussion. | Keyword stuffing, nearby-city name lists without a clear visitor benefit, superlatives, ratings, or outcome promises. |
| Appointment path | Preserve the existing approved CareStack appointment destination and ensure it is compatible with actual scheduling operations. | A separate non-compliant form or a link that captures clinical details. |
| Website link | `https://upliftdental.com/` once the technical release is live; retain the canonical HTTPS non-`www` form. | HTTP, `www`, staging, tracking-parameter, or legacy site URLs. |
| Hours | Regular hours and special/third-Saturday hours must match the verified business records. | A public provider-specific availability claim outside the configured booking flow. |
| Photos | Use only the source-recorded authentic office/team imagery already approved for marketing use. | Patient review content, before/after results in the profile, or unverified provider imagery. |

> **Browser recovery procedure:** Audit the current fields first. Do not edit anything merely to match this pack. Capture a before-state screenshot, compare it against the table, then bring only the factual differences back for approval.

## 2. Factual GBP Update — Ready for Approval

**Update type:** What’s New  
**Suggested button:** Learn more  
**Button destination:** `https://upliftdental.com/invisalign` only after the Phase 2 host release is live and its raw route validation passes.

> **Considering Invisalign in Garden Grove?**  
> Uplift Dental & Orthodontics offers free Invisalign consultations with a board-certified orthodontist at a **Platinum Invisalign Provider**. During your visit, you can discuss your goals, ask questions, and learn whether clear aligners or another orthodontic approach may be appropriate for you.  
>  
> Our West Garden Grove office welcomes children, teens, and adults. Call `(714) 898-3308` or visit our website to learn more.

The copy is intentionally factual and does not state treatment price, fixed duration, coverage, eligibility, outcome, or a “best” claim. Pair the update with one approved authentic office image or a neutral digital-scanning image; do not pair it with patient outcomes or copied reviews.

## 3. Front-Desk Consultation and Review Workflow

### Invisalign inquiry routing

Use this non-clinical intake prompt on calls:

> “Are you calling about an Invisalign consultation? I can help check the next consultation availability and the right scheduling option.”

Log only aggregate operational totals: Invisalign phone inquiries, text inquiries, requested consultations, booked consultations, completed consultations, and no-shows. Do not record patient names, clinical concerns, diagnoses, photos, treatment goals, insurance identifiers, or message content in the marketing scorecard.

### Neutral review invitation

> “Thank you for choosing Uplift Dental & Orthodontics. If you would like, you can share honest feedback about your experience on Google: **[approved review link]**. Your feedback helps future patients learn about the practice.”

Google permits businesses to invite customers to share honest reviews through a link or QR code, but prohibits incentives offered in exchange for reviews, review changes, or removal of negative reviews.[2] The invitation must be optional and identical across eligible completed visits. Do not ask for a star rating, an Invisalign mention, or a positive review.

## 4. Mobile Conversion Quality Check

| Check | Expected behavior | Evidence to retain |
|---|---|---|
| Call CTA | Every `(714) 898-3308` Invisalign call action emits `phone_call_click`; the Google Ads conversion fires only after a call-tap action. | One consent-approved live/tag check after production cutover, with no phone number transmitted as event data. |
| Text CTA | Every `(888) 895-5908` text action emits `invisalign_text_click`; it does not fire the call-conversion label. | One mobile test and analytics-event confirmation after consent. |
| Privacy notice | “For privacy, please don’t text medical details.” stays adjacent to the text action. | 390px mobile screenshot. |
| Booking CTA | CareStack destination opens without a homemade intake form or PHI capture on the Uplift website. | Link test only; do not test with real patient data. |
| Consent | CookieYes remains denied by default and tags wait for the applicable consent state. | Consent-state check, not a global-consent override. |

## 5. 30-Day Invisalign Attribution Scorecard

| Window | Metric | Baseline / starting condition | Interpretation rule |
|---|---|---|---|
| Day 0 | Local Falcon `invisalign` 7×7 / 5-mile grid | 13/49 top-20; 6.12% SoLV; rank 1 at the business center | Preserve the exact grid configuration for comparability. |
| Day 0 | Technical route | Current production must be replaced by a raw, route-specific `/invisalign` document. | Do not attribute organic changes to the page until this is live. |
| Weekly | Call and text actions | `phone_call_click`; `invisalign_text_click` | Compare event trend only; clicks are not completed consultations. |
| Weekly | Consultation operations | Aggregate requested, booked, completed, and no-show counts | Track operational conversion with no PHI. |
| Weekly | GBP actions | Calls, website clicks, direction requests, approved post date | Treat directional movement cautiously; categories changed August 14. |
| Day 30 | Google Search Console | `/invisalign` impressions, clicks, CTR, and average position | Compare only after the new raw HTML and redirects are live. |
| Day 30 | Local Falcon | Top-20 coverage, ARP, ATRP, SoLV | Desired outcome: hold center rank 1 and improve nearby cells. Do not promise full-grid recovery. |

## 6. Final Approval Gates

| Proposed action | Approval needed before action | Current state |
|---|---|---|
| GBP service edits | Final factual field-by-field confirmation | Not initiated |
| GBP What’s New post | Confirmation of the final copy, image, and link | Draft ready |
| Zocdoc activation | Confirmation of provider credentials, insurance participation, schedule, and any commercial/booking terms | Browser/login dependent |
| BiGG listing | Confirmation of the factual offer and final public form values | Browser/CAPTCHA dependent |
| Host cutover | Explicit production approval after route, media, and noindex removal checks | Staging ready; production held |

## 7. Offline Website Conversion Verification

The current codebase passed TypeScript validation and a production build on August 14, 2026. The dedicated Invisalign CTA wiring is present in both the hero and closing CTA sections.

| Verification | Result |
|---|---|
| Phone CTA | Both visible `(714) 898-3308` Invisalign phone actions use `trackInvisalignCall`. |
| Call event | `trackInvisalignCall` emits `phone_call_click` and the approved Google Ads conversion label `AW-11229085573/4qSzCJ6P0uAcEIX_uOop`; it does not include a phone number or patient data in the payload. |
| Text CTA | Both visible `(888) 895-5908` text actions use `trackInvisalignText`, which emits only `invisalign_text_click` rather than the call conversion. |
| Privacy notice | The “For privacy, please don’t text medical details.” notice is present adjacent to both text CTA placements. |
| Build | `pnpm run check` and `pnpm run build` completed successfully; the build generated 70 canonical route documents and the updated sitemap/robots/error artifacts. |

This is code-level verification only. A consent-approved browser/mobile test remains required after the production host release to confirm live tag loading and event observation.

## References

[1] [Google Business Profile Help — Tips to improve your local ranking on Google](https://support.google.com/business/answer/7091?hl=en).

[2] [Google Business Profile Help — Tips to get more reviews](https://support.google.com/business/answer/3474122?hl=en).
