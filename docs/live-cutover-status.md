# Uplift Dental SiteGround Cutover Status

**Cutover time:** 2026-08-16 04:23 PDT

## Authoritative DNS state

The SiteGround-authoritative DNS zone now resolves the apex `upliftdental.com` only to `35.215.106.84`, the prepared SiteGround host. The previous Cloudflare/Manus apex A records `104.18.27.246` and `104.18.26.246` were removed. `www.upliftdental.com` now CNAMEs to `upliftdental.com`.

Mail and verification records were deliberately retained unchanged, including the `smtp.google.com` MX record, legacy MX records, SPF, DMARC, DKIM, and Google site-verification record.

## Release verification

The complete SiteGround staging audit passed **80 checks**, covering all **75 sitemap URLs**, canonical tags, local static asset references, legacy redirects, trailing-slash normalization, a true 404 response, security headers, and deletion of the one-time deployment runner.

After the authoritative DNS update, direct cache-bypassed requests to `35.215.106.84` returned the SiteGround release with correct route-specific titles and canonical URLs for `/services`, `/dental-implants`, `/dentist-near-garden-grove`, and `/blog/cosmetic-dentistry-5-ways-to-transform-your-smile`. The public apex also returned the SiteGround release, with HTTP 200 for representative pages, a 301 for `/oral-surgery` to `/wisdom-teeth-removal`, and a 404 for a deliberately invalid route.

## Propagation observation

Before the cutover, the legacy apex A records had a **24-hour TTL**. Some browser or resolver sessions can therefore continue reaching the prior Manus/Cloudflare release until their existing DNS cache expires. This is expected propagation behavior and avoids downtime because the former release remains reachable while cached clients transition. The browser check in this session used a pre-cutover cached DNS answer and correctly displayed the old release; authoritative DNS and direct SiteGround checks resolve to the new release.

## Rollback paths

A named SiteGround manual backup (`Pre-Uplift-static-release-2026`) exists. The prior production source is tagged, and the fully hardened static release is committed to private GitHub at `b7ea497`.

