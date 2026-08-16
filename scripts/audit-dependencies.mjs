import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const packageNames = new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function packageName(moduleName) {
  if (moduleName.startsWith("@")) return moduleName.split("/").slice(0, 2).join("/");
  return moduleName.split("/")[0];
}

const sourceFiles = [
  ...walk(path.join(root, "client")),
  ...walk(path.join(root, "server")),
  path.join(root, "vite.config.ts"),
].filter((file) => /\.(ts|tsx|js|mjs|html|css)$/.test(file));

const imports = new Map();
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  const patterns = [
    /(?:import|export)\s+(?:[^'";]*?from\s+)?["']([^"']+)["']/g,
    /require\(["']([^"']+)["']\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const imported = match[1];
      if (imported.startsWith(".") || imported.startsWith("/") || imported.startsWith("@/") || imported.startsWith("@shared/") || imported.startsWith("@assets/")) continue;
      const pkg = packageName(imported);
      if (!packageNames.has(pkg)) continue;
      if (!imports.has(pkg)) imports.set(pkg, new Set());
      imports.get(pkg).add(path.relative(root, file));
    }
  }
}

const declared = [...packageNames].sort();
const used = [...imports.keys()].sort();
const unused = declared.filter((pkg) => !imports.has(pkg));
const report = {
  generatedAt: new Date().toISOString(),
  declaredCount: declared.length,
  importedCount: used.length,
  unusedDeclaredPackages: unused,
  imports: Object.fromEntries([...imports.entries()].sort().map(([pkg, files]) => [pkg, [...files].sort()])),
};
fs.writeFileSync(path.join(root, "docs", "dependency-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ declared: declared.length, imported: used.length, unused: unused.length }, null, 2));
console.log(unused.join("\n"));
