/**
 * PageSEO — Injects per-page SEO metadata into document head
 * 
 * Handles:
 * - Document title
 * - Meta description
 * - Canonical URL
 * - Open Graph (OG) tags for social sharing
 * - Twitter Card tags
 * 
 * Uses vanilla DOM manipulation for better performance than react-helmet.
 * Call this at the top of each page's return statement.
 * 
 * @example
 * export function MyPage() {
 *   return (
 *     <>
 *       <PageSEO
 *         title={`My Page | Uplift Dental`}
 *         description={`Page description for search engines`}
 *         canonical={`https://upliftdental.com/my-page`}
 *         ogImage={`https://cdn.example.com/image.jpg`}
 *       />
 *     </>
 *   );
 * }
 */
import { useEffect } from "react";
import { PRACTICE } from "@/lib/constants";

/**
 * Props for PageSEO component
 * @interface PageSEOProps
 * @property {string} title - Page title (appears in browser tab and search results)
 * @property {string} description - Meta description (appears in search results)
 * @property {string} canonical - Canonical URL (prevents duplicate content issues)
 * @property {string} [ogImage] - Open Graph image URL for social sharing
 * @property {boolean} [noindex] - If true, adds noindex,nofollow meta robots tag
 */
interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
}

const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/hero-smile-optimized_eaf37ef9.jpg";

const INDEXABLE_ROBOTS = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

/**
 * PageSEO component — manages page-level SEO metadata
 * @param {PageSEOProps} props - SEO configuration
 * @returns {null} - This component doesn't render anything
 */
export function PageSEO({ title, description, canonical, ogImage, noindex }: PageSEOProps) {
  useEffect(() => {
    document.title = title;
    const image = ogImage || DEFAULT_OG_IMAGE;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : INDEXABLE_ROBOTS);
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", PRACTICE.name);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", `${PRACTICE.name} in ${PRACTICE.address.city}, ${PRACTICE.address.state}`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [title, description, canonical, ogImage, noindex]);

  return null;
}
