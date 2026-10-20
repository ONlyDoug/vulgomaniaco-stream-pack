import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'brand/twitch/v2/manifest.json'), 'utf8'));
const base = process.argv[2];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const expected = manifest.assets.flatMap(asset => asset.files.map(file => ({
  path: `assets/twitch/v2/${file.path}`, hash: file.sha256, type: asset.extension,
})));
for (const asset of manifest.assets.filter(a => a.extension === 'gif')) for (const file of asset.files) {
  const path = `previews/stills/${asset.id}_${file.width}x${file.height}.png`;
  expected.push({ path: `assets/twitch/v2/${path}`, hash: sha(await readFile(resolve(root, 'brand/twitch/v2', path))), type: 'png' });
}
for (const [from, to, type] of [
  ['brand/brand-guide.pdf', 'assets/twitch/v2/manual.pdf', 'pdf'],
  ['brand/twitch/v2/pack-twitch-vulgomaniaco-v2.zip', 'assets/twitch/v2/pack-twitch-vulgomaniaco-v2.zip', 'zip'],
  ['brand/twitch/v2/previews/contact-sheet.png', 'assets/twitch/v2/previews/contact-sheet.png', 'png'],
  ['brand/twitch/v2/previews/flairs.png', 'assets/twitch/v2/previews/flairs.png', 'png'],
  ['brand/twitch/distintivos-twitch-todos-tamanhos.zip', 'assets/twitch/sub-badges-vulgomaniaco.zip', 'zip'],
]) expected.push({ path: to, hash: sha(await readFile(resolve(root, from))), type });
for (const id of ['1m', '2m', '3m', '6m', '9m', '1y']) for (const size of ['18x18', '36x36', '72x72', '512_master']) {
  const path = `assets/twitch/sub_badges/sub_${id}_${size}.png`;
  expected.push({ path, hash: sha(await readFile(resolve(root, 'src', path))), type: 'png' });
}
const magic = {
  png: b => b.subarray(0, 8).toString('hex') === '89504e470d0a1a0a',
  gif: b => ['GIF87a', 'GIF89a'].includes(b.subarray(0, 6).toString()),
  zip: b => b.subarray(0, 4).toString('hex') === '504b0304',
  pdf: b => b.subarray(0, 5).toString() === '%PDF-',
};
// Bounded concurrency keeps production checks modest and reports the actual failing path.
for (let i = 0; i < expected.length; i += 6) await Promise.all(expected.slice(i, i + 6).map(async file => {
  let bytes;
  if (base) {
    const response = await fetch(new URL(file.path, base.endsWith('/') ? base : base + '/'), { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw Error(`${file.path}: HTTP ${response.status}`);
    bytes = Buffer.from(await response.arrayBuffer());
  } else bytes = await readFile(resolve(root, 'public', file.path));
  if (!magic[file.type](bytes)) throw Error(`${file.path}: conteúdo ${file.type} inválido (possível fallback HTML)`);
  if (sha(bytes) !== file.hash) throw Error(`${file.path}: SHA-256 divergente`);
}));
console.log(JSON.stringify({ status: 'pass', target: base ?? 'public/', assets: manifest.assets.length,
  uploads: 114, stills: 15, documents: 5, preservedSubBadgeFiles: 24, verifiedFiles: expected.length }, null, 2));
