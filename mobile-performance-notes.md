# Mobile Performance and Video Decision Notes

## External Findings

Westgrove Dental Care’s homepage was reviewed on 2026-08-13 at https://westgrovedentalcare.com/. Its hero uses a muted, looping, inline autoplay WebM with `preload="metadata"` and a WebP poster. The observed video source was `https://storage.googleapis.com/local-dentist-nearby/West%20Grove%20Dental%20Care/westgrove-dental-care-hero.webm`; response headers reported a stored content length of **5,845,553 bytes**.

Google’s video-performance guidance explains that the first painted video frame can be an LCP candidate and cautions that autoplaying video begins downloading immediately. It recommends poster-based deferral and viewport-aware loading where motion is needed: https://web.dev/learn/performance/video-performance.

Google’s LCP guidance defines a good LCP as **2.5 seconds or less** for at least 75% of visits and recommends prioritizing the discoverable LCP resource and avoiding render delay: https://web.dev/articles/optimize-lcp.

Chrome’s autoplay documentation confirms that muted autoplay is generally permitted, while sound autoplay depends on user engagement and other conditions: https://developer.chrome.com/blog/autoplay.

## Decision Applied

Uplift will not copy Westgrove’s large autoplaying hero-video pattern. The hero poster remains the primary image and LCP candidate. The silent six-second Uplift vignette is desktop-only, disabled for reduced-motion and Save-Data visitors, and armed only after the poster page has settled. Mobile remains image-only.
