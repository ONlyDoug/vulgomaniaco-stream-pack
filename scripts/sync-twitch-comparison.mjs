import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=resolve(root,'brand/twitch/estudos/texto-v1');
const target=resolve(root,'public/emotes');
const manifest=JSON.parse(await readFile(resolve(source,'publication-manifest.json'),'utf8'));
const safe=(base,path)=>{const result=resolve(base,path);if(!result.startsWith(base+'/'))throw Error('Caminho inválido');return result};
if(manifest.emotes!==20||manifest.originalUploads!==60||manifest.textUploads!==74)throw Error('Inventário incompleto');
for(const file of manifest.files){
 const from=safe(source,file.source),to=safe(target,file.path);
 const data=await readFile(from);
 if(createHash('sha256').update(data).digest('hex')!==file.sha256)throw Error(`Hash divergente: ${file.source}`);
 await mkdir(dirname(to),{recursive:true});await copyFile(from,to);
}
await copyFile(resolve(source,'publication-manifest.json'),resolve(target,'manifest.json'));
console.log('Emotes publicados: duas opções, 60 originais + 74 com texto.');
