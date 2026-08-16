# Uplift Dental Refactor & SEO Architecture

## Goal

Make the static React site easier to maintain, faster to deliver, safer to migrate to SiteGround, and stronger for local search **without changing the public URL map, current conversion tracking, CookieYes consent behavior, or the established Uplift visual identity**.

## Preservation Contract

| Area | Must remain unchanged |
|---|---|
| Canonical host and URL paths | `https://upliftdental.com` and every existing route/legacy redirect destination |
| Consent | CookieYes script and denied-by-default Google Consent Mode initialization |
| Analytics | GA4 `G-PW2PJ3LD69`, Google Ads `AW-11229085573`, and Meta Pixel initialization |
| Invisalign conversion | Call-only conversion label `AW-11229085573/4qSzCJ6P0uAcEIX_uOop`; text CTA remains `invisalign_text_click` only |
| Privacy | No phone numbers, SMS text, patient data, appointment details, or form data in event payloads |
| SiteGround | HTTPS, SPA fallback, host-specific `ragys.sg-host.com` noindex, local mirrored assets, and CareStack redirect behavior |

## Refactor Strategy

The implementation will centralize repeated navigation and local-service-area data, simplify legacy redirects into declarative data, and harden the reusable head/schema components. Page content remains route-specific where it is already unique, avoiding an unsafe wholesale rewrite of ranking content.

| Layer | Change |
|---|---|
| Site configuration | Introduce shared navigation, utility, and service-area data for the header/footer/mobile experiences. |
| Routing | Move the long legacy redirect list out of the route tree into a typed redirect manifest while preserving every existing source and destination. |
| SEO head | Make metadata updates deterministic, preserve baseline crawl directives, add social-image alt support, and prevent stale metadata during navigation. |
| JSON-LD | Use a shared script-injection primitive so page schemas replace cleanly; retain existing organization, service, FAQ, breadcrumb, HowTo, and article behavior. |
| Technical SEO | Correct non-JavaScript fallback links to actual canonical location URLs; retain sitemap, robots, llms.txt, canonical paths, and direct-route handling. |
| Accessibility | Improve menu keyboard handling, focus management, semantic navigation labels, and reduced-motion compatibility without changing visible IA. |
| Static export | Keep the SiteGround exporter as the single deployment source; add an explicit post-export integrity manifest and preservation checks. |

## SEO Enhancement Rules

Every optimization must be specific, verifiable, and useful to prospective patients. Local terms will be included only where the page has genuine location relevance. No unsupported pricing, outcome guarantees, invented awards, or fabricated reviews will be introduced.

## Validation Gate

Before SiteGround synchronization, the build must pass, direct SPA URLs must return the application shell, sitemap and robots must remain valid, every canonical route must retain its expected metadata/schema, and the live-tracking preservation checks must confirm page-load, call, and text behavior remain separated.

## Validation Record

The refactored build passed and regenerated a 91-URL sitemap. Static page entries no longer advertise a fabricated current-day `lastmod`; the 48 blog entries retain their source publication dates. A direct preview check of `/dentist-near-westminster` confirmed its canonical now correctly resolves to `https://upliftdental.com/dentist-near-westminster`, one FAQPage schema block is present, the indexable robots directive persists, and the approved CookieYes, GA4, and Google Ads source markers remain available.

The representative Denti-Cal blog page also passed after its head/schema refactor: it has the correct canonical, the standard indexable robots directive, exactly one Article schema block, one FAQPage schema block, and the global dental organization schema. Internal service and patient-resource links remain in the article body.

The homepage was visually rechecked after shared navigation and global-style cleanup. Its canonical, title, description, indexable robots directive, and dental organization schema are present. The CookieYes script, GA4 identifier, and Google Ads identifier remain in the rendered production-target application source.
