import { writeFile } from "node:fs/promises";

const baseUrl = process.argv[2];
const mode = process.argv[3] || "staging";
if (!baseUrl) throw new Error("Usage: node scripts/verify-hosting-endpoints.mjs https://host.example [staging|production]");

const routes = ["/", "/invisalign", "/contact", "/our-specialists", "/blog/bleeding-gums-periodontal-evaluation-garden-grove", "/does-not-exist-monitor-check"];
const results = [];

for (const route of routes) {
  const response = await fetch(new URL(route, baseUrl), { redirect: "manual" });
  const headers = Object.fromEntries(response.headers.entries());
  const ok = route === "/does-not-exist-monitor-check"
    ? response.status === 200 || response.status === 404
    : response.status === 200;
  results.push({ route, status: response.status, ok, robots: headers["x-robots-tag"] || null, cacheControl: headers["cache-control"] || null });
}

const stagingExpected = mode === "staging";
const robotsPolicyOk = results.every((result) => stagingExpected
  ? result.robots?.includes("noindex")
  : !result.robots?.includes("noindex"));
const allRoutesOk = results.every((result) => result.ok);
const report = { baseUrl, mode, checkedAt: new Date().toISOString(), allRoutesOk, robotsPolicyOk, results };

await writeFile("/home/ubuntu/hosting-endpoint-report.json", `${JSON.stringify(report, null, 2)}\n`);
console.table(results);
if (!allRoutesOk || !robotsPolicyOk) process.exitCode = 1;
