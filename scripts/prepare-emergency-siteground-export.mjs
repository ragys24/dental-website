/*
 * Sanitizes the downloaded emergency-site HTML for temporary SiteGround hosting.
 * It preserves the current built React page, removes Manus runtime/analytics hooks,
 * and maps its two storage-proxy images to locally mirrored media files.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = '/home/ubuntu/exports/uplift-emergency-siteground';
const indexPath = join(outputDir, 'index.html');
const assetPath = join(outputDir, 'assets', 'index-zHfGHYkl.js');
const cookieYesScript = '<!-- Start CookieYes banner -->\n<script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/efe9c7e1742b321e63fe76ca5679858b/script.js"></script>\n<!-- End CookieYes banner -->';

async function main() {
  let html = await readFile(indexPath, 'utf8');
  let bundle = await readFile(assetPath, 'utf8');

  html = html
    .replace(/\s*<script\s+id="manus-runtime">[\s\S]*?<\/script>\s*/i, '\n')
    .replace(/\s*<script[^>]*src="https:\/\/manus-analytics\.com\/umami"[^>]*><\/script>\s*/i, '\n')
    .replace(/\s*<link[^>]*href="\/__manus\/pwa\/manifest\.webmanifest"[^>]*>\s*/i, '\n');

  if (!html.includes('id="cookieyes"')) {
    html = html.replace(/<head>/i, `<head>\n${cookieYesScript}`);
  }

  const storageReplacements = new Map([
    ['/manus-storage/uplift-hero-pattern_50d49c95.webp', '/media/uplift-hero-pattern_50d49c95.webp'],
    ['/manus-storage/uplift-logo-trimmed_16eb4461.webp', '/media/uplift-logo-trimmed_16eb4461.webp'],
  ]);
  for (const [remote, local] of storageReplacements.entries()) {
    bundle = bundle.split(remote).join(local);
    html = html.split(remote).join(local);
  }

  await writeFile(indexPath, html, 'utf8');
  await writeFile(assetPath, bundle, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
