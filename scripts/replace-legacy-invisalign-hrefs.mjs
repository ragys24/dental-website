import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "client", "src", "lib", "blog");
const files = (await readdir(root)).filter((file) => file.endsWith(".ts"));
const patterns = [
  [/href="\/invisalign-treatment-garden-grove-ca\/"/g, 'href="/invisalign"'],
  [/href="\/invisalign-treatment-garden-grove-ca"/g, 'href="/invisalign"'],
  [/href="https:\/\/upliftdental\.com\/invisalign-treatment-garden-grove-ca\/?"/g, 'href="https://upliftdental.com/invisalign"'],
];
let replacements = 0;
for (const file of files) {
  const path = join(root, file);
  let content = await readFile(path, "utf8");
  for (const [pattern, replacement] of patterns) {
    const matches = content.match(pattern);
    replacements += matches?.length ?? 0;
    content = content.replace(pattern, replacement);
  }
  await writeFile(path, content, "utf8");
}
console.log(`Updated ${replacements} legacy Invisalign href values across ${files.length} blog source files.`);
