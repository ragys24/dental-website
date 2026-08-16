import { readFile } from "node:fs/promises";

function pathsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/");
}

const oldSitemap = await readFile("/home/ubuntu/dental-website/client/public/sitemap.xml", "utf8");
const currentSitemap = await readFile("/home/ubuntu/exports/upliftdental-siteground/sitemap.xml", "utf8");
const redirects = JSON.parse(await readFile("/home/ubuntu/exports/upliftdental-siteground/phase2-redirects.json", "utf8"));
const gone = new Set(JSON.parse(await readFile("/home/ubuntu/exports/upliftdental-siteground/phase2-gone.json", "utf8")));
const current = new Set(pathsFromSitemap(currentSitemap));
const records = pathsFromSitemap(oldSitemap).map((path) => ({
  path,
  treatment: current.has(path) ? "canonical_200" : redirects[path] ? `redirect_301:${redirects[path]}` : gone.has(path) ? "gone_410" : "UNHANDLED",
}));
const unhandled = records.filter((record) => record.treatment === "UNHANDLED");
console.log(JSON.stringify({
  preserved_sitemap_urls: records.length,
  canonical_200: records.filter((record) => record.treatment === "canonical_200").length,
  redirect_301: records.filter((record) => record.treatment.startsWith("redirect_301")).length,
  gone_410: records.filter((record) => record.treatment === "gone_410").length,
  unhandled,
}, null, 2));
if (unhandled.length) process.exit(1);
