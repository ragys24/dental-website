# Uplift Dental Phase 2 Technical SEO Release — Approval Cover Sheet

**Decision requested:** Review the final SEO-first redirect-map recommendation and approve a staging-only implementation. The user has delegated retired-service routing decisions to the policy of using a direct 301 only for a close, existing topical equivalent and a 410 where no honest equivalent exists. This remains a pre-production package only. **Nothing has been published, deployed, uploaded to staging, or changed in DNS.**

## Executive Decision

The requested standalone HTTP→HTTPS hotfix should **not** ship. `http://upliftdental.com/` already reaches `https://upliftdental.com/` with one 301, so an extra application-level protocol redirect would not recover a missing consolidation and could create legacy-path chains. The coordinated release will, however, correct the separate `http://www` two-hop behavior (`http://www` → `https://www` → `https://`) by pointing it straight to the canonical non-`www` HTTPS URL. [1]

The current `Excluded by noindex` report is historical evidence, not a current build-wide noindex directive. All 43 substantive legacy paths tested now return HTTP 200 with explicit `index, follow`, the generic homepage title, and the root canonical. That is the opposite of the reported historical condition and is the immediate technical defect addressed by this release. [2]

| Release priority | Pre-production decision | Implementation gate |
|---|---|---|
| Protocol and host | Retain the working non-`www` HTTP→HTTPS rule; fix the `http://www` two-hop path inside Phase 2. | One-hop raw-header tests for all host/protocol variants. |
| Legacy URLs | Replace 200 generic-shell behavior with a direct 301 only where a real topical equivalent is approved; use 404/410 otherwise. | User approval of the Ready rows and user decisions on clinical rows. |
| Initial HTML | Generate one physical HTML document per canonical route from a shared registry. | Raw HTML verifies page-specific title, description, canonical, social URL, and schema before JavaScript runs. |
| Structured data | Move JSON-LD into initial HTML and correct all geo fields to `33.7815617, -118.0414966`. | Schema/raw-head parity tests; no self-serving reviews or ratings. |
| Sitemap and robots | Generate both from the same canonical registry. | Every sitemap URL returns canonical 200; no redirects/noindex URLs included. |

## Evidence Delivered

| Requested deliverable | File | What it contains |
|---|---|---|
| Full Page indexing status baseline | `phase2-search-console-pages-status-baseline-2026-08-14.md` | Authenticated status totals and all ten Page indexing reason rows: 75 indexed, 141 not indexed, plus each bucket count. |
| Performance → Pages export, last 16 months | `phase2-search-console/performance-pages-16m/Pages.csv` | Raw authenticated 111-row Page export. |
| 46-page noindex list with cause | `phase2-noindex-inventory-2026-08-14.md` | Full affected-URL inventory plus current raw provenance classification. |
| Proposed redirect map | `phase2-proposed-redirect-map-2026-08-14.md` | Both slash/no-slash variants, final HTTPS no-`www` targets, malformed artifacts, and blocked clinical decisions. |
| Initial-HTML, JSON-LD, sitemap, and robots design | `phase2-route-architecture-2026-08-14.md` | Registry design, static-document build, hosting response contract, and staging/production gates. |

## Final SEO-First Recommendation

The revised redirect map now resolves the legacy clinical/service rows conservatively. It uses direct topic redirects for bridges → crowns, oral surgery → wisdom-teeth removal, root canal → endodontics, gum disease → periodontics, TMJ → the existing TMJ article, orthodontic terms/braces → orthodontics, clear aligners → Invisalign, the former patient form → the active portal, and exact matching articles. It uses **410** for pediatric dentistry, dental X-rays, and the first-appointment information page because the present site does not contain an equivalently focused replacement. This avoids irrelevant homepage or broad-services redirects while retaining helpful legacy signals where a close live equivalent exists. [3]

## What Will Happen Only After Approval

The next step is implementation in an isolated package, followed by SiteGround staging verification. The release will then be held for the user’s review before any production publish or DNS action. In particular, the following are mandatory before production: raw HTML confirmation on representative routes; one-hop redirect tests across host/protocol/slash variants; real 404/410 responses for unmatched paths; schema validation; sitemap/robots parity; preserved CookieYes, GA4, Google Ads, and click-only Invisalign call-conversion behavior; and an independently verified staging result.

The paused SiteGround slider/reviews repair remains separate and will resume only after this approval package is addressed. New Los Alamitos, Seal Beach, and Leisure World content remains out of scope until the technical release is verified. GBP category changes of August 14 remain a separate map-pack attribution factor, not an organic SEO-release result.

## Approval Response Format

You may reply with a short confirmation such as:

> Approve the SEO-first redirect map and proceed to staging only. Return to me with the raw-response and validation evidence before production.

## References

[1]: phase2-protocol-hotfix-assessment-2026-08-14.md "Live protocol assessment and host-variant checks"
[2]: phase2-noindex-inventory-2026-08-14.md "Noindex inventory and current raw provenance resolution"
[3]: phase2-proposed-redirect-map-2026-08-14.md "Redirect-map approval draft"
[4]: phase2-route-architecture-2026-08-14.md "Route-specific initial-HTML release architecture"
