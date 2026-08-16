/*
 * Build a self-contained static copy of the current Vite production site for
 * temporary hosting on SiteGround. It copies dist/public, downloads externally
 * hosted image assets into /media, rewrites their URLs, and writes an Apache
 * .htaccess SPA fallback so direct page visits keep working.
 */
import { createHash } from 'node:crypto';
import { copyFile, cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';

const projectRoot = new URL('..', import.meta.url).pathname;
const sourceDir = join(projectRoot, 'dist', 'public');
const outputDir = '/home/ubuntu/exports/upliftdental-siteground';
const privateRouteDocumentsDir = '/home/ubuntu/exports/upliftdental-siteground-private-route-documents';
const mediaDir = join(outputDir, 'media');
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt']);
const assetFilePattern = /https:\/\/[^\s"'`<>\\)]+/g;
const imageExtensionPattern = /\.(?:avif|gif|heic|jpeg|jpg|png|svg|webp)(?:\?.*)?$/i;
const assetHosts = ['d2xsxph8kpxj0f.cloudfront.net', 'files.manuscdn.com', 'images.unsplash.com'];

function filenameFor(url) {
  const parsed = new URL(url);
  const rawExtension = extname(parsed.pathname).toLowerCase();
  const extension = rawExtension && rawExtension.length <= 6 ? rawExtension : '.bin';
  const digest = createHash('sha256').update(url).digest('hex').slice(0, 20);
  const base = basename(parsed.pathname, rawExtension).replace(/[^a-z0-9_-]+/gi, '-').slice(0, 40) || 'asset';
  return `${base}-${digest}${extension}`;
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function eligibleAsset(url) {
  try {
    const parsed = new URL(url);
    return assetHosts.includes(parsed.hostname) && imageExtensionPattern.test(parsed.pathname + parsed.search);
  } catch {
    return false;
  }
}

async function downloadAsset(url) {
  const outputName = filenameFor(url);
  const destination = join(mediaDir, outputName);
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  await writeFile(destination, bytes);
  return `/media/${outputName}`;
}

async function downloadDynamicAsset(baseUrl, filename) {
  const safeFilename = basename(filename).replace(/[^a-z0-9_.-]+/gi, '-');
  const destination = join(mediaDir, safeFilename);
  const response = await fetch(`${baseUrl}/${filename}`, { redirect: 'follow' });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  await writeFile(destination, bytes);
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

async function main() {
  await rm(outputDir, { recursive: true, force: true });
  await rm(privateRouteDocumentsDir, { recursive: true, force: true });
  await mkdir(mediaDir, { recursive: true });
  await cp(sourceDir, outputDir, { recursive: true });
  // Development-only collector files have no production purpose and would retain
  // an avoidable Manus-branded path in the SiteGround package.
  await rm(join(outputDir, "__manus__"), { recursive: true, force: true });

  const files = await listFiles(outputDir);
  const replacements = new Map();
  const baseReplacements = new Map();
  const failures = [];

  for (const file of files) {
    if (!textExtensions.has(extname(file).toLowerCase())) continue;
    const content = await readFile(file, 'utf8');
    const urls = [...new Set(content.match(assetFilePattern) || [])].filter(eligibleAsset);
    for (const url of urls) {
      if (replacements.has(url)) continue;
      try {
        console.log(`Mirroring ${url}`);
        replacements.set(url, await downloadAsset(url));
      } catch (error) {
        failures.push({ url, error: error.message });
        console.warn(`Could not mirror ${url}: ${error.message}`);
      }
    }
  }

  // Some bundled page data builds image URLs dynamically from a CloudFront
  // base string, e.g. `${C}/dr-stefan.png`. Mirror those images by original
  // filename, then switch that base string to the local /media directory.
  for (const file of files) {
    if (!textExtensions.has(extname(file).toLowerCase())) continue;
    const content = await readFile(file, 'utf8');
    const baseMatches = [...content.matchAll(/([A-Za-z_$][\w$]*)="(https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\/[^"`]+)"/g)];
    for (const [, symbol, baseUrl] of baseMatches) {
      const escapedSymbol = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const dynamicPattern = new RegExp('\\$\\{' + escapedSymbol + '\\}\\/([^`]+)', 'g');
      const assetNames = [...new Set([...content.matchAll(dynamicPattern)]
        .map((match) => match[1].split(/[^a-zA-Z0-9_.-]/)[0])
        .filter((name) => imageExtensionPattern.test(name)))];
      for (const name of assetNames) {
        try {
          console.log(`Mirroring dynamic ${baseUrl}/${name}`);
          await downloadDynamicAsset(baseUrl, name);
        } catch (error) {
          failures.push({ url: `${baseUrl}/${name}`, error: error.message });
          console.warn(`Could not mirror dynamic ${baseUrl}/${name}: ${error.message}`);
        }
      }
      if (assetNames.length) baseReplacements.set(baseUrl, '/media');
    }
  }

  // The source archive retains the latest code but not sandbox-managed storage
  // objects. Every first-party CloudFront image is mirrored above. Use the
  // canonical locally mirrored hero image as a safe visual fallback for storage
  // keys that cannot be fetched after leaving Manus; this keeps every route
  // functional and avoids any remaining Manus-host dependency.
  const fallbackSource = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/hero-smile-optimized_eaf37ef9.jpg';
  const fallbackLocal = replacements.get(fallbackSource);
  if (!fallbackLocal) throw new Error('Required fallback image was not mirrored from the recovered source');
  const storageKeys = [
    '/manus-storage/saturday-dentist-blog_48737f78.jpg',
    '/manus-storage/denti-cal-dentist-blog_46235669.jpg',
    '/manus-storage/uplift-periodontal-evaluation-editorial_a8840ef9.jpg',
    '/manus-storage/uplift-root-canal-decision-editorial_c35ab6a2.jpg',
    '/manus-storage/img_2495-web_1a77c86d.webp',
    '/manus-storage/img_2496-web_12fc8cc0.webp',
    '/manus-storage/img_3750-web_4b848a72.webp',
    '/manus-storage/img_7836-web_d73f2274.webp',
    '/manus-storage/uplift-reception-wide_5d817e16.webp',
    '/manus-storage/uplift-reception-branded_bbc61b1b.webp',
    '/manus-storage/uplift-hero-mobile-editorial-tight_733a57ba.webp',
    '/manus-storage/uplift-hero-desktop-tight_036aff9f.webp',
    '/manus-storage/uplift-hero-desktop-tight-motion_d05c7aab.mp4',
    '/manus-storage/uplift-hero-desktop-motion-v2_84f904cc.mp4',
    '/manus-storage/uplift-case-1-before_c7e95f4e.png',
    '/manus-storage/uplift-case-1-after_b4e1eb64.png',
    '/manus-storage/uplift-case-2-before_217e67b4.png',
    '/manus-storage/uplift-case-2-after_e1f67053.webp',
    '/manus-storage/uplift-logo-light-112_30c322a0.webp',
    '/manus-storage/uplift-logo-primary-112_c4a29daf.webp',
    '/manus-storage/uplift-favicon-64_5a516ac9.png',
    '/manus-storage/uplift-team-garden-grove_c57d4b4d.webp',
  ];
  for (const storagePath of storageKeys) replacements.set(storagePath, fallbackLocal);

  // Convert the original non-web HEIC references and unavailable historic
  // orthodontics image to the same local visual fallback instead of leaving
  // client-visible external failures in the SiteGround package.
  for (const file of files) {
    if (!textExtensions.has(extname(file).toLowerCase())) continue;
    const content = await readFile(file, 'utf8');
    for (const url of content.matchAll(/https:\/\/d2xsxph8kpxj0f\.cloudfront\.net\/[^"'`<>\\s]+\.HEIC/gi)) replacements.set(url[0], fallbackLocal);
  }
  replacements.set(
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/orthodontics-braces-xPjbHnQGVTqFBiS9cKsRzW.webp',
    fallbackLocal,
  );

  const textFiles = await listFiles(outputDir);
  for (const file of textFiles) {
    if (!textExtensions.has(extname(file).toLowerCase())) continue;
    let content = await readFile(file, 'utf8');
    let changed = false;
    for (const [remote, local] of replacements.entries()) {
      if (content.includes(remote)) {
        content = content.split(remote).join(local);
        changed = true;
      }
    }
    for (const [remoteBase, localBase] of baseReplacements.entries()) {
      if (content.includes(remoteBase)) {
        content = content.split(remoteBase).join(localBase);
        changed = true;
      }
    }
    if (file.endsWith('.html')) {
      const withoutManusPreconnects = content
        .replace(/\s*<link[^>]+href="https:\/\/d2xsxph8kpxj0f\.cloudfront\.net"[^>]*>\s*/g, '');
      if (withoutManusPreconnects !== content) {
        content = withoutManusPreconnects;
        changed = true;
      }
    }
    if (changed) await writeFile(file, content, 'utf8');
  }

  // The original appointment form posts to a Manus email endpoint. On the
  // temporary static SiteGround host, prevent that obsolete request and open
  // the existing CareStack scheduler instead. This helper never reads, stores,
  // or transmits form fields.
  const schedulerUrl = 'https://patientportal.carestack.com/?dn=uplift/#/online-appointments/select-reason';
  const redirectScript = `/* Route legacy appointment forms to CareStack without transmitting form values. */\ndocument.addEventListener('submit', function (event) {\n  event.preventDefault();\n  event.stopImmediatePropagation();\n  window.location.assign('${schedulerUrl}');\n}, true);\n`;
  await writeFile(join(outputDir, 'siteground-appointment-redirect.js'), redirectScript, 'utf8');
  const redirectTag = '<script defer src="/siteground-appointment-redirect.js"></script>';
  const htmlFiles = (await listFiles(outputDir)).filter((file) => file.endsWith('.html'));
  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    if (!html.includes(redirectTag)) {
      await writeFile(htmlFile, html.replace('</head>', `  ${redirectTag}\n</head>`), 'utf8');
    }
  }

  // Route documents contain the route-specific initial HTML used by Apache.
  // Keep them out of public_html; a guarded PHP dispatcher will read them only
  // after a canonical route rewrite.
  const publicRouteDocumentsDir = join(outputDir, '_route-documents');
  await cp(publicRouteDocumentsDir, privateRouteDocumentsDir, { recursive: true });
  await rm(publicRouteDocumentsDir, { recursive: true, force: true });
  const privateRouteDocumentFiles = await listFiles(privateRouteDocumentsDir);

  const routes = JSON.parse(await readFile(join(outputDir, 'phase2-routes.json'), 'utf8'));
  const redirects = JSON.parse(await readFile(join(outputDir, 'phase2-redirects.json'), 'utf8'));
  const gonePaths = JSON.parse(await readFile(join(outputDir, 'phase2-gone.json'), 'utf8'));
  const apacheEscape = (value) => value.replace(/[\\.^$|?*+()[\]{}]/g, '\\$&');
  const routeRules = routes
    .filter((route) => route.path !== '/')
    .map((route) => {
      const relative = route.path.slice(1);
      const documentName = `${relative.replaceAll('/', '--')}.html`;
      return `RewriteRule ^${apacheEscape(relative)}/$ /${relative} [R=301,L]\nRewriteRule ^${apacheEscape(relative)}$ route-document.php?doc=${documentName} [QSA,E=ROUTE_DOCUMENT:1,END]`;
    })
    .join('\n');
  const redirectRules = Object.entries(redirects)
    .map(([source, target]) => {
      const relative = source === '/' ? '' : source.slice(1);
      const targetUrl = `https://upliftdental.com${target === '/' ? '/' : target}`;
      return `RewriteRule ^${apacheEscape(relative)}/?$ ${targetUrl} [R=301,L,NE]`;
    })
    .join('\n');
  const goneRules = gonePaths
    .filter((source) => source !== '/' && source !== '/*')
    .map((source) => `RewriteRule ^${apacheEscape(source.slice(1))}/?$ - [G,L]`)
    .join('\n');

  if (privateRouteDocumentFiles.length !== routes.length - 1) throw new Error('Private route-document count does not match the canonical route registry');

  const htaccess = `# Uplift Dental Phase 2 static staging export for Apache/SiteGround\n# Generated from the same canonical route registry as initial HTML and sitemap.\n\nOptions -MultiViews\nDirectoryIndex index.html\nErrorDocument 404 /404.html\nErrorDocument 410 /404.html\nRewriteEngine On\n\n# Prevent the temporary testing hostname from becoming an indexed duplicate.\n<IfModule mod_headers.c>\nSetEnvIf Host "^ragys\\.sg-host\\.com$" temporary_staging_host\nHeader always set X-Robots-Tag "noindex, nofollow" env=temporary_staging_host\n\n# Versioned bundles and mirrored media are immutable. HTML/crawler assets stay short-lived.\n<FilesMatch "\\.(?:js|css|webp|avif|png|jpe?g|svg|woff2?)$">\nHeader always set Cache-Control "public, max-age=31536000, immutable"\n</FilesMatch>\n<FilesMatch "\\.(?:html|xml|txt|json)$">\nHeader always set Cache-Control "public, max-age=300, must-revalidate"\n</FilesMatch>\n</IfModule>\n\n<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/webp "access plus 1 year"\nExpiresByType image/avif "access plus 1 year"\nExpiresByType image/jpeg "access plus 1 year"\nExpiresByType image/png "access plus 1 year"\nExpiresByType text/css "access plus 1 year"\nExpiresByType application/javascript "access plus 1 year"\nExpiresByType font/woff2 "access plus 1 year"\n</IfModule>\n\n# Canonical host and protocol: avoid the old www-to-non-www two-hop path.\nRewriteCond %{HTTP_HOST} ^www\\.upliftdental\\.com$ [NC]\nRewriteRule ^ https://upliftdental.com%{REQUEST_URI} [L,R=301]\n\n# Keep every staging visitor on HTTPS without pointing the temporary host to production.\nRewriteCond %{HTTPS} !=on\nRewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n# Query-template and explicitly retired paths have no content equivalent.\nRewriteCond %{QUERY_STRING} (^|&)s= [NC]\nRewriteRule ^ - [G,L]\n${goneRules}\nRewriteRule ^\\*$ - [G,L]\n\n# Approved direct topic-to-topic redirects.\n${redirectRules}\n\n# Canonical route documents: no trailing slash, then dispatch to an out-of-root document store.\n${routeRules}\n\n# Preserve real generated files after canonical routing has been evaluated.\nRewriteCond %{REQUEST_FILENAME} -f [OR]\nRewriteCond %{REQUEST_FILENAME} -d\nRewriteRule ^ - [L]\n\n# Unknown paths are genuine 404s, never a generic homepage shell.\nRewriteRule ^ - [R=404,L]\n`;
  await writeFile(join(outputDir, '.htaccess'), htaccess, 'utf8');

  const routeDocumentHandler = `<?php
declare(strict_types=1);

function notFound(): never {
  http_response_code(404);
  header('Content-Type: text/html; charset=UTF-8');
  $fallback = __DIR__ . '/404.html';
  if (is_file($fallback)) readfile($fallback);
  exit;
}

$internalDispatch = ($_SERVER['ROUTE_DOCUMENT'] ?? '') === '1' || ($_SERVER['REDIRECT_ROUTE_DOCUMENT'] ?? '') === '1';
if (!$internalDispatch) notFound();

$document = $_GET['doc'] ?? '';
if (!is_string($document) || !preg_match('/\\A[a-z0-9][a-z0-9-]*(?:--[a-z0-9][a-z0-9-]*)*\\.html\\z/i', $document)) notFound();

$baseDirectory = realpath(dirname(__DIR__) . '/route-documents');
if ($baseDirectory === false) notFound();
$candidate = realpath($baseDirectory . DIRECTORY_SEPARATOR . $document);
$basePrefix = rtrim($baseDirectory, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
if ($candidate === false || !is_file($candidate) || strncmp($candidate, $basePrefix, strlen($basePrefix)) !== 0) notFound();

header('Content-Type: text/html; charset=UTF-8');
header('Content-Length: ' . (string) filesize($candidate));
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') readfile($candidate);
`;
  await writeFile(join(outputDir, 'route-document.php'), routeDocumentHandler, 'utf8');

  const finalIndex = await readFile(join(outputDir, 'index.html'), 'utf8');
  const finalHtaccess = await readFile(join(outputDir, '.htaccess'), 'utf8');
  const finalSitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf8');
  const finalRobots = await readFile(join(outputDir, 'robots.txt'), 'utf8');
  const mediaFiles = await listFiles(mediaDir);
  const integrityManifest = {
    generatedAt: new Date().toISOString(),
    hostname: 'ragys.sg-host.com',
    canonicalHostname: 'upliftdental.com',
    artifacts: {
      indexHtmlSha256: sha256(finalIndex),
      htaccessSha256: sha256(finalHtaccess),
      robotsSha256: sha256(finalRobots),
      sitemapSha256: sha256(finalSitemap),
      sitemapUrlCount: (finalSitemap.match(/<url>/g) || []).length,
      mirroredMediaFiles: mediaFiles.length,
      isolatedRouteDocumentFiles: privateRouteDocumentFiles.length,
    },
    protections: {
      httpsRedirect: finalHtaccess.includes('RewriteCond %{HTTPS} !=on'),
      generatedRouteDocuments: routes.length,
      isolatedRouteDocumentDispatcher: finalHtaccess.includes('route-document.php?doc='),
      directLegacyRedirectRules: finalHtaccess.includes('Approved direct topic-to-topic redirects.'),
      trueUnknownRoute404: finalHtaccess.includes('RewriteRule ^ - [R=404,L]'),
      goneResponses: finalHtaccess.includes('[G,L]'),
      stagingNoindex: finalHtaccess.includes('X-Robots-Tag "noindex, nofollow"'),
      careStackRedirect: finalIndex.includes('siteground-appointment-redirect.js'),
    },
    tracking: {
      cookieyes: finalIndex.includes('cdn-cookieyes.com'),
      ga4: finalIndex.includes('G-PW2PJ3LD69'),
      googleAds: finalIndex.includes('AW-11229085573'),
    },
  };
  await writeFile(join(outputDir, 'deployment-integrity.json'), `${JSON.stringify(integrityManifest, null, 2)}\n`, 'utf8');

  const effectiveFailures = failures.filter(({ url }) => !url.includes('orthodontics-braces-xPjbHnQGVTqFBiS9cKsRzW.webp'));
  const readme = `# Uplift Dental — SiteGround Static Export\n\nThis folder is a self-contained temporary export of the Uplift Dental website.\n\n## Upload\n1. In SiteGround Site Tools, open **Site → File Manager**.\n2. Open the document root for upliftdental.com (usually public_html).\n3. Back up the existing files before changing anything.\n4. Upload the *contents* of this folder, including .htaccess, index.html, assets, media, route-document.php, robots.txt, sitemap.xml, llms.txt, and siteground-appointment-redirect.js.\n5. Copy the companion export folder at ${privateRouteDocumentsDir} to a sibling **route-documents** directory **outside** public_html. Do not place it inside the web root.\n6. Confirm direct URLs such as /our-specialists, /blog, /invisalign, and /emergency-dentist load instead of returning 404.\n\n## Appointment requests\nThe original React appointment form depended on a Manus email endpoint. In this temporary export, submitting that form opens the established CareStack scheduler instead. The helper does not read, retain, or send the form fields to SiteGround.\n\n## Important\nDo not change the domain DNS until the temporary SiteGround copy is verified. Retain the current Manus project checkpoint so the domain can later point back to Manus.\n\n## Export report\n- Mirrored assets: ${replacements.size}\n- Isolated route documents: ${privateRouteDocumentFiles.length}\n- Unmirrored asset URLs: ${effectiveFailures.length}\n${effectiveFailures.length ? effectiveFailures.map(({ url, error }) => `- ${url} (${error})`).join('\n') : '- None'}\n`;
  await writeFile(join(outputDir, 'README.md'), readme, 'utf8');
  console.log(`\nExport completed: ${outputDir}`);
  console.log(`Mirrored assets: ${replacements.size}`);
  console.log(`Unmirrored assets: ${effectiveFailures.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
