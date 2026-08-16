/**
 * Phase 2 local raw-response acceptance test.
 * Start the compiled server with PORT=4175 before running this script.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const baseUrl = process.env.PHASE2_TEST_BASE_URL || "http://127.0.0.1:4175";
const httpsHeaders = { "x-forwarded-proto": "https", host: "upliftdental.com" };
const checks = [];

async function request(path, headers = httpsHeaders) {
  const response = await fetch(`${baseUrl}${path}`, { headers, redirect: "manual" });
  const body = await response.text();
  return { path, status: response.status, location: response.headers.get("location"), robots: response.headers.get("x-robots-tag"), body };
}

function assert(condition, label, detail) {
  checks.push({ label, pass: Boolean(condition), detail });
  if (!condition) throw new Error(`${label}: ${detail}`);
}

try {
  const homepage = await request("/");
  assert(homepage.status === 200, "Canonical homepage response", `expected 200, received ${homepage.status}`);

  const invisalign = await request("/invisalign");
  assert(invisalign.status === 200, "Canonical route response", `expected 200, received ${invisalign.status}`);
  assert(invisalign.body.includes("<title>Invisalign in Garden Grove | Uplift Dental &amp; Orthodontics</title>"), "Route-specific initial title", "missing Invisalign title in raw HTML");
  assert(invisalign.body.includes('<link rel="canonical" href="https://upliftdental.com/invisalign" />'), "Route-specific self-canonical", "missing Invisalign canonical in raw HTML");
  assert(invisalign.body.includes('<meta name="geo.position" content="33.7815617;-118.0414966" />'), "Corrected geo coordinate metadata", "missing corrected geo.position");
  assert(invisalign.body.includes('"latitude":33.7815617') === false || invisalign.body.includes('"longitude":-118.0414966') === false, "Service document static schema present", "service document does not need root LocalBusiness geo schema");
  assert(invisalign.body.includes('<script id="ld-route-static" type="application/ld+json">'), "Initial JSON-LD", "missing static route JSON-LD");

  const root = await request("/");
  assert(root.body.includes('"latitude":33.7815617') && root.body.includes('"longitude":-118.0414966'), "Corrected LocalBusiness coordinates", "missing corrected LocalBusiness GeoCoordinates in initial homepage HTML");

  const legacy = await request("/invisalign-treatment-garden-grove-ca/");
  assert(legacy.status === 301 && legacy.location === "https://upliftdental.com/invisalign", "Legacy direct redirect", `expected one-hop 301 to /invisalign, received ${legacy.status} ${legacy.location}`);

  const slash = await request("/invisalign/");
  assert(slash.status === 301 && slash.location === "https://upliftdental.com/invisalign", "Canonical slash normalization", `expected one-hop 301 to /invisalign, received ${slash.status} ${slash.location}`);

  const www = await request("/invisalign", { "x-forwarded-proto": "https", "x-forwarded-host": "www.upliftdental.com" });
  assert(www.status === 301 && www.location === "https://upliftdental.com/invisalign", "www host consolidation", `expected one-hop 301 to canonical host, received ${www.status} ${www.location}`);

  const gone = await request("/pediatric-dentistry/");
  assert(gone.status === 410 && gone.robots === "noindex, follow", "Retired-topic 410", `expected 410 with noindex, received ${gone.status} ${gone.robots}`);

  const searchArtifact = await request("/?s=test");
  assert(searchArtifact.status === 410, "Search-template artifact 410", `expected 410, received ${searchArtifact.status}`);

  const unknown = await request("/phase2-unmapped-test");
  assert(unknown.status === 404 && unknown.robots === "noindex, follow", "Unknown URL true 404", `expected 404 with noindex, received ${unknown.status} ${unknown.robots}`);

  const report = { generatedAt: new Date().toISOString(), baseUrl, passed: true, checks };
  await writeFile(join(process.cwd(), "phase2-local-raw-response-validation.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  const report = { generatedAt: new Date().toISOString(), baseUrl, passed: false, checks, error: error instanceof Error ? error.message : String(error) };
  await writeFile(join(process.cwd(), "phase2-local-raw-response-validation.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
