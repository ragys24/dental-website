# Phase 1 Technical SEO Diagnostic — upliftdental.com

**Prepared:** August 14, 2026  
**Scope:** Phase 1 only. No redirects, rendering configuration, canonical tags, sitemap entries, or production DNS settings were changed during this diagnostic.

## Executive Finding

The supplied brief’s central rendering concern is **confirmed**. The initial production HTML for tested route URLs is a shared client-side application shell, not route-specific static HTML. It returns the generic homepage title and a root canonical—`https://upliftdental.com/`—even for `/invisalign` and `/dentist-near-cypress`. The client source then alters metadata and injects JSON-LD only after JavaScript runs. In the same initial-response state, the 33 audited legacy URL candidates return **HTTP 200 without a redirect**, expose the same root canonical, and contain the generic homepage shell.

> This is a diagnostic conclusion, not a remediation claim. The correct next step is a complete redirect and prerendering design based on the evidence below and the remaining Search Console inventory.

| Diagnostic area | Evidence-based status | Severity |
|---|---|---|
| Raw route metadata | `/invisalign`, `/dentist-near-cypress`, and the legacy Invisalign path return the same homepage title and root canonical. | Critical |
| Initial route content | The raw response contains generic homepage shell/no-script content rather than route-specific Invisalign or Cypress content. | Critical |
| Legacy URL behavior | All 33 tested legacy candidates return HTTP 200, no `Location`, homepage title/canonical, and homepage-shell evidence. | Critical |
| Coordinates | Raw `geo.position` and `ICBM` are `33.7783, -117.9601`; the current client schema contains the same values. | Confirmed correction candidate |
| JSON-LD | Client source implements LocalBusiness, FAQ, service, medical-page, and breadcrumb JSON-LD in `useEffect`; raw production HTML contains no `application/ld+json` block. | Important |
| Sitemap and robots | Current sitemap responds 200 and contains 93 URLs. `robots.txt` references it and does not block ordinary public routes. | Baseline is present |

## 1. Raw Production Rendering Evidence

The following commands were run against the public production host on August 14, 2026. They inspect the **initial response**, not a browser-rendered DOM.

| URL tested | HTTP status | Raw `<title>` | Raw canonical | Raw content observation |
|---|---:|---|---|---|
| `https://upliftdental.com/invisalign` | 200 | `Uplift Dental \| Dentist in Garden Grove, CA` | `https://upliftdental.com/` | Generic homepage shell and generic no-script content; no Invisalign-specific raw title/canonical. |
| `https://upliftdental.com/dentist-near-cypress` | 200 | `Uplift Dental \| Dentist in Garden Grove, CA` | `https://upliftdental.com/` | Same generic homepage shell and root canonical. |
| `https://upliftdental.com/invisalign-treatment-garden-grove-ca/` | 200 | `Uplift Dental \| Dentist in Garden Grove, CA` | `https://upliftdental.com/` | Same generic homepage shell and root canonical; no redirect. |

The live document shell includes a JavaScript canonical rewrite routine, but its initial `<link rel="canonical">` remains the homepage. The current `StructuredData.tsx` source also creates schema in React `useEffect`, which means it is absent from the raw response. This confirms a **client-side-rendered metadata and schema architecture** for the tested routes.

## 2. Legacy URL Response Inventory

The initial known set of 8 paths from the supplied brief plus 25 additional paths previously surfaced from Search Console excerpts were passively checked. **All 33 returned HTTP 200, no redirect Location header, the generic homepage title, the root canonical, and generic homepage-shell evidence.**

| Candidate group | Count tested | Response pattern |
|---|---:|---|
| Brief’s known legacy URLs | 8 | 8/8: HTTP 200, no redirect, root canonical, generic homepage shell. |
| Additional Search Console-excerpt candidates | 25 | 25/25: HTTP 200, no redirect, root canonical, generic homepage shell. |
| Total tested legacy candidates | **33** | **33/33 share the same soft-404-like fallback pattern.** |

The audited paths include the brief’s `/invisalign-treatment-garden-grove-ca/`, `/clear-aligners/`, `/orthodontic-treatments/`, `/general-dentistry/`, `/dental-fillings/`, and `/faq/`, plus historic location, treatment, blog, contact, and results paths. The full field-level evidence remains in `audit_known_legacy_urls.json` and `audit_remaining_legacy_candidates.json`.

Some current sitemap URLs share a topic with older slash-form URLs, including `/dental-implants`, `/dental-fillings`, `/dental-cleaning`, and `/clear-aligners`. This is not a valid redirect resolution by itself: the legacy slash-form requests still returned the generic 200 fallback in the diagnostic. A future redirect design must define the canonical form and cover both slash and no-slash variants without redirect chains.

## 3. Current Crawl Baseline

The production `sitemap.xml` responded successfully and contains **93 URLs**. The captured `robots.txt` references that sitemap and allows public crawling, while disallowing legacy WordPress-system directories such as `/wp-admin/`, `/wp-content/`, and `/wp-json/`. The sitemap does not contain the known legacy Invisalign-treatment path, general-dentistry path, orthodontic-treatments path, FAQ path, dental-bridges path, or testimonials path.

The raw `invisalign` response contains these coordinate fields:

```html
<meta name="geo.position" content="33.7783;-117.9601" />
<meta name="ICBM" content="33.7783, -117.9601" />
```

The client LocalBusiness schema currently uses the same latitude and longitude. The supplied brief identifies the verified practice coordinates as `33.7815617, -118.0414966`. This is a narrow, evidence-supported correction candidate, but it should ship with the broader rendering/remediation work rather than as an isolated claim of SEO recovery.

## 4. Content Parity Status

The current raw production response does not expose the route-specific content needed for an HTML parity comparison. The supplied brief identifies potentially lost historic Invisalign details—provider attribution, languages, selected scheduling context, insurance detail, and Invisalign First—but those specific historical statements were **not independently verified** during this Phase 1 pass.

The Wayback CDX endpoint did not return an archive inventory within the diagnostic timeout, and an authoritative Google Search Console export was not available in this session. Therefore, content parity is **incomplete**, not negative: it requires the old URL/HTML inventory or a Search Console export before any ranking-content conclusion is made.

## 5. Google Search Console Gap

The brief correctly treats Search Console as the authoritative source for both legacy-URL prioritization and Googlebot’s selected canonical. Authenticated access was subsequently restored on August 14, 2026. The dashboard currently shows **346 total web-search clicks** for its visible reporting window, **75 indexed pages**, **141 not-indexed pages**, **25 HTTPS pages**, **19 valid Breadcrumb items**, and **115 valid Review snippet items**. The dashboard also flags a recent 97% reduction in impressions for the query `periodontist near me`; this is a monitoring signal, not yet a causal diagnosis.

The authenticated **Page indexing** report, last updated August 7, 2026, provides stronger evidence for the migration findings: it reports **47 pages with redirect**, **46 excluded by noindex**, **11 alternate pages with proper canonical**, **7 blocked by robots.txt**, **2 not found**, **1 soft 404**, **19 crawled but not indexed**, and **8 discovered but not indexed**. The report also shows zero current counts for “duplicate without user-selected canonical” and “duplicate, Google chose different canonical than user.” The single GSC soft-404 count does not contradict the 33 raw legacy fallback findings; it confirms only that Google had classified one URL in that report bucket at the report’s snapshot date.

Authenticated URL Inspection for `https://upliftdental.com/invisalign` reports that the URL is on Google and indexed, is served over HTTPS, has one valid Breadcrumb item, and has five valid Review snippet items. This verifies Google has an indexed representation of the page; it does not supersede the raw initial-response evidence or establish what the planned Live Test will observe.

A non-mutating Search Console **Test live URL** for `/invisalign` completed on August 14, 2026 at 4:42 PM. Google’s Inspection Tool smartphone fetch was successful, crawl and indexing were allowed, the user-declared canonical was `https://upliftdental.com/invisalign`, and the live-test canonical was not yet Google-selected because live tests do not index pages. This demonstrates that Googlebot can fetch the route and observe its JavaScript-updated canonical, while the separate raw-response capture still documents that non-rendered initial HTML defaults to the root canonical.

Authenticated URL Inspection for `https://upliftdental.com/dentist-near-cypress` also reports that the URL is on Google and indexed, is served over HTTPS, and has five valid Review snippet items. Its indexed result is therefore not a generic homepage canonical in Google’s current indexed view.

The Cypress Live URL Test completed on August 14, 2026 at 4:46 PM. Google’s Inspection Tool smartphone fetch was successful, crawling and indexing were allowed, and the live-test user-declared canonical was `https://upliftdental.com/dentist-near-cypress`. As with the Invisalign route, Google-selected canonical is determined only after indexing and is therefore unavailable in a live test. This confirms Googlebot can currently fetch and render the Cypress route, while the raw initial response still carries the generic root canonical prior to JavaScript execution.

Authenticated URL Inspection was initiated for the legacy URL `https://upliftdental.com/invisalign-treatment-garden-grove-ca/` on August 14, 2026. Search Console was still retrieving Google Index data at the most recent check; no request-indexing action was taken.

The indexed Search Console result for that legacy URL reports **not indexed: Excluded by `noindex` tag**. Googlebot smartphone last crawled it on April 14, 2026; the fetch succeeded and crawling was allowed, but indexing was disallowed by a `robots` meta `noindex`. The report names `https://upliftdental.com/` and a legacy fluoride article as referring pages, shows no user-declared canonical, and has no Google-selected canonical. A non-mutating Live URL Test was then initiated to test the current response; no request-indexing action was taken.

The legacy URL Live URL Test completed on August 14, 2026 at 4:48 PM. Google’s Inspection Tool smartphone reports the current URL is available to Google and can be indexed if selected as canonical, with one valid Breadcrumb item. This distinguishes the current renderable fallback from Google’s stored indexed state: the old crawled document was noindexed, while the live fetch is technically indexable and still lacks a topic-to-topic redirect. It confirms the need to handle redirects, noindex behavior, canonicals, and routing together in one reviewed Phase 2 release.

The authenticated **Performance on Search results** report for the visible May 13–August 12, 2026 window reports **346 clicks**, **40,000 impressions**, **0.9% average CTR**, and **26.8 average position**. Branded queries dominate measured clicks (`uplift dental`: 70 clicks; `uplift dental and orthodontics`: 29 clicks). The report also shows substantial unclicked opportunity on relevant local and specialty terms, including `dentist in garden grove` (925 impressions, average position 16.1), `invisalign rossmoor` (225 impressions, position 3.4), `dentist near me` (224 impressions, position 12.8), `braces garden grove ca` (107 impressions, position 4.4), `invisalign in garden grove` (100 impressions, position 22.5), and `emergency dentist garden grove ca` (88 impressions, position 7.0). It additionally reveals impressions for unrelated geographic or provider queries. This is evidence of legacy/topical noise to investigate through a future page-level export and redirect/content-parity plan; it is not evidence to delete or redirect any page without the full export.

The same authenticated report’s **Pages** view confirms a split URL inventory and legacy signal dilution. In the visible three-month window, `https://upliftdental.com/` had 121 clicks / 11,970 impressions while `http://upliftdental.com/` separately had 89 clicks / 2,477 impressions. High-impression legacy or duplicate paths remain visible, including `/about` (58 clicks / 8,471 impressions), `/team/` (11 / 2,628), historical `/dentures` and `/dentures/` variants, `/contact` and `/contact/`, `/teeth-whitening` and `/teeth-whitening/`, `/Home`, `/locations/belmont-shore/`, `/dental-bridges/`, and `/what-are-the-differences-between-dental-insurance-plans/`. Current relevant paths also show opportunity rather than blanket failure: `/orthodontics` 7 clicks / 1,705 impressions (position 16.8), `/dentist-near-cypress` 282 impressions (position 13.4), and `/dentist-near-rossmoor` 667 impressions (position 4.2). This confirms the Phase 2 must use a full URL map, redirects, canonical consistency, content parity, and duplicate-path treatment—not merely blanket noindex removal.

Additional visible Pages rows reinforce the need for item-level review: `/emergency-dentist` has 2 clicks / 753 impressions, `/special-dental-offers-garden-grove/` 2 / 401, the historical insurance-plans article 1 / 4,218, `/contact` 1 / 1,615, `/services` 1 / 1,229, `/dentist-near-long-beach` 1 / 863, and `/insurance-financing` 1 / 847. Meanwhile, older no-click but visible legacy entries include `/dental-cleaning/` (185 impressions), `/membership-plans/` (172), `/financing-and-insurance-information/` (127), `/dental-bonding` (121), `/locations/belmont-shore/` (111), `/dental-bridges/` (109), `/general-dentistry/` (100), `/Home` (92), and `/invisalign-seal-beach` (61). These examples are prioritization evidence only; no mapping decision is implied without the requested 16-month export and clinical-service owner review.

The following item-level evidence still needs collection:

| Needed Search Console evidence | Why it matters |
|---|---|
| Pages export from every Indexing status bucket | Produces the complete legacy inventory and identifies URLs Google has actually seen. |
| Performance → Pages export, last 16 months | Identifies historic URLs with impressions or clicks that require priority preservation. |
| URL Inspection Live Test for `/invisalign`, `/dentist-near-cypress`, and `/invisalign-treatment-garden-grove-ca/` | Confirms the current Googlebot fetch, declared canonical, and renderability. Google-selected canonical is not determined in a non-indexing live test. |
| Sitemap read status after future remediation | Confirms Google can retrieve the replacement canonical inventory. |

## 6. Phase 2 Preconditions — No Changes Made Yet

The owner has now authorized a Search Console inspection session, and the three requested Live URL Tests have been completed. Phase 2 should still not begin until the owner reviews the finalized Phase 1 evidence and the exact redirect/canonical/prerender release design is documented. At that point, the remediation scope should be designed as one coordinated release:

1. Build the complete **topic-to-topic permanent redirect map** from the authoritative URL inventory.
2. Replace raw root canonicals, generic raw titles, and generic raw descriptions with **route-specific initial HTML** through static prerendering or equivalent server-side route output.
3. Move essential JSON-LD from client-only injection into the initial HTML, correct the verified coordinates, and validate against Google’s Rich Results Test.
4. Regenerate sitemap and robots outputs from the same canonical route registry.
5. Run the exact response and Search Console verification checklist before treating the release as complete.

The owner must also confirm the correct historical/current Invisalign designation: the current site uses **Platinum**, while the supplied brief reports that an older meta description used **Diamond**.

## 7. Reconciled Phase 1 Conclusion

The authenticated evidence sharpens, rather than reverses, the raw-response finding. Googlebot’s smartphone **can render** the current JavaScript application: the Live URL Tests for `/invisalign` and `/dentist-near-cypress` fetched successfully, allowed indexing, and observed their route-specific user-declared canonicals. That explains why both current routes remain indexed despite generic initial HTML. It does **not** eliminate the migration defect: the raw server response still gives every tested route the root title, root canonical, and generic homepage content, creating a fragile dependency on client rendering and an unreliable non-Google fetch state.

The legacy behavior is the more urgent control issue. Search Console’s stored legacy Invisalign record remains excluded by a historic noindex, but its current Live URL Test is renderable and indexable if selected as canonical. Together with the 33 raw `200` no-redirect results and the Performance report’s historical URL variants, this means legacy paths are neither uniformly redirected nor uniformly protected from future reindexing. The appropriate remedy is a reviewed, topic-to-topic redirect map delivered with deterministic route HTML and canonical output—not a blanket noindex removal, blanket redirect, or ad hoc sitemap edit.

The Performance Pages view adds a concrete prioritization signal: HTTP and HTTPS homepage variants both accumulated traffic, while historic and slash-variant routes still receive impressions. The first remediation release should therefore prioritize protocol consolidation and redirect mapping for routes with observed search activity, followed by structured prerendering of the retained high-value routes. The generic-query opportunity and unrelated-query noise should be handled only after that technical consolidation, using the full Pages export rather than assumptions about any one query.

## Evidence Sources

1. [Raw production `/invisalign` response](https://upliftdental.com/invisalign)
2. [Raw production `/dentist-near-cypress` response](https://upliftdental.com/dentist-near-cypress)
3. [Raw production legacy Invisalign-treatment response](https://upliftdental.com/invisalign-treatment-garden-grove-ca/)
4. [Production sitemap](https://upliftdental.com/sitemap.xml)
5. [Production robots.txt](https://upliftdental.com/robots.txt)
6. Supplied `manus-seo-brief.md`
