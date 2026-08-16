/**
 * UPLIFT DENTAL — Paid Attribution Preservation
 *
 * Maintains only approved ad-click and campaign parameters in page memory for
 * the active browsing session. It never reads form fields or sends patient data.
 */

const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
type Attribution = Partial<Record<AttributionKey, string>>;

const attribution: Attribution = {};
const ATTRIBUTION_STORAGE_KEY = "uplift_paid_attribution_v1";

function isSafeAttributionValue(key: AttributionKey, value: string): boolean {
  if (!value || value.length > 160 || /[\r\n<>]/.test(value)) return false;
  if (key === "gclid" || key === "gbraid" || key === "wbraid") {
    // Google click IDs routinely contain long numeric segments, so they cannot
    // use the UTM phone-number heuristic below. Restrict them to opaque token
    // characters instead of trying to interpret their values.
    return /^[A-Za-z0-9._~-]+$/.test(value);
  }
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/\d{7,}/.test(value);
}

function readStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}") as Record<string, unknown>;
    const safe: Attribution = {};
    for (const key of ATTRIBUTION_KEYS) {
      const value = stored[key];
      if (typeof value === "string" && isSafeAttributionValue(key, value)) safe[key] = value;
    }
    return safe;
  } catch {
    return {};
  }
}

function persistAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

export function captureAttribution(search = typeof window === "undefined" ? "" : window.location.search): Attribution {
  Object.assign(attribution, readStoredAttribution());
  const params = new URLSearchParams(search);
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    if (value && isSafeAttributionValue(key, value)) attribution[key] = value;
  }
  persistAttribution();
  return { ...attribution };
}

export function getAttribution(): Attribution {
  captureAttribution();
  return { ...attribution };
}

function decorateUrl(input: string, base: string): URL {
  const url = new URL(input, base);
  const values = getAttribution();
  for (const [key, value] of Object.entries(values)) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url;
}

/** Preserve approved paid parameters in an internal client-side navigation. */
export function withPaidAttribution(path: string): string {
  if (typeof window === "undefined") return path;
  const url = decorateUrl(path, window.location.origin);
  return `${url.pathname}${url.search}${url.hash}`;
}

/**
 * Decorate an outbound CareStack link with non-sensitive paid parameters.
 * Google’s cross-domain linker appends `_gl` separately at click time.
 */
export function withCareStackAttribution(href: string): string {
  if (typeof window === "undefined") return href;
  return decorateUrl(href, window.location.origin).toString();
}
