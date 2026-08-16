/**
 * Build-time sitemap.xml generator.
 * Run after Vite build to create a static sitemap.xml in the dist folder.
 * This ensures search engines can crawl the sitemap without JavaScript.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://upliftdental.com";

// Extract published blog IDs and their source publication dates from blog data.
function getBlogEntries() {
  const blogDir = join(__dirname, "../client/src/lib/blog");
  const entries = [];
  
  const files = readdirSync(blogDir).filter(f => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");
  
  for (const file of files) {
    const content = readFileSync(join(blogDir, file), "utf-8");
    const matches = content.matchAll(/id:\s*"([^"]+)"[\s\S]{0,1200}?dateISO:\s*"([^"]+)"/g);
    for (const match of matches) {
      entries.push({ slug: match[1], lastmod: match[2] });
    }
  }
  
  return entries;
}

// Static pages with priority and changefreq
const staticPages = [
  { loc: "/", priority: 1.0, changefreq: "weekly" },
  { loc: "/services", priority: 0.9, changefreq: "monthly" },
  { loc: "/invisalign", priority: 0.9, changefreq: "monthly" },
  { loc: "/orthodontics", priority: 0.9, changefreq: "monthly" },
  { loc: "/dental-implants", priority: 0.85, changefreq: "monthly" },
  { loc: "/emergency-dentist", priority: 0.85, changefreq: "monthly" },
  { loc: "/periodontics", priority: 0.8, changefreq: "monthly" },
  { loc: "/endodontics", priority: 0.8, changefreq: "monthly" },
  { loc: "/teeth-whitening", priority: 0.8, changefreq: "monthly" },
  { loc: "/veneers", priority: 0.8, changefreq: "monthly" },
  { loc: "/dental-crowns", priority: 0.8, changefreq: "monthly" },
  { loc: "/wisdom-teeth-removal", priority: 0.8, changefreq: "monthly" },
  { loc: "/dental-bonding", priority: 0.75, changefreq: "monthly" },
  { loc: "/dental-fillings", priority: 0.75, changefreq: "monthly" },
  { loc: "/teeth-cleaning", priority: 0.75, changefreq: "monthly" },
  { loc: "/dentures", priority: 0.75, changefreq: "monthly" },
  { loc: "/community-outreach", priority: 0.7, changefreq: "monthly" },
  { loc: "/patient-portal", priority: 0.8, changefreq: "monthly" },
  { loc: "/why-choose-us", priority: 0.9, changefreq: "monthly" },
  { loc: "/our-specialists", priority: 0.85, changefreq: "monthly" },
  { loc: "/invisalign-seal-beach", priority: 0.7, changefreq: "monthly" },
  { loc: "/contact", priority: 0.9, changefreq: "monthly" },
  { loc: "/special-offers", priority: 0.85, changefreq: "weekly" },
  { loc: "/membership-plan", priority: 0.85, changefreq: "monthly" },
  { loc: "/insurance-financing", priority: 0.85, changefreq: "monthly" },
  { loc: "/smile-assessment", priority: 0.8, changefreq: "monthly" },
  { loc: "/about", priority: 0.8, changefreq: "monthly" },
  { loc: "/gallery", priority: 0.7, changefreq: "monthly" },
  { loc: "/blog", priority: 0.8, changefreq: "weekly" },
  { loc: "/dentist-near-garden-grove", priority: 0.75, changefreq: "monthly" },
  { loc: "/dentist-near-seal-beach", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-los-alamitos", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-westminster", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-anaheim", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-huntington-beach", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-cypress", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-long-beach", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-stanton", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-buena-park", priority: 0.7, changefreq: "monthly" },
  { loc: "/dentist-near-rossmoor", priority: 0.7, changefreq: "monthly" },
  { loc: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { loc: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
  { loc: "/accessibility", priority: 0.3, changefreq: "yearly" },
];

function generateSitemap() {
  const blogEntries = getBlogEntries();
  
  const allEntries = [
    ...staticPages,
    ...blogEntries.map(({ slug, lastmod }) => ({
      loc: `/blog/${slug}`,
      priority: 0.65,
      changefreq: "monthly",
      lastmod,
    })),
  ];

  const urls = allEntries
    .map(
      (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    ${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(2)}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  // Write to dist/public (Vite output)
  const distDir = join(__dirname, "../dist/public");
  writeFileSync(join(distDir, "sitemap.xml"), xml, "utf-8");
  
  console.log(`✅ sitemap.xml generated with ${allEntries.length} URLs (${staticPages.length} pages + ${blogEntries.length} blog posts)`);
}

generateSitemap();
