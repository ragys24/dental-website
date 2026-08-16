/**
 * UPLIFT DENTAL — Measurement Layer
 *
 * Owns manual GA4 SPA pageviews and delegated high-intent click tracking so
 * individual CTA components cannot produce duplicate Google events.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { captureAttribution, withPaidAttribution } from "@/lib/attribution";
import BookingIntentConfirmation, { requestBookingIntent } from "@/components/BookingIntentConfirmation";
import { trackClickToCall, trackPageView } from "@/lib/tracking";

const CARESTACK_HOSTS = new Set(["patientportal.carestack.com", "onlineappointment.carestack.com"]);
function isTelephoneLink(href: string): boolean {
  return href.trim().toLowerCase().startsWith("tel:");
}

export default function Measurement() {
  const [location] = useLocation();
  const lastTrackedLocation = useRef<string | null>(null);

  useEffect(() => {
    captureAttribution();
    const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (lastTrackedLocation.current === currentLocation) return;
    lastTrackedLocation.current = currentLocation;
    trackPageView();
  }, [location]);

  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const preserveAttribution = (url?: string | URL | null): string | URL | null | undefined => {
      if (url === undefined || url === null) return url;
      const destination = new URL(url.toString(), window.location.origin);
      if (destination.origin !== window.location.origin) return url;
      return withPaidAttribution(`${destination.pathname}${destination.search}${destination.hash}`);
    };

    window.history.pushState = function pushState(data, unused, url) {
      return originalPushState.call(window.history, data, unused, preserveAttribution(url));
    };
    window.history.replaceState = function replaceState(data, unused, url) {
      return originalReplaceState.call(window.history, data, unused, preserveAttribution(url));
    };

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || event.defaultPrevented) return;

      const href = anchor.getAttribute("href") || "";
      if (isTelephoneLink(href)) {
        trackClickToCall();
        return;
      }

      try {
        const destination = new URL(anchor.href, window.location.origin);
        if (CARESTACK_HOSTS.has(destination.hostname)) {
          event.preventDefault();
          event.stopPropagation();
          requestBookingIntent(anchor.href);
        }
      } catch {
        // Invalid or non-web links are not measurement handoffs.
      }
    };

    // Capture phase pauses the external handoff before navigation so the visitor
    // can explicitly confirm booking intent without collecting any health data.
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return <BookingIntentConfirmation />;
}
