/**
 * PageSEO — injects per-page canonical, meta description, OG title, OG description,
 * and OG image into the <head> using vanilla DOM manipulation (no react-helmet needed).
 * Call this at the top of each page's return statement.
 */
import { useEffect } from "react";
import { PRACTICE } from "@/lib/constants";

interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

const SITE_ORIGIN = "https://upliftdental.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/uplift/hero-smile_47b15f85.webp`;

function absoluteUrl(url: string) {
  return url.startsWith("/") ? `${SITE_ORIGIN}${url}` : url;
}

export function PageSEO({ title, description, canonical, ogImage }: PageSEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to upsert a <meta> tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector.replace("[", "").replace("]", "").split("=");
        el.setAttribute(attrName, attrVal.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Helper to upsert a <link> tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta('meta[name="description"]', "content", description);
    setLink("canonical", canonical);

    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    const socialImage = absoluteUrl(ogImage || DEFAULT_OG_IMAGE);
    setMeta('meta[property="og:image"]', "content", socialImage);

    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", socialImage);

    return () => {
      // Restore homepage defaults on unmount
      document.title =
        `Uplift Dental & Orthodontics | Top-Rated Dentist in ${PRACTICE.address.city}, ${PRACTICE.address.state} ${PRACTICE.address.zip}`;
    };
  }, [title, description, canonical, ogImage]);

  return null;
}
