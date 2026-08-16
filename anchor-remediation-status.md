# Direct Appointment Anchor Remediation Status

## Staging safety

The SiteGround temporary hostname briefly returned a SiteGround 404 after an anchor-fix router was activated. The failed router was preserved as `.htaccess-anchorfix-404-20260813`. The previously verified staging router was restored as the active `.htaccess`; `https://ragys.sg-host.com/` now returns the Uplift homepage again. No production DNS or live hosting was changed.

## Local fix under validation

The homepage now mounts deferred below-the-fold content when a URL includes `#appointment`, then performs the scroll only after the React render commit using a two-frame post-render effect and an 88px sticky-header offset. Build and TypeScript checks pass. The next check is to confirm the document scroll position and target viewport placement on a fresh direct-link load before attempting another staging update.
