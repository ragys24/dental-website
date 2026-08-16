import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(root, "client", "src");
const app = fs.readFileSync(path.join(sourceRoot, "App.tsx"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "client", "public", "sitemap.xml"), "utf8");
const blogData = fs.readFileSync(path.join(sourceRoot, "lib", "blogData.ts"), "utf8");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function normalize(raw) {
  const value = raw.trim();
  if (!value || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("sms:") || value.startsWith("javascript:")) return null;
  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      if (url.hostname !== "upliftdental.com" && url.hostname !== "www.upliftdental.com") return null;
      return url.pathname.replace(/\/$/, "") || "/";
    } catch {
      return null;
    }
  }
  if (!value.startsWith("/")) return null;
  return value.split(/[?#]/)[0].replace(/\/$/, "") || "/";
}

const routePattern = /<Route\s+path="([^"]+)"/g;
const routes = new Set();
for (const match of app.matchAll(routePattern)) {
  if (!match[1].includes(":")) routes.add(normalize(match[1]));
}

const blogSlugs = new Set([...blogData.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => `/blog/${match[1]}`));
for (const slug of blogSlugs) routes.add(slug);

const sitemapPaths = new Set([...sitemap.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)].map((match) => normalize(match[1])));

const internalLinks = new Map();
const hrefPatterns = [
  /(?:href|to)\s*=\s*["'`]([^"'`]+)["'`]/g,
  /\]\((\/[^)\s]+)\)/g,
];
for (const file of walk(sourceRoot).filter((file) => /\.(ts|tsx)$/.test(file))) {
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of hrefPatterns) {
    for (const match of text.matchAll(pattern)) {
      const link = normalize(match[1]);
      if (!link) continue;
      if (!internalLinks.has(link)) internalLinks.set(link, new Set());
      internalLinks.get(link).add(path.relative(root, file));
    }
  }
}

const missingSitemapRoutes = [...sitemapPaths].filter((url) => !routes.has(url)).sort();
const unsitemappedRoutes = [...routes].filter((url) => !sitemapPaths.has(url)).sort();
const unresolvedLinks = [...internalLinks.entries()]
  .filter(([url]) => !routes.has(url))
  .map(([url, files]) => ({ url, files: [...files].sort() }))
  .sort((a, b) => a.url.localeCompare(b.url));

const report = {
  generatedAt: new Date().toISOString(),
  counts: {
    staticRoutes: routes.size,
    sitemapUrls: sitemapPaths.size,
    distinctInternalLinks: internalLinks.size,
    sitemapUrlsWithoutStaticRoute: missingSitemapRoutes.length,
    staticRoutesNotInSitemap: unsitemappedRoutes.length,
    unresolvedInternalLinks: unresolvedLinks.length,
  },
  sitemapUrlsWithoutStaticRoute: missingSitemapRoutes,
  staticRoutesNotInSitemap: unsitemappedRoutes,
  unresolvedInternalLinks: unresolvedLinks,
};

fs.writeFileSync(path.join(root, "docs", "internal-link-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.counts, null, 2));
if (missingSitemapRoutes.length || unresolvedLinks.length) process.exitCode = 1;
