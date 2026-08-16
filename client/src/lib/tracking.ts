/**
 * UPLIFT DENTAL — Privacy-Safe Conversion Event Tracking
 *
 * Tracks approved conversion events for ad performance measurement.
 * GA4 and Google Ads are governed by the Consent Mode initialization in index.html.
 * No phone number, SMS text, name, appointment detail, or other patient information
 * is ever sent with the approved GA4 event calls below.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    __upliftStartGoogleTag?: () => void;
  }
}

type MeasurementEvent = "generate_lead" | "click_to_call" | "begin_booking" | "page_view" | "invisalign_text_click";
type MeasurementParameters = Record<string, string | boolean>;
const GA4_MEASUREMENT_ID = "G-PW2PJ3LD69";

function isControlledDebugSession(): boolean {
  if (typeof window === "undefined") return false;
  const isLiveUpliftHost = /^(www\.)?upliftdental\.com$/i.test(window.location.hostname);
  return isLiveUpliftHost && new URLSearchParams(window.location.search).has("controlled_tracking_test");
}

function trackGoogleEvent(eventName: MeasurementEvent, parameters?: MeasurementParameters): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.__upliftStartGoogleTag?.();
    window.gtag("event", eventName, {
      send_to: GA4_MEASUREMENT_ID,
      ...parameters,
      ...(isControlledDebugSession() ? { debug_mode: true } : {}),
    });
  }
}

const emittedSuccessEvents = new Set<string>();
const GOOGLE_ADS_FORM_SUCCESS_CONVERSION = "AW-11229085573/zX3FCJ6FvY4bEIX_uOop";

function reportGoogleAdsConversion(sendTo: string): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.__upliftStartGoogleTag?.();
    window.gtag("event", "conversion", { send_to: sendTo });
  }
}

/**
 * Manual SPA pageview. The initial GA4 configuration disables automatic
 * pageviews, so each real page load or Wouter location transition is sent once.
 */
export function trackPageView(): void {
  if (typeof window === "undefined") return;
  trackGoogleEvent("page_view", {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

/** Fire the legacy Meta Pixel Schedule event when the pixel has loaded. */
export function trackSchedule(): void {
  if (typeof window !== "undefined") window.__upliftStartGoogleTag?.();
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Schedule");
  }
}

/** Track one confirmed CareStack handoff; it is a secondary booking-intent diagnostic, never a completed appointment. */
export function trackBeginBooking(confirmationKey: string): void {
  const eventKey = `begin_booking:${confirmationKey}`;
  if (emittedSuccessEvents.has(eventKey)) return;
  emittedSuccessEvents.add(eventKey);
  trackSchedule();
  trackGoogleEvent("begin_booking");
}

/**
 * Track one confirmed non-PHI form success per form surface. A duplicate click,
 * retry, or React render cannot emit a second `generate_lead` from that surface.
 */
export function trackVerifiedLead(surface: "contact_form" | "hero_quick_start"): void {
  const eventKey = `generate_lead:${surface}`;
  if (emittedSuccessEvents.has(eventKey)) return;
  emittedSuccessEvents.add(eventKey);
  trackGoogleEvent("generate_lead");
  reportGoogleAdsConversion(GOOGLE_ADS_FORM_SUCCESS_CONVERSION);
}

/** Raw telephone-click diagnostic. It is not a completed phone-call conversion. */
export function trackClickToCall(): void {
  trackGoogleEvent("click_to_call");
}

/** Track an Invisalign text CTA without passing message or patient data. */
export function trackInvisalignText(): void {
  trackSchedule();
  trackGoogleEvent("invisalign_text_click");
}

/** Fire the legacy Meta Pixel Lead event when the pixel has loaded. */
export function trackLead(): void {
  if (typeof window !== "undefined") window.__upliftStartGoogleTag?.();
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}

/** Fire the legacy Meta Pixel Contact event when the pixel has loaded. */
export function trackContact(): void {
  if (typeof window !== "undefined") window.__upliftStartGoogleTag?.();
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact");
  }
}
