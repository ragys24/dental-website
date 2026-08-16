import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const urlListPath = path.join(root, "docs", "wordpress-media-urls.txt");
const outputRoot = path.join(root, "client", "public", "assets", "blog");
const urls = fs.readFileSync(urlListPath, "utf8").split("\n").map((line) => line.trim()).filter(Boolean);
const manifest = {};
const failures = [];

for (const url of urls) {
  try {
    const parsed = new URL(url);
    const marker = "/wp-content/uploads/";
    const relativePath = parsed.pathname.slice(parsed.pathname.indexOf(marker) + marker.length);
    const outputPath = path.join(outputRoot, relativePath);
    if (!outputPath.startsWith(outputRoot)) throw new Error("Invalid output path");

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, data);

    manifest[url] = `/assets/blog/${relativePath}`;
    console.log(`saved\t${relativePath}\t${data.length}`);
  } catch (error) {
    failures.push({ url, error: String(error) });
    console.error(`failed\t${url}\t${error}`);
  }
}

fs.writeFileSync(path.join(root, "docs", "wordpress-media-manifest.json"), `${JSON.stringify({ manifest, failures }, null, 2)}\n`);
console.log(JSON.stringify({ downloaded: Object.keys(manifest).length, failed: failures.length }, null, 2));
if (failures.length) process.exitCode = 1;
