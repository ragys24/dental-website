# SiteGround Staging Record

**Observed:** 2026-08-16

| Item | Confirmed value | Launch implication |
|---|---|---|
| Hosting plan | GrowBig, active through 2027-08-12 | Existing paid hosting capacity is available; no plan purchase is required. |
| Temporary hostname | `ragys.sg-host.com` | Safe staging target that does not affect `upliftdental.com` DNS. |
| Site IP | `35.215.106.84` | Use only for pre-cutover preview if SiteGround provides a host-header preview path; do not switch public DNS until final validation. |
| Nameservers on staging host | `ns1.siteground.net`, `ns2.siteground.net` | Public apex DNS will remain unchanged during staging. |
| Automatic restore points | Available in Site Tools | A manual named backup was requested before any file change. |
| Release archive | `uplift-siteground-release-2026-08-16.zip` | SHA-256: `72371bb40eec4fb3ad2464c74641cdf66cf65a656acacfa6016337875844dfff`; includes `.htaccess`, `robots.txt`, preserved `sitemap.xml`, and `404.html`. |

The staging upload must be completed and verified on the temporary hostname before the user is asked to authorize the public-domain cutover.

## Confirmed rollback and document-root state

A manual SiteGround backup named **`Pre-Uplift-static-release-2026-08-16`** completed successfully at approximately 03:34 AM on 2026-08-16. The SiteGround account also retains multiple automatic system restore points.

The staging document root is `public_html`. It contains an existing prior static deployment, multiple historical rollback directories, prior archives, route-document directories, and a current `.htaccess`. The new release must therefore be deployed as a deliberately isolated replacement after preserving the manual backup, rather than mixed incrementally with the prior staged artifacts.

The SiteGround File Manager's browser-level upload input is present as `#fm-upload`, but direct automated attachment through the visible-control index failed. A secure FTP/SFTP transfer route or an alternate supported upload targeting method is now required to transfer the prepared 4.4 MB archive.

## Staging transfer verification

The checksum-verified release archive `uplift-siteground-release-2026-08-16.zip` uploaded successfully to `public_html` at approximately 03:42 AM and is reported as 4 MB by SiteGround File Manager. The one-time runner `siteground-stage-deploy.php` uploaded successfully at approximately 03:47 AM.

The runner validates the uploaded archive against SHA-256 `72371bb40eec4fb3ad2464c74641cdf66cf65a656acacfa6016337875844dfff`, removes only superseded contents of the **temporary staging document root**, extracts the verified static release, removes the release archive, and self-deletes. Its execution cannot alter the public `upliftdental.com` DNS target.
