# Phase 2 Proposed Redirect Map — Approval Draft

**Status:** Pre-production design only. This document does not change Manus hosting, SiteGround staging, DNS, robots, sitemap, or production responses.

## Scope and Rule Order

This is a reconciliation of the authenticated **16-month Performance → Pages** export (111 rows) and the authenticated **Page indexing → Excluded by `noindex` tag** detail list (46 rows). Current raw testing establishes that the substantive legacy paths now return an indexable generic homepage shell rather than a live noindex response. The coordinated release must replace that fallback with either one permanent topic-to-topic redirect or a real 404/410 response. [1] [2]

All final destinations below are canonical **HTTPS, non-`www`, no-trailing-slash** URLs. Each source written as `/path` means the exact deployment rule must cover both `/path` and `/path/`, except extension/query artifacts that are listed separately. `HTTP` and `www` must also be resolved straight to the listed final HTTPS target—not first to an HTTPS legacy URL—to avoid redirect chains.

| Decision label | Meaning in this draft | Release behavior |
|---|---|---|
| **Ready** | A non-clinical or exact topical equivalent exists in the present canonical-route registry. | Implement as a direct 301 once this approval package is accepted. |
| **SEO-first resolution** | The user delegated the remaining retired-service decisions to an SEO-first policy: direct 301 only where an existing canonical route is a demonstrably close topic match; use 410 where no honest equivalent exists. | Implement only after final pre-production release approval and staging validation. |
| **410 / remain non-indexable** | The input is malformed, a query template, or has no honest topic equivalent. | Return 410 where configured; do not redirect to the homepage. |
| **Canonical normalization** | A row is an existing canonical page under another protocol, host, or trailing-slash spelling. | Normalize in one hop to the canonical HTTPS URL. |

## Host, Protocol, and Slash Rules

The existing production edge already redirects `http://upliftdental.com/` to HTTPS in one hop. It should remain in place. A fresh host-variant check found one distinct, release-scoped issue: `http://www.upliftdental.com/` currently takes two hops (`http://www` → `https://www` → `https://upliftdental.com/`). Phase 2 should collapse that legacy `www` HTTP variant directly to the non-`www` HTTPS target while it installs the approved map. This is host consolidation within the coordinated release—not a standalone HTTP-to-HTTPS hotfix. The production and SiteGround configurations must use this order: first apply approved legacy-specific redirects directly to their final HTTPS targets; then apply the global host/protocol rule; then normalize a trailing slash only for an existing canonical page. This ordering avoids `http://old-path → https://old-path → https://new-path` chains. [3]

| Source class | Final response | Notes |
|---|---|---|
| `http://upliftdental.com/` | `301 → https://upliftdental.com/` | Existing one-hop root behavior; retain and test. |
| `http://www.upliftdental.com/` | `301 → https://upliftdental.com/` | Change within the coordinated release; current live behavior unnecessarily passes through `https://www`. |
| `http://{www.}upliftdental.com/<approved-legacy-path>` | `301 → https://upliftdental.com/<final-target>` | The individual legacy rule must run before the generic host/protocol rule. |
| `https://www.upliftdental.com/<canonical-path>` | `301 → https://upliftdental.com/<canonical-path>` | Collapse `www` without an intermediate URL. |
| `https://upliftdental.com/<canonical-path>/` | `301 → https://upliftdental.com/<canonical-path>` | Do not apply to `/` or real file extensions. |
| Unknown ordinary path | Real `404`, `noindex`, and no root canonical | Never return the generic homepage shell with HTTP 200. |

## Ready: Technical, Local, Utility, and Exact-Topic Mappings

| Legacy source(s), both slash variants | Final canonical path | Basis | Status |
|---|---|---|---|
| `/Home`, `/home`, `/index.html` | `/` | Duplicate homepage spellings. | Ready |
| `/team`, `/team/angeliki-blanco` | `/about` | Current team/about content is the nearest factual equivalent; do not retain an obsolete individual staff profile. | Ready |
| `/results` | `/gallery` | Current gallery contains the authorized visual work and practice imagery. | Ready |
| `/connect`, `/refer-a-patient` | `/contact` | Contact/office communication intent. | Ready |
| `/dentist-office-events` | `/community-outreach` | Exact current community-events equivalent. | Ready |
| `/top-notch-technology` | `/about` | Current practice/about page is the factual practice-information destination. | Ready |
| `/dental-financing`, `/financing-and-insurance-information` | `/insurance-financing` | Exact active finance/insurance destination. | Ready |
| `/membership-plans` | `/membership-plan` | Canonical current membership route. | Ready |
| `/special-dental-offers-garden-grove`, `/announcements` | `/special-offers` | Current offers destination. | Ready |
| `/terms-and-conditions-of-use` | `/terms-of-service` | Canonical legal page. | Ready |
| `/locations/belmont-shore` | `/dentist-near-long-beach` | Belmont Shore is a Long Beach neighborhood and the current Long Beach page is the closest local destination. | Ready |
| `/long-beach`, `/locations/long-beach` | `/dentist-near-long-beach` | Current local equivalent exists. | Ready |
| `/westminster` | `/dentist-near-westminster` | Current local equivalent exists. | Ready |
| `/seal-beach`, `/locations/seal-beach` | `/dentist-near-seal-beach` | Current local equivalent exists. | Ready |
| `/rossmoor`, `/locations/rossmoor` | `/dentist-near-rossmoor` | Current local equivalent exists; the destination is the strongest location page in the current export. | Ready |
| `/garden-grove` | `/dentist-near-garden-grove` | Current local equivalent exists. | Ready |
| `/huntington-beach` | `/dentist-near-huntington-beach` | Current local equivalent exists. | Ready |
| `/cypress` | `/dentist-near-cypress` | Current local equivalent exists. | Ready |
| `/los-alamitos` | `/dentist-near-los-alamitos` | Existing route only; this does **not** add a new local page. | Ready |
| `/buena-park` | `/dentist-near-buena-park` | Current local equivalent exists. | Ready |
| `/stanton` | `/dentist-near-stanton` | Current local equivalent exists. | Ready |
| `/dental-cleaning` | `/teeth-cleaning` | Exact active cleaning service equivalent. | Ready |
| `/porcelain-veneers` | `/veneers` | Exact active veneer service equivalent. | Ready |
| `/invisalign-treatment-garden-grove-ca` | `/invisalign` | Exact active Invisalign consultation page. | Ready |
| `/emergency-care`, `/emergency-dentist-garden-grove`, `/same-day-dental-appointments` | `/emergency-dentist` | Active emergency-dental route matches the visitor intent. | Ready |
| `/dental-bonding`, `/dental-fillings`, `/dental-crowns`, `/dentures`, `/dental-implants`, `/teeth-whitening`, `/veneers`, `/invisalign-seal-beach`, `/smile-assessment`, `/patient-portal`, `/our-specialists`, `/privacy-policy`, `/accessibility`, `/terms-of-service` | Same named no-slash canonical route | Existing canonical route with a slash-host variant in the Performance export. | Canonical normalization |
| `/contact`, `/services`, `/about`, `/periodontics`, `/endodontics`, `/orthodontics`, `/emergency-dentist`, `/wisdom-teeth-removal`, `/membership-plan`, `/insurance-financing`, `/community-outreach`, all current `/dentist-near-*` routes, and all current `/blog/<slug>` routes | Same named no-slash canonical route | Existing canonical route appearing directly in the Performance export. | No content redirect; host/slash normalization only |

### Legacy Blog Mapping

The following legacy article slugs have same-topic active articles. Each is a direct 301 to its matching `/blog/` canonical route. This preserves a topical destination rather than directing article visitors to the blog index.

| Legacy source(s), both slash variants | Final canonical path | Status |
|---|---|---|
| `/a-deep-dive-into-dental-hygiene-floss-vs-water-pick` | `/blog/a-deep-dive-into-dental-hygiene-floss-vs-water-pick` | Ready |
| `/its-too-early-for-braces-or-is-it` | `/blog/its-too-early-for-braces-or-is-it` | Ready |
| `/get-started-the-benefits-of-early-intervention-with-invisalign` | `/blog/get-started-the-benefits-of-early-intervention-with-invisalign` | Ready |
| `/what-are-the-differences-between-dental-insurance-plans`, `/2023/10/27/whats-are-the-differences-between-dental-insurance-plans` | `/blog/what-are-the-differences-between-dental-insurance-plans` | Ready |
| `/oral-health-tips-for-children` | `/blog/oral-health-tips-for-children` | Ready |
| `/3-tricks-to-make-flossing-with-braces-easier` | `/blog/3-tricks-to-make-flossing-with-braces-easier` | Ready |
| `/what-happens-during-your-professional-dental-cleaning` | `/blog/what-happens-during-your-professional-dental-cleaning` | Ready |
| `/the-compassionate-provider` | `/blog/the-compassionate-provider` | Ready |
| `/diet-and-oral-health` | `/blog/diet-and-oral-health` | Ready |
| `/is-invisalign-the-same-as-braces` | `/blog/is-invisalign-the-same-as-braces` | Ready |
| `/i-want-whiter-teeth` | `/blog/i-want-whiter-teeth` | Ready |
| `/are-clear-aligners-better-than-braces` | `/blog/are-clear-aligners-better-than-braces` | Ready |
| `/tips-for-optimal-braces-care` | `/blog/tips-for-optimal-braces-care` | Ready |
| `/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups` | `/blog/oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups` | Ready |
| `/invisalign-complete-guide-2026` | `/blog/the-complete-guide-to-invisalign-what-to-expect-from-start-to-finish` | Ready — same education intent, review during acceptance test. |
| `/in-office-teeth-whitening-garden-grove` | `/teeth-whitening` | Ready — active service route is more direct than an unmatched article. |
| `/denti-cal-dentist-near-westminster-garden-grove` | `/insurance-financing` | Ready — current verified Denti-Cal/insurance information destination. |

## SEO-First Resolutions: Retired Clinical and Service Pages

The user authorized an SEO-first decision standard for the remaining rows. These selections are routing decisions only; they do not create, expand, or substantiate clinical offerings. A 301 is used only where the existing canonical page is a close topical match; a 410 is used where preserving the old query intent would require a new service/content page that is not part of this technical release.

| Legacy source(s), both slash variants | Final response | SEO rationale | Status |
|---|---|---|---|
| `/dental-bridges` | `301 → /dental-crowns` | The current crowns route explicitly covers crowns and bridges; this is the closest active restorative-service equivalent. | SEO-first resolution |
| `/oral-surgery` | `301 → /wisdom-teeth-removal` | The active surgical-extractions/wisdom-teeth route is the closest current patient-facing oral-surgery topic. | SEO-first resolution |
| `/root-canal-treatment` | `301 → /endodontics` | Direct specialty-equivalent route. | SEO-first resolution |
| `/gum-disease-treatment`, `/dont-let-gum-disease-hold-you-back` | `301 → /periodontics` | Direct gum/periodontal-care equivalent route. | SEO-first resolution |
| `/tmj-treatment`, `/tmj-treatment-garden-grove-ca` | `301 → /blog/effective-tmj-treatment-options` | The existing article is the closest current, topical TMJ resource; no new treatment page is created. | SEO-first resolution |
| `/pediatric-dentistry` | `410` | No current pediatric-specific service page is an honest replacement. Redirecting to general services would dilute relevance. | SEO-first resolution |
| `/dental-x-rays` | `410` | No current diagnostic-imaging page is an honest topical replacement. | SEO-first resolution |
| `/dentofacial-orthopedics`, `/orthodontic-treatments`, `/braces` | `301 → /orthodontics` | Direct orthodontic-equivalent route. | SEO-first resolution |
| `/clear-aligners` | `301 → /invisalign` | The active Invisalign route is the closest specific clear-aligner equivalent. | SEO-first resolution |
| `/patient-form` | `301 → /patient-portal` | The patient portal is the active secure destination replacing a legacy form journey. | SEO-first resolution |
| `/what-to-expect-at-your-first-dental-appointment` | `410` | No current first-visit resource preserves the informational intent; redirecting to contact or a portal would be less relevant. | SEO-first resolution |
| `/how-to-keep-your-teeth-healthy-and-white` | `301 → /blog/how-to-keep-your-teeth-healthy-and-white` | Exact current article equivalent. | SEO-first resolution |

## No Equivalent / Deliberate Non-Indexability

| Source | Proposed response | Reason |
|---|---|---|
| `/*`, `/$`, `/?s={search_term_string}` | `410` or Search Console-safe `404` with `noindex`; do not redirect | Literal wildcard, malformed dollar-path, and template query artifacts are not content URLs. |
| `/locations/` | `410` unless the user prefers `/contact` | No current locations hub; do not redirect to a non-equivalent city page. |
| `/locations/santa-ana`, `/locations/fountain-valley` | `410` | No current canonical city route; no new local page is proposed before technical verification. |
| `/testimonials`, `/faq` | `410` unless the user selects a topical substitute | There is no like-for-like canonical page. Homepage or blog-index redirects would be irrelevant. |
| `/holistic-dentistry-natural-remedies` | `410` | No current exact article; do not resurrect health claims through an unrelated redirect. |
| `/blog/` | `301 → /blog` | Pure trailing-slash normalization. |
| `/emergency.upliftdental.com/` | Separate subdomain policy; no cross-host redirect in this map | The emergency subdomain is a distinct deployment and must not be folded into the main-site migration without its own verification. |

## Acceptance Tests Required Before Any Release

The implementation must be validated in staging before production approval. Each `Ready` mapping needs a `curl -I` test for four request variants: `http://`, `https://`, `https://www.`, and the slash form. Every test must end in exactly one 301 to a canonical final destination, with no intermediary legacy URL. A sample of each category must also be checked in the browser, and every response outside the approved canonical/redirect registry must be a genuine 404/410 rather than a 200 root-canonical shell.

The final redirect configuration must live at the hosting layer, not in React’s `SEORedirect` component. Client-side navigation is retained for user experience only; it does not satisfy raw HTTP status, canonical, or crawl-control requirements.

## Approval Requested

The user has authorized the SEO-first resolutions in this document. The complete map remains **pre-production only**: it may be implemented in a staging package after final approval, but no production routing change is authorized until the Phase 2 architecture and staging acceptance tests have been reviewed and explicitly approved.

## References

[1]: phase2-search-console/performance-pages-16m/Pages.csv "Authenticated Search Console Performance → Pages export, 16 months"
[2]: phase2-noindex-inventory-2026-08-14.md "Authenticated 46-page Search Console noindex inventory with current raw provenance"
[3]: phase2-protocol-hotfix-assessment-2026-08-14.md "Live protocol assessment and one-hop HTTP-to-HTTPS evidence"
