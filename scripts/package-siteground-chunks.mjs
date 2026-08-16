import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const exportDir = resolve('/home/ubuntu/exports/upliftdental-siteground');
const outputDir = resolve('/home/ubuntu/exports/upliftdental-siteground-chunks');
const mediaDir = join(exportDir, 'media');
const maxChunkBytes = 24 * 1024 * 1024;
const hardenScript = resolve('/home/ubuntu/apex-dental/scripts/harden-siteground-export.mjs');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const output = [];
  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(fullPath));
    if (entry.isFile()) output.push(fullPath);
  }
  return output;
}

function zipArchive(archivePath, files, excludeMedia = false) {
  const args = excludeMedia
    ? ['-qr', archivePath, '.', '-x', 'media/*']
    : ['-q', archivePath, ...files];
  const result = spawnSync('zip', args, { cwd: exportDir, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || `zip exited with ${result.status}`);
}

const hardenResult = spawnSync('node', [hardenScript, exportDir], { encoding: 'utf8' });
if (hardenResult.status !== 0) throw new Error(hardenResult.stderr || `SiteGround hardening exited with ${hardenResult.status}`);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const coreArchive = join(outputDir, 'upliftdental-stage-core.zip');
zipArchive(coreArchive, [], true);

const mediaFiles = await walk(mediaDir);
const chunks = [];
let current = [];
let currentSize = 0;
for (const file of mediaFiles) {
  const fileSize = (await stat(file)).size;
  if (current.length && currentSize + fileSize > maxChunkBytes) {
    chunks.push({ files: current, uncompressedBytes: currentSize });
    current = [];
    currentSize = 0;
  }
  current.push(relative(exportDir, file));
  currentSize += fileSize;
}
if (current.length) chunks.push({ files: current, uncompressedBytes: currentSize });

for (const [index, chunk] of chunks.entries()) {
  const archivePath = join(outputDir, `upliftdental-stage-media-${index + 1}.zip`);
  zipArchive(archivePath, chunk.files);
  chunk.archive = relative(outputDir, archivePath);
  chunk.compressedBytes = (await stat(archivePath)).size;
}

const manifest = {
  source: exportDir,
  maxChunkBytes,
  coreArchive: {
    archive: relative(outputDir, coreArchive),
    compressedBytes: (await stat(coreArchive)).size,
  },
  mediaChunks: chunks,
};
await writeFile(join(outputDir, 'upload-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));
