# Search Console Non-Indexed URL Cutover Review

**Scope:** The 12 sitemap-associated URLs shown as non-indexed in the authenticated Page indexing report for `https://upliftdental.com/sitemap.xml`.  
**Production/DNS status:** unchanged.

## Reason Groups

| Search Console reason | Count | Initial cutover interpretation |
|---|---:|---|
| Alternate page with proper canonical tag | 2 | Usually not urgent when the alternate and selected canonical are intentional; individual URLs must still be checked for expected slash/host variants. |
| Discovered – currently not indexed | 8 | Requires individual quality/technical classification. This is not automatically a host-cutover blocker, but important canonical landing pages require remediation or a purposeful redirect/410 decision. |
| Crawled – currently not indexed | 2 | Requires individual review. It can indicate Google quality selection rather than an error, but canonical landing pages must be distinguished from duplicates or intentionally retired content. |

The current report is filtered to the canonical sitemap and shows a last-update label of August 7, 2026. The next review step is to open the authenticated URL inventory for each reason rather than infer urgency from the aggregate category alone.

The alternate-canonical reason drilldown has been opened through the authenticated Search Console table. It is still loading the exact two URLs; no classification is being assumed until the rendered inventory is available.

### Alternate Page with Proper Canonical Tag — 2 URLs

| URL | Last crawled | Initial classification |
|---|---|---|
| `https://upliftdental.com/blog/fluoride-vs-hydroxyapatite-which-is-best-for-your-childs-dental-health` | July 4, 2026 | Requires raw current/staged comparison; not automatically urgent because Google reports a proper canonical. |
| `https://upliftdental.com/blog/cosmetic-dentistry-5-ways-to-transform-your-smile` | June 22, 2026 | Requires raw current/staged comparison; not automatically urgent because Google reports a proper canonical. |

### Discovered – Currently Not Indexed — 8 URLs

All eight entries show **Last crawled: N/A** in the authenticated report.

| URL |
|---|
| `https://upliftdental.com/blog/diet-and-oral-health` |
| `https://upliftdental.com/blog/how-to-keep-your-teeth-healthy-and-white` |
| `https://upliftdental.com/blog/is-invisalign-the-same-as-braces` |
| `https://upliftdental.com/blog/oral-health-tips-for-children` |
| `https://upliftdental.com/blog/smile-makeovers-no-prep-veneers` |
| `https://upliftdental.com/blog/what-to-do-when-you-crack-or-break-a-tooth` |
| `https://upliftdental.com/gallery` |
| `https://upliftdental.com/invisalign` |

### Crawled – Currently Not Indexed — 2 URLs

| URL | Last crawled |
|---|---|
| `https://upliftdental.com/dentist-near-stanton` | April 12, 2026 |
| `https://upliftdental.com/blog` | February 24, 2026 |

## Staged Route Classification

The staged Phase 2 export contains unique route documents for the eight sitemap-member canonical pages in the discovered/crawled groups, except for the `/blog` hub defect described below. The three primary commercial/local pages—`/invisalign`, `/gallery`, and `/dentist-near-stanton`—each return a route-specific `200` response from staging when the SiteGround edge responds normally. The published blog URLs present in the staged sitemap also have generated route documents and correct production-domain self-canonicals.

The two URLs outside the current live and staged sitemap are different cases. `/blog/cosmetic-dentistry-5-ways-to-transform-your-smile` has no published route document and returns a staging `404`; `/blog/what-to-do-when-you-crack-or-break-a-tooth` is a future/unpublished draft in source and also returns staging `404`. Neither should be added to the sitemap. The former should receive an intentional 410 if no truthful equivalent is selected; the latter can remain a 404 or be intentionally retired with a 410 because it is unpublished. Neither is an indexing blocker by itself because Google currently reports both as non-indexed and the current sitemap does not contain either URL.

### Urgent Cutover Blocker — `/blog`

The canonical `/blog` hub is in both the current production and staged sitemap. The generated staging Apache rules currently contain a legacy rule for `/blog` before the canonical route-document rule. It sends `/blog` to `https://upliftdental.com/blog`, which is the same URL after production-domain cutover. This is a **self-redirect / redirect-loop risk** and must be removed before the hosting switch. The canonical `/blog` route-document rule must be allowed to serve its initial HTML directly; `/blog/` may normalize once to `/blog`, but `/blog` itself must return `200` with its own title and self-canonical.

> This is the only confirmed urgent pre-cutover blocker among the 12 URLs. The other sitemap-member pages are ready for recrawl once the Phase 2 host release is live; their present non-indexed classifications reflect the old generic-fallback production behavior and/or Google’s prior crawl state.

## URL-by-URL Cutover Decision

| URL | Search Console reason | Staged Phase 2 treatment | Cutover priority | Recommendation |
|---|---|---|---|---|
| `/blog/fluoride-vs-hydroxyapatite-which-is-best-for-your-childs-dental-health` | Alternate canonical | 200 route document with self-canonical | Normal | Keep the current published route and allow recrawl. No urgent repair. |
| `/blog/cosmetic-dentistry-5-ways-to-transform-your-smile` | Alternate canonical | 404; absent from sitemap and published registry | Low | Do not add to sitemap. Prefer a 410 in the next hardening pass if no truthful replacement is selected. |
| `/blog/diet-and-oral-health` | Discovered | 200 route document with self-canonical | Normal | Keep indexable and let the host-release sitemap refresh prompt discovery. |
| `/blog/how-to-keep-your-teeth-healthy-and-white` | Discovered | 200 route document with self-canonical | Normal | Keep indexable and let the host-release sitemap refresh prompt discovery. |
| `/blog/is-invisalign-the-same-as-braces` | Discovered | 200 route document with self-canonical | Normal | Keep indexable and let the host-release sitemap refresh prompt discovery. |
| `/blog/oral-health-tips-for-children` | Discovered | 200 route document with self-canonical | Normal | Keep indexable and let the host-release sitemap refresh prompt discovery. |
| `/blog/smile-makeovers-no-prep-veneers` | Discovered | Generated canonical route document; staging edge intermittently returned 202 during rapid testing | Normal, but re-test before cutover | Preserve route; run a paced 200/raw-metadata check during the final cutover checklist. |
| `/blog/what-to-do-when-you-crack-or-break-a-tooth` | Discovered | 404; source marks it as future/unpublished; absent from sitemap | Low | Do not publish or add to sitemap. A 404 is defensible; a 410 is optional once formally retired. |
| `/gallery` | Discovered | 200 route document with self-canonical | High-value recrawl target, not a blocker | Keep indexable; include in the post-live URL Inspection batch. |
| `/invisalign` | Discovered | 200 route document with self-canonical; live inspection already says available to Google | High-value recrawl target, not a blocker | Keep indexable; include in the post-live URL Inspection batch. |
| `/dentist-near-stanton` | Crawled | 200 route document with self-canonical | Normal | Keep indexable; no urgent repair. |
| `/blog` | Crawled | **Conflicting legacy 301 before the canonical 200 rule** | **Blocker** | Remove the self-redirect before cutover; then verify `/blog` returns 200 and `/blog/` makes one relative normalization redirect only. |

## Conclusion

The list does **not** reveal a broad pre-cutover indexing crisis. It identifies one implementation defect in the staged package—`/blog`—that must be corrected before DNS cutover. The eight “discovered” URLs are not all failed pages: six are purposeful canonical routes that Google has not yet fetched under the current generic-fallback production architecture, and two are intentionally absent from the staged sitemap because they are not publishable canonical content. The correct response is the tested Phase 2 route-specific release, not artificially requesting indexing for every URL before the new raw behavior is live.

## Staging Remediation Evidence — August 14, 2026

The `/blog` self-redirect was removed from the route registry and the regenerated Apache rules. The refreshed package was deployed to `ragys.sg-host.com` staging through an isolated archive; named backups of the prior `.htaccess`, assets, initial documents, index, 404 document, sitemap, and robots files remain in the staging root. The active staging `/blog` response now returns **200** with the title `Dental Health Blog | Uplift Dental` and the self-canonical `https://upliftdental.com/blog`; `/blog/` produces a single 301 to the temporary host’s no-slash `/blog` form.

Browser-rendered staging validation also confirms that the Blog hub now loads its published article listing after the visibility filter was restricted to explicitly published posts. The prior dated-but-unpublished cracked-tooth draft is no longer eligible for public Blog-hub rendering; it remains absent from the canonical route registry and sitemap.

The refreshed staging Browser view loads the Blog hub successfully after the full package replacement. Because the staging bundles are intentionally served with immutable cache headers, this persistent browser session can retain a previously cached JavaScript bundle while raw HTTP validation is used as the authoritative check for the newly deployed media rewrite. The production hostname will have a separate cache namespace at cutover.
