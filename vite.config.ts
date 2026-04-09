import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  vitePluginManusDebugCollector(),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Lazy-load blog data
          if (id.includes('blogData.ts')) {
            return 'blog-data';
          }
          // Lazy-load blog page
          if (id.includes('pages/Blog.tsx')) {
            return 'pages-blog';
          }
        },
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          // Routing
          'vendor-router': ['wouter'],
          // Icons
          'vendor-icons': ['lucide-react'],
          // Core pages (About, Contact, Services)
          'pages-core': [
            path.resolve(import.meta.dirname, 'client/src/pages/About.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/Contact.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/Services.tsx'),
          ],
          // Specialist service pages
          'pages-services': [
            path.resolve(import.meta.dirname, 'client/src/pages/Periodontics.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/Endodontics.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/DentalImplants.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/Invisalign.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/EmergencyDentist.tsx'),
          ],
          // Blog, gallery, offers
          'pages-secondary': [
            path.resolve(import.meta.dirname, 'client/src/pages/Gallery.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/SpecialOffers.tsx'),
          ],
          // Blog data (lazy-loaded)
          'blog-data': [
            path.resolve(import.meta.dirname, 'client/src/lib/blogData.ts'),
          ],
          // City pages bundle
          'pages-cities': [
            path.resolve(import.meta.dirname, 'client/src/pages/cities/SealBeach.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/Westminster.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/Anaheim.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/HuntingtonBeach.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/CypressCity.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/LongBeach.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/Stanton.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/BuenaPark.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/Rossmoor.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/WestGrove.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/GardenGrove.tsx'),
            path.resolve(import.meta.dirname, 'client/src/pages/cities/LosAlamitos.tsx'),
          ],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
