# Uplift Dental — “Best Dentist Near Me” Grid Scan Runbook

**Prepared:** August 14, 2026  
**Business:** Uplift Dental & Orthodontics, 5253 Lampson Ave, Garden Grove, CA 92845  
**Status:** **Ready to run; blocked only by Local Falcon connector activation.** The existing Local Falcon connector was found disabled. Its activation suggestion was not accepted, so no rank positions have been fabricated or recorded.

> This is a reproducible local-rank specification, not a claim of current rank. Google personalizes `near me` results by location and other context; the scan must preserve its provider settings and timing for month-over-month comparison.[1]

## Confirmed Scan Input List

| Field | Locked first-scan value |
|---|---|
| Business | Uplift Dental & Orthodontics — 5253 Lampson Ave, Garden Grove, CA 92845 |
| Exact keyword | `best dentist near me` |
| Search surface | Google Maps/local results |
| Grid | 5 × 5 square = **25 points** |
| Center | Verified business address |
| Point spacing | 0.75 miles between neighboring points |
| Approximate coverage | 3-mile × 3-mile area centered on Uplift, showing the immediate Garden Grove/Lampson corridor and surrounding local neighborhoods |
| Point identifiers | `R-2C-2` through `R+2C+2`; rows run north-to-south and columns west-to-east |
| Device/location profile | Provider’s standard local Maps simulation, recorded in the export |
| Comparator set | Uplift plus all businesses returned at each point; identify recurring competitors after the first scan rather than preselecting them |
| Repeat cadence | Same grid, keyword, and settings at Day 30, then monthly |

### 25-Point Input Matrix

| North-to-south row \ West-to-east column | C-2 | C-1 | C0 | C+1 | C+2 |
|---|---:|---:|---:|---:|---:|
| R-2 (north edge) | R-2C-2 | R-2C-1 | R-2C0 | R-2C+1 | R-2C+2 |
| R-1 | R-1C-2 | R-1C-1 | R-1C0 | R-1C+1 | R-1C+2 |
| R0 (business center) | R0C-2 | R0C-1 | R0C0 | R0C+1 | R0C+2 |
| R+1 | R+1C-2 | R+1C-1 | R+1C0 | R+1C+1 | R+1C+2 |
| R+2 (south edge) | R+2C-2 | R+2C-1 | R+2C0 | R+2C+1 | R+2C+2 |

## Required Output From the First Scan

Record the scan provider, UTC and Pacific timestamps, business selected, keyword, grid settings, rank at each point, average rank, map visibility percentage/share of voice, and the competitors recurring in the top results. Save the provider’s map export/screenshot. The scan should not be compared with a signed-in browser search or an unrelated keyword scan.

## 30-Day Review and Local-Prominence Framework

Google does not expose a single “prominence score.” The usable proxies are rank coverage on the locked grid, generic GBP discovery, genuine review participation, public review replies, profile actions, accurate local citations, and consistent real-world business information.[1]

| Timeframe | Action | Owner/process metric | Compliance guardrail |
|---|---|---|---|
| Days 1–3 | Activate the grid provider and run the baseline 25-point scan. Create the GBP review link/QR code. | Baseline export saved; review-request link tested. | Do not infer rank from a one-off personal search. |
| Days 1–7 | Give every eligible completed-visit patient the same optional, neutral Google review invitation by a front-desk card, QR code, or approved post-visit message. | Track **invitation process coverage**, not a star-rating quota. | No incentive, discount, filtering by expected sentiment, or request for medical details. |
| Days 1–7 | Reply to the two pending reviews and establish a twice-weekly review-monitoring cadence. | Draft/approve responses within two business days. | Never confirm patient status, treatment, or health information in a reply. |
| Week 2 | Verify GBP service sections against actual provider availability; add only genuinely offered missing services. Publish one factual GBP update using real office/community imagery. | Service change log and one source-approved update. | No keyword stuffing, unsupported prices, or outcome claims. |
| Week 2 | Claim/create Zocdoc only if scheduling, provider, and insurance details can be maintained. Confirm Chamber and City BigG eligibility. | Canonical NAP sheet used for every submission. | No duplicate listings or inconsistent business name, address, hours, phone, or URL. |
| Week 3 | Submit/complete eligible Chamber and City BigG references. Add one additional authentic GBP photo if it truthfully reflects the office and has approval. | Confirmation or pending-review record saved. | Use actual Uplift imagery only; no generated office photos. |
| Week 4 | Compare GBP Performance for generic query movement and business actions with the baseline. Re-run the same 25-point grid at Day 30. | Day-30 grid/map export and performance comparison. | Do not claim causality from a single month; evaluate directional change. |

### Neutral, Policy-Safe Review Invitation

> “Thank you for choosing Uplift Dental & Orthodontics. If you would like, you can share honest feedback about your experience on Google: **[Google review link]**. Your feedback helps future patients learn about the practice.”

This should be available equally to eligible patients after a completed visit. Google allows businesses to ask customers to use a review link or QR code, but prohibits incentives in exchange for reviews or review changes.[2]

### Success Criteria at Day 30

| Metric | Day-30 target |
|---|---|
| Grid scan | A directly comparable second 25-point scan with full settings and export retained |
| Review process | Consistent neutral invitation available to eligible completed visits; no review-rating or employee quota |
| GBP responsiveness | Pending reviews assessed and privacy-safe responses posted after approval |
| Profile completeness | Factual service, hours, booking, image, and directions data reviewed against source records |
| Entity consistency | Accurate submissions or eligibility decisions recorded for Zocdoc, Chamber, and BigG |
| Measurement | Generic GBP discovery/actions compared with the baseline rather than relying on a single personal search |

## References

[1] [Google Business Profile Help — Tips to improve your local ranking on Google](https://support.google.com/business/answer/7091?hl=en)  
[2] [Google Business Profile Help — Tips to get more reviews](https://support.google.com/business/answer/3474122?hl=en)
