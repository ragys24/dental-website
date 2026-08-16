/**
 * UPLIFT DENTAL — Emergency SiteGround staging packager
 * Staging design reminder: this creates an isolated /emergency/ copy for the
 * temporary ragys.sg-host.com host. It does not change emergency.upliftdental.com,
 * production DNS, canonical URLs, or production robots directives.
 */
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const sourceDir = '/home/ubuntu/exports/uplift-emergency-siteground';
const outputDir = '/home/ubuntu/exports/uplift-emergency-siteground-staging/emergency';

async function rewriteAssetPaths(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) return rewriteAssetPaths(target);
    if (!/\.(?:html|js|css)$/i.test(entry.name)) return;

    const original = await readFile(target, 'utf8');
    const rewritten = original
      .replaceAll('"/assets/', '"/emergency/assets/')
      .replaceAll("'/assets/", "'/emergency/assets/")
      .replaceAll('(/assets/', '(/emergency/assets/')
      .replaceAll('url(/assets/', 'url(/emergency/assets/');
    if (rewritten !== original) await writeFile(target, rewritten, 'utf8');
  }));
}

async function main() {
  await rm('/home/ubuntu/exports/uplift-emergency-siteground-staging', { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp(sourceDir, outputDir, { recursive: true });
  await rewriteAssetPaths(outputDir);
  const indexPath = join(outputDir, 'index.html');
  const indexHtml = await readFile(indexPath, 'utf8');
  const stagingPathNormalizer = `<script>if (location.pathname === '/emergency' || location.pathname === '/emergency/') { history.replaceState(null, '', '/' + location.search + location.hash); }</script>`;
  await writeFile(indexPath, indexHtml.replace('</head>', `${stagingPathNormalizer}\n</head>`), 'utf8');
  await writeFile(join(outputDir, '.htaccess'), `Options -Indexes
DirectoryIndex index.html
<IfModule mod_headers.c>
  Header always set X-Robots-Tag "noindex, nofollow"
</IfModule>
`, 'utf8');
  console.log(`Prepared isolated staging emergency package at ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
