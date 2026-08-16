# Paid-Search Controlled Live Test Log

**Test authority:** User explicitly authorized one non-PHI live Contact-form submission on August 14, 2026.  
**Scope guardrails:** Use no patient identity, no medical details, no treatment request, and no production/Ads/DNS setting changes.

## Preflight

At approximately 9:58 PM Pacific on August 14, 2026, the published `https://upliftdental.com/contact?controlled_tracking_test=20260814` page loaded successfully in the browser. The rendered page displayed the live appointment form, Name and Phone fields, the Request Appointment button, the non-PHI privacy notice, CareStack handoff, and current published business contact information. This confirms that the user-published Manus checkpoint is serving the Contact route before the controlled submission.

The next permitted operation is one authorized test submission using a practice-owned test identity. Event observation in GA4/Google Ads remains account-dependent and will be recorded separately; browser account login has not yet been restored.

## Submission Attempt

At approximately 9:59 PM Pacific, the live form was populated once with the practice-owned non-PHI test name `Uplift Dental Tracking Test` and the practice telephone number `(714) 898-3308`. No symptoms, diagnosis, treatment request, or patient information was entered. The browser submitted the form once; its button changed to `Sending Request...`. The server response and resulting success/failure state remain pending at the time of this entry.

## Result

The live Contact form displayed its published `Thank You!` state and the message `Your appointment request has been received.` after the single submission. The controlled request therefore reached the form provider’s success branch.

Browser-page inspection of `window.dataLayer` immediately after this success state found exactly one event named `generate_lead` and no duplicate event name. This verifies that the published success-only code path queued the intended GA4 lead event once for the controlled submission. The form was not reloaded or resubmitted.

This is **client-side event evidence**, not yet confirmation of an Analytics reporting-row or Google Ads conversion. The browser remains signed out of GA4/Ads, and no direct Google Ads website-lead conversion label has been configured in the source. The remaining account-side requirement is to sign in, confirm event receipt in GA4 Realtime/DebugView, then create/import the dedicated lead conversion only after the exact-once event is observed there.

## GA4 Historical-Report Reconciliation

An external review of the GA4 Events report used the range **July 17–August 13, 2026** and found no `generate_lead`. That observation cannot diagnose this controlled test because the live submission occurred at approximately **9:59 PM Pacific on August 14, 2026**, after the reviewed range ended. The next account-side action is a historical GA4 query that includes August 14–15 in the property’s Pacific time zone. No tag, CareStack, conversion, or advertising-setting diagnosis should be made unless the corrected range is also missing the event.
