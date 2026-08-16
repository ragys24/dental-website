import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outputDirectory = path.join(root, "dist", "public");
const sitemap = fs.readFileSync(path.join(outputDirectory, "sitemap.xml"), "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/");
const errors = [];
let verifiedPages = 0;
let verifiedAssets = 0;

for (const route of sitemapRoutes) {
  const documentPath = route === "/"
    ? path.join(outputDirectory, "index.html")
    : path.join(outputDirectory, `${route.replace(/^\//, "")}.html`);
  if (!fs.existsSync(documentPath)) {
    errors.push({ route, error: "missing_static_document" });
    continue;
  }
  const html = fs.readFileSync(documentPath, "utf8");
  const expectedCanonical = `https://upliftdental.com${route}`;
  if (!html.includes(`rel="canonical" href="${expectedCanonical}"`)) {
    errors.push({ route, error: "canonical_mismatch", expectedCanonical });
  }
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)[^\"]*"/g)) {
    const assetPath = path.join(outputDirectory, match[1]);
    if (!fs.existsSync(assetPath)) errors.push({ route, error: "missing_local_asset", asset: match[1] });
    else verifiedAssets += 1;
  }
  verifiedPages += 1;
}

const forbidden = ["d2xsxph8kpxj0f.cloudfront.net", "manus-storage", "%VITE_", "wp-content/uploads"];
const filesToCheck = [
  ...fs.readdirSync(path.join(root, "client", "src"), { recursive: true })
    .filter((entry) => /\.(ts|tsx|css)$/.test(entry))
    .map((entry) => path.join(root, "client", "src", entry)),
  path.join(root, "client", "index.html"),
];
for (const file of filesToCheck) {
  const content = fs.readFileSync(file, "utf8");
  for (const token of forbidden) {
    if (content.includes(token)) errors.push({ file: path.relative(root, file), error: "forbidden_reference", token });
  }
}

const report = {
  sitemapRoutes: sitemapRoutes.length,
  verifiedPages,
  verifiedAssetReferences: verifiedAssets,
  errors,
  passed: errors.length === 0,
};
fs.writeFileSync(path.join(root, "docs", "release-validation.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
