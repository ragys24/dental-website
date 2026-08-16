import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "client", "src", "pages", "Blog.tsx");
const original = fs.readFileSync(target, "utf8");
const expression = /\/\/ Removed duplicate posts array — now using getVisiblePosts\(\) from blogData\.ts\nconst UNUSED_posts = \[[\s\S]*?\n\];\n\n(?=export default function Blog)/;
if (!expression.test(original)) throw new Error("Expected unused blog array was not found");
const updated = original.replace(expression, "");
fs.writeFileSync(target, updated);
console.log("Removed unused WordPress-era blog metadata array.");
