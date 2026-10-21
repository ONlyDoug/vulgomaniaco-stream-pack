import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'brand/twitch/v2');
const target = resolve(root, 'public/assets/twitch/v2');
const manifest = JSON.parse(await readFile(resolve(source, 'manifest.json'), 'utf8'));
const files = manifest.assets.flatMap(asset => asset.files);
if (manifest.assets.length !== 38 || files.length !== 114) throw Error('Catálogo v2 incompleto');
const checkedPath = (base, path) => {
  const result = resolve(base, path);
  if (!result.startsWith(base + '/')) throw Error(`Caminho inválido: ${path}`);
  return result;
};
const copy = async (from, to) => {
  await mkdir(dirname(to), { recursive: true });
  await copyFile(from, to);
};
for (const file of files) {
  const from = checkedPath(source, file.path);
  const bytes = await readFile(from);
  if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw Error(`Hash inválido: ${file.path}`);
  await copy(from, checkedPath(target, file.path));
}
for (const asset of manifest.assets.filter(asset => asset.extension === 'gif')) {
  for (const file of asset.files) {
    const path = `previews/stills/${asset.id}_${file.width}x${file.height}.png`;
    await copy(checkedPath(source, path), checkedPath(target, path));
  }
}
for (const path of ['manifest.json', 'pack-twitch-vulgomaniaco-v2.zip', 'previews/contact-sheet.png', 'previews/flairs.png']) {
  await copy(checkedPath(source, path), checkedPath(target, path));
}
await copy(resolve(root, 'brand/brand-guide.pdf'), resolve(target, 'manual.pdf'));
await copy(resolve(root, 'brand/twitch/distintivos-twitch-todos-tamanhos.zip'), resolve(root, 'public/assets/twitch/sub-badges-vulgomaniaco.zip'));
console.log('Twitch v2 sincronizado: 38 ativos, 114 uploads, 15 stills e documentos.');

await import('./sync-twitch-comparison.mjs');
