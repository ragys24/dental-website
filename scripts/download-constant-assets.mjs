import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const constantsPath = path.join(root, "client", "src", "lib", "constants.ts");
const outputDirectory = path.join(root, "client", "public", "assets", "uplift");
const originalBase = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN";
const constants = fs.readFileSync(constantsPath, "utf8");
const files = [...constants.matchAll(/\$\{CDN\}\/([^"`]+)/g)].map((match) => match[1]);
const missing = [];
const failures = [];

for (const file of files) {
  const output = path.join(outputDirectory, file);
  if (fs.existsSync(output)) continue;
  try {
    const response = await fetch(`${originalBase}/${file}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    fs.writeFileSync(output, Buffer.from(await response.arrayBuffer()));
    missing.push(file);
    console.log(`saved\t${file}`);
  } catch (error) {
    failures.push({ file, error: String(error) });
    console.error(`failed\t${file}\t${error}`);
  }
}

fs.writeFileSync(path.join(root, "docs", "constant-asset-download-report.json"), `${JSON.stringify({ downloaded: missing, failures }, null, 2)}\n`);
console.log(JSON.stringify({ downloaded: missing.length, failed: failures.length }, null, 2));
if (failures.length) process.exitCode = 1;
