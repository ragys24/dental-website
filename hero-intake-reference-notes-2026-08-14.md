# Hero Intake Reference Notes

The requested Anna Dental reference was reviewed only for its high-level conversion structure. Its visible above-the-fold pattern combines editorial hero copy with a quiet, high-contrast, right-side intake surface. It also relies on an assessment/journey framing and a simple primary action.

Uplift will not copy its wording, imagery, assessment claim, review count, component geometry, or visual arrangement. The original Uplift treatment will instead use a compact **“Find your best next step”** intent selector positioned as a subtle translucent hero-side panel. It will offer only existing, non-clinical choices—`Invisalign & braces`, `Cosmetic smile goals`, `Urgent dental care`, and `General dental visit`—and each choice will route to an existing appropriate consultation/booking path. It will not collect a name, phone, health information, symptoms, insurance details, or any protected health information.

The panel must remain optional, preserve the established call and CareStack booking actions, meet keyboard-accessibility and reduced-motion requirements, and collapse to a clear one-column continuation on small screens. It must use the existing Uplift deep-teal, ivory, and pale-aqua language rather than the reference’s navy/white styling.

## Local Preview Check

The local desktop preview was checked after implementation. The Uplift treatment appears as a small, translucent deep-teal panel beneath the established primary hero actions rather than as a copied right-side form. The existing hero text, hero image subjects, call button, booking button, text CTA, and trust signals remain visible. The four guidance choices are rendered as clearly labeled keyboard-focusable links to established Uplift paths. No personal, health, insurance, or appointment information is requested in the hero surface.

## Deployed Review

The production homepage was reviewed on August 14, 2026. The original banner is live beneath the established hero call-to-action cluster and preserves the hero’s left-side reading path and the mother-and-child imagery at right. The surface remains visually subordinate to the primary Book Free Consultation and phone CTAs, while its four concise choices remain immediately understandable. Because the deployed treatment meets the original-reference constraints, no further visual change is recommended at this time.

## Quick-Start Interaction Adaptation

The supplied reference uses a hero-side card that invites a short smile-assessment journey. Uplift’s new treatment preserves only that high-level interaction pattern: a compact, optional hero-side quick start. It uses original Uplift copy, colors, spacing, visual hierarchy, and service labels.

The Uplift flow deliberately does not ask assessment questions or collect clinical information. Visitors may choose a broad non-clinical interest—orthodontic consultation, cosmetic dentistry, general dentistry, or urgent care. Urgent care always routes to click-to-call rather than a form. For the three non-urgent interests, the only collected details are name and mobile number, which reuse the established appointment-request provider and success-only `generate_lead` flow. The component explicitly prohibits symptoms, diagnoses, insurance details, free text, uploads, and all other health information.

## Local Form-Path Validation

The local preview was checked after implementation. Choosing “A straighter smile” opens a second state that displays only the selected broad label, a name field, a mobile-number field, a Request a call button, a selection-change control, and the prominent no-health-information notice. The initial hero state contains no input fields. This confirms that clinical free text and hidden assessment questions were not introduced into the quick-start path.

The local preview’s “Urgent care today” route was also exercised. It leaves the four broad choices visible but adds only a direct call action and a return control; no input field, message box, submission control, or patient-information payload is available in the emergency branch.

Browser DOM verification confirmed that the active emergency card contains **0 forms**, **0 inputs**, and one direct `tel:+17148983308` call target. The non-urgent submit success state was not exercised because it would create a real external request; it intentionally reuses the existing Web3Forms success path and its success-only lead measurement logic.

## Name-First and Contact-Choice Revision

The non-urgent flow now progresses from broad interest selection to a name-only stage and then to a separate contact stage. Browser validation confirmed that the name stage exposes only one required text field and advances without a network submission. The contact stage exposes optional mobile and email fields, announces that at least one is required, and blocks an empty submission with an accessible error before any request is sent. The contact-stage action is labeled “Request a follow-up,” so an email-only path does not imply a telephone call. A valid mobile-only or email-only completion will use the pre-existing Web3Forms success flow, which remains intentionally untested until the user authorizes a real non-PHI request.

## Invisalign and Motion Refinement

The orthodontic choice is now a visually featured first card with a dedicated **Invisalign®** badge, higher-contrast teal treatment, and retained “Invisalign® & braces” detail. Each interest, name, contact, and completion state is keyed into a short horizontal slide-in transition. Browser inspection confirms the `hero-quick-start-slide` animation is active under normal motion preferences. A global `prefers-reduced-motion: reduce` override disables the animation.

The success path preserves the existing privacy-safe tracking order: Web3Forms must first return `success`; only then does the component dispatch the legacy Meta `Lead` and one idempotent GA4 `generate_lead` through `trackVerifiedLead`. Interest selection, stage views, validation errors, and failed requests do not dispatch those events.
