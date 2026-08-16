import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const root = '/home/ubuntu/apex-dental';
const inventoryPath = path.join(root, 'phase2-noindex-inventory-2026-08-14.md');
const outputDir = path.join(root, 'phase2-search-console', 'noindex-provenance');
const outputPath = path.join(outputDir, 'current-raw-provenance.json');

const inventory = await readFile(inventoryPath, 'utf8');
const candidates = [...inventory.matchAll(/\|\s*\d+\s*\|\s*`([^`]+)`\s*\|/g)]
  .map((match) => match[1])
  .filter((value) => !['/*', '/$', '/?s={search_term_string}'].includes(value));

const probe = async (candidate) => {
  const url = `https://upliftdental.com${candidate}`;
  const headerFile = path.join(outputDir, `headers-${Buffer.from(candidate).toString('base64url')}.txt`);
  const bodyFile = path.join(outputDir, `body-${Buffer.from(candidate).toString('base64url')}.html`);
  try {
    await execFileAsync('curl', ['-sS', '--max-time', '20', '-D', headerFile, '-o', bodyFile, '-w', '%{http_code}', url]);
    const [headers, body] = await Promise.all([
      readFile(headerFile, 'utf8'),
      readFile(bodyFile, 'utf8'),
    ]);
    const statusMatches = [...headers.matchAll(/^HTTP\/[^ ]+\s+(\d+)/gmi)];
    const status = statusMatches.at(-1)?.[1] ?? 'unknown';
    const xRobots = headers.match(/^x-robots-tag:\s*([^\n\r]+)/gmi)?.map((line) => line.trim()) ?? [];
    const robots = body.match(/<meta[^>]+name=["']robots["'][^>]*>/gi) ?? [];
    const canonical = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)?.[1] ?? null;
    const title = body.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
    return {
      candidate,
      url,
      status: Number(status),
      xRobots,
      robots,
      canonical,
      title,
      currentNoindex: /noindex/i.test(`${xRobots.join(' ')} ${robots.join(' ')}`),
      genericHomepageShell: canonical === 'https://upliftdental.com/' && title?.includes('Uplift Dental'),
    };
  } catch (error) {
    return { candidate, url, error: error.message };
  }
};

await mkdir(outputDir, { recursive: true });
const results = [];
for (const candidate of candidates) {
  results.push(await probe(candidate));
}

await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: results.length }, null, 2));
