import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const report = JSON.parse(fs.readFileSync(path.join(root, "docs", "image-optimization-report.json"), "utf8"));
const replacements = report.replacements;

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
  for (const [source, output] of Object.entries(replacements)) {
    const count = updated.split(source).length - 1;
    updated = updated.split(source).join(output);
    changedReferences += count;
  }
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changedFiles += 1;
  }
}

console.log(JSON.stringify({ changedFiles, changedReferences }, null, 2));
