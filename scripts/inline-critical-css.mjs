/**
 * Post-build script: Inlines critical above-the-fold CSS and defers the main stylesheet
 * This eliminates the render-blocking CSS request for improved LCP/FCP
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(import.meta.dirname, '../dist/public');
const HTML_PATH = path.join(DIST_DIR, 'index.html');

// Critical CSS for above-the-fold content (hero section, navbar, announcement bar)
const CRITICAL_CSS = `
/* Critical above-the-fold styles */
*,::after,::before{box-sizing:border-box;border:0 solid}
html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji"}
body{margin:0;line-height:inherit;background-color:var(--background);color:var(--foreground)}
:root{--background:oklch(0.145 0 0);--foreground:oklch(0.985 0 0);--primary:oklch(0.7 0.15 180);--primary-foreground:oklch(0.985 0 0)}
.flex{display:flex;min-width:0;min-height:0}
.hidden{display:none}
.container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
@media(min-width:640px){.container{max-width:640px;padding-left:1.5rem;padding-right:1.5rem}}
@media(min-width:1024px){.container{max-width:1024px;padding-left:2rem;padding-right:2rem}}
@media(min-width:1280px){.container{max-width:1280px}}
.relative{position:relative}
.absolute{position:absolute}
.fixed{position:fixed}
.inset-0{inset:0}
.z-50{z-index:50}
.items-center{align-items:center}
.justify-between{justify-content:space-between}
.justify-center{justify-content:center}
.gap-2{gap:0.5rem}
.gap-4{gap:1rem}
.text-white{color:#fff}
.text-sm{font-size:0.875rem;line-height:1.25rem}
.text-lg{font-size:1.125rem;line-height:1.75rem}
.text-xl{font-size:1.25rem;line-height:1.75rem}
.font-bold{font-weight:700}
.font-medium{font-weight:500}
.bg-teal-900{background-color:oklch(0.277 0.046 192.524)}
.min-h-screen{min-height:100vh}
.w-full{width:100%}
.h-full{height:100%}
.overflow-hidden{overflow:hidden}
.object-cover{object-fit:cover}
#root{min-height:100vh}
`.trim();

function run() {
  if (!fs.existsSync(HTML_PATH)) {
    console.error('index.html not found at', HTML_PATH);
    process.exit(1);
  }

  let html = fs.readFileSync(HTML_PATH, 'utf-8');

  // Find the main CSS link tag and make it non-render-blocking
  const cssLinkRegex = /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/;
  const match = html.match(cssLinkRegex);

  if (!match) {
    console.log('No render-blocking CSS link found, skipping optimization');
    return;
  }

  const cssHref = match[1];
  const originalLink = match[0];

  // Replace with: inline critical CSS + deferred full stylesheet
  const replacement = `<style>${CRITICAL_CSS}</style>
    <link rel="preload" as="style" href="${cssHref}" />
    <link rel="stylesheet" href="${cssHref}" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="${cssHref}" /></noscript>`;

  html = html.replace(originalLink, replacement);

  fs.writeFileSync(HTML_PATH, html, 'utf-8');
  console.log('✅ Critical CSS inlined and main stylesheet deferred');
}

run();
