# Search Console Page Indexing Baseline — August 14, 2026

**Source:** Authenticated Google Search Console, property `upliftdental.com`, Page indexing report, **All known pages**, last update shown as August 7, 2026. This is a recorded baseline for the Phase 2 pre-production plan; it does not request validation or change any Search Console state.

| Top-level state | Affected pages | Interpretation for Phase 2 |
|---|---:|---|
| Indexed | 75 | Existing indexed set. Canonical route documents and sitemap parity will be verified before any request for recrawl. |
| Not indexed | 141 | Comprises the ten reason rows below. No current status is treated as a defect solely from its count. |

| Not-indexed reason | Source shown by Search Console | Validation state | Pages | Planned handling |
|---|---|---|---:|---|
| Page with redirect | Website | Not started | 47 | Reconcile the actual redirect set against the approved direct-map manifest; expected for legitimate legacy aliases after release. |
| Excluded by `noindex` tag | Website | Not started | 46 | Full URL inventory is preserved in `phase2-noindex-inventory-2026-08-14.md`. Current raw provenance shows the 43 substantive paths are historical noindex records, but currently return an indexable generic root-canonical shell; fix via approved 301/404/410 behavior, not by blindly removing tags. |
| Alternate page with proper canonical tag | Website | Not started | 11 | Review after normalization; expected only when a deliberate duplicate variation exists. |
| Blocked by robots.txt | Website | Not started | 7 | Keep only durable administrative/CMS or query-template paths blocked; do not block a legacy URL that must be crawled to pass its 301. |
| Not found (404) | Website | Not started | 2 | Preserve real non-indexable 404 behavior where there is no equivalent content. |
| Soft 404 | Website | Not started | 1 | Eliminate root-shell soft 404 behavior through true unknown-route handling. |
| Crawled — currently not indexed | Google systems | Not started | 19 | Monitor after technical remediation; do not force-index or add thin pages. |
| Discovered — currently not indexed | Google systems | Not started | 8 | Monitor after sitemap/route-registry repair; do not force-index or add thin pages. |
| Duplicate without user-selected canonical | Website | N/A | 0 | Maintain zero through self-canonical initial HTML. |
| Duplicate, Google chose different canonical than user | Google systems | N/A | 0 | Maintain zero through self-canonical initial HTML and direct redirects. |

The Page indexing report’s not-indexed total is **141** across its eight non-zero reason groups. The 10 table rows reconcile to the authenticated report: two duplicate categories are zero and therefore do not contribute to the 141 total. The raw Performance → Pages export remains separately preserved at `phase2-search-console/performance-pages-16m/Pages.csv`.

## Release Attribution Guardrail

The Google Business Profile category edits completed on August 14 are tracked separately. Any change in map-pack/local-finder visibility during the next 30 days will not be attributed to this organic technical release without independent evidence. The baseline above concerns organic indexing only.

## References

[1]: https://search.google.com/search-console/index?resource_id=sc-domain%3Aupliftdental.com "Authenticated Search Console Page indexing report"
[2]: phase2-noindex-inventory-2026-08-14.md "46-URL noindex inventory and current raw provenance"
[3]: phase2-search-console/performance-pages-16m/Pages.csv "Authenticated 16-month Performance → Pages export"
