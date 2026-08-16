import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "client", "src", "lib", "blogData.ts");
const fallback = "/assets/uplift/family-dental-TeGJLyZzfqwuRW5gkKNBzm.webp";
const original = fs.readFileSync(target, "utf8");
const expression = /https:\/\/upliftdental\.com\/wp-content\/uploads\/[^"` )]+/g;
const matches = original.match(expression) ?? [];
const updated = original.replace(expression, fallback);
fs.writeFileSync(target, updated);
console.log(JSON.stringify({ replacedUnavailableMediaReferences: matches.length, fallback }, null, 2));
