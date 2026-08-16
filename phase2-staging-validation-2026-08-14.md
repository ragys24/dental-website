# Phase 2 Technical SEO — SiteGround Staging Validation

**Environment:** `https://ragys.sg-host.com` only  
**Validation date:** August 14, 2026  
**Production/DNS status:** unchanged  
**Release status:** staging implementation complete; production remains explicitly held for approval.

## Scope Delivered to Staging

The Phase 2 package now uses one canonical route registry to generate **70 route-specific initial HTML documents**, the sitemap, robots directives, JSON-LD, redirect data, retired-topic data, and Apache rules. Each canonical document contains its final title, meta description, self-referencing canonical, social metadata, and initial JSON-LD before JavaScript runs. React remains responsible for interaction after hydration rather than route identity.

The shared geographic values are now **33.7815617, -118.0414966** in generated geo meta tags and the root LocalBusiness `GeoCoordinates`. The production-domain canonical is retained inside the staging documents, while the staging hostname sends `X-Robots-Tag: noindex, nofollow` so the test environment does not compete with production.

| Area | Staging implementation |
|---|---|
| Canonical pages | Generated static documents in a private route-document store, served through Apache rewrite rules at their clean canonical paths. |
| Legacy URLs | Approved direct 301 rules target the final HTTPS canonical URL; no homepage catch-all redirects. |
| Retired topics | Approved non-equivalent topics return 410. |
| Unknown URLs | Return a genuine 404 document rather than the homepage shell. |
| Structured data | Generated in initial HTML; client-side `useEffect` schema injection is no longer authoritative. |
| Sitemap and robots | Generated from the same registry; sitemap contains 70 canonical URLs. |
| Crawl safeguards | Staging-wide `noindex, nofollow`; private route-document directory is absent from sitemap and disallowed in `robots.txt`. |
| Host handling | The Apache artifact includes direct `www.upliftdental.com` → `https://upliftdental.com` consolidation for the final hosting layer. |

## Raw Staging Evidence

Individual paced HTTPS checks returned the following expected results. Brief SSL connection timeouts occurred during rapid repeated requests to the SiteGround staging edge; individual retried requests were successful and the positive/negative route checks below were captured before any production action.

| Request | Expected | Observed on staging |
|---|---|---|
| `/invisalign` | 200 initial route document | **200** with `X-Robots-Tag: noindex, nofollow`; title `Invisalign in Garden Grove | Uplift Dental & Orthodontics`; canonical `https://upliftdental.com/invisalign`; geo position `33.7815617;-118.0414966`; initial JSON-LD present. |
| `/blog/a-deep-dive-into-dental-hygiene-floss-vs-water-pick` | 200 initial article document | **200** in the focused route test; later high-frequency retry hit a transient SSL connection timeout. |
| `/invisalign-treatment-garden-grove-ca/` | Direct equivalent redirect | **301** directly to `https://upliftdental.com/invisalign`. |
| `/pediatric-dentistry/` | Retired, no equivalent | **410** with staging noindex header. |
| `/phase2-unmapped-test` | Unknown route | **404** with staging noindex header. |
| `/?s=test` | Search-template artifact | **410** with staging noindex header. |
| `/sitemap.xml` | Generated sitemap | **200**, XML, 12,113 bytes. |
| `/robots.txt` | Generated crawler rules | **200**, includes `Disallow: /_route-documents/` and the canonical production sitemap directive. |

> The `www.upliftdental.com` host-header simulation against `ragys.sg-host.com` returned a virtual-host-level 404 before the staging document-root rules could run, because the temporary staging host is not configured as the live `www` domain. The finalized Apache package nevertheless includes the direct canonical-host rule and must be verified on the live host after any future production deployment.

## Staging Rollback and Integrity

The active staging release has named rollback files and directories, including the pre-Phase-2 `.htaccess`, `index.html`, crawler files, media/assets, and the transient first-generation route-document directories. The approved `/emergency/` staging subdirectory was preserved. The verified export contains 70 route documents, 67 mirrored media files, active CookieYes, GA4, Google Ads, and CareStack handoff markers.

No change was made to `upliftdental.com`, `www.upliftdental.com`, DNS records, Google Search Console settings, sitemap submission, or the live Manus deployment.

## Pre-Cutover Canonical-Page Readiness Update — August 14, 2026

The authenticated Search Console review identified a staging-only routing conflict for the canonical `/blog` hub. A normalized legacy alias was emitting an external redirect to `https://upliftdental.com/blog` before the generated canonical route-document rule. The conflict has been removed, rebuilt, and applied to staging with a named `.htaccess` rollback copy. `/blog` now returns **200** with the title `Dental Health Blog | Uplift Dental`, its own production-domain canonical, initial JSON-LD, and staging noindex protection; `/blog/` makes one normalization redirect to the temporary host’s no-slash path.

The same inspection found that the Blog hub’s prior visibility helper could render a scheduled-but-unpublished cracked-tooth draft after its scheduled date, even though no matching canonical document was generated. The public hub now uses explicitly published posts only. Browser-rendered staging validation confirms the cracked-tooth link is absent and the five reviewed published articles remain internally linked from the Blog hub.

Finally, the SiteGround exporter was expanded to mirror every remaining `/manus-storage/` dependency, including the two new editorial Blog images, authentic reception images, clinical-room images, and outreach images. The regenerated package contains 75 locally mirrored media files and no deployable `manus-storage` reference. The eight newly mapped media files each returned **200** from `ragys.sg-host.com` after the isolated, rollback-safe deployment.

| Staging check | Result |
|---|---|
| `/blog` plus five reviewed published article routes, `/gallery`, `/invisalign` | 200; route-specific production canonical; initial static JSON-LD; staging `noindex, nofollow`. |
| `/blog/` | One 301 to `https://ragys.sg-host.com/blog`; no production-host self redirect. |
| Sitemap membership | Blog hub, five published articles, Gallery, and Invisalign all present in the 70-URL generated sitemap. |
| Blog-hub internal links | All five reviewed published article links present; unpublished cracked-tooth link absent. |
| New locally mirrored media | Eight of eight return 200; export-wide scan finds no remaining `/manus-storage/` dependency. |
| Safeguards | Staging emergency directory, local media directory, and named rollback copies preserved; production/DNS unchanged. |

## Production Release Gates

The staging package is ready for a production decision only after the following gates are consciously accepted. The production rollout itself has **not** been performed.

| Gate | Required before production |
|---|---|
| User approval | Explicit approval to deploy the already-staged Phase 2 package to the live host. |
| Hosting parity | Confirm the live hosting layer supports the generated Apache `.htaccess` rules and has the production domain attached. |
| Raw live checks | Re-run the title/canonical/schema/coordinates, 301, 410, 404, sitemap, robots, and `www` one-hop tests on `upliftdental.com`. |
| Indexing follow-up | Submit the production sitemap and request targeted Search Console validation only after the live raw-response tests pass. |
| Attribution discipline | Keep organic release timing separate from the August 14 GBP category change; do not add new local-area pages until the technical release is verified. |
