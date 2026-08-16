# Post-Migration SEO, Uptime, and Performance Audit

**Site:** [upliftdental.com](https://upliftdental.com)  
**Audit date:** August 16, 2026  
**Deployment:** Recovered latest Uplift Dental release on SiteGround

## Executive conclusion

The complete recovered Uplift Dental version is now live on SiteGround. The deployment restored the previously absent Patient Portal, Our Specialists, Community Outreach, Dentures, and related current-version pages. The public site no longer requires a Manus runtime or Manus-hosted first-party media. The emergency subdomain is also SiteGround-hosted and redirects to the canonical emergency-dentistry page.

The only actionable technical SEO defect identified during the audit was a sitemap `lastmod` formatting problem. All 27 date-time values were converted to valid ISO date-only values, while all 70 canonical sitemap URLs were retained. Google Search Console then fetched the canonical sitemap successfully and reported **70 discovered pages**. Google permits omission of the time portion in W3C date formatting, and its sitemap guidance expects `lastmod` to reflect significant page updates.[1] [2]

| Audit area | Verified result | Status |
|---|---|---|
| Recovered latest release | Latest supplied Uplift Dental source deployed through an atomic SiteGround swap | Pass |
| Restored current-version pages | Patient Portal, Our Specialists, Community Outreach, and Dentures rendered on the public canonical host | Pass |
| Canonical sitemap | 70 URL entries; Google Search Console status **Success** after fresh submission | Pass |
| Sitemap date format | 27 timestamp values normalized to valid `YYYY-MM-DD`; zero invalid time-bearing values remain | Pass |
| Legacy SEO continuity | Existing legacy-route rules remain in the release; all prior sitemap paths were accounted for as canonical, redirected, or deliberate retirement states during packaging | Pass |
| HTTPS | Search Console reports 0 non-HTTPS URLs, 23 HTTPS URLs, and no critical HTTPS issue in its 90-day view | Pass |
| Emergency hostname | `emergency.upliftdental.com` resolves to the canonical emergency-dentistry page | Pass |
| Temporary deployment access | Both temporary SiteGround SSH keys were deleted on SiteGround and locally after validation | Pass |

## Release and rollback record

The recovered release was staged, checksum-verified, and promoted with an atomic document-root swap. The former live files remain on SiteGround as named rollback directories, and named SiteGround restore points were created before replacement. The recovered source and deployment evidence are retained on the private recovery branch `recovered-latest-siteground-20260816`.

| Safeguard | Verified location or identifier |
|---|---|
| Current release source | Private branch `recovered-latest-siteground-20260816` |
| Prior active-file rollback | `public_html.pre-recovered-latest-20260816-0639` |
| Prior route-document rollback | `route-documents.pre-recovered-latest-20260816-0639` |
| SiteGround restore point | `Pre-Recovered-Latest-Uplift-20260816` |
| Recovered release SHA-256 | `44df926a6b84cdbcbf47643caa41ce7f95eccc62b72a36d5491eb27b0fe4cf90` |

## SEO and indexing findings

The canonical `https://upliftdental.com/sitemap.xml` submission was initially carrying 27 invalid-date errors because some `lastmod` timestamps omitted a timezone. The URL inventory itself was valid. After normalizing the timestamp values and resubmitting, Search Console listed the canonical sitemap as **Success**, with the sitemap submitted and last read on August 15, 2026 and **70 discovered pages**.

Search Console’s Page Indexing view is still historical at the time of review: it shows **73 indexed** and **12 not indexed** URLs, with the page-level data last updated before this recovery release. The 12 exclusions are categorized as 8 *Discovered – currently not indexed*, 2 *Crawled – currently not indexed*, and 2 *Alternate page with proper canonical tag*. None represents a current sitemap-fetch failure. Google describes the Page Indexing report as a diagnostic view of why URLs may not be served in Search; the report should be rechecked after Google processes the fresh sitemap crawl.[3]

Two older Search Console submissions remain in the property: `https://www.upliftdental.com/sitemap.xml` and the historic `https://upliftdental.com/sitemap_index.xml`. They are not referenced by the current canonical `robots.txt` directive. They should be kept under observation through the first successful recrawl cycle; removing only the obsolete submission records later may reduce dashboard noise, but is not required for present crawlability.

## Uptime, delivery, and performance findings

A live browser verification loaded the restored Patient Portal, Our Specialists, and Community Outreach routes on the canonical domain. The emergency subdomain resolved onward to `https://upliftdental.com/emergency-dentist`. The sitemap and robots files served successfully from the SiteGround release, and the obsolete one-time deployment-runner path returned 404.

The sandbox’s non-browser probe received SiteGround HTTP 202 edge CAPTCHA responses rather than website content. Its approximately 2.9–3.3 second response timings measure the challenge interstitial, not the published pages, so they are **not used as website-performance metrics**. The authenticated browser and Google Search Console both accessed the production content successfully. This behavior should be monitored to ensure approved search crawlers continue to receive normal access.

Google’s Core Web Vitals report has insufficient Chrome UX Report data for both mobile and desktop in the last 90 days, and PageSpeed Insights supplied no usable field-data score in the audit session. Therefore, there is not enough real-user data yet to establish a reliable Core Web Vitals baseline. The HTTPS report is positive, with no reported non-HTTPS URLs or critical issues.

| Performance or availability signal | Result | Interpretation |
|---|---|---|
| Public browser route checks | Recovered pages rendered successfully | Positive post-cutover availability evidence |
| Google canonical sitemap fetch | Successful; 70 discovered URLs | Google can access the canonical crawl file |
| Search Console HTTPS | 0 non-HTTPS URLs; no issues detected | Secure-delivery status is healthy |
| Core Web Vitals field data | Insufficient usage data for mobile and desktop | No field-performance baseline is available yet |
| Sandbox synthetic timings | HTTP 202 SiteGround CAPTCHA response | Excluded from page-speed assessment |

## Two-week operational guidance

Leave the DNS, sitemap URL inventory, and release files unchanged while Google processes the fresh sitemap submission. Check Search Console after 7 and 14 days for a newer Page Indexing update and for any change to the 12 historical exclusions. A first-party form submission should be performed by the practice to validate real-world lead delivery; no synthetic appointment request was sent during the audit to avoid creating a false patient inquiry.

Use a third-party uptime monitor from a non-SiteGround, non-sandbox location to establish a 14-day availability record. Once traffic rises enough for Chrome UX Report coverage, re-run PageSpeed Insights and Search Console Core Web Vitals to establish a real-user performance baseline. Do not judge production page speed from the challenge-only sandbox probe.

## References

[1] [Google Search Central, *Build and Submit a Sitemap*](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)  
[2] [Google Search Central Blog, *Using the `lastmod` attribute*](https://developers.google.com/search/blog/2006/04/using-lastmod-attribute)  
[3] [Google Search Console Help, *Page Indexing report*](https://support.google.com/webmasters/answer/7440203)
