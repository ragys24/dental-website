# Phase 2 Route-Specific Initial HTML Architecture — Pre-Production Design

**Status:** Design and acceptance criteria only. No files in this document have been deployed, published, or uploaded to SiteGround staging.

## Problem Statement

The current Vite/Wouter SPA supplies one `index.html` document for both canonical pages and unrecognized paths. At initial fetch, that document contains the homepage title, root canonical, root Open Graph URL, root geolocation values, and no route-specific JSON-LD. React corrects part of the document only after JavaScript runs. As a result, a direct request for a retired URL can return HTTP 200, an `index, follow` robots directive, and a root canonical despite having no corresponding page. [1] [2]

A fresh raw `curl` check confirms the issue is not limited to legacy pages: `/invisalign`, a published blog URL, and a deliberately unmapped test path all currently return the same raw homepage title and root canonical as `/`. The shared initial document also still emits `geo.position` `33.7783;-117.9601` and matching ICBM coordinates, rather than the verified replacement coordinates required for this release. [4]

> **Release objective:** Every canonical route must return its own title, description, robots directive, self-referencing canonical, Open Graph URL, and applicable JSON-LD in the **first HTTP response**. Every approved retired route must return a true HTTP redirect at the hosting layer, and every unrecognized route must return an actual non-indexable 404 or 410.

## Chosen Implementation: Static Route Documents From One Canonical Registry

The current application is a static Vite project. A static-site generation step is therefore the appropriate architecture; it avoids introducing a server/database/authentication upgrade merely to set document metadata. During the production build, a deterministic post-build script will generate physical route documents such as `/invisalign/index.html` and `/blog/<slug>/index.html` from a single route registry. The React bundle hydrates the same route for interactivity after the correct document has already been delivered.

| Layer | Responsibility | Must not do |
|---|---|---|
| **Canonical route registry** | Be the source of truth for path, indexability, title, description, canonical URL, social data, schema modules, sitemap inclusion, and last-modified source. | Duplicate route metadata separately in `PageSEO`, each page component, `sitemap.xml`, or deployment rules. |
| **Static document generator** | Take the production Vite shell and produce a correctly headed `index.html` for every indexable canonical route. | Infer content from the current browser path or rely on JavaScript for head correctness. |
| **Redirect manifest** | Hold approved legacy source patterns and exact final canonical targets only. | Redirect generic unknown paths, clinical-decision rows, query templates, or malformed inputs to the homepage. |
| **Hosting configuration** | Serve physical route documents, return direct 301s, enforce host/protocol/slash policy, and deliver 404/410 policies. | Use React’s client-side redirect component as an HTTP redirect substitute. |
| **React application** | Hydrate page content and update head state on internal client navigation without creating duplicate tags. | Be the only producer of crawl-critical route metadata or JSON-LD. |

### Registry Shape

The release will add an auditable machine-readable registry, for example `seo/route-registry.json`, with a TypeScript accessor for page code. It will contain only canonical, indexable content routes. It will not contain aliases, redirects, malformed URLs, staging-only pages, 404s, or query templates.

```json
{
  "path": "/invisalign",
  "indexable": true,
  "title": "Invisalign in Garden Grove | Uplift Dental & Orthodontics",
  "description": "Explore Invisalign consultations at Uplift Dental & Orthodontics in Garden Grove, California.",
  "canonical": "https://upliftdental.com/invisalign",
  "openGraph": { "type": "website", "image": "<approved route image URL>" },
  "schemas": ["dentist", "medicalWebPage", "service", "breadcrumb", "faq"],
  "sitemap": { "include": true, "changefreq": "monthly", "lastmodSource": "content" }
}
```

The example is structural only; production copy and schema fields will be generated from the final reviewed registry. This approach makes the site’s canonical behavior testable and ensures that `sitemap.xml`, static `<head>` content, redirects, and robots decisions cannot drift apart.

## Build and Serving Flow

| Build stage | Required output | Validation gate |
|---|---|---|
| 1. Validate registry | Exactly one record per canonical route; no duplicate paths, titles, canonicals, or sitemap entries. | Build fails on duplicate/invalid absolute canonical URLs. |
| 2. Build application | Normal Vite bundle and root shell. | Existing TypeScript and production build pass. |
| 3. Generate route documents | `dist/<route>/index.html` for every registry route; each contains static title, description, canonical, OG/Twitter URL, robots, geo tags, and JSON-LD. | Parse every output `<head>` and compare it to the registry. |
| 4. Generate sitemap and robots | `dist/sitemap.xml`, `dist/robots.txt`, and an explicit `dist/404.html`; generate a redirect manifest for each host. | Registry-to-sitemap and registry-to-document counts reconcile exactly. |
| 5. Package hosts | Produce a Manus static package and a SiteGround package from the **same** `dist` artifact plus host-specific redirect config. | File hash manifest proves content parity before any staging upload. |
| 6. Test staging raw responses | Test all canonical pages and sampled redirects with JavaScript disabled / raw `curl`. | No release approval until every sampled direct response meets the response contract below. |

For both hosts, the document-serving rule must resolve `/route` to the generated `/route/index.html` **without** changing the visible canonical URL. Requesting `/route/` must perform one 301 to `/route`; static files and `/` are exempt. If the Manus static host cannot honor route-document delivery plus status-level redirects, the release must not be claimed as complete there; the SiteGround package will remain the reference implementation and production approval will wait for a host-capable path.

## Raw Response Contract

| Request type | Status | Initial document requirements |
|---|---:|---|
| Canonical page, e.g. `https://upliftdental.com/invisalign` | `200` | Exact route title/description; one self-canonical; route OG/Twitter URL; `index, follow`; applicable JSON-LD in `<head>`; correct geo values where present. |
| Approved legacy URL | `301` | `Location` points directly to its final canonical HTTPS non-`www` no-slash URL; no intermediate URL. |
| Canonical page with trailing slash | `301` | Directly to the no-slash canonical route. |
| `http://www` canonical or legacy variant | `301` | Directly to final non-`www` HTTPS canonical or approved final redirect target. |
| Literal wildcard/search artifact or unsupported query template | `404` or `410` | `X-Robots-Tag: noindex` where the host supports it; never a root-canonical 200 response. |
| Unknown ordinary path | `404` | A real 404 document with `noindex`; no canonical link to `/`. |
| Staging host | `200` for intended staging pages only | Explicit host-level `X-Robots-Tag: noindex, nofollow` or equivalent meta response; canonical may remain production-only for controlled testing but staging must not enter the index. |

## JSON-LD Migration

All JSON-LD currently added with `useEffect` in `StructuredData.tsx`, the standalone breadcrumb component, and the page-level components will move into the generated initial document. The React components may remain temporarily as no-op compatibility wrappers during the first release, but they must not append duplicate schema after hydration. Direct crawler requests are the source of truth for schema presence.

| Schema type | Initial-document placement | Applicability |
|---|---|---|
| `Dentist` / `MedicalBusiness` / `LocalBusiness` | Root route and any route where a sitewide organization reference is needed; one stable `@id`. | Factual practice identity only. No `AggregateRating` or self-serving `Review` markup. |
| `WebSite` | Root route. | One stable `@id`; no duplicated sitewide schema on every route unless technically required. |
| `WebPage` / `MedicalWebPage` | Applicable service, specialty, and educational pages. | Route-specific `name`, `url`, and description mirror visible page content. |
| `Service` | Verified active service pages. | No unsupported price, timing, outcome, or coverage promise. |
| `FAQPage` | Only pages with visibly rendered, user-facing FAQ content. | Remove/omit when the visible FAQ is removed. |
| `BreadcrumbList` | Inner canonical routes. | Every item uses a canonical, resolvable HTTPS URL. |
| `Article` | Published blog posts. | Canonical article URL, published/modified date, approved author/publisher values. |

The LocalBusiness `geo` object and any matching initial-document geo tags must be corrected to **latitude `33.7815617`** and **longitude `-118.0414966`**. The static `<head>` will therefore emit `geo.position` as `33.7815617;-118.0414966` and `ICBM` as `33.7815617, -118.0414966`; the generated LocalBusiness JSON-LD will use the same numeric values. [3]

The migration also includes a factual-schema review: retained business information must be independently verified or user-confirmed; the existing self-serving rating/review schema remains excluded; and unsupported price ranges, treatment timelines, outcomes, credential claims, and review counts are not carried forward.

## Metadata Migration and Client Navigation

`PageSEO` currently changes title, meta tags, canonical, and social tags after the route renders. During Phase 2, the registry becomes the source for those values. For direct requests, the static document supplies the values before React loads. For internal client navigation, a small registry-backed updater can replace the one existing tag set rather than create duplicates. It must be guarded so hydration preserves the server/static values when they already match.

The root-only critical hero shell and its preload may remain root-specific. It must not be embedded in route documents for services, blog posts, city pages, or utility pages. This removes another source of generic homepage semantics from non-root raw responses while retaining the established home-page performance safeguards.

## Sitemap and Robots Regeneration

The sitemap will be generated from `route-registry.json`, not maintained as a separate 93-URL hand-written file. Only canonical, indexable content records with `sitemap.include: true` are emitted. Redirects, route aliases, `/404`, staging content, deprecated pages, search URLs, malformed artifacts, and the emergency subdomain are excluded from the main-site sitemap. `lastmod` must come from a real content modification value or be omitted; it must not be refreshed mechanically on every deployment.

The generated `robots.txt` will keep the canonical sitemap declaration and only block durable non-content path families such as CMS/admin endpoints and template queries. It must **not** use robots disallow rules to hide legacy paths that need to be crawled in order for Google to see their 301 response. Where a literal query/search artifact must remain absent, the hosting layer must return 404/410 with `noindex`; robots alone is not a removal mechanism.

## Staging and Production Acceptance Gates

No production change occurs until the following staging gates pass on the same package intended for release:

| Gate | Evidence required |
|---|---|
| Canonical pages | Raw HTML samples from home, Invisalign, Orthodontics, a service page, a city page, the blog index, and a blog post show correct unique title, description, self-canonical, OG URL, and initial JSON-LD. |
| Coordinates | Raw `<head>` and LocalBusiness JSON-LD both contain `33.7815617, -118.0414966`. |
| Redirect map | Every approved row and four host/protocol/slash variants in a sampled set resolve in one hop only. |
| Negative paths | `/unmapped-test-path`, `/*`, `/$`, and `?s={search_term_string}` do not return a 200 root-canonical document. |
| Sitemap parity | Every sitemap URL is an indexable canonical route that returns 200; no redirect or noindex URL appears. |
| Robots parity | Googlebot can crawl approved redirects; staging is noindex; no canonical production route is accidentally blocked. |
| Schema quality | Rich Results/schema validation reports no duplicate `@id`s, no self-serving ratings/reviews, and no route-schema mismatches. |
| Performance/privacy | Build, existing consent behavior, GA4/Ads IDs, click-only Invisalign conversion, and mobile performance safeguards remain unchanged or improve. |

After deployment, Search Console requests must follow this sequence: submit the regenerated sitemap, inspect a representative set of canonical and redirect URLs, request validation only for the resolved issue categories, and monitor Page indexing for 14–30 days. The August 14 GBP category changes are documented as a map-pack attribution factor and will not be attributed to this organic technical release.

## Explicit Non-Scope

This architecture does not create Los Alamitos, Seal Beach, or Leisure World content; the existing canonical-route registry may preserve current pages only. It does not change DNS, publish the latest web checkpoint, alter Google Business Profile categories, change CookieYes consent, send patient data, or repair/upload the paused SiteGround slider/reviews package. Those items remain separate until this plan is approved and the technical release is verified.

## References

[1]: phase2-search-console/noindex-provenance/current-raw-provenance.json "Current raw HTTP, robots, canonical, and title evidence for 43 legacy paths"
[2]: client/index.html "Current shared SPA document shell with root metadata and client-side canonical mutation"
[3]: /home/ubuntu/apex-dental/phase1-technical-seo-diagnostic-2026-08-14.md "Phase 1 coordinate correction requirement and raw-response findings"
[4]: phase2-route-architecture-2026-08-14.md "Live raw representative route validation recorded August 14, 2026"
