# Google Ads and GA4 Measurement Checklist

**Purpose:** Prepare Uplift Dental’s accounts for one verified completed lead conversion, reliable paid-session attribution, and call-quality measurement.  
**Do not change:** budgets, bids, campaign settings, keywords, landing-page URLs, or DNS while completing this checklist.  
**Important:** The main-site code fix is built and validated locally/staging but is **not yet live**. Do not mark or import a lead event as a bidding conversion until the live completion test passes.

## 1. Google Ads — Check First, Do Not Change Yet

Open **Google Ads → Admin → Account settings → Auto-tagging** and confirm that **“Tag the URL that people click through from my ad”** is enabled. Google states that auto-tagging adds `gclid` and is needed for website conversion tracking across browsers; redirects must preserve the identifier to the final landing page.[1]

| Screen | What to verify | Correct state |
|---|---|---|
| **Admin → Account settings → Auto-tagging** | Auto-tagging | **On**. Take a screenshot; do not turn it off. |
| **Goals → Conversions → Summary** | Existing call conversion `AW-11229085573/4qSzCJ6P0uAcEIX_uOop` | Record its source, category, counting method, Primary/Secondary status, and campaign inclusion. It must not be the only conversion used to optimize for completed consultations. |
| **Goals → Conversions → Summary** | Page-view, generic click, call-tap, text-tap, and booking-click actions | Record all; do not delete anything yet. These are diagnostic actions, not verified completed leads. |
| **Linked accounts** | GA4 link | Confirm the GA4 property containing web stream `G-PW2PJ3LD69` is linked to this Ads account. |

> **Screenshot request:** Send screenshots of Auto-tagging and the full Conversions Summary table, including each action’s “Primary/Secondary” and “Included in account-default goals” status. I can then tell you precisely what to change without guessing.

## 2. Create the Correct Future Lead Conversion — Wait for Confirmation

After the corrected Contact form is live and its GA4 success event is observed, create or confirm **one** dedicated Google Ads website conversion action:

| Field | Recommended setting |
|---|---|
| Conversion name | `Completed appointment request — Contact` |
| Source/category | Website → Submit lead form |
| Trigger | Only after the Contact form receives its success response; never on form view, button click, error, refresh, or page load. |
| Count | **One** per ad interaction. |
| Value | No value unless the practice has a documented lead-value model. Do not invent a dollar amount. |
| Optimization | Start as **Secondary** until the controlled test confirms one event in both GA4 and Google Ads. Promote to Primary only after confirmation. |

When Ads gives you the new website conversion label, send it to me. I will wire that label into the already-built success-only code path, test it once with a practice-owned non-PHI submission, and keep every click event separate.

## 3. Calls: Keep Intent Clicks Separate from Qualified Calls

The existing Invisalign website call handler is correctly click-only and is separate from the text CTA. It should remain a **diagnostic engagement signal** until its account-side role is reviewed. The Emergency site should not use every `tel:` click as a bidding conversion.

For meaningful-call measurement, configure a dedicated Google Ads **Calls from website** conversion or an approved call-tracking source. Choose a documented qualifying duration with the practice—for example, a threshold of **60 seconds or more** if that reflects a meaningful receptionist/consultation conversation. Set the conversion to count **one qualified call**, not every button tap. Do not reuse the completed-form lead action for calls.

| Conversion type | Use for bidding? | Why |
|---|---|---|
| `phone_call_click` / raw `tel:` click | No; keep as Secondary/diagnostic | It proves intent, not connection or quality. |
| `invisalign_text_click` | No; diagnostic only | A text request is not an appointment completion. |
| Verified website call above approved duration | Yes, after test | It reflects a meaningful connected call. |
| Completed Contact request | Yes, after test | It occurs only on verified success response. |

## 4. GA4 — Verify and Prepare, But Do Not Mark a Key Event Early

Open **GA4 → Admin** for the property with web stream `G-PW2PJ3LD69`.

| Screen | What to verify or prepare |
|---|---|
| **Product links → Google Ads Links** | Confirm the correct Ads account is linked and personalized advertising is handled according to the practice’s consent/privacy policy. |
| **Data streams → Web → Configure tag settings** | Confirm the domain/tag configuration includes `upliftdental.com` and the emergency subdomain is consistently tagged. Do not add CareStack until CareStack confirms it supports the GA linker and a trusted completion path. |
| **Events** | After the code is live, confirm the new `generate_lead` appears **only after** a verified successful Contact request. |
| **Key events** | Mark `generate_lead` as a key event only after the live controlled test proves one event per completed submission. |
| **DebugView / Realtime** | Use the controlled test to observe the consent state, `generate_lead`, call click, text click, and CareStack click behavior. Never send names, phone numbers, medical details, or treatment details in event parameters. |

GA4 cross-domain measurement only preserves a single user/session across root domains when both sites are correctly configured and the destination retains the `_gl` linker parameter.[2] The current CareStack handoff is an outbound booking click, not a confirmed appointment. Do not configure or claim completed-booking attribution until CareStack confirms compatibility.

## 5. Exact Reports to Pull After Browser Access Works

Use **Los Angeles time** and split activity at the exact August 13 tracking-release timestamp. Do not use the combined Aug. 10–13 total to decide whether the fix worked.

| Report | Required dimensions/metrics |
|---|---|
| Google Ads | Date/time, campaign, final URL, clicks, cost, conversion action, conversions, all conversion actions. |
| GA4 Traffic acquisition | Session source/medium, landing page + query string, sessions, engaged sessions, key events, and event count. |
| GA4 Events | `generate_lead`, `phone_call_click`, `invisalign_text_click`, `carestack_booking_click`; separate by landing page and consent state where available. |
| Reconciliation | **Paid GA4 sessions ÷ legitimate Google Ads clicks** for the post-fix period. Target at least 80% over a meaningful sample, interpreted alongside consent rate, ad blockers, invalid-click filtering, and time-zone alignment. |

## 6. Production Release Choice Needed

Two paths are ready; neither will be taken without explicit approval.

| Option | What changes | Recommended use |
|---|---|---|
| **A. Publish on the current Manus host first** | Publishes the validated route/SEO and tracking changes to the existing live host; DNS stays unchanged. | Recommended if Manus remains available long enough for one clean live tag and lead test. It creates the clearest pre-cutover measurement baseline. |
| **B. SiteGround DNS cutover** | Points `upliftdental.com` to the fully staged package after final production-host checks. | Use only when you are ready to replace Manus hosting. It is a separate production/DNS action and must include immediate tag, route, media, and conversion verification. |

## 7. What to Send Me

1. Screenshot of **Auto-tagging** (enabled state).  
2. Screenshot/export of the **Conversions Summary** with Primary/Secondary and account-default goal columns.  
3. Screenshot of **GA4 → Product links → Google Ads Links**.  
4. The exact date/time in Los Angeles time when you want the paid measurement release live.  
5. Your selected release path: **A (publish on current Manus host)** or **B (SiteGround DNS cutover)**.

## References

[1] [Google Ads Help — About auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en).

[2] [Google Analytics Help — Set up cross-domain measurement](https://support.google.com/analytics/answer/10071811?hl=en).
