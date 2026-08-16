/**
 * SEORedirect — A crawler-friendly redirect component for SPAs.
 *
 * Unlike wouter's <Redirect> (which renders null and only does JS navigation),
 * this component:
 *  1. Injects a <meta http-equiv="refresh"> tag so crawlers see a proper redirect signal
 *  2. Renders visible "Redirecting…" content with a clickable link (prevents soft 404)
 *  3. Still performs instant JS navigation for real users
 *
 * Use this instead of <Redirect> for any legacy URL that Google is actively crawling.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { withPaidAttribution } from "@/lib/attribution";

interface SEORedirectProps {
  to: string;
}

export default function SEORedirect({ to }: SEORedirectProps) {
  const [, setLocation] = useLocation();
  const destination = withPaidAttribution(to);

  // Inject meta refresh into <head> for crawlers that don't execute JS fully
  useEffect(() => {
    const fullUrl = destination.startsWith("http")
      ? destination
      : `https://upliftdental.com${destination}`;

    // Add meta refresh tag
    const meta = document.createElement("meta");
    meta.httpEquiv = "refresh";
    meta.content = `0;url=${fullUrl}`;
    document.head.appendChild(meta);

    // Update canonical to the target URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = fullUrl;
    }

    // Ensure robots says index, follow (not noindex)
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", "index, follow");
    }

    // JS navigation for real users (fires immediately)
    setLocation(destination, { replace: true });

    return () => {
      meta.remove();
    };
  }, [destination, setLocation]);

  // Render actual visible content so the page is never "empty" for crawlers
  const fullUrl = destination.startsWith("http")
    ? destination
    : `https://upliftdental.com${destination}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        fontFamily: "DM Sans, sans-serif",
        color: "#1a6b6b",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        This page has moved
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1.5rem" }}>
        You are being redirected to our updated page.
      </p>
      <a
        href={fullUrl}
        style={{
          color: "#1a6b6b",
          textDecoration: "underline",
          fontSize: "1rem",
        }}
      >
        Click here if you are not redirected automatically
      </a>
    </div>
  );
}
