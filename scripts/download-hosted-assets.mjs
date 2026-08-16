import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceDirectories = [path.join(root, "client", "src"), path.join(root, "client")];
const outputDirectory = path.join(root, "client", "public", "assets", "uplift");
fs.mkdirSync(outputDirectory, { recursive: true });

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (target.startsWith(outputDirectory)) return [];
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const files = [...new Set(sourceDirectories.flatMap(walk))].filter((file) => /\.(ts|tsx|html|css)$/.test(file));
const urls = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\/[^"` )]+/g)) {
    const url = match[0].replace(/[',]$/, "");
    const name = path.basename(new URL(url).pathname);
    if (name.includes(".")) urls.add(url);
  }
}

const manifest = {};
const failures = [];
for (const url of [...urls].sort()) {
  const fileName = path.basename(new URL(url).pathname);
  const outputPath = path.join(outputDirectory, fileName);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outputPath, content);
    manifest[url] = `/assets/uplift/${fileName}`;
    console.log(`saved\t${fileName}\t${content.length}`);
  } catch (error) {
    failures.push({ url, error: String(error) });
    console.error(`failed\t${url}\t${error}`);
  }
}

fs.writeFileSync(path.join(root, "docs", "hosted-asset-manifest.json"), `${JSON.stringify({ manifest, failures }, null, 2)}\n`);
console.log(JSON.stringify({ downloaded: Object.keys(manifest).length, failed: failures.length }, null, 2));
if (failures.length) process.exitCode = 1;
