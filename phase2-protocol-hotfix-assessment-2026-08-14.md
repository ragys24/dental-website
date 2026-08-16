# HTTP-to-HTTPS Consolidation Assessment — August 14, 2026

## Decision

> **Do not ship an HTTP-to-HTTPS hotfix. The production edge already performs the required one-hop 301 consolidation.**

Live header checks on August 14, 2026 show that `http://upliftdental.com/` returns **301** directly to `https://upliftdental.com/`. The same is true for the legacy Invisalign path: its HTTP version returns **301** directly to the corresponding HTTPS legacy path. HTTPS then returns the current application response.

| Request | Current response | Immediate target | Conclusion |
|---|---:|---|---|
| `http://upliftdental.com/` | 301 | `https://upliftdental.com/` | Canonical protocol enforcement already active. |
| `https://upliftdental.com/` | 200 | — | Secure canonical host is reachable. |
| `http://upliftdental.com/invisalign-treatment-garden-grove-ca/` | 301 | `https://upliftdental.com/invisalign-treatment-garden-grove-ca/` | Current protocol redirect happens before legacy-topic routing. |
| `https://upliftdental.com/invisalign-treatment-garden-grove-ca/` | 200 | — | Legacy-path redirect remains a separate Phase 2 issue. |

## Why No Additional Protocol Release

The Search Console Pages report does show historical `http://upliftdental.com/` performance separately from HTTPS. That does not establish a current broken protocol rule: Search Console retains historical URL identities and aggregates reporting over the selected time window. The direct live test establishes that current HTTP requests already normalize to HTTPS in a single hop.

Adding another protocol rule inside the application or a later legacy redirect layer would be unnecessary and could produce a chain such as `http://old-path → https://old-path → https://new-path`. The Phase 2 legacy map should therefore target only HTTPS legacy paths (with separate direct HTTP-aware rules only if the edge layer cannot preserve a one-hop target), while leaving the existing global HTTP-to-HTTPS edge redirect in place.

## Phase 2 Rule Requirement

Every candidate redirect must be tested at both protocols before release. If a legacy HTTP request cannot be made to target its final HTTPS destination in one hop at the edge, it should remain part of the coordinated map rather than a separate hotfix.

## Search Console Performance Export Baseline

The authenticated Performance → Pages report was switched to its full available **16-month** window and a CSV export was initiated. At the time of export, the report showed **367 clicks**, **41.6K impressions**, **0.9% CTR**, and **26.9 average position**. The root protocol split persisted in historical reporting: HTTPS root 134 clicks / 12,659 impressions and HTTP root 95 clicks / 2,611 impressions. The historical separation is material for redirect-map prioritization, but the live header test above establishes that an additional HTTP-to-HTTPS hotfix is not required.

## Search Console Pages Baseline

The authenticated Pages report shows **75 indexed** and **141 not indexed** URLs. The current non-indexed buckets are: Page with redirect (47), Excluded by `noindex` tag (46), Alternate page with proper canonical tag (11), Blocked by robots.txt (7), Not found (404) (2), Soft 404 (1), Crawled—currently not indexed (19), and Discovered—currently not indexed (8). A complete Pages CSV export was initiated from the authenticated report for per-URL provenance review. No `noindex` directive was changed.

The `Excluded by ‘noindex’ tag` detail route is now open in authenticated Search Console. Its live examples table was still loading at the last inspection, so the per-URL list has not yet been inferred from the aggregate count. The subsequent provenance analysis will use only the loaded/exported example URLs and source evidence.

## Noindex Provenance Resolution

The authenticated detail report supplied all 46 example URLs, now preserved in `phase2-noindex-inventory-2026-08-14.md`. Current raw checks across its 43 normal legacy paths found no current noindex response: each is 200, explicitly indexable, canonicals to the root, and renders the generic homepage shell. The Search Console noindex bucket is therefore historical legacy evidence rather than a current build-wide noindex default. The urgent present issue is the opposite: no legacy path should remain 200/indexable with a generic root canonical after the coordinated release.
