import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const outputDir = "/home/ubuntu/exports/upliftdental-siteground";
const routeDocumentsDir = "/home/ubuntu/exports/upliftdental-siteground-private-route-documents";
const baseUrl = "https://upliftdental.com";

function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/");
}

function routeDocumentName(path) {
  return `${path.slice(1).replaceAll("/", "--")}.html`;
}

const failures = [];
const sitemap = await readFile(join(outputDir, "sitemap.xml"), "utf8");
const htaccess = await readFile(join(outputDir, ".htaccess"), "utf8");
const redirects = JSON.parse(await readFile(join(outputDir, "phase2-redirects.json"), "utf8"));
const routes = JSON.parse(await readFile(join(outputDir, "phase2-routes.json"), "utf8"));
const files = await readdir(routeDocumentsDir);
const paths = sitemapPaths(sitemap);

if (paths.length !== routes.length) failures.push(`Sitemap contains ${paths.length} URLs but route registry contains ${routes.length}`);
if (new Set(paths).size !== paths.length) failures.push("Sitemap contains duplicate URLs");
if (!sitemap.includes("<lastmod>")) failures.push("Sitemap has no explicit lastmod values");
if (!htaccess.includes("X-Content-Type-Options \"nosniff\"")) failures.push("Security header is missing");
if (!htaccess.includes("RewriteRule ^ - [R=404,L]")) failures.push("True unknown-path 404 rule is missing");
if (!htaccess.includes("route-document.php?doc=")) failures.push("Route document dispatcher is missing");

for (const path of paths) {
  const expectedCanonical = `${baseUrl}${path}`;
  if (path === "/") {
    const index = await readFile(join(outputDir, "index.html"), "utf8");
    if (!index.includes(`href=\"${expectedCanonical}\"`)) failures.push("Home document lacks self-canonical");
    continue;
  }
  const documentName = routeDocumentName(path);
  if (!files.includes(documentName)) {
    failures.push(`Missing route document for ${path}`);
    continue;
  }
  const html = await readFile(join(routeDocumentsDir, documentName), "utf8");
  if (!html.includes(`href=\"${expectedCanonical}\"`)) failures.push(`Wrong or missing canonical for ${path}`);
  if (!html.includes('name="robots" content="index, follow')) failures.push(`Missing indexability directive for ${path}`);
  if (!htaccess.includes(`route-document.php?doc=${documentName}`)) failures.push(`Apache dispatcher is missing for ${path}`);
}

for (const [source, target] of Object.entries(redirects)) {
  if (!htaccess.includes(`https://upliftdental.com${target}`)) failures.push(`Missing Apache redirect target for ${source}`);
}

for (const root of [outputDir, routeDocumentsDir]) {
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (/\.(html|js|css|xml|json|txt)$/i.test(entry.name)) {
        const content = await readFile(full, "utf8");
        if (/manus-storage|files\.manuscdn\.com|d2xsxph8kpxj0f\.cloudfront\.net|__manus__/i.test(content)) {
          failures.push(`Residual Manus dependency in ${full}`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error(JSON.stringify({ status: "failed", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "passed",
  sitemap_urls: paths.length,
  route_documents: files.filter((file) => file.endsWith(".html")).length,
  legacy_redirects: Object.keys(redirects).length,
}, null, 2));
