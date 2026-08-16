import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "docs", "hosted-asset-manifest.json");
const { manifest } = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const replacements = {
  ...manifest,
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/orthodontics-braces-xPjbHnQGVTqFBiS9cKsRzW.webp": "/assets/uplift/orthodontics-braces-U3K8rtBtyKN8vNF3Qv3diF.webp",
};

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const targets = [path.join(root, "client", "src"), path.join(root, "client", "index.html")]
  .flatMap((target) => fs.statSync(target).isDirectory() ? walk(target) : [target])
  .filter((file) => /\.(ts|tsx|html|css)$/.test(file));

let changedFiles = 0;
let changedReferences = 0;
for (const file of targets) {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;
  for (const [remote, local] of Object.entries(replacements)) {
    const occurrences = updated.split(remote).length - 1;
    if (occurrences) {
      updated = updated.split(remote).join(local);
      changedReferences += occurrences;
    }
  }
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changedFiles += 1;
  }
}

console.log(JSON.stringify({ changedFiles, changedReferences }, null, 2));
