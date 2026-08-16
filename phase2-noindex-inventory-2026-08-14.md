# Google Search Console Noindex Inventory — August 14, 2026

> **Source:** Authenticated Google Search Console → Page indexing → “Excluded by ‘noindex’ tag,” viewed August 14, 2026. The report shows **46 affected pages**, first detected May 9, 2026. This file is an evidence capture only; it does **not** authorize removal of any `noindex` directive.

| # | URL path shown by Search Console | Last crawled | Initial provenance status |
|---:|---|---|---|
| 1 | `/long-beach` | Jul 19, 2026 | Legacy local-area candidate; pending raw/current template check |
| 2 | `/westminster` | Jul 19, 2026 | Legacy local-area candidate; pending raw/current template check |
| 3 | `/seal-beach` | Jul 18, 2026 | Legacy local-area candidate; pending raw/current template check |
| 4 | `/orthodontic-treatments/` | Jun 14, 2026 | Legacy service candidate; pending raw/current template check |
| 5 | `/*` | Jun 6, 2026 | Malformed wildcard artifact; not a candidate for indexing |
| 6 | `/team/angeliki-blanco/` | Jun 6, 2026 | Legacy team-profile candidate; pending clinical/brand review |
| 7 | `/a-deep-dive-into-dental-hygiene-floss-vs-water-pick/` | Jun 6, 2026 | Legacy article candidate; current equivalent appears under `/blog/` |
| 8 | `/its-too-early-for-braces-or-is-it/` | Jun 6, 2026 | Legacy orthodontic article candidate; pending topic mapping |
| 9 | `/locations/` | Jun 3, 2026 | Legacy location hub candidate; pending topic mapping |
| 10 | `/huntington-beach` | Jun 3, 2026 | Legacy local-area candidate; pending topic mapping |
| 11 | `/tmj-treatment-garden-grove-ca/` | Jun 3, 2026 | Legacy service candidate; pending clinical mapping |
| 12 | `/rossmoor` | Jun 3, 2026 | Legacy local-area candidate; current `/dentist-near-rossmoor` exists |
| 13 | `/garden-grove` | Jun 3, 2026 | Legacy local-area candidate; pending topic mapping |
| 14 | `/dont-let-gum-disease-hold-you-back/` | Jun 3, 2026 | Legacy article candidate; pending topic mapping |
| 15 | `/pediatric-dentistry/` | Jun 3, 2026 | Legacy service candidate; pending clinical mapping |
| 16 | `/dental-x-rays/` | Jun 3, 2026 | Legacy service/article candidate; pending clinical mapping |
| 17 | `/dental-financing/` | Jun 3, 2026 | Legacy financing candidate; pending topic mapping |
| 18 | `/what-to-expect-at-your-first-dental-appointment/` | Jun 3, 2026 | Legacy patient-education article candidate; pending topic mapping |
| 19 | `/how-to-keep-your-teeth-healthy-and-white/` | Jun 3, 2026 | Legacy article candidate; pending topic mapping |
| 20 | `/buena-park` | Jun 2, 2026 | Legacy local-area candidate; pending topic mapping |
| 21 | `/tips-for-optimal-braces-care/` | May 28, 2026 | Legacy orthodontic article candidate; pending topic mapping |
| 22 | `/cypress` | May 28, 2026 | Legacy local-area candidate; current `/dentist-near-cypress` exists |
| 23 | `/los-alamitos` | May 27, 2026 | Legacy local-area candidate; defer content decision until technical release verified |
| 24 | `/same-day-dental-appointments/` | May 26, 2026 | Legacy emergency/access article candidate; pending topic mapping |
| 25 | `/gum-disease-treatment/` | May 26, 2026 | Legacy periodontal service candidate; pending clinical mapping |
| 26 | `/emergency-care/` | May 26, 2026 | Legacy emergency candidate; current emergency route requires mapping decision |
| 27 | `/stanton` | May 25, 2026 | Legacy local-area candidate; pending topic mapping |
| 28 | `/$` | May 25, 2026 | Malformed crawler artifact; not a candidate for indexing |
| 29 | `/2023/10/27/whats-are-the-differences-between-dental-insurance-plans/` | May 25, 2026 | Legacy dated article candidate; current `/blog/` equivalent appears to exist |
| 30 | `/oral-health-tips-for-children/` | May 25, 2026 | Legacy article candidate; pending topic mapping |
| 31 | `/3-tricks-to-make-flossing-with-braces-easier/` | May 22, 2026 | Legacy orthodontic article candidate; pending topic mapping |
| 32 | `/what-happens-during-your-professional-dental-cleaning/` | May 22, 2026 | Legacy patient-education article candidate; pending topic mapping |
| 33 | `/the-compassionate-provider/` | May 21, 2026 | Legacy provider/brand article candidate; pending mapping |
| 34 | `/emergency-dentist-garden-grove/` | May 21, 2026 | Legacy emergency candidate; pending mapping to current emergency content |
| 35 | `/diet-and-oral-health/` | May 20, 2026 | Legacy article candidate; pending topic mapping |
| 36 | `/is-invisalign-the-same-as-braces/` | May 10, 2026 | Legacy orthodontic article candidate; current comparison coverage exists |
| 37 | `/i-want-whiter-teeth/` | May 10, 2026 | Legacy cosmetic article candidate; pending topic mapping |
| 38 | `/are-clear-aligners-better-than-braces/` | May 7, 2026 | Legacy orthodontic article candidate; current comparison coverage exists |
| 39 | `/patient-form/` | May 7, 2026 | Legacy utility/form path; clinical workflow decision required |
| 40 | `/oral-surgery/` | May 6, 2026 | Legacy specialty service candidate; pending clinical mapping |
| 41 | `/porcelain-veneers/` | May 5, 2026 | Legacy cosmetic service candidate; current `/veneers` exists |
| 42 | `/tmj-treatment/` | May 3, 2026 | Legacy service candidate; pending clinical mapping |
| 43 | `/root-canal-treatment/` | Apr 24, 2026 | Legacy specialty service candidate; pending clinical mapping |
| 44 | `/dentist-office-events` | Apr 17, 2026 | Legacy community/events candidate; pending mapping |
| 45 | `/invisalign-treatment-garden-grove-ca/` | Apr 14, 2026 | Legacy Invisalign candidate; current `/invisalign` exists |
| 46 | `/?s={search_term_string}` | Mar 2, 2026 | Search-template artifact; not a candidate for indexing |

## Required Next Evidence

For every path other than the three malformed/search-template artifacts, Phase 2 must establish current raw response, current `X-Robots-Tag`/`meta robots`, current canonical, current-route/topic equivalent, and whether the noindex state comes from an inherited historical page, a current template, or a deliberate utility policy. Redirect targets will remain **proposed only** until the user approves the clinical/service decisions.

## Current Raw-Provenance Result

The deterministic current-response collector tested all **43 non-artifactual** paths in this inventory on August 14, 2026. Every one returned the same present-day raw behavior: **HTTP 200**, no `X-Robots-Tag`, `<meta name="robots" content="index, follow, …">`, root canonical `https://upliftdental.com/`, and the generic homepage title **“Uplift Dental | Dentist in Garden Grove, CA.”**

| Inventory rows | Search Console noindex cause | Current live cause / required treatment |
|---|---|---|
| 1–4, 6–27, 29–46 (43 normal legacy paths) | **Historical legacy exclusion, not a current noindex template.** The observed current response contains no noindex directive, so Search Console’s noindex label reflects the pre-migration/legacy crawl state that Google recorded. | **Active defect:** the current application returns an indexable generic homepage shell for a retired path. Do not remove a noindex tag—none is currently served. Add a user-approved direct 301 to one final canonical topic target or a real 404/410 where no equivalent is approved. |
| 5 (`/*`), 28 (`/$`), 46 (`/?s={search_term_string}`) | Malformed wildcard/search-template crawl artifacts. | Retain non-indexability; do not create content or redirects for literal wildcard/search-template paths. Treat under the canonical-route/robots policy in the coordinated release. |

This establishes the requested cause **per page**: every substantive row shares the same historical-noindex/current-indexable-fallback pattern, while the three explicitly named artifacts are malformed crawler inputs. The raw evidence is stored at `phase2-search-console/noindex-provenance/current-raw-provenance.json`.
