# SiteGround Deployment Record — Five SEO Fixes

**Deployment date and time:** August 16, 2026, 04:22:03 PDT  
**Environment:** Production SiteGround host for `upliftdental.com`  
**Scope:** Redirect, internal-link, metadata, and canonical corrections only. No page copy, visual layout, `/invisalign` page content or schema, or `<noscript>` fallback was changed.

| Requested item | Production result | Validation evidence |
|---|---|---|
| 1. Legacy Invisalign route | `/invisalign-treatment-garden-grove-ca/` returns **HTTP 301** to `https://upliftdental.com/invisalign` | Origin-level response header check |
| 2. Clear Aligners route | `/clear-aligners/` returns **HTTP 301** to `https://upliftdental.com/invisalign` | Origin-level response header check |
| 3. Homepage, navigation, and footer links | The active rendered DOM has **0** anchors to the legacy Invisalign URL and **2** anchors to `/invisalign`; no direct homepage/nav/footer source change was required because they already used the canonical path | Live browser DOM check |
| 4. LocalBusiness geo and rating | Active LocalBusiness route documents use latitude `33.7815617` and longitude `-118.0414966`; no `aggregateRating` or `reviewCount` field remains in deployable schema | Staged and live route-document checks |
| 5. Dentist-near canonicals | All 11 `dentist-near-*` route documents are self-referential; Rossmoor declares `https://upliftdental.com/dentist-near-rossmoor` | Generated and live route-document audit |

The new SiteGround package was staged and checksum-validated before promotion. The prior public and private route-document directories were retained as rollback copies at `public_html.pre-five-fixes-20260816-1120` and `route-documents.pre-five-fixes-20260816-1120`.

To prevent a browser-cached document from requesting an old hashed JavaScript or CSS asset after the atomic release swap, the prior hashed assets were retained alongside the new package. They do not alter current served page content; they preserve compatibility during cache expiry. The current active browser bundle renders the canonical Invisalign page successfully.

The temporary `uplift-scoped-five-fixes-20260816` SiteGround SSH key was removed from SiteGround and its local private keypair was deleted after validation.
