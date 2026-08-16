import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile } from "node:fs/promises";

const execFileAsync = promisify(execFile);
const origin = "https://upliftdental.com";
const targets = [
  { path: "/", expected: 200, kind: "home" },
  { path: "/patient-portal", expected: 200, kind: "recovered_page" },
  { path: "/our-specialists", expected: 200, kind: "recovered_page" },
  { path: "/community-outreach", expected: 200, kind: "recovered_page" },
  { path: "/dentures", expected: 200, kind: "recovered_page" },
  { path: "/sitemap.xml", expected: 200, kind: "crawl_file" },
  { path: "/robots.txt", expected: 200, kind: "crawl_file" },
  { path: "/siteground-recovered-latest-deploy.php", expected: 404, kind: "cleanup" },
];

async function request(path) {
  const marker = "STATUS:%{http_code};TTFB:%{time_starttransfer};TOTAL:%{time_total};SIZE:%{size_download};REDIR:%{num_redirects}";
  const { stdout } = await execFileAsync("curl", [
    "-sS", "-L", "--connect-timeout", "10", "--max-time", "30",
    "-A", "UpliftDentalPostMigrationAudit/1.0",
    "-o", "/dev/null", "-w", marker, `${origin}${path}`,
  ]);
  const values = Object.fromEntries(stdout.trim().split(";").map((item) => item.split(":")));
  return {
    status: Number(values.STATUS),
    ttfb_seconds: Number(values.TTFB),
    total_seconds: Number(values.TOTAL),
    bytes: Number(values.SIZE),
    redirects: Number(values.REDIR),
  };
}

async function headers(pathOrUrl) {
  const target = pathOrUrl.startsWith("http") ? pathOrUrl : `${origin}${pathOrUrl}`;
  const { stdout } = await execFileAsync("curl", ["-sS", "-I", "--max-time", "30", target]);
  const lines = stdout.split(/\r?\n/).filter(Boolean);
  const final = lines.slice(lines.lastIndexOf(lines.filter((line) => line.startsWith("HTTP/")).at(-1)) + 1);
  return Object.fromEntries(final.map((line) => {
    const index = line.indexOf(":");
    return index > 0 ? [line.slice(0, index).toLowerCase(), line.slice(index + 1).trim()] : [];
  }).filter((entry) => entry.length));
}

const rows = [];
for (const target of targets) {
  const samples = [];
  for (let i = 0; i < 3; i += 1) samples.push(await request(target.path));
  samples.sort((a, b) => a.total_seconds - b.total_seconds);
  const median = samples[1];
  rows.push({ ...target, samples, median, pass: samples.every((sample) => sample.status === target.expected) });
}

const homeHeaders = await headers("/");
const redirectHeaders = await headers("https://emergency.upliftdental.com/");
const report = {
  generated_at_utc: new Date().toISOString(),
  origin,
  result: rows.every((row) => row.pass) ? "pass" : "fail",
  routes: rows,
  headers: {
    home: homeHeaders,
    emergency_redirect: redirectHeaders,
  },
  checks: {
    hsts_present: Boolean(homeHeaders["strict-transport-security"]),
    nosniff_present: homeHeaders["x-content-type-options"] === "nosniff",
    referrer_policy: homeHeaders["referrer-policy"] ?? null,
    canonical_sitemap_http_200: rows.find((row) => row.path === "/sitemap.xml")?.pass ?? false,
    emergency_redirect_location: redirectHeaders.location ?? null,
  },
};

await writeFile("docs/post-migration-production-audit.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (report.result !== "pass") process.exitCode = 1;
