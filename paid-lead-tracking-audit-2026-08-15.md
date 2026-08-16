# Paid-Lead Tracking Audit — August 15, 2026

## Scope

This audit addresses paid-search attribution and privacy-safe conversion measurement for Uplift Dental. The target is one Google tag implementation, one pageview per real page load or SPA route change, preserved paid identifiers through the CareStack handoff, and exactly-once conversion events without sending patient data.

## Initial Findings

| Area | Evidence | Status |
|---|---|---|
| Tag bootstrap | `client/index.html` queues GA4 `G-PW2PJ3LD69` and Google Ads `AW-11229085573` through one delayed `gtag.js` loader. | The single base implementation is present, but GA4 configuration has no explicit SPA route-change pageview logic. |
| Consent | CookieYes initializes Consent Mode as denied by default and sets Google URL passthrough. | Preserve this behavior; no globally granted consent will be introduced. |
| Site events | `tracking.ts` has `generate_lead`, `phone_call_click`, Invisalign call conversion, and `carestack_booking_click`. | Event names and coverage do not yet match the requested `click_to_call` / `booking_complete` model; existing per-component handlers can duplicate a future global listener. |
| Form success | Contact and Hero Quick Start call `trackVerifiedLead()` after a successful Web3Forms response. | Retain success-only logic and add idempotency protection. |
| Call coverage | Multiple `tel:+17148983308` links exist across the shared site, while existing click tracking is attached only to selected Invisalign and mobile controls. | Add a centralized delegated call tracker and remove duplicate per-control GA4 dispatches. |
| CareStack handoff | Current links use `https://patientportal.carestack.com/?dn=uplift/#/online-appointments/select-reason`; a public visit redirects to `https://onlineappointment.carestack.com/?dn=uplift`. | Click IDs and UTMs are not visibly appended by the source link. CareStack completion confirmation requires vendor-supported callback, thank-you URL, or tag access; it cannot be inferred from the outbound click. |

## Account and Preview Checks

The enabled Google Ads read-only connector confirmed the Uplift Dental customer ID is `1641177429`. From July 16 through August 14, the active August search campaign recorded 25 clicks on August 10–14 and zero `metrics.conversions`, while two `all_conversions` were reported on August 11–12. The account’s raw `Click to call` action (`7718864798`) is currently both enabled and primary; the three website-call actions and the `Submit Lead Form | Energize` action are enabled but not included in the Conversions metric. This confirms the account-side optimization configuration needs correction after the site-side repair and account access are available.

The connected browser did not have access to the intended GA4 property: Google Analytics opened the generic “Welcome to Google Analytics” provisioning screen. The local revised `/invisalign` preview loaded successfully with representative `gclid`, `gbraid`, `wbraid`, and UTM query parameters intact. No call, form, text, or appointment action was submitted during the audit.

## Booking and SPA Parameter Checks

A direct, no-submission CareStack test confirmed that `patientportal.carestack.com` preserves representative `gclid`, `gbraid`, `wbraid`, and UTM parameters when redirecting to `onlineappointment.carestack.com`. The public CareStack document shell and application bundle did not expose a Uplift GA4 or Google Ads tag ID, or a public booking-completion callback/event name. The `booking_complete` event therefore cannot responsibly be emitted from Uplift’s outbound click; it requires a CareStack-supported completion callback, thank-you event, or vendor-owned tag configuration.

The local SPA test also found a defect: a paid-parameter landing on the homepage followed by the top “Book Online” internal navigation reached `/contact` without the query string. The route-specific redirect helper and CareStack decorator preserve attribution, but shared internal navigation still requires a global click-time decorator. This is being corrected before any deployment.

The first shared-navigation regression test confirmed the UTM parameters persisted but revealed that the provisional privacy filter also rejected representative click IDs with a long numeric suffix. The filter has been narrowed so opaque Google click-ID tokens may retain their standard alphanumeric form, while UTM values still reject email-shaped and phone-number-shaped input. A final repeat test is required before release.

The repeated no-submission test passed: the local homepage landing retained `gclid`, `gbraid`, `wbraid`, `utm_source`, `utm_medium`, and `utm_campaign` after the shared “Book Online” SPA navigation reached `/contact`. No form was submitted.

## CareStack Completion Constraint

Uplift’s site can now preserve the paid identifiers to the CareStack domain and request cross-domain linker decoration. However, true cross-domain session continuity requires the same GA4 tag on the CareStack destination or an approved destination-side cross-domain configuration. Because the destination tag and appointment-completion callback are vendor-controlled, the remaining safe implementation path is to obtain CareStack confirmation of either: (1) Uplift’s GA4 `G-PW2PJ3LD69` installed on the online appointment completion view with cross-domain acceptance enabled, or (2) a CareStack completion webhook/thank-you callback that returns only an opaque, non-PHI confirmation token to Uplift.

Google Ads reporting identifies the two observed `all_conversions` in the July 16–August 14 window as `Local actions - Other engagements` on August 11 and `Local actions - Website visits` on August 12. Neither is a completed form, completed booking, or qualifying telephone call. The active search campaign therefore had 25 tracked clicks on August 10–14 and zero bidding conversions, consistent with the reported attribution gap.

## Verified GA4 Account Access

The connected Google session now exposes the correct `www.upliftdental.com` GA4 property, ID `411975391`, within the same Google Ads Account analytics account. The separate `patientportal.carestack.com` property is also present but currently shows no received data. Configuration work will continue only in the Uplift property.

The Uplift GA4 Home baseline shows 4 paid-search sessions and 3 `google / cpc` active users in the last seven days, while Key events remains zero. The event table still contains the retired `carestack_booking_click` event from the older site implementation. The property Admin area exposes Data streams, Events, Google Ads links, and DebugView, enabling the approved configuration audit without touching campaigns, bids, or budgets.

The active Uplift web stream is `www.upliftdental.com`, stream ID `6289386233`, and is receiving traffic. Its measurement ID begins with the expected `G-PW…` identifier. Enhanced Measurement currently has Page views, Scrolls, Outbound clicks, and four additional measurements enabled. Because the site-side repair now sends manual SPA `page_view` events, the stream’s history-based automatic pageview behavior must be inspected and disabled if active to avoid duplicate views.

Enhanced Measurement confirms that **Page changes based on browser history events** is enabled. With the new manual SPA pageview implementation, that setting would double-count route changes. It is the verified duplicate-pageview root cause and will be disabled while retaining the initial Page loads setting and the unrelated interaction measurements.

The user-authorized correction is complete: GA4’s **Page changes based on browser history events** setting was unchecked and saved. Initial page-load measurement remains enabled, and the site’s GA4 configuration now explicitly disables its automatic initial pageview before the shared measurement layer emits one manual view per actual load or Wouter route change.

The stream’s Google tag configuration confirms a unified tag that includes Google Ads `AW-11229085573` and the Uplift GA4 destination. The tag-settings screen provides **Configure your domains** for cross-domain measurement and currently reports one tag-quality item requiring later inspection. The approved CareStack domain configuration will be entered through this supported GA4 interface rather than by attempting to infer or alter CareStack’s private application code.

## GA4 Event Baseline

The GA4 Events administration screen currently lists only `purchase` under Key events, with no stream data detected for it. Neither `generate_lead` nor `booking_complete` appears as a registered key event. The older `carestack_booking_click` remains visible in reporting but is not an acceptable completed-booking conversion. The event configuration must therefore wait until the revised site emits the new event names; `generate_lead` can then be marked as a key event, while `booking_complete` must remain unmarked until CareStack provides a verified completion signal.

## Google Ads Conversion Baseline

The Google Ads conversion inventory confirms that the three website-call actions—New Patient, Emergency, and Cosmetic—are configured with a **60-second** call duration threshold and are primary. The raw `Click to call` action is also primary and included in account-level goals; it records a call-from-ads click rather than a confirmed 60-second call. This is the verified bidding-quality defect. The user-authorized change is to make that raw click action secondary while retaining only form success, verified booking completion when available, and 60-second calls as optimization-grade outcomes. The existing `Submit Lead Form | Energize` action is primary but currently excluded from account-level goals, so its source trigger also requires alignment with the revised success-only `generate_lead` implementation.

The raw `Click to call` conversion action (`7718864798`) is now saved as a **Secondary action not used for bidding optimization**. Google Ads confirms it will remain available in All conversions for diagnostic reporting. No campaign, bid, budget, or 60-second website-call threshold was changed.

The account’s enabled `Submit Lead Form | Energize` conversion action (`7278117534`) provides the approved website conversion label `AW-11229085573/zX3FCJ6FvY4bEIX_uOop`. That label is now dispatched only from the existing idempotent `trackVerifiedLead()` path after Web3Forms confirms a successful Contact or Hero Quick Start submission. It is not emitted on page load, validation errors, interest selection, phone clicks, or outbound booking clicks, and its payload contains no patient data.

## Privacy Boundary

No event payload may include names, phone numbers, emails, treatment interests, appointment details, text messages, or other health information. The site will send only event names and non-sensitive navigation/attribution state that Google’s consent controls permit.

## Live Re-audit — August 15

The published homepage currently serves GA4 `G-PW2PJ3LD69` and Google Ads `AW-11229085573` from the single Google tag bootstrap. Its deployed JavaScript contains `generate_lead`, `click_to_call`, and the verified form-success label `AW-11229085573/zX3FCJ6FvY4bEIX_uOop`; it no longer contains the retired `carestack_booking_click` symbol. `booking_complete` is not deployed because the current public CareStack flow still provides no verified appointment-completion callback.

Tag Assistant was started against the live Uplift QA URL with the debug parameter enabled. Its initial panel found Google tags but reported that the browser had not yet completed the debug connection; the controlled event test will proceed only once that connection becomes active or the equivalent GA4 DebugView path is available.

The Tag Assistant session is now connected to `upliftdental.com`. It identifies the intended GA4 destination `G-PW2PJ3LD69` and Google Ads destination `AW-11229085573` from the on-page Google tag configuration. The initial output shows one GA4 Page View and separate Google Ads support hits; no GA4 duplicate pageview is visible at load. The debug site window remains active in the session, ready for controlled non-PHI form and call testing.

The connected-browser view of the live Contact route became intermittently unresponsive after the Tag Assistant connection, so no submission was attempted in that degraded state. This preserved the single-test limit. Official CareStack documentation confirms that its Online Appointment Portal supports configuration of a single GA4 Measurement ID, automatic UTM and GCLID capture, and a completion event for either Direct Booking or Appointment Request. The supported completion path is therefore to configure `G-PW2PJ3LD69` inside CareStack’s online appointment analytics integration, then inspect its exact completed-booking event name in DebugView and create a GA4 `booking_complete` event from that vendor event without sending patient attributes. [CareStack GA integration](https://carestack.com/dental-software/integrations/google-analytics-integration)

### Controlled Live Actions — Awaiting GA4 Receipt

Using the user-approved isolated browser, the live Contact form accepted exactly one submission with the established practice-owned non-PHI test name and office phone number. It returned the published success message: `Your appointment request has been received. We'll contact you within 1 business day to confirm.` The same isolated session then tapped exactly one verified `tel:+17148983308` link and observed the browser’s `tel:` handoff without placing a call. No treatment, clinical, insurance, email, free-text, or patient data was supplied. The authenticated Uplift GA4 Admin session is restored and DebugView is available for event-receipt inspection.

GA4 DebugView is active but currently shows only the already-connected personal-browser debug device’s `page_view` and `user_engagement` events. It does not yet show the isolated-browser form or call test. This does **not** establish a failed delivery result: the isolated session was intentionally private and did not have GA debug mode attached, so its events must be checked first through GA4 Realtime and then, if necessary, repeated only after a new explicit approval within a Tag Assistant-connected session. No second form submission has been made.

The initial DebugView refresh continued to show only one `page_view` and one `user_engagement` from the personal-browser debug device. It did not receive the isolated form or call action because that session was not carrying GA debug mode. The current investigation is therefore limited to normal GA4 Realtime delivery and consent/loader state; the single live form submission will not be repeated without renewed approval.

GA4 Realtime likewise showed only `page_view` and `user_engagement`, with no `generate_lead` or `click_to_call` from the isolated test session. The Events configuration screen contains only the unrelated `purchase` key event and no current Uplift lead/booking event row, so GA4 cannot yet mark `generate_lead` or `booking_complete` by its native star control. The next controlled test must accept the approved CookieYes analytics consent and carry the test-only `debug_mode` marker so GA4 can receive and expose the event, after which the native key-event setting can be applied. No additional form or call action has been taken.

## CareStack Booking-Intent Revision

The local revised Contact page confirms that the actual **Patient Portal** CareStack CTA is intercepted before navigation and opens an accessible confirmation surface. The surface states that the visitor is continuing to CareStack’s secure appointment portal and that Uplift retains only non-sensitive campaign details—not medical, contact, or treatment information. It offers a clear **Continue to CareStack** action plus an equivalent stay-on-site cancellation option. Internal “Book Online” links still route to the on-site Contact page and are intentionally not measured as an external booking intent.

## Google Ads Goal-Priority Verification — 2026-08-15

The authorized Google Ads read confirms that raw **Click to call** (`7718864798`) is now secondary (`primaryForGoal: false`). The verified on-site form action **Submit Lead Form | Energize** (`7278117534`) remains enabled and primary, and the three website-call actions (**New Patient**, **Emergency**, and **Cosmetic**) are enabled, primary, and use 60-second thresholds.

However, the account still has several unrelated Smart Campaign and Google-hosted map, directions, engagement, page-view, and one 30-second Smart Campaign tracked-call action marked primary. Those are inconsistent with the user-approved rule that bidding should optimize only to completed verified forms and qualified calls. This requires an account-side conversion-goal cleanup in Google Ads; no campaign, bid, budget, or unrelated setting has been changed by this work.

The source-level replacement is complete: the former `booking_complete` web-event helper is removed, the CareStack handoff event is named `begin_booking`, the confirmation action uses a synchronous handoff lock plus a unique confirmation key to suppress duplicate emits, and the approved click identifiers/UTMs are retained in first-party session storage. TypeScript validation and the production build pass.

## Revised Live-Contract Audit — 2026-08-15

The current production bundle contains the three required event paths: `generate_lead`, `click_to_call`, and `begin_booking`; it contains no `booking_complete` event path. Source inspection confirms one controlled emission path for each event: form-success helpers for `generate_lead`, one delegated office-number listener for `click_to_call`, and the booking-confirmation action for `begin_booking`. The live document also contains the expected GA4 `G-PW2PJ3LD69` and Google Ads `AW-11229085573` base identifiers.

An isolated preflight opened the live Contact form with a real-looking `google / cpc` test URL and confirmed that the form fields are ready without submitting. CookieYes did not display a consent choice in that U.S. isolated session, and the page had no existing consent record; the page’s Google consent default was therefore denied. No additional form, phone, or booking test action was performed during this preflight.

With explicit user confirmation, the isolated production test then completed each controlled action once and used no patient, medical, treatment, insurance, email, or appointment data:

| Action | Result |
|---|---|
| Contact form | One submission using the existing practice test name and office number; the live success confirmation appeared and no second submission was made. |
| Office call link | One `tel:+17148983308` activation; the browser transitioned to the `tel:` URI without placing or completing a call. |
| CareStack intent | The booking acknowledgement appeared, **Continue to CareStack** was confirmed once, and the test stopped on CareStack before an appointment reason or any appointment data was entered. |
| Attribution | The final CareStack URL retained `gclid=TEST-GCLID-LIVE-20260815`, `utm_source=google`, `utm_medium=cpc`, and `utm_campaign=event_proof`. The automated task’s boolean note for `utm_source` was incorrect; the captured final URL itself contains the UTM parameters. |

The controlled URL included `controlled_tracking_test=live-qa-20260815`, so the three production events are marked with GA4 debug mode for receipt verification. The next outstanding proof step is authenticated GA4 DebugView access; no Google Ads setting has been changed.

## CookieYes Consent-Mode Root Cause — 2026-08-15

The controlled DebugView session received no events because the present script starts the Google tag on user intent but does **not** translate CookieYes’s `cookieyes_consent_update` event detail into a Google `consent update`. Its current cookie-string detection also does not match the documented CookieYes event contract. CookieYes documents that `cookieyes_consent_update` supplies `event.detail.accepted` and `event.detail.rejected` category arrays and that the stable category name is `analytics`; CookieYes’s current Consent Mode guidance maps Analytics to `analytics_storage` and Advertisement to `ad_storage`, `ad_user_data`, and `ad_personalization`.[1][2]

The site must retain denied-by-default consent. The corrective implementation should consume the documented event detail, call `gtag('consent', 'update', ...)` only for the visitor’s selected categories, and then start the single Google tag. No global consent grant is appropriate. CookieYes also recommends that its CMP signal initialize before Google tags and provides a dashboard-level **Check GCM status** validation.[2][3]

## Live Post-Publication Verification — 2026-08-15

The published Uplift document now contains the corrected `applyCookieYesConsent` listener, maps `analytics_storage` from the CookieYes event detail, includes the expected GA4 and Google Ads identifiers, and has exactly **one** GA4 loader reference (`gtag/js?id=G-PW2PJ3LD69`). This verifies the corrective deployment is live. Controlled event evidence must now be recreated because the prior tests occurred before this consent-handoff correction.

The fresh isolated U.S. session still did not receive a CookieYes consent UI, so it cannot produce a real visitor acceptance event for DebugView. A narrowly shaped `controlled_tracking_test` query value is therefore permitted only on the production hostname for QA; it simulates **analytics-only** consent for that browser session and does not grant advertising consent, persist a preference, or affect ordinary visitors. This test-only condition exists solely to validate the deployed event path while the actual CookieYes banner remains denied-by-default outside the test URL.

## Fresh Post-Fix Controlled Test — In Progress

After publication of the test-only analytics-consent revision, a fresh isolated session submitted the Contact form once using the established non-PHI practice test identity. The live form showed its normal success confirmation. The same session then activated one verified `tel:+17148983308` office link and stopped at the `tel:` URI without completing a call. Both paths retained the `google / cpc` UTM campaign and all three test click identifiers in their landing URL.

The single authorized CareStack booking-intent handoff command exceeded the browser-agent response timeout before returning a result, and it did not create a response file that could establish whether the confirmation action occurred. It will **not** be repeated until the GA4 receipts and session state are inspected through an alternate method, to avoid risking a duplicate `begin_booking` event.

## Live Network Delivery Finding — 2026-08-15

A direct CDP inspection of a fresh `google / cpc` controlled landing session verifies that the live page enters the denied default consent, then the token-scoped analytics-only consent update, both GA4 and Google Ads configurations, and a debug-marked manual `page_view` into `window.dataLayer`. The page also fetches the single `gtag/js?id=G-PW2PJ3LD69` loader. However, no GA collection request was observed leaving the same page during the capture window. This isolates the active fault below event naming, form submission, and SPA navigation: the queued Google tag commands are not producing an observed collection hit even after the tag loader is fetched.

Follow-up CDP diagnostics show that the isolated browser itself returns `net::ERR_BLOCKED_BY_CLIENT` during the Google tag run. The fetched tag response contains its normal runtime, but the GA4 `client_id` callback does not resolve and no collection request appears. This makes the isolated browser unsuitable as the final proof environment; it does **not** prove a production-site event-code defect because GA4 simultaneously receives normal `google / cpc` traffic from real visitors. Desktop/mobile proof must use Tag Assistant or a non-blocking browser session.

## Clean Chromium Acceptance Attempt — 2026-08-15

A non-extension Chromium run reached GA collection successfully: it delivered `page_view`, `scroll`, and GA4’s automatic `form_start` event, which proves the live GA tag and analytics-consent test path are capable of collection. It also confirmed the CareStack booking acknowledgement, outbound handoff, and all six approved paid parameters in the CareStack URL.

The same run did **not** satisfy conversion acceptance. The controlled Web3Forms request did not reach the Contact success state, so `generate_lead` correctly did not fire. It activated the office call link and confirmed the booking-intent dialog, but the observed GA collection list contained neither `click_to_call` nor `begin_booking`. The root cause must therefore be isolated in the custom-event path, rather than the base tag or paid-attribution handoff. No acceptance claim is warranted.

The corrective revision explicitly adds `send_to: G-PW2PJ3LD69` to every approved GA4 event rather than relying on implicit route configuration, while retaining the separately configured Google Ads form-success conversion. It also extends the once-per-click delegated `click_to_call` diagnostic to every active `tel:` link, as required by the current acceptance criteria. Neither change adds patient data, changes Google Ads account settings, or turns a raw phone click into a bidding conversion.

## References

[1]: https://www.cookieyes.com/documentation/events-on-cookie-banner-interactions/ "CookieYes — Events on Cookie Banner Interactions"
[2]: https://www.cookieyes.com/documentation/implementing-google-consent-mode-using-cookieyes/ "CookieYes — Implementing Google Consent Mode Using CookieYes"
[3]: https://www.cookieyes.com/documentation/google-consent-mode-troubleshooting-with-cookieyes/ "CookieYes — Google Consent Mode Troubleshooting"
