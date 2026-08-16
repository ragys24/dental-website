# Paid-Search Tracking Audit — Preliminary Offline Findings

**Scope:** `https://upliftdental.com/contact`, `https://emergency.upliftdental.com/`, and `https://upliftdental.com/invisalign`  
**Change safeguard:** No ad, keyword, bid, budget, campaign, landing-page copy, conversion-action, host, or DNS setting has been changed. No form or call test has been submitted.  
**Evidence limitation:** The Google Analytics and Google Ads account sessions are currently inaccessible because the browser control is frozen. This report separates confirmed code/package findings from account-level checks that remain open.

## Executive Finding

The reported August 10–13 aggregate is **20 Google Ads clicks versus 3 GA4 `google / cpc` sessions**, a **15% observed session-capture rate** before separating the August 13 deployment boundary. This is below the requested 80% future target, but it **cannot yet be used to judge the current implementation** because the report combines pre-update and post-update time, and neither the exact Los Angeles deployment time nor the GA4/Ads account reports are available in the frozen browser session.[1]

The code audit nevertheless identifies two confirmed gaps that explain why completed leads are not currently suitable for Google Ads bidding: the Contact form success state emits no GA4 lead event and no Google Ads lead conversion, while the Emergency page records every phone-link click rather than a verified/meaningful call. A third probable contributor to the paid-session gap is the main-site tag loader’s interaction-gated network loading, which can miss short paid visits before a click or consent update triggers the external Google tag.

> **Do not select any page view, generic button click, `phone_call_click`, `invisalign_text_click`, or unverified booking click as a bidding conversion.** The appropriate bidding action is one completed, deduplicated lead completion after it has been verified in both GA4 and Google Ads.

## Requested Before/After Baseline

| Period in Los Angeles time | Google Ads evidence supplied | GA4 evidence supplied | What can be concluded now |
|---|---:|---:|---|
| Aug. 10–13, combined | 20 clicks: New Patient 19 clicks/$221.25, Emergency 1 click; Invisalign 13 impressions/0 clicks | 3 `google / cpc` sessions; 0 key events | Observed capture rate is 3 ÷ 20 = **15%**; not a valid post-fix reconciliation because pre- and post-Aug. 13 activity is mixed. |
| Pre-Aug. 13 update | Not separately supplied | Not separately supplied | Must be filtered and reported separately after account access returns. |
| Post-Aug. 13 update | Not separately supplied | Not separately supplied | Must be compared only after the precise release timestamp is identified in Los Angeles time. |

## Confirmed Implementation Findings

| Paid path | Confirmed tag/consent state | Lead/completion state | Risk or failure |
|---|---|---|---|
| `/contact` | Main source contains GA4 `G-PW2PJ3LD69`, Google Ads `AW-11229085573`, CookieYes, denied-by-default Consent Mode, and `url_passthrough`. The external Google tag is loaded only after pointer/keyboard intent or an eligible CookieYes update. | The Web3Forms success handler calls only Meta `Contact` and `Schedule`; it fires **no GA4 `generate_lead`** event and **no Google Ads lead conversion**. | A valid completed Contact request cannot appear as a GA4 key event or a Google Ads bidding conversion. Short paid sessions can be missed before tag-loader activation. |
| `/invisalign` | Shares the main tag/consent implementation. The dedicated page emits `phone_call_click` for a call tap and `invisalign_text_click` for a text tap. | The call-tap helper also sends the existing Google Ads conversion label `AW-11229085573/4qSzCJ6P0uAcEIX_uOop`. Text is kept separate. There is no form completion on this page. | A call tap is an intent signal, not proof of a completed consultation. It should remain a diagnostic/micro-conversion unless the existing Ads conversion is explicitly configured for click-to-call reporting rather than bidding. |
| `emergency.upliftdental.com` | The emergency export contains the same GA4 and Google Ads IDs plus CookieYes and denied-by-default Consent Mode. It loads the Google tag immediately, unlike the main-site interaction-gated loader. | No form exists, consistent with the no-PHI emergency-page rule. The app delegates every `tel:+17148983308` click to `phone_call_click`, sending it to GA4 and the Ads tag without a conversion label or a connected-call confirmation. | Every click on the emergency phone number can be recorded; repeat clicks are not deduplicated and a meaningful connected call is not established. |

## Additional Attribution Risks

### Interaction-gated main-site tag loading

The main site queues `gtag('config', ...)` calls, but it delays loading `gtag.js` until the visitor interacts or CookieYes reports an eligible consent choice. That preserves performance and denied-by-default consent, but it can fail to dispatch a normal tag request for an ad visitor who lands, reads, and leaves without a pointer/keyboard event. It is a plausible code-level reason for some of the 20-versus-3 gap; account evidence is still required to quantify it.

The safe remediation is **not** to grant consent globally. It is to load the Google tag consistently after the current default-denied Consent Mode initialization, preserve CookieYes control, and validate exactly what GA4 receives under accepted versus declined consent. This requires a deliberate privacy review and live test rather than a blind code change.

### Click IDs and redirects

Google Ads auto-tagging appends a `gclid` parameter and requires it to reach the final landing page.[2] The main Express Phase 2 routing code builds canonical redirects from the path alone. When a `www`, HTTP, trailing-slash, or legacy redirect passes through that server path, its redirect target currently omits the original query string. A `gclid` can therefore be lost on those redirecting variants. Direct canonical `/contact` and `/invisalign` URLs do not need a redirect, but every paid final URL and redirect variant must be tested.

### Cross-domain booking

The Contact page sends visitors to CareStack and records only a `carestack_booking_click`; the code cannot see a completed booking. No verified cross-domain linker configuration is present in the main source. GA4 cross-domain measurement can preserve a user/session across domains through the `_gl` parameter when both domains are configured; redirects must preserve that parameter.[3] It remains unknown whether CareStack accepts the linker parameter or can return a trusted completion signal.

### Emergency call quality

The emergency page properly avoids a medical form. A true emergency lead conversion should instead be based on a qualified connected call through Google Ads website-call reporting or an approved call-tracking integration with a meaningful duration threshold. A raw `tel:` click should remain an engagement event, not the primary bidding conversion.

## Smallest Safe Remediation Plan

| Priority | Proposed change | Why it is minimal | Requires account/browser evidence first? |
|---|---|---|
| 1 | Add a single GA4 `generate_lead` event **only after** `data.success === true` in the Contact form; protect it with one-success-per-submission state. | Uses the existing success branch and does not count page views, submission attempts, refreshes, or errors. | No for code design; yes before it is marked a GA4 key event or imported to Ads. |
| 2 | Add one direct Google Ads conversion call to that same verified Contact success branch using a new/confirmed website lead conversion label. | Makes a completed lead appear once in both platforms, without reusing phone-click conversions. | **Yes.** The conversion action/label and bidding designation must be confirmed in Google Ads. |
| 3 | Preserve the original query string for all canonical/legacy server redirects and test `?gclid=TEST...` plus `_gl`. | Prevents an avoidable click-ID loss without changing destinations, ads, or pages. | No for code design; live verification required before release. |
| 4 | Rework main-site Google-tag loading so it starts reliably under current default-denied Consent Mode rather than only after interaction, while retaining CookieYes choices. | Addresses session measurement at the tag-loader level without globally granting consent. | **Yes.** Consent behavior must be live-tested with accepted and declined states. |
| 5 | Keep `phone_call_click`, `invisalign_text_click`, and CareStack click events as diagnostics only. | Avoids bidding on intent clicks. | Yes, to inspect current Primary/Secondary conversion settings. |
| 6 | Replace Emergency’s primary bidding use of phone-click events with a verified connected-call conversion, and ensure one event per qualified call. | Meets the emergency no-form rule and avoids duplicate/meaningless call optimization. | **Yes.** Requires Ads conversion source and call-duration configuration. |
| 7 | Configure/verify cross-domain measurement only if CareStack can support the linker/completion path. | Avoids incorrectly claiming booking completion from an outbound click. | **Yes.** Requires GA4 Admin and CareStack confirmation. |

## Controlled Live-Test Plan — Requires Approval

No live test can be considered passed until it starts from an actual Google Ads click or a controlled test URL with the real tag path, then proves session attribution and a single lead conversion in both products. Test submissions will use a practice-owned test identity and **no protected health information**.

| Test | Preconditions | Pass criterion | Must not happen |
|---|---|---|---|
| Canonical paid landing | Auto-tagging confirmed; a controlled Google Ads click or `gclid` test is available; CookieYes state is recorded. | GA4 real-time/DebugView shows a paid session under `google / cpc` when consent permits storage/measurement. | `gclid` disappears through redirect; session becomes direct/referral/unassigned without a documented consent limitation. |
| Contact verified lead | New direct Ads website-lead conversion configured; test name/phone are practice-owned; no PHI. | One successful form completion creates exactly one GA4 `generate_lead` and exactly one Ads website-lead conversion. | A refresh, repeat click, failure response, or duplicate tag creates another lead conversion. |
| Invisalign call | Existing call setup and intended bidding status confirmed. | One tap produces the intended diagnostic click event; only the chosen verified call action is eligible for bidding. | Text CTA fires the call conversion or the call tap creates duplicated events. |
| Emergency call | Qualified-call source and duration threshold configured. | One meaningful test call produces one qualified call conversion. | Each `tel:` click is counted as a bidding conversion, or repeat clicks duplicate the conversion. |
| CareStack handoff | GA4 cross-domain/allowed-domain setup confirmed; CareStack test path approved. | `_gl` persists to the destination and any completion is counted only from a trusted completion signal. | The outbound click is treated as a completed appointment. |

## Account Checks Deferred Until Browser Recovery

1. Verify Google Ads auto-tagging is enabled and whether a cross-account conversion setup changes that expectation.
2. Verify GA4 `G-PW2PJ3LD69` and Google Ads `AW-11229085573` are linked to the intended property/account.
3. Export sessions by default channel group/source-medium and ad click/cost data separately for pre- and post-August 13 in `America/Los_Angeles`.
4. Inspect every current conversion action, its source, count setting, Primary/Secondary status, and bidding inclusion.
5. Confirm CookieYes’ actual Consent Mode update behavior in a live browser, including with a declined choice.
6. Check whether CareStack supports the required cross-domain linker and a non-PHI, trusted completion callback.
7. Run the controlled live-test matrix, then calculate the **post-fix** reconciliation rate: attributed GA4 `google / cpc` sessions ÷ legitimate Google Ads clicks. The target is at least 80% over a meaningful post-fix batch, interpreted alongside consent rate, ad blockers, and invalid-click filtering.

## References

[1] User-supplied paid-search audit brief in `pasted_content.txt`, received August 14, 2026.

[2] [Google Ads Help — About auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en).

[3] [Google Analytics Help — Set up cross-domain measurement](https://support.google.com/analytics/answer/10071811?hl=en).

[4] Main-site implementation: `client/index.html`, `client/src/pages/Contact.tsx`, `client/src/pages/Invisalign.tsx`, `client/src/lib/tracking.ts`, and `server/index.ts`.

[5] Emergency staging export: `/home/ubuntu/exports/uplift-emergency-siteground-static-export.zip`.
