# Uplift Dental & Orthodontics: Public Proof Source Register

**Purpose:** Maintain a defensible record for every review, rating, office image, provider image, and treatment image considered for public use.

## Verified external review source

| Record | Source | Verified observation | Safe website use | Not approved for reuse |
|---|---|---|---|---|
| Google Business Profile | https://www.google.com/maps?cid=10268131085528094278 | Verified through the authenticated Uplift Dental & Orthodontics Google Business Profile manager and the connected live Google Reviews widget. | A clearly attributed external link such as “Read current patient feedback on Google,” plus the consent-aware live Google Reviews widget. | Republishing individual review text, reviewer identities, static rating or review counts, or review-hosted photos without a separate authorization. |

**Published-use decision:** The website uses the consent-aware live Google Reviews widget and neutral Google-profile link language. It does not reproduce individual review text, reviewer identities, static ratings, review counts, or review-hosted photography.

## Existing practice-source visual assets

| Record group | Current project reference | Provenance status | Safe website use |
|---|---|---|---|
| Provider portraits | `DOCTOR_IMAGES` in `client/src/lib/constants.ts`; existing Uplift provider pages | Existing practice-site asset; user controls the current website. | Continue using on relevant provider and specialty pages; preserve name, credential, and specialty accuracy. |
| Practice/team imagery | Existing `uplift-about-real_*` and `uplift-team-real_*` managed assets | Existing practice-site asset; user controls the current website. | Use as authentic environment/team proof only where the image actually reflects the practice. |
| Dr. David Sidky portrait | `/home/ubuntu/webdev-static-assets/dr-sidky-centered.jpeg` | User-provided practice asset. | Use on the provider page and team treatment as already approved. |

**Rendered validation (August 14, 2026):** The source-backed Gallery displays labeled practice-provided team/technology records, accessibility names for the image-detail controls, and a direct Google Business Profile link. The Homepage uses the consent-aware live Google Reviews widget without recreating review snippets or static rating metrics.

## Authorized clinical comparison assets — August 13, 2026

| Record group | Current project reference | Provenance and approval | Safe website use | Not approved for reuse |
|---|---|---|---|---|
| Case 1 before/after pair | `/manus-storage/uplift-case-1-before_c7e95f4e.png` and `/manus-storage/uplift-case-1-after_b4e1eb64.png` | Original pair supplied by the user as `Before1.PNG` and `After1.PNG`, with an explicit instruction to publish them in the Gallery as a before-and-after slider. The user subsequently identified this as **composite veneers with crown and bridge work** and authorized Homepage placement. | Display as a Gallery or Homepage slider labeled **Composite Veneers with Crown & Bridge Work**, retaining original color and lighting and including the individual-results disclaimer. | Do not name an unverified identity, diagnosis, outcome, provider, or treatment duration. |
| Case 2 before/after pair | `/manus-storage/uplift-case-2-before_217e67b4.png` and `/manus-storage/uplift-case-2-after_e1f67053.webp` | Original pair supplied by the user as `Before2.PNG` and `After2.webp`, with an explicit instruction to publish them in the Gallery as a before-and-after slider. The user subsequently identified this as **porcelain veneers** and authorized Homepage placement. | Display as a Gallery or Homepage slider labeled **Porcelain Veneers**, retaining original color and lighting and including the individual-results disclaimer. | Do not name an unverified identity, diagnosis, outcome, provider, or treatment duration. |

**Published-use decision:** The Gallery and Homepage may display only these exact user-approved pairs in the responsive slider treatment, using the two user-supplied procedure labels above. Their presentation does not add color correction, retouching, filters, guarantees, or a patient identifier.

## Authorized new practice and outreach images — August 13, 2026

| Record group | Current project reference | Provenance and approval | Safe website use | Not approved for reuse |
|---|---|---|---|---|
| Clinical-room environment images | `/manus-storage/img_2495-web_1a77c86d.webp` and `/manus-storage/img_2496-web_12fc8cc0.webp` | Original files supplied directly by the user as `IMG_2495.HEIC` and `IMG_2496.HEIC`, with prior user-confirmed marketing consent and an explicit August 13 instruction to add them to the website. | Gallery-only, labeled as authentic care-environment imagery with no outcome, diagnosis, procedure, provider, or patient-identity claim. | Community Outreach, testimonials, reviews, emergencies, treatment results, or any clinical claim. |
| Community outreach images | `/manus-storage/img_3750-web_4b848a72.webp` and `/manus-storage/img_7836-web_d73f2274.webp` | Original files supplied directly by the user as `IMG_3750.HEIC` and `IMG_7836.HEIC`, with prior user-confirmed marketing consent and an explicit August 13 instruction to add them to the website. | Community Outreach with neutral factual captions describing visible branded materials and an outreach setup. | Naming an event, partner, attendee, representative, sponsor, activity, attendance figure, or result not independently documented. |

**Published-use decision:** All four images are converted from the supplied HEIC originals to responsive WebP copies without cropping, retouching, color correction, or lighting alteration. The clinical-room images appear in the Gallery; the outreach images appear in the Community Outreach gallery.

## Records not yet eligible for public integration

| Record group | Reason | Required evidence |
|---|---|---|
| Homepage testimonial names and quotes | Current code does not retain the original Google/Yelp source URL, review date, or review screenshot. | Source record per quote, or replacement with direct external review-profile links. |
| Google rating/count statements | No current source capture supports the exact displayed rating/count. | Current GBP record or an approved data source, dated and retained. |
| Yelp-hosted business photos | Ownership and image-submitter permission are not established. | Direct original file from the practice or a documented reuse authorization. |
| Other before/after clinical images | No approval or source record exists beyond the two exact pairs above. | Written clinical/photo consent, case record, and approved use scope for each additional pair. |

## Google Reviews: conditional future integration

| Requirement | Decision before publication |
|---|---|
| Authorized current source | Use either the practice’s authorized Google Business Profile Reviews API access or Google Maps Places API review data. A public-page scrape, manually copied review text, or invented cards is not eligible. |
| Freshness | Fetch at render time or through a documented refresh process; do not present a static, hand-curated “new reviews” loop as live data. |
| Required display treatment | Render each received review with the author attribution and source link provided by Google; preserve any required Google Maps attribution and clearly label the review order/filter. |
| Project capability | The current static site has no approved Google review-data connector or protected backend secret. Implementing a live loop requires authorized Google access and, for an API key or OAuth token, a protected server-side integration. |

**Reference sources:** [Google Business Profile review operations](https://developers.google.com/my-business/content/review-data), [Google Maps Places policy and review attribution](https://developers.google.com/maps/documentation/places/web-service/policies), and [Google Maps JavaScript review display guidance](https://developers.google.com/maps/documentation/javascript/place-reviews). 

## Elfsight live-source selection record — August 14, 2026

The user authorized an Elfsight Google Reviews widget account using their Google profile. Elfsight’s source search returned the exact listing **Uplift Dental & Orthodontics**, **5253 Lampson Ave, Garden Grove, CA 92845, USA**, showing **5 (145)** at lookup time.

**Scope:** The listing may be used only as the live Elfsight widget source. The published widget must preserve dynamic author/source attribution, review dates, Google/Google Maps attribution, and direct profile links. Do not turn the observed rating or count into static site copy or `Review` / `AggregateRating` schema.

**Activation record:** The user approved widget activation and selected Elfsight’s free, no-charge tier. The widget identifier is `26230d77-308b-42cd-af1f-ecc966aabd9b`. In the local preview, the widget remains unloaded without functional consent and loads only after a CookieYes-format functional-consent signal. Final review-content/source verification remains required before release checkpointing.

**Collection state:** After the source-selection action completed on August 14, 2026, Elfsight’s editor replaced its provider demo cards with the status: “The reviews are being collected, please wait for a few minutes.” This indicates a source-collection job is active. The demo content must not be released; the exact Uplift listing and real authored reviews must be visibly verified after collection finishes.

**Live-feed verification:** The Elfsight editor now shows Uplift’s Google feed, including the listing header **5.0 (145)** and current authored reviews such as Jessica Newton (8 days), Maurine Fadlalla (3 hours), Elizabeth Taireh (4 hours), Alyssa Medina (2 days), Amanda Zaytoun (2 days), Genevieve Lewis (2 days), Laura Romero (8 days), and Bryan Khalil (9 days). The current source is therefore no longer the Elfsight provider demo. Two featured reviews may be manually ordered only when visibly labeled as featured/curated; the full Google feed, reviewer attribution, dates, source links, and write-review link must remain available.

**Published configuration and validation:** On August 14, 2026, the user confirmed publication of the Elfsight configuration. Alyssa Medina and Genevieve Lewis are ordered first in the live widget; Jessica Newton, Maurine Fadlalla, Elizabeth Taireh, and other current reviews continue after them. The website explains this featured order, preserves the Google source links and “Read all Google reviews” destination, gates the external widget behind functional CookieYes consent, and emits no first-party `AggregateRating` or `Review` JSON-LD.
