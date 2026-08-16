# Hosting Migration Research Notes

## Google Search Central: changing hosting with no URL changes

Source: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes

- Build and test the site on the new infrastructure before it is live. Use a temporary hostname or an IP-restricted environment; prevent staging from indexing with `noindex` while testing.
- Test pages, images, forms, and downloads in a browser before cutover.
- Confirm Googlebot can access the new infrastructure, lower DNS TTL before cutover, and keep Search Console verification intact.
- At cutover, remove all temporary crawl blocks and update DNS to the new host.
- Monitor logs on both old and new hosts, verify worldwide DNS propagation, and monitor Search Console index coverage.
- A short temporary decline in crawl rate can be normal; do not shut down the old host until traffic there reaches zero.

## SiteGround migration guide

Source: https://www.siteground.com/academy/website-migration-guide

- Lower DNS TTL 24–48 hours in advance to reduce split-traffic risk.
- Create an independent, complete backup before changes.
- Test the new host through a temporary URL or hosts-file mapping; validate form delivery, media rendering, SSL, and mixed-content status.
- Preserve MX and TXT records during DNS changes.
- Keep the old host available for at least 48–72 hours after the DNS cutover.

## Applicability

This is a same-domain, same-URL hosting move for `upliftdental.com`. Google’s Change of Address tool is not part of the process, because the domain and URL structure must not change.

## Live-site baseline observed 2026-08-16

The public home page at `https://upliftdental.com/` loaded successfully. It currently serves a JavaScript application and references first-party media from `/manus-storage/`, including the public logo and home-page hero image. Its visible canonical navigation includes core services, local landing pages, blog content, insurance, membership, gallery, and contact routes. These site-relative `/manus-storage/` assets are a migration blocker: the SiteGround release must either include every required media asset under the same first-party paths or, preferably, replace all such source references with SiteGround-hosted assets before DNS cutover. Any destination hosting copy that lacks this media will render with broken images after the Manus-hosted origin is no longer serving it.

The live home page has active telephone and SMS call-to-action links, along with contact-booking calls to action. Functional validation must include each of these journeys after the migration.

