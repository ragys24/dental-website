import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const exportDir = '/home/ubuntu/exports/upliftdental-siteground';
const manifestPath = join(exportDir, 'deployment-integrity.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const sitemapXml = await readFile(join(exportDir, 'sitemap.xml'), 'utf8');
const htaccess = await readFile(join(exportDir, '.htaccess'), 'utf8');
const routes = JSON.parse(await readFile(join(exportDir, 'phase2-routes.json'), 'utf8'));

const failures = [];
const sitemapUrlCount = (sitemapXml.match(/<loc>/g) || []).length;
if (!Number.isInteger(manifest.artifacts.sitemapUrlCount) || manifest.artifacts.sitemapUrlCount < 1) {
  failures.push(`Invalid manifest sitemap count: ${manifest.artifacts.sitemapUrlCount}.`);
} else if (manifest.artifacts.sitemapUrlCount !== sitemapUrlCount) {
  failures.push(`Manifest declares ${manifest.artifacts.sitemapUrlCount} sitemap URLs; sitemap.xml contains ${sitemapUrlCount}.`);
}
for (const [name, enabled] of Object.entries(manifest.protections)) {
  if (!enabled) failures.push(`Missing export protection: ${name}.`);
}
for (const [name, enabled] of Object.entries(manifest.tracking)) {
  if (!enabled) failures.push(`Missing approved tracking marker: ${name}.`);
}

if (!htaccess.includes('RewriteRule ^ - [R=404,L]')) {
  failures.push('Missing true unknown-route 404 rule.');
}
if (htaccess.includes('RewriteRule ^ index.html [L]')) {
  failures.push('Obsolete generic SPA fallback is still present.');
}
if (!htaccess.includes('Approved direct topic-to-topic redirects.')) {
  failures.push('Approved direct legacy redirect section is missing.');
}

for (const route of routes) {
  const relativePath = route.path === '/' ? 'index.html' : join('_route-documents', `${route.path.slice(1).replaceAll('/', '--')}.html`);
  const routeFile = join(exportDir, relativePath);
  try {
    await access(routeFile);
    const html = await readFile(routeFile, 'utf8');
    const canonical = `https://upliftdental.com${route.path === '/' ? '/' : route.path}`;
    if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) failures.push(`Missing self-canonical in ${route.path}.`);
    if (!html.includes('<script id="ld-route-static" type="application/ld+json">')) failures.push(`Missing initial JSON-LD in ${route.path}.`);
    if (!html.includes('<meta name="geo.position" content="33.7815617;-118.0414966" />')) failures.push(`Missing corrected geo metadata in ${route.path}.`);
    if (route.path !== '/' && html.includes('id="home-critical"')) failures.push(`Root-only critical hero leaked into ${route.path}.`);
  } catch {
    failures.push(`Missing generated route document: ${relativePath}.`);
  }
}

try {
  const notFound = await readFile(join(exportDir, '404.html'), 'utf8');
  if (!notFound.includes('name="robots" content="noindex, follow"')) failures.push('404 document lacks noindex metadata.');
} catch {
  failures.push('Missing 404 document.');
}

if (failures.length) {
  console.error('SiteGround export verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('SiteGround export verification passed.');
console.log(JSON.stringify(manifest, null, 2));
