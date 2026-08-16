import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const outputDir = resolve(process.argv[2] || "/home/ubuntu/exports/upliftdental-siteground");
const htaccessPath = join(outputDir, ".htaccess");
const marker = 'Header always set X-Robots-Tag "noindex, nofollow" env=temporary_staging_host';
const securityHeaders = [
  'Header always set X-Content-Type-Options "nosniff"',
  'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  'Header always set X-Frame-Options "SAMEORIGIN"',
  'Header always set Permissions-Policy "camera=(), geolocation=(), microphone=(), payment=(), usb=()"',
].join("\n");

const current = await readFile(htaccessPath, "utf8");
if (!current.includes(marker)) {
  throw new Error(`Expected staging noindex marker was not found in ${htaccessPath}`);
}

const hardened = current.includes('Header always set X-Content-Type-Options "nosniff"')
  ? current
  : current.replace(marker, `${marker}\n${securityHeaders}`);

await writeFile(htaccessPath, hardened, "utf8");
console.log(`Applied conservative security headers to ${htaccessPath}`);
