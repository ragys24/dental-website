# GA4 Controlled Lead Verification Handoff

**Purpose:** Confirm receipt of the single controlled, non-PHI Contact-form lead event.  
**Do not change:** Google Ads, GA4 settings, key-event status, conversion settings, campaigns, budgets, bids, tags, or Consent Mode.

## Known Test Facts

| Item | Value |
|---|---|
| Live page | `https://upliftdental.com/contact` |
| Test time | Approximately 9:59 PM Pacific, August 14, 2026 |
| Form result | Live Thank You state displayed after one submission |
| Client-side event | Exactly one `generate_lead` entry observed in `window.dataLayer` |
| Test data | Practice-owned test name and main office telephone only; no patient details or clinical information |

## Exact Verification Steps for Claude

1. Sign in at `https://analytics.google.com/` using the account that owns the Uplift Dental GA4 property with web stream **`G-PW2PJ3LD69`**.
2. Open the correct Uplift Dental property, then go to **Reports → Realtime**.
3. Find **Event count by Event name** and look for `generate_lead`. Confirm it appears **once** for the controlled test window. Take a screenshot that includes the property identity, event name, event count, and reporting time.
4. If Realtime has expired, use **Reports → Engagement → Events** after processing completes; filter/search for `generate_lead`, use the August 14 Pacific-date window, and capture the event count. Do not change its key-event status.
5. If GA4 DebugView is available for the current browser session, confirm the event path contains one `generate_lead` only. DebugView is supplemental; do not create a new test just to populate it.
6. Report one of the following outcomes verbatim:
   - **PASS:** “GA4 received exactly one `generate_lead` from the controlled Contact submission.”
   - **PENDING:** “The site emitted the event once, but GA4 reporting has not yet processed it.”
   - **FAIL:** “The event is not present after the reporting window; investigate consent/tag transport before another test.”

## Guardrails

- Do **not** submit the Contact form again.
- Do **not** mark `generate_lead` as a key event yet.
- Do **not** import it into Google Ads or make it a Primary bidding conversion yet.
- Do **not** adjust Auto-tagging, account links, Consent Mode, data-stream configuration, or any campaign setting.
- Do **not** use patient or medical information in any test.

## Evidence to Return

Return the GA4 screenshot plus the PASS/PENDING/FAIL statement. If the event is a PASS, the next controlled task is a separate review of whether to mark `generate_lead` as a GA4 key event and create/import the dedicated Google Ads completed-lead conversion. That decision is not part of this handoff.
