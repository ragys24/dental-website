/**
 * Phase 2 build-time route document generator.
 *
 * It turns the Vite shell into canonical route documents whose initial response
 * contains the final metadata and JSON-LD. React still hydrates for interaction,
 * but neither crawlers nor social scrapers need JavaScript for route identity.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_OG_IMAGE,
  GEO,
  INDEXABLE_ROBOTS,
  LEGACY_REDIRECTS,
  SITE_URL,
  GONE_PATHS,
  getCanonicalRoutes,
} from "../seo/route-registry.mjs";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const projectDir = dirname(scriptsDir);
const outputDir = join(projectDir, "dist", "public");
const routeDocumentsDir = join(outputDir, "_route-documents");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const absolute = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;
const routeDocumentName = (path) => `${path === "/" ? "home" : path.slice(1).replaceAll("/", "--")}.html`;

function breadcrumbSchema(route) {
  if (route.path === "/") return null;
  const segments = route.path.split("/").filter(Boolean);
  const crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" }];
  let runningPath = "";
  segments.forEach((segment, index) => {
    runningPath += `/${segment}`;
    crumbs.push({
      "@type": "ListItem",
      position: index + 2,
      name: index === segments.length - 1 ? route.label : segment.replace(/-/g, " "),
      item: absolute(runningPath),
    });
  });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Uplift Dental & Orthodontics",
    url: SITE_URL,
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/logo-og_e9a52b9b.webp",
    image: DEFAULT_OG_IMAGE,
    telephone: "+17148983308",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5253 Lampson Ave",
      addressLocality: "Garden Grove",
      addressRegion: "CA",
      postalCode: "92845",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
    ],
    hasMap: "https://www.google.com/maps?cid=10268131085528094278",
    sameAs: [
      "https://www.facebook.com/upliftdental",
      "https://www.instagram.com/upliftdental",
      "https://www.google.com/maps?cid=10268131085528094278",
    ],
  };
}

function routeSchemas(route) {
  const canonical = absolute(route.path);
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": route.schema === "article" ? "Article" : route.schema === "service" ? "MedicalWebPage" : "WebPage",
      "@id": `${canonical}#webpage`,
      name: route.label,
      url: canonical,
      description: route.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: route.schema === "service" ? { "@type": "MedicalSpecialty", name: route.label } : undefined,
    },
  ];
  const breadcrumb = breadcrumbSchema(route);
  if (breadcrumb) graph.push(breadcrumb);
  if (route.schema === "service") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: route.label,
      description: route.description,
      url: canonical,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: "Garden Grove" },
    });
  }
  if (route.schema === "article") {
    graph[0].mainEntityOfPage = { "@type": "WebPage", "@id": canonical };
    graph[0].dateModified = route.lastmod;
    graph[0].datePublished = route.lastmod;
    graph[0].publisher = { "@id": `${SITE_URL}/#organization` };
  }
  if (route.path === "/") {
    graph.push(localBusinessSchema());
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Uplift Dental & Orthodontics",
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function routeNoscript(route) {
  return `<!-- Route-specific no-JS fallback generated from seo/route-registry.mjs -->
    <noscript>
      <main style="font-family:Georgia,serif;max-width:900px;margin:0 auto;padding:40px 20px;color:#111;">
        <header style="border-bottom:2px solid #1a6b6b;padding-bottom:20px;margin-bottom:30px;">
          <p style="margin:0;color:#1a6b6b;font-weight:700;letter-spacing:.06em;">UPLIFT DENTAL &amp; ORTHODONTICS</p>
          <h1 style="font-size:2em;color:#1a6b6b;margin:12px 0 8px;">${escapeHtml(route.label)}</h1>
          <p style="margin:0;font-size:1.1em;">${escapeHtml(route.description)}</p>
        </header>
        <p><strong>Call:</strong> <a href="tel:+17148983308">(714) 898-3308</a> &nbsp;|&nbsp; 5253 Lampson Ave, Garden Grove, CA 92845</p>
        <p><a href="/contact">Contact Uplift Dental</a> &nbsp;|&nbsp; <a href="/services">Dental Services</a> &nbsp;|&nbsp; <a href="/blog">Dental Health Blog</a></p>
      </main>
    </noscript>`;
}

function buildRouteDocument(shell, route) {
  const canonical = absolute(route.path);
  const jsonLd = escapeJson(routeSchemas(route));
  const schemaTag = `<script id="ld-route-static" type="application/ld+json">${jsonLd}</script>`;
  const routeHead = `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="robots" content="${INDEXABLE_ROBOTS}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="geo.region" content="US-CA" />
    <meta name="geo.placename" content="Garden Grove" />
    <meta name="geo.position" content="${GEO.latitude};${GEO.longitude}" />
    <meta name="ICBM" content="${GEO.latitude}, ${GEO.longitude}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:image:alt" content="Uplift Dental & Orthodontics in Garden Grove, California" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Uplift Dental & Orthodontics" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
    ${schemaTag}`;

  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace(/\s*<meta name="keywords"[^>]*>/, "")
    .replace(/\s*<meta name="author"[^>]*>/, "")
    .replace(/\s*<meta name="robots"[^>]*>/, "")
    .replace(/\s*<link rel="canonical"[^>]*>/, "")
    .replace(/\s*<!-- Geo \/ Local SEO -->[\s\S]*?<meta name="ICBM"[^>]*>/, "")
    .replace(/\s*<!-- Open Graph -->[\s\S]*?<meta property="og:site_name"[^>]*>/, "")
    .replace(/\s*<!-- Twitter Card -->[\s\S]*?<meta name="twitter:image"[^>]*>/, "")
    .replace(/\s*<!-- Rich noscript content[\s\S]*?<\/noscript>/, "")
    .replace(/\s*<script>[\s\S]*?var canonicalBase[\s\S]*?<\/script>/, "")
    .replace(/<\/head>/, `${routeHead}\n  </head>`);

  if (route.path !== "/") {
    html = html
      .replace(/\s*<style id="home-critical-style">[\s\S]*?<\/style>/, "")
      .replace(/\s*<section id="home-critical"[\s\S]*?<\/section>\s*<script>if\(window\.location\.pathname!=="\/"\)\{document\.getElementById\("home-critical"\)\.style\.display="none"\}<\/script>/, "");
  }

  html = html.replace(/\s*<noscript>\s*<img height="1"[\s\S]*?<\/noscript>/, (match) => `${match}\n${routeNoscript(route)}`);
  return html;
}

function build404Document(shell) {
  const title = "Page Not Found | Uplift Dental";
  const description = "The requested Uplift Dental page is not available.";
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="noindex, follow" />`)
    .replace(/<link rel="canonical"[^>]*>/, "")
    .replace(/<div id="root"><\/div>/, `<main style="font-family:Arial,sans-serif;max-width:720px;margin:10vh auto;padding:24px"><p style="color:#176b6b;font-weight:700">UPLIFT DENTAL &amp; ORTHODONTICS</p><h1>Page not found</h1><p>${description}</p><p><a href="/">Return to Uplift Dental</a> or <a href="/contact">contact the office</a>.</p></main>`)
    .replace(/\s*<section id="home-critical"[\s\S]*?<\/section>\s*<script>if\(window\.location\.pathname!=="\/"\)\{document\.getElementById\("home-critical"\)\.style\.display="none"\}<\/script>/, "")
    .replace(/\s*<style id="home-critical-style">[\s\S]*?<\/style>/, "");
}

function buildSitemap(routes) {
  const urls = routes.map((route) => `  <url>\n    <loc>${absolute(route.path)}</loc>\n    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ""}\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(2)}</priority>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `# Uplift Dental & Orthodontics\n# Generated from seo/route-registry.mjs\n\nUser-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /_/\nDisallow: /_route-documents/\nDisallow: /wp-admin\nDisallow: /wp-login.php\nDisallow: /wp-content/\nDisallow: /wp-includes/\nDisallow: /wp-json/\nDisallow: /xmlrpc.php\nDisallow: /?s=*\nDisallow: /?page_id=*\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

async function main() {
  const shellPath = join(outputDir, "index.html");
  const shell = await readFile(shellPath, "utf8");
  const routes = getCanonicalRoutes();
  const seenPaths = new Set();
  await rm(routeDocumentsDir, { recursive: true, force: true });
  await mkdir(routeDocumentsDir, { recursive: true });
  for (const route of routes) {
    if (seenPaths.has(route.path)) throw new Error(`Duplicate canonical route: ${route.path}`);
    seenPaths.add(route.path);
    if (!route.path.startsWith("/")) throw new Error(`Invalid canonical path: ${route.path}`);
    const destination = route.path === "/" ? join(outputDir, "index.html") : join(routeDocumentsDir, routeDocumentName(route.path));
    await writeFile(destination, buildRouteDocument(shell, route), "utf8");
  }

  await writeFile(join(outputDir, "404.html"), build404Document(shell), "utf8");
  await writeFile(join(outputDir, "sitemap.xml"), buildSitemap(routes), "utf8");
  await writeFile(join(outputDir, "robots.txt"), buildRobots(), "utf8");
  await writeFile(join(outputDir, "phase2-routes.json"), `${JSON.stringify(routes, null, 2)}\n`, "utf8");
  await writeFile(join(outputDir, "phase2-redirects.json"), `${JSON.stringify(LEGACY_REDIRECTS, null, 2)}\n`, "utf8");
  await writeFile(join(outputDir, "phase2-gone.json"), `${JSON.stringify([...GONE_PATHS], null, 2)}\n`, "utf8");
  await rm(join(outputDir, "_phase2-stale"), { recursive: true, force: true });

  console.log(`Generated ${routes.length} canonical route documents, sitemap.xml, robots.txt, 404.html, and redirect manifest.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
