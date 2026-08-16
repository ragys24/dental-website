# Production Sitemap and Search Console Validation — August 14, 2026

## Scope

This activity concerns the **currently live** `https://upliftdental.com` property only. It does not change DNS, hosting, content, SiteGround staging, or any production routing behavior.

## Pre-Submission Evidence

The production sitemap endpoint returned `200 OK`, XML content, and **70** URL entries during the preflight check. In the authenticated Search Console Sitemaps report, the existing canonical sitemap `https://upliftdental.com/sitemap.xml` was recorded as **Success**, originally submitted and last read on August 11, 2026, with 91 discovered pages. The difference between the current 70-entry response and the historical discovery count is expected to be refreshed by the requested re-submission/crawl.

The report also contains a separate `https://www.upliftdental.com/sitemap.xml` submission with 50 errors and a legacy `sitemap_index.xml` that could not be fetched. Neither legacy/non-canonical sitemap will be submitted or modified in this task. The action is limited to the canonical production sitemap URL.

## Submission Request

On August 14, 2026, the canonical production sitemap `https://upliftdental.com/sitemap.xml` was entered into the authenticated Search Console submission field and submitted. Search Console displayed its **Submitting Sitemap** progress state. The current action is a re-submission of the already known canonical sitemap, intended to prompt a refreshed processing cycle for the current 70-entry production response; it does not alter the production endpoint or any sitemap content.

## Submission Result

Search Console confirmed **“Sitemap submitted successfully.”** The canonical sitemap now shows an August 14, 2026 submission and last-read date, 70 discovered pages, and a current report state of **27 errors**. This result reflects the refreshed crawl of the current live sitemap; the detailed errors must be reviewed before any host cutover or production Phase 2 deployment. The separate `www` sitemap remains at 50 errors and the obsolete `sitemap_index.xml` remains unfetchable; neither was resubmitted.

The sitemap-filtered Page indexing view currently reports **73 indexed** and **12 not indexed** URLs, with three substantive non-indexing reasons: two alternate pages with proper canonical tags, eight discovered but not currently indexed URLs, and two crawled but not currently indexed URLs. The report’s own last-update label is August 7, 2026, so these page-level counts should not be treated as a same-minute explanation of the newly refreshed August 14 sitemap status. They are nevertheless the relevant baseline for post-cutover comparison.

## URL Inspection Access

An attempt to open a constructed direct URL Inspection deep-link returned a Google 404, so no inspection result was inferred from that failed navigation. The live inspection will instead be initiated through the authenticated Search Console interface to avoid relying on an unsupported deep-link format.

The supported URL Inspection control is now open in the authenticated property and exposes saved inspection targets for the priority production URLs, including `/invisalign`, `/dentist-near-cypress`, and the legacy Invisalign URL. The next action is to select each target from that interface and capture the actual inspection result.

## Cypress Inspection Baseline

The authenticated cached inspection for `https://upliftdental.com/dentist-near-cypress` reports that the URL is on Google, page indexing is indexed, HTTPS is served, and five review-snippet items are valid. A Search Console **Test live URL** request was then started for the same production URL. It remains in progress at the time of this record; no request-indexing action was made.

The live test completed on August 14, 2026 at 7:06 PM. Search Console reported that the Cypress URL is **available to Google** and **can be indexed**. The live-test panel reported no enhancements, which is not a rejection or error; it is a live-test result distinct from the cached inspection’s five valid review-snippet items. No request-indexing action was made.

## Invisalign Inspection Baseline

The authenticated cached inspection for `https://upliftdental.com/invisalign` reports that the URL is on Google, page indexing is indexed, HTTPS is served, one breadcrumb item is valid, and five review-snippet items are valid. A live URL test is the next validation action; no request-indexing action has been made.

The live test completed on August 14, 2026 at 7:08 PM. Search Console reported that the Invisalign URL is **available to Google** and **can be indexed**. The live-test panel reported no enhancements; this is a live-test result and does not negate the cached breadcrumb and review-snippet validations. No request-indexing action was made.

## Verified Hosting-Cutover Reality

The current production site is **not yet technically identical** to the approved SiteGround Phase 2 staging release. Fresh raw production checks show that `/invisalign` returns `200 OK` with the generic root title and canonical `https://upliftdental.com/`. The same generic `200 OK` fallback is currently returned for `/dentist-near-cypress`, the legacy `/invisalign-treatment-garden-grove-ca/`, the retired `/pediatric-dentistry/`, and an intentionally unknown test URL.

The SiteGround staging package, by contrast, serves route-specific raw initial documents and correctly returns a direct 301 for the approved legacy Invisalign route, a 410 for the retired pediatric route, and a true 404 for an unknown URL. The host change is therefore not a “same site, new server” event unless the user elects to preserve the present generic-fallback behavior. The SEO-safe recommendation is to treat the cutover as the previously approved Phase 2 technical release and to keep the stronger staging behavior.

| Cutover control | Required production condition |
|---|---|
| Canonical documents | Every canonical URL must return 200 with its own raw title, description, self-canonical, and initial JSON-LD. |
| Legacy/retired/unknown paths | Preserve direct topic-equivalent 301s, intentional 410s, and genuine 404s; never send all paths to the root shell. |
| Sitemap and crawler controls | Serve the 70-entry canonical sitemap and registry-derived robots rules; remove the staging-only noindex response header only on the live host. |
| Host/protocol | Confirm direct `http` and `www` variants resolve in one hop to the final `https://upliftdental.com` destination. |
| Functional parity | Verify images, comparison sliders, CookieYes behavior, consent-gated Google Reviews fallback, CareStack links, GA4, Google Ads, and accessibility paths. |
| Monitoring | Re-run raw production checks immediately after the DNS change, then monitor Search Console indexing and 404/redirect findings against this baseline. |
