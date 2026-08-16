import express from "express";
import { createServer } from "http";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.set("trust proxy", true);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const readJson = <T,>(filename: string): T => JSON.parse(readFileSync(path.join(staticPath, filename), "utf8")) as T;
  const routes = readJson<Array<{ path: string }>>("phase2-routes.json");
  const redirects = readJson<Record<string, string>>("phase2-redirects.json");
  const gonePaths = new Set(readJson<string[]>("phase2-gone.json"));
  const routePaths = new Set(routes.map((route) => route.path));
  const routeDocumentName = (routePath: string) => `${routePath === "/" ? "home" : routePath.slice(1).replaceAll("/", "--")}.html`;

  const normalizePath = (value: string) => {
    if (value === "/") return "/";
    return `/${decodeURIComponent(value).replace(/^\/+|\/+$/g, "")}`;
  };
  const canonicalUrl = (pathname: string, rawQuery = "") => `https://upliftdental.com${pathname === "/" ? "/" : pathname}${rawQuery}`;
  const sendGone = (res: express.Response) => res.status(410).set("X-Robots-Tag", "noindex, follow").sendFile(path.join(staticPath, "404.html"));
  const sendNotFound = (res: express.Response) => res.status(404).set("X-Robots-Tag", "noindex, follow").sendFile(path.join(staticPath, "404.html"));

  app.use((req, res, next) => {
    const hostname = (req.hostname || "").toLowerCase();
    const normalizedPath = normalizePath(req.path);
    const query = req.query as Record<string, string | string[] | undefined>;
    const requestedHttps = req.protocol === "https" || req.get("x-forwarded-proto") === "https";
    const redirectTarget = redirects[normalizedPath];
    const queryIndex = req.originalUrl.indexOf("?");
    const rawQuery = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : "";

    if (Array.isArray(query.s) || typeof query.s === "string") return sendGone(res);
    if (gonePaths.has(normalizedPath)) return sendGone(res);
    if (redirectTarget) return res.redirect(301, canonicalUrl(redirectTarget, rawQuery));
    if (req.path !== "/" && /\/$/.test(req.path) && routePaths.has(normalizedPath)) return res.redirect(301, canonicalUrl(normalizedPath, rawQuery));
    if (hostname === "www.upliftdental.com" || !requestedHttps) return res.redirect(301, canonicalUrl(normalizedPath, rawQuery));
    next();
  });

  app.use(express.static(staticPath, { index: false, redirect: false }));

  app.get("*", (req, res) => {
    const normalizedPath = normalizePath(req.path);
    if (routePaths.has(normalizedPath)) {
      const routeFile = normalizedPath === "/"
        ? path.join(staticPath, "index.html")
        : path.join(staticPath, "_route-documents", routeDocumentName(normalizedPath));
      return res.sendFile(routeFile);
    }
    return sendNotFound(res);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
