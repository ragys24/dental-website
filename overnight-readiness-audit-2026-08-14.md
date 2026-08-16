# Overnight Production-Readiness Audit — August 14, 2026

## Scope and Boundaries

This audit was authorized as a code, SEO, tracking, link, accessibility, and SiteGround-staging readiness pass. DNS, paid-account settings, real mobile calls, production publication, and Google Business Profile changes remain outside this pass unless separately authorized.

## Findings Logged So Far

| Area | Evidence | Status |
|---|---|---|
| Google tags | Main source contains GA4 `G-PW2PJ3LD69` and Google Ads `AW-11229085573`; the only explicit Google Ads conversion label found in source is the Invisalign call label `AW-11229085573/4qSzCJ6P0uAcEIX_uOop`. | Account-side mapping for the five supplied action IDs remains pending browser/account access. |
| Success-only leads | Contact and Hero Quick Start dispatch `trackVerifiedLead()` only after the Web3Forms response reports success; the controlled Contact test previously queued one `generate_lead` client-side. | Account-side GA4 receipt still needs a correctly dated historical check. |
| Legacy media | Five source files retain legacy `https://upliftdental.com/wp-content/uploads/...` dependencies. Representative URLs now return HTTP 404: `2025/03/pain.jpg`, `2025/02/Uplift-Dental-1.png`, and `2024/10/uplift-dental-garden-grove-team.jpg`. | Must replace, mirror, or safely remove before any SiteGround cutover. |
| Plain HTTP | `client/src/lib/blog/oral-health.ts` contains a literal `http://upliftdental.com/` link. | Replace with the canonical HTTPS site URL. |
| Internal service URLs | Several blog articles use old but registered slugs such as `/dental-cleaning/` and `/root-canal-treatment/`; the Phase 2 registry has direct targets for these paths. | Rewrite internal links to their canonical destinations where straightforward, avoiding unnecessary redirect hops. |

## Evidence URLs

The legacy media findings were confirmed through the current production host URLs listed above. They are retained here because the WordPress upload paths no longer serve image responses after the host migration.

## Approved Fallback-Media Set

The two reviewed user-authorized clinical-environment images, `img_2495-web.webp` and `img_2496-web.webp`, are authentic Uplift office photographs. They depict routine care in the practice and are suitable only as neutral practice-environment imagery, not as outcome evidence or a representation of any particular procedure. The remaining replacement set will use the established authentic office, recovered periodontal, and recovered root-canal editorial assets, with descriptive alt text and no unsupported treatment claims.

## Local Runtime Verification

The repaired development preview was opened on the published senior-oral-health article. Direct DOM inspection found **zero** rendered images whose source includes `wp-content/uploads`, **zero** remaining `/dental-cleaning/` links, and four canonical `/teeth-cleaning` links. The article body remained present with 6,021 characters of visible text. This confirms that central cleanup removes retired inline WordPress media at render time while preserving the substantive article and its internal navigation.

## SiteGround Staging Synchronization and Acceptance

The verified static package was promoted to `ragys.sg-host.com` only. The remote promotion used an isolated release directory, then retained the prior active file set in the named `.rollback-20260815-overnight-readiness` folder before replacing the active static package. The existing `/emergency/` staging subdirectory was explicitly verified and preserved. Additional named backups of `.htaccess` and `deployment-integrity.json` were retained during the subsequent private-route-rule checks. DNS, the live Manus deployment, Search Console, GBP, Google Ads, and GA4 account settings were not changed.

| Check | Result |
|---|---|
| `/invisalign` | HTTP 200 with staging `X-Robots-Tag: noindex, nofollow`, the expected canonical, GA4 `G-PW2PJ3LD69`, and Google Ads `AW-11229085573`. |
| `/dentist-near-long-beach` | HTTP 200 with its route-specific title and canonical. |
| `/blog` | HTTP 200 with the canonical Blog title; no self-redirect. |
| `/dental-cleaning/` | Direct HTTP 301 to `https://upliftdental.com/teeth-cleaning`. |
| `/root-canal-treatment/` | Direct HTTP 301 to `https://upliftdental.com/endodontics`. |
| `/pediatric-dentistry/` | HTTP 410 as an approved retired topic. |
| Unknown route | HTTP 404. |
| `robots.txt` / sitemap | Private route documents are disallowed and the canonical sitemap has 70 URLs. |
| Media export | 66 remote asset URL replacements, 75 local media files, and zero unmirrored export failures. |

The staging browser’s post-hydration DOM on `/invisalign` contained 3,557 characters of main content, the two required tag IDs, four rendered images, no rendered legacy WordPress upload images, and no retained loading state.

## Private Route-Document Isolation — Completed

The generated route HTML now lives in the sibling non-public SiteGround directory `/home/customer/www/ragys.sg-host.com/route-documents`, rather than under `public_html`. Apache maps canonical routes internally to a guarded `route-document.php` dispatcher. The dispatcher accepts only Apache-marked internal rewrites, validates the allowed document filename format, resolves the candidate path under the non-public store, and returns the document only after those checks pass.

| Direct request check | Result |
|---|---|
| `/invisalign` | HTTP 200 with the intended route-specific title, canonical, and staging noindex response. |
| Published blog article | HTTP 200 with its intended route-specific title and canonical. |
| `/_route-documents/invisalign.html` | HTTP 404. The former public directory no longer exists under `public_html`. |
| `/route-document.php?doc=invisalign.html` | HTTP 404. Direct dispatcher requests are rejected. |
| `/route-document.php` | HTTP 404. |

The promotion preserved `/emergency/` and retained the former public route-document tree, active Apache rule, dispatcher, and integrity manifest in the named `.rollback-20260815-route-document-isolation` snapshot. A final TypeScript check, production build, static export, and staging raw-response check passed. DNS, the live Manus deployment, Search Console, GBP, Google Ads, and GA4 account settings remain unchanged.
