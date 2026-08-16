# Recovered Apex Dental Archive Assessment

## Confirmed identity and relevance

Despite its archive name, the recovered project is the newer **Uplift Dental & Orthodontics** website source. Its brand data identifies `upliftdental.com`, 5253 Lampson Ave, Garden Grove, CA 92845, and the practice contact information. The source includes current Uplift marketing, technical SEO, SiteGround-export, and validation artifacts dated through 2026-08-15.

## Confirmed gap versus current SiteGround release

The recovered source adds direct pages absent from the current deployed source: `CommunityOutreach`, `Dentures`, `InvisalignSealBeach`, `OurSpecialists`, `PatientPortal`, `Sitemap`, and `WhyChooseUs`. It contains 197 React route declarations compared with 100 in the currently deployed source. Both copies currently expose 75 canonical sitemap URL entries, so recovery deployment must preserve that sitemap while restoring the missing direct pages and legacy redirects.

## Static SiteGround deployment architecture

The recovered project includes a static route-document generator and a SiteGround export script. It builds crawlable route-specific HTML, sitemaps, robots directives, redirects, 404 behavior, local asset mirroring, and Apache routing. The current export script includes paths to former sandbox-only assets that must be reconciled to the available recovery package before it is used.

