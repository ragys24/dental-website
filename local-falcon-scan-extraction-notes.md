# Local Falcon Scan Extraction Notes

**Source files received:** August 14, 2026  
**Scan center:** 33.7815617, -118.0414966 (Uplift Dental & Orthodontics)  
**Grid configuration:** 7 × 7, 5-mile radius, 1.67 miles between pins, 49 points per query.

## `dentist near me` — 2:01 AM scan

The map visual shows **one green point at rank 2** near the business-centered portion of the map and **48 red `20+` points** across the remaining scan area. This matches the report headline values: ARP 2.00, ATRP 20.61, and SoLV 2.04% (one top-three appearance out of 49 points). The result confirms extremely narrow generic local visibility at this wide radius; it must not be re-labeled as a scan for `best dentist near me`, which was not supplied.

## `dentist Garden Grove` — 2:03 AM scan

The map visual shows an asymmetric pattern. Uplift is visible in much of the western and central-west area, generally at ranks 6–20, while most eastern grid points are `20+`. No displayed point is rank 1–3. This matches the report metrics: 26 of 49 points in the top 20, ARP 11.58, ATRP 16.00, and SoLV 0.00%.

## Interpretation guardrails

Both reports are dated, provider-specific Google Maps snapshots. They establish an initial benchmark for their two exact queries, not a permanent ranking or proof of a ranking for the unsupplied phrase `best dentist near me`. The Local Falcon AI recommendation text contains out-of-market examples in the `dentist near me` report; it will not be relied on for strategic conclusions. Only the scan settings, map ranks, and named business comparison rows are treated as primary evidence.

## `braces` — 2:24 AM scan

The map visual shows **two in-range points**: rank 2 at the center point and rank 6 immediately east of it. The other 47 points are `20+`. This matches the report metrics: ARP 4.00, ATRP 20.31, SoLV 2.04%, and 2/49 top-20 coverage. Braces visibility is therefore extremely localized.

## `invisalign` — 2:24 AM scan

The map visual shows a materially broader central cluster. Uplift is rank 1 at the center and ranks 3 at two nearby points, with additional top-20 visibility extending west, east, and south-central before dropping to `20+` at the outer grid. This matches the report metrics: ARP 9.31, ATRP 17.90, SoLV 6.12%, and 13/49 top-20 coverage. Invisalign is the strongest specialty-intent baseline in the supplied data, but its outer-area visibility is still limited.
