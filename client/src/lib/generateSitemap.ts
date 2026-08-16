/**
 * Dynamic sitemap.xml generator for Uplift Dental & Orthodontics.
 * Generates a comprehensive XML sitemap including all static pages,
 * blog posts, and city/area pages with proper priority and changefreq.
 */

import { blogPosts } from "./blog";

const SITE_URL = "https://upliftdental.com";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

/** Static pages with their SEO priority and update frequency */
const staticPages: SitemapEntry[] = [
  // Homepage — highest priority
  { loc: "/", lastmod: "2026-04-10", changefreq: "weekly", priority: 1.0 },

  // Core service pages — high priority
  { loc: "/services", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.9 },
  { loc: "/invisalign", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.9 },
  { loc: "/orthodontics", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.9 },
  { loc: "/dental-implants", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.85 },
  { loc: "/emergency-dentist", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.85 },
  { loc: "/periodontics", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/endodontics", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/teeth-whitening", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/veneers", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/dental-crowns", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/wisdom-teeth-removal", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/dental-bonding", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.75 },
  { loc: "/dental-fillings", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.75 },
  { loc: "/teeth-cleaning", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.75 },

  // Key conversion pages
  { loc: "/contact", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.9 },
  { loc: "/special-offers", lastmod: "2026-04-10", changefreq: "weekly", priority: 0.85 },
  { loc: "/membership-plan", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.85 },
  { loc: "/insurance-financing", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.85 },
  { loc: "/smile-assessment", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },

  // Trust / info pages
  { loc: "/about", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.8 },
  { loc: "/gallery", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/blog", lastmod: "2026-04-10", changefreq: "weekly", priority: 0.8 },

  // City / local area pages
  { loc: "/dentist-near-garden-grove", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.75 },
  { loc: "/dentist-near-seal-beach", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-los-alamitos", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-westminster", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-anaheim", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-huntington-beach", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-cypress", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-long-beach", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-stanton", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-buena-park", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },
  { loc: "/dentist-near-rossmoor", lastmod: "2026-04-10", changefreq: "monthly", priority: 0.7 },

  // Legal pages — low priority
  { loc: "/privacy-policy", lastmod: "2026-04-10", changefreq: "yearly", priority: 0.3 },
  { loc: "/terms-of-service", lastmod: "2026-04-10", changefreq: "yearly", priority: 0.3 },
  { loc: "/accessibility", lastmod: "2026-04-10", changefreq: "yearly", priority: 0.3 },
];

/** Generate blog post sitemap entries dynamically from blogData */
function getBlogEntries(): SitemapEntry[] {
  return blogPosts.map((post) => ({
    loc: `/blog/${post.id}`,
    lastmod: post.date ? new Date(post.date).toISOString().split("T")[0] : "2026-04-10",
    changefreq: "monthly" as const,
    priority: post.featured ? 0.75 : 0.65,
  }));
}

/** Generate the complete XML sitemap string */
export function generateSitemapXML(): string {
  const allEntries = [...staticPages, ...getBlogEntries()];

  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${SITE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

/** Total number of URLs in the sitemap */
export function getSitemapCount(): number {
  return staticPages.length + blogPosts.length;
}
