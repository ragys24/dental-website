import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = new URL('../', import.meta.url);
const host = 'upliftdental.com';
const targetIp = '35.215.106.84';
const sitemap = await readFile(new URL('../client/public/sitemap.xml', import.meta.url), 'utf8');
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/')
  .filter((route, index, all) => all.indexOf(route) === index);
const results = [];

async function request(path, expectedStatus, expectedLocation = '') {
  let stdout = '';
  let error = '';
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      ({ stdout } = await execFileAsync('curl', [
        '--noproxy', '*', '-sS', '--max-time', '15', '--retry', '1',
        '-H', 'Cache-Control: no-cache',
        '--resolve', `${host}:443:${targetIp}`,
        '-D', '-', `https://${host}${path}`,
      ], { maxBuffer: 25 * 1024 * 1024 }));
      break;
    } catch (caught) {
      error = caught.stderr || caught.message;
    }
  }
  const sections = stdout.split(/\r?\n\r?\n/);
  const header = sections.shift() || '';
  const body = sections.join('\n\n');
  const status = Number((header.match(/^HTTP\/\S+\s+(\d+)/m) || [])[1] || 0);
  const location = (header.match(/^location:\s*(.+)$/mi) || [])[1] || '';
  const entry = {
    path,
    status,
    location,
    canonical: (body.match(/<link rel="canonical" href="([^"]+)"/i) || [])[1] || '',
    hasAppRoot: body.includes('id="root"'),
    hasManusReference: /manus\.computer|manuscdn|manus-storage/i.test(body),
    nosniff: (header.match(/^x-content-type-options:\s*(.+)$/mi) || [])[1] || '',
    error,
    ok: status === expectedStatus && (!expectedLocation || location.includes(expectedLocation)),
  };
  results.push(entry);
  return entry;
}

async function verifyRoute(route) {
  const entry = await request(route, 200);
  entry.ok = entry.ok
    && entry.hasAppRoot
    && entry.canonical === `https://${host}${route}`
    && !entry.hasManusReference
    && entry.nosniff.toLowerCase() === 'nosniff';
}

for (let offset = 0; offset < sitemapRoutes.length; offset += 5) {
  await Promise.all(sitemapRoutes.slice(offset, offset + 5).map(verifyRoute));
}
await request('/oral-surgery', 301, '/wisdom-teeth-removal');
await request('/2023/10/27/whats-are-the-differences-between-dental-insurance-plans', 301, '/blog/what-are-the-differences-between-dental-insurance-plans');
await request('/blog/', 301, '/blog');
await request('/this-route-must-not-exist', 404);
await request(`/siteground-stage-deploy.php?verify=${Date.now()}`, 404);

const report = {
  host,
  targetIp,
  sitemapRoutes: sitemapRoutes.length,
  checked: results.length,
  passed: results.every((entry) => entry.ok),
  failures: results.filter((entry) => !entry.ok),
};
await writeFile(new URL('../docs/live-direct-validation.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
