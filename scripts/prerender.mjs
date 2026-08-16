import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const outputDirectory = path.join(root, "dist", "public");
const sitemapPath = path.join(root, "client", "public", "sitemap.xml");
const canonicalOrigin = "https://upliftdental.com";
const port = Number(process.env.PRERENDER_PORT || 4174);

if (!fs.existsSync(path.join(outputDirectory, "index.html"))) {
  throw new Error("Build output is missing. Run `vite build` before prerendering.");
}

const sitemapRoutes = [...fs.readFileSync(sitemapPath, "utf8").matchAll(/<loc>https:\/\/upliftdental\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/")
  .filter((route, index, all) => all.indexOf(route) === index);
const routes = [...sitemapRoutes, "/404"];

// Keep /blog as the canonical archive document while emitting article documents
// as flat files. Apache maps the public article URLs to these files, avoiding a
// physical /blog directory that SiteGround's DirectorySlash would canonicalize.
function getDestination(route) {
  if (route === "/") return path.join(outputDirectory, "index.html");
  if (route.startsWith("/blog/")) {
    return path.join(outputDirectory, `blog--${route.slice("/blog/".length)}.html`);
  }
  return path.join(outputDirectory, `${route.replace(/^\//, "")}.html`);
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function resolveStaticPath(requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const candidate = path.resolve(outputDirectory, relative || "index.html");
  return candidate.startsWith(outputDirectory) ? candidate : null;
}

const server = http.createServer((request, response) => {
  const requested = resolveStaticPath(request.url || "/");
  const filePath = requested && fs.existsSync(requested) && fs.statSync(requested).isFile()
    ? requested
    : path.join(outputDirectory, "index.html");
  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, { "Content-Type": mimeTypes[extension] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

try {
  for (const route of routes) {
    const renderedUrl = `http://127.0.0.1:${port}${route}`;
    const { stdout } = await execFileAsync("chromium", [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-background-networking",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=1200",
      "--dump-dom",
      renderedUrl,
    ], { maxBuffer: 20 * 1024 * 1024 });

    const canonical = `${canonicalOrigin}${route}`;
    if (!stdout.includes('id="root"') || (route !== "/404" && !stdout.includes(`href=\"${canonical}\"`))) {
      throw new Error(`Prerender validation failed for ${route}`);
    }

    const destination = getDestination(route);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, stdout.trim());
    console.log(`rendered\t${route}\t${path.relative(outputDirectory, destination)}`);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

console.log(`Prerendered ${sitemapRoutes.length} sitemap routes plus the 404 page.`);
