# Uplift Dental Weekly Confirmed-Appointment Reconciliation

> **Scope:** This workflow measures confirmed appointments as an **offline outcome**, not as a website or CareStack completion event. It must never send names, phone numbers, email addresses, treatment details, insurance, notes, or any other patient data to GA4 or Google Ads.

## Measurement Contract

| Website action | GA4 event | Google Ads role | What it means |
|---|---|---|---|
| Confirmed on-site contact-form success | `generate_lead` | Primary only after Google Ads form conversion setup is verified | A submitted non-PHI consultation request—not a booked appointment. |
| Tap on `(714) 898-3308` | `click_to_call` | Secondary diagnostic | A phone-link interaction—not a completed or qualified call. |
| Confirmed Uplift-to-CareStack handoff | `begin_booking` | Secondary diagnostic | A visitor chose to continue to online booking—not a completed appointment. |
| Confirmed appointment after CareStack reconciliation | No GA4 website event | Offline conversion import; initially secondary until import quality is proven | A verified appointment tied to a valid paid click identifier. |

## What the Website Retains

The website stores only the approved attribution parameters (`gclid`, `gbraid`, `wbraid`, and UTM parameters) in first-party **session storage** and decorates the CareStack handoff URL. This excludes patient information and disappears when the browser session ends. It is sufficient for a visitor’s outbound CareStack handoff, but CareStack must retain or export the matching attribution values for a weekly appointment reconciliation to be possible.

## Two Viable Weekly Operating Models

| Approach | Trade-offs | Cost | Setup complexity |
|---|---|---:|---|
| **Weekly manual reconciliation** | A staff member exports confirmed CareStack appointments and matches only stored paid-click IDs or approved UTM fields; it is transparent and the safest starting point, but requires recurring staff time. | No additional software required. | Low, once CareStack exposes the attribution fields in its booking export. |
| **Connected offline-import workflow** | A supported CareStack export/integration sends a deliberately limited attribution record to Google Ads Data Manager; it reduces manual work but requires CareStack field mapping and access review. | Depends on the vendor connection. | Moderate. |

The manual workflow is the lightweight starting option. A connected workflow should be selected only after CareStack confirms that its booking records preserve the landing-page attribution fields and that the practice approves the access model.

## Weekly Manual Workflow

1. In CareStack, export only appointments whose status is **confirmed** during the prior week. Exclude clinical notes, treatment, insurance, patient contact fields, and any record without a valid paid-click identifier.
2. Keep only the minimum import columns: `gclid` (preferred), `gbraid` or `wbraid` when available, the actual confirmation timestamp with timezone, the offline conversion action name, a non-PHI unique order/import ID, and consent state when available.
3. Deduplicate using the non-PHI order/import ID. Do not use a patient name, phone number, email address, chart number, or appointment reason as the identifier.
4. Upload the retained records to the dedicated **confirmed appointment** offline conversion action. Keep the action **secondary** until at least four weekly batches reconcile cleanly; then review whether it should become a primary bidding signal.
5. Review Google Ads diagnostics and reconciliation totals after every import. Correct rejected rows using the source system rather than re-uploading blindly.
6. Retain the weekly reconciliation count and import outcome in an internal operations log; do not retain exported patient data in this website repository.

## Required CareStack Confirmation Before Importing

The practice or CareStack administrator must verify all three items:

1. The booking flow preserves and exposes the approved click identifier or UTM fields in a reportable appointment/export record.
2. The export can be limited to the non-PHI attribution fields and confirmed timestamp described above.
3. The practice has a documented consent basis for its selected offline import method.

Google’s GCLID import guidance requires auto-tagging, capture of the GCLID on site, and storage of the GCLID with the corresponding prospect record. Google also notes that offline imports can use a GCLID with conversion timing and a conversion action; enhanced conversions for leads requires additional user-provided data, which is **out of scope** for this privacy-minimized dental workflow.[1][2]

## References

[1]: https://support.google.com/google-ads/answer/7012522?hl=en-GB "Google Ads Help — Set up offline conversions using Google click ID"
[2]: https://support.google.com/google-ads/answer/2998031?hl=en-GB "Google Ads Help — About offline conversion imports"
