# SiteGround Staging Repair Log — 2026-08-14

## Initial Reproduction

The staged homepage was opened at `https://ragys.sg-host.com/?staging-repair=20260814`. The browser automation surface returned no interactive elements and then transitioned to a blank page on the subsequent render check. This is insufficient to confirm the reported comparison-slider or review-widget behavior visually. The repair investigation therefore proceeds with direct HTTP response checks, deployed file inspection, and the known staging export configuration before any replacement deployment.

## Constraints

- Do not change `upliftdental.com` DNS, production hosting, or the live Manus deployment.
- Preserve SiteGround staging `noindex, nofollow` protections.
- Preserve the current emergency staging subdirectory and named rollback copies.

## Root Cause and Local Repair Validation

The SiteGround exporter’s static storage map did not include the four newly added homepage comparison sources: the two Case 1 PNGs and Case 2 PNG/WebP. It also omitted the current `uplift-hero-desktop-motion-v2` source. The deployed static build therefore retained `/manus-storage/...` paths for those comparison images, which SiteGround does not serve. The exporter now mirrors and rewrites all five source paths to local `/media/` assets.

The live Google Reviews carousel is intentionally CookieYes functional-consent-gated. On the temporary `ragys.sg-host.com` host, the third-party consent banner may not provide a usable consent event for this production-domain-configured service; the page then correctly displays its consent fallback rather than silently loading a third-party widget. The repair retains denied-by-default consent and introduces an explicit **staging-only** `Load live Google review feed` control. A tester’s direct click is the consent action on staging; production remains dependent on normal CookieYes functional consent.

The repaired site compiles and its fresh SiteGround export verification passes. The generated package now contains the four comparison media files, the current hero motion source, 68 mirrored media files total, 93 sitemap URLs, CookieYes, GA4, Google Ads, the CareStack handoff, SPA fallback, HTTPS redirect, and staging `noindex, nofollow` protection. Deployment is pending restored SiteGround SSH authorization: both the prior key path and its dated backup were rejected by the server after the earlier staging release.

## Phase 2 Staging Access Check — 2026-08-14

The approved Phase 2 package has been built and locally verified, but the existing SiteGround browser session now redirects to the SiteGround sign-in screen. The local SSH key remains present, but no SSH account endpoint is retained in the current project records and the prior authorization was already known to be rejected. No staging files, SiteGround settings, DNS record, production deployment, or live Manus endpoint has been changed during this check. Restored SiteGround authentication is required before the staging-only package can be uploaded and tested.

The user restored the SiteGround sign-in session. The account page now loads as authenticated but remains on a blank, indefinitely loading dashboard with no visible management controls or file input. No staging file action has been attempted from this state. The next recovery step is to locate the staging-specific Site Tools endpoint or restore the prior SSH endpoint/account details; production remains unchanged.

The authenticated blank dashboard has loaded SiteGround profile and data API resources, but it has not issued any website- or Site Tools-specific management request and the browser console contains no actionable page error. This confirms authentication without exposing a deployment control. No automated API request, account configuration change, file upload, or DNS operation has been made.

Site Tools is now authenticated for the confirmed `ragys.sg-host.com` staging site and the File Manager has opened. Its directory listing remains in a loading state, so no current root contents, rollback copies, or file-upload target have yet been inspected. No file upload, extraction, promotion, or overwrite has occurred.

The File Manager has now loaded the `ragys.sg-host.com` root and the `public_html` document root has been selected. The child listing is still loading, so the active package and existing rollback copies have not yet been altered or inspected. No staging file has been uploaded or replaced.

The `public_html` listing is now visible. It contains the active `assets/`, `media/`, `index.html`, `.htaccess`, crawl files, the isolated `/emergency/` staging directory, and named prior rollback copies from the August 14 parity release. A new verified Phase 2 archive, `upliftdental-phase2-staging-20260814.zip` (47 MB), has been prepared locally. The File Upload control was opened for this exact staging root; no archive transfer, extraction, or promotion has completed yet.

The verified 47 MB `upliftdental-phase2-staging-20260814.zip` archive has uploaded successfully into `ragys.sg-host.com/public_html`. The active staging files, named rollback copies, emergency subdirectory, DNS, and production deployment remain unchanged. Extraction into an isolated folder and package inspection are the next pending steps.

The File Manager did not yet list the uploaded archive in its stale rendered table, so the staging view was refreshed. It is currently reloading; no extraction, file move, overwrite, or live-hosting configuration change has been attempted.

After the upload, the Site Tools File Manager refresh and dashboard return both stalled in a blank loading state. The upload itself reported success, but the rendered interface has not yet provided a way to confirm the archive entry or run extraction. No active staging file has been promoted, no rollback copy has been modified, and production/DNS remain unchanged.

The Site Tools dashboard recovered after the temporary renderer stall and File Manager was reopened. It has returned to the staging-site root; its `public_html` child must be reopened before confirming the uploaded archive and continuing isolated extraction. No active file changes have been made.

The staging root and `public_html` were reopened after the renderer recovery. The document-root listing has again entered its loading phase, so the uploaded archive is not yet visible for extraction. The active staging tree remains unchanged.

After the document root finished reloading, the File Manager DOM still did not contain the newly uploaded archive name despite the browser uploader’s success response. Because the archive cannot yet be verified in the remote listing, no extraction or promotion will be attempted. The active staging tree and production configuration remain unchanged.

The authenticated SiteGround SSH Keys Manager confirms that the existing staging-only key `uplift-staging-sync-20260813` is present, uses `ssh-ed25519`, and is allowed from all IPs. This is the same key retained locally as `/home/ubuntu/.ssh/siteground_uplift_staging_20260813`. No new key was created or changed. The remaining need is to recover the SiteGround SSH endpoint and account name so this already-authorized staging key can be used for controlled deployment and rollback-safe validation.

The Site Tools browser session revealed the SiteGround API host but its direct read-only domain endpoint requires an application authorization header that is not available to a normal browser navigation. No internal API request was sent with credentials, no key or account setting was altered, and no deployment action occurred. The browser File Manager remains the available staging channel pending a stable remote archive listing.

Returning from the SSH-key diagnostic to the authenticated File Manager again produced a temporary blank loader. No staging extraction, archive promotion, file replacement, DNS change, or production action was performed while the renderer recovers.

## Phase 2 Staging Deployment — 2026-08-14

The SSH endpoint and existing staging-only key were recovered without generating a new credential. The verified Phase 2 package was uploaded through the existing authorization, extracted first into isolated remote directories, inspected, and then promoted to `ragys.sg-host.com/public_html`. Named rollback copies of the prior `.htaccess`, `index.html`, crawl files, `assets`, and `media` were retained; the active `/emergency/` staging subdirectory was preserved. A first staging route-document layout encountered Apache directory-slash normalization, so the generated route documents were relocated to a private non-route store and the stale generated route directories were moved into a named rollback directory. The corrected package was then rebuilt, locally validated, and promoted.

Raw staging checks now confirm clean canonical-path documents, direct legacy redirect behavior, 410 retired-topic behavior, genuine unknown-path 404s, staging noindex headers, the corrected geographic coordinates, initial JSON-LD, and generated sitemap/robots files. The detailed evidence and remaining production gates are recorded in `phase2-staging-validation-2026-08-14.md`. No production, DNS, Search Console, or live Manus action has been made.

## Pre-Cutover Blog and Media Readiness Repair — 2026-08-14

The Search Console non-indexed review exposed a canonical Blog-hub self-redirect in the staged Apache rule set. The legacy entry was removed from the shared registry, the corrected `.htaccess` was regenerated and installed with `.htaccess.pre-20260814-blog-route-fix` retained. The active `/blog` route now serves the generated Blog initial document directly, while `/blog/` has a single local trailing-slash normalization redirect.

The same readiness check found a scheduled-but-unpublished cracked-tooth article could be rendered as a public Blog-hub link even though it did not have a generated canonical document. The hub now limits its listing to explicit `isPublished` records. The corrected asset bundle and route documents were installed through the isolated `upliftdental-phase2-blog-visibility-fix` release folder with named backups of assets, route documents, and crawl files.

An export-wide `/manus-storage/` audit then identified eight remaining media dependencies. Their sources were recovered from the authenticated project preview or the authorized managed-office asset library, mirrored locally, and mapped through the reusable exporter. The final incremental package was promoted with named rollbacks (`assets.pre-20260814-media-complete`, `_route-documents.pre-20260814-media-complete`, `.htaccess.pre-20260814-media-complete`, and related files). All eight new public `/media/` files return 200; staging `/blog`, the five reviewed articles, `/gallery`, and `/invisalign` return their intended route documents. The `/emergency/` staging subdirectory, production DNS, and public hosting are unchanged.
