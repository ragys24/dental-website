import { readFile, writeFile } from 'node:fs/promises';

const origin = process.env.STAGING_ORIGIN || 'https://ragys.sg-host.com';
const sitemap = await readFile(new URL('../client/public/sitemap.xml', import.meta.url), 'utf8');
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/')
  .filter((route, index, all) => all.indexOf(route) === index);
const results = [];

async function request(path, expectedStatus, expectedLocation = '') {
  let response;
  let body;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(`${origin}${path}`, {
        redirect: 'manual',
        headers: { Connection: 'close', 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(15_000),
      });
      body = await response.text();
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  if (!response || body === undefined) throw lastError || new Error(`No response for ${path}`);
  const entry = {
    path,
    status: response.status,
    location: response.headers.get('location') || '',
    canonical: (body.match(/<link rel="canonical" href="([^"]+)"/i) || [])[1] || '',
    hasAppRoot: body.includes('id="root"'),
    hasManusReference: /manus\.computer|manuscdn|manus-storage/i.test(body),
    nosniff: response.headers.get('x-content-type-options') || '',
    ok: response.status === expectedStatus && (!expectedLocation || (response.headers.get('location') || '').includes(expectedLocation)),
  };
  results.push(entry);
  return { response, body, entry };
}

async function verifySitemapRoute(route) {
  const { entry } = await request(route, 200);
  const expectedCanonical = `https://upliftdental.com${route}`;
  entry.ok = entry.ok && entry.hasAppRoot && entry.canonical === expectedCanonical && !entry.hasManusReference && entry.nosniff === 'nosniff';
}

for (let offset = 0; offset < sitemapRoutes.length; offset += 5) {
  await Promise.all(sitemapRoutes.slice(offset, offset + 5).map(verifySitemapRoute));
}

await request('/oral-surgery', 301, '/wisdom-teeth-removal');
await request('/2023/10/27/whats-are-the-differences-between-dental-insurance-plans', 301, '/blog/what-are-the-differences-between-dental-insurance-plans');
await request('/blog/', 301, '/blog');
await request('/this-route-must-not-exist', 404);
await request(`/siteground-stage-deploy.php?verify=${Date.now()}`, 404);

const report = {
  origin,
  sitemapRoutes: sitemapRoutes.length,
  passed: results.every((entry) => entry.ok),
  failures: results.filter((entry) => !entry.ok),
  checked: results,
};
await writeFile(new URL('../docs/siteground-staging-validation.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
console.table(results.map(({ path, status, location, canonical, ok }) => ({ path, status, location, canonical, ok })));
if (!report.passed) {
  console.error(JSON.stringify(report.failures, null, 2));
  process.exitCode = 1;
} else {
  console.log(`SiteGround staging validation passed for ${results.length} checks, including ${sitemapRoutes.length} preserved sitemap URLs.`);
}
