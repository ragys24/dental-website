# Competitor Review Presentation Notes

**Observed:** August 14, 2026. These observations describe public website rendering and scripts; they do not validate whether the stated ratings or review counts remain current.

| Website | Observed implementation | Presentation | Initial assessment |
|---|---|---|---|
| Long Beach Dental Health | A Trustindex widget marker (`ti-widget`) is present in its testimonial area. The page displays “5.0 Rating From 166 Reviews” and rotating named review excerpts under “Trusted by Smiles Like Yours.” | Prominent social-proof block with a review count, numeric rating, named snippets, and star graphics. | A strong visual format, but Uplift should not replicate its review text/count treatment without live, authorized source data and attribution. |
| Westgrove Dental Care | Elfsight’s platform script is loaded on the homepage. A fixed top bar states “265+ Five-Star Reviews on Google”; the page also includes a Google Maps embed. | Persistent rating/count banner plus a third-party widget architecture available for review display. | The embedded-widget approach is the common low-code pattern to assess for Uplift; a static claim must still be current and source-backed. |

## Source and policy constraints

Google’s Places API policy requires author attribution and direct source access for displayed review content, visible Google Maps attribution, and disclosure of review ordering/filtering. The Business Profile API supports authorized review access for a location, but requires app registration and OAuth credentials. See the official references in `source-records-register.md`.

## SEO best-practice decision

The review carousel itself can build visitor confidence, but it is **not** a route to Google organic review stars for Uplift’s own website. Google Search explicitly treats a business’s embedded self-reviews — including those from a third-party widget — as self-serving for `LocalBusiness` / `Organization` review snippets. Uplift should keep accurate `Dentist` / `LocalBusiness` entity data, office hours, services, and other factual schema, but must not add `Review` or `AggregateRating` schema for Google Business Profile reviews.

**Recommended implementation:** Use a live managed Google Reviews widget, configured to show unfiltered newest reviews (or a clearly disclosed rating threshold), author attribution, relative date, visible Google/Google Maps attribution, direct “Read all reviews” link, direct “Write a review” link, keyboard arrows, pause-on-hover/focus, and a reduced-motion-safe non-autoplay mobile fallback. This matches the general widget architecture observed on both competitors while avoiding their unsupported static rating/count claims. 

**Official SEO references:** [Google review snippet policy](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), [Google’s self-serving review explanation](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful), and [Google Local Business structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).
