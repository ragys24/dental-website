# Uplift Dental & Orthodontics: Growth Operations Pack

This pack prepares the high-value work that depends on real-world evidence, an external platform, or an authorized business decision. It is intentionally designed so no patient review, clinical outcome, provider credential, or Office/GBP fact is invented.

## 1. Authentic proof capture

The next visual improvement should come from a short, intentional practice photo session rather than additional stock-style images. Capture the following with written permission for every identifiable person, and store the original source plus approval status.

| Priority | Capture | Use on website / GBP | Requirements |
|---|---|---|---|
| 1 | Exterior, entry, reception, and wayfinding | Hero alternatives, location page, GBP cover/update | Current signage, natural daylight, no patient details in view |
| 2 | Doctors and specialists in consultation or working | Team/service pages, GBP, recruiting proof | Actual provider, current name/title verified by office |
| 3 | Technology and treatment environment | Service pages, Gallery, GBP | No patient records or monitor content visible |
| 4 | Consented before/after clinical cases | Gallery, appropriate service pages | Written clinical/photo consent, matched orientation/lighting, no outcome guarantee |

## 2. Review and testimonial compliance ledger

The existing homepage review copy should be verified against its original published source before it is retained or expanded. Do not create, edit, paraphrase, seed, or add reviews without an identifiable source and business authorization.

| Item | Current action | Completion evidence |
|---|---|---|
| Existing on-site testimonial names and quotes | Retain as legacy content pending source verification; add nothing new. | Screenshot or exported source record showing the exact published review and date verified. |
| Star rating / review count | Do not update manually from memory. | Current GBP screenshot or approved API/report data. |
| Review-request flow | Send a neutral, post-visit request to all eligible patients; do not filter by sentiment or offer incentives. | Approved SMS/email template and staff workflow. |

### Neutral review-request templates

**SMS:** “Thank you for choosing Uplift Dental & Orthodontics. If you would like to share your experience, you can leave an honest review here: [GBP REVIEW LINK]. Your feedback helps our team and future patients. Thank you.”

**Email subject:** “Thank you for visiting Uplift Dental & Orthodontics”

**Email body:** “Thank you for trusting our team with your dental care. If you would like to share an honest review of your visit, please use this link: [GBP REVIEW LINK]. We appreciate your time and feedback.”

## 3. GBP publishing queue

Do not publish without reviewing the final image, date, and factual claims in GBP. These drafts are safe starting points and must be matched to real office availability.

| Theme | Draft copy | Required real asset |
|---|---|---|
| Multi-specialty care | “Looking for coordinated dental care in Garden Grove? Uplift Dental & Orthodontics offers general, cosmetic, orthodontic, periodontal, endodontic, and oral-surgery services through one team. Call us to discuss the right starting point for your needs.” | Current exterior or team photo |
| Third Saturday availability | “Need a weekday-friendly dental option? Uplift Dental is open the third Saturday of each month from 9 a.m. to 2 p.m. Call before you visit so our team can confirm availability.” | Current office/entry photo |
| Secure booking | “Prefer to begin online? Our patient portal lets you choose an appointment reason and request a time securely. Visit our website to start.” | Branded website/office detail, no patient portal screenshot with data |
| Gum-health education | “Bleeding or tender gums are worth discussing with a dental professional. Our Garden Grove team can help you understand the next appropriate step for your gum health.” | Approved periodontal/office visual |

## 4. CareStack and measurement handoff

The website now records a privacy-safe `carestack_booking_click` event when visitors choose interactive secure-booking links. Validate it after publishing using GA4 DebugView and Tag Assistant. Confirm that the event contains no phone number, appointment reason, free-text content, or patient data.

| Check | Expected result |
|---|---|
| Homepage Book Online | One `carestack_booking_click` on a user click |
| Patient Portal page | One `carestack_booking_click` on each portal handoff |
| Call/Text | Existing approved tracking remains separate |
| Consent declined | Do not force Google/Meta measurement; secure booking link still works |

## 5. Physical-device acceptance test

Run this on a current iPhone Safari and Android Chrome before DNS cutover.

| Test | Pass condition |
|---|---|
| Hero | Headline, proof points, and primary CTA are visible with no image/copy collision. |
| Mobile menu | Opens, closes, traps focus while open, and returns focus to the trigger. |
| Sticky actions | Call/Text controls do not hide page controls, form fields, or portal actions. |
| Appointment anchor | A direct `#appointment` link reaches the booking section after the mobile content handoff. |
| CareStack | Opens the expected secure destination in a new tab. |
| Consent | Banner is readable and no non-essential tag is forced before consent. |

## 6. Cutover ledger

The temporary SiteGround hostname must remain `noindex, nofollow`. Before moving `upliftdental.com`, use an independently verified deployment method that serves the exact exported static release from the real document root; do not use another untested root-rewrite policy.

| Stage | Owner / evidence |
|---|---|
| Staging route and direct URLs verified | Agent + browser/HTTP log |
| 93-URL crawl passes | Agent + crawl report |
| Real-device validation passes | Office owner / staff |
| DNS cutover approved | Owner explicit approval only |
| Staging noindex removed only on real host | Agent + response headers |
| Search Console sitemap/inspection | Owner or authorized Search Console session |
| First 14 days monitoring | Shared daily checklist |
