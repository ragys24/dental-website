import { readFileSync } from "node:fs";

function sitemapPaths(filePath) {
  const xml = readFileSync(filePath, "utf8");
  return [...xml.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/")
    .sort();
}

const preserved = sitemapPaths("/home/ubuntu/dental-website/client/public/sitemap.xml");
const recovered = sitemapPaths("/home/ubuntu/apex-dental-recovery/dist/public/sitemap.xml");

console.log(`preserved=${preserved.length}`);
console.log(`recovered_build=${recovered.length}`);
console.log("only_in_preserved:");
console.log(preserved.filter((path) => !recovered.includes(path)).join("\n") || "(none)");
console.log("only_in_recovered_build:");
console.log(recovered.filter((path) => !preserved.includes(path)).join("\n") || "(none)");
