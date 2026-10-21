import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await readFile(resolve(root,'brand/twitch/estudos/texto-v1/publication-manifest.json'),'utf8'));
const base=process.argv[2];
for(let i=0;i<manifest.files.length;i+=8)await Promise.all(manifest.files.slice(i,i+8).map(async file=>{
 let bytes;
 if(base){const response=await fetch(new URL('/emotes/'+file.path,base),{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`HTTP ${response.status}: ${file.path}`);bytes=Buffer.from(await response.arrayBuffer());}
 else bytes=await readFile(resolve(root,'dist/emotes',file.path));
 if(createHash('sha256').update(bytes).digest('hex')!==file.sha256)throw Error(`Hash ou conteúdo incorreto: ${file.path}`);
 if(file.path.endsWith('.zip')&&bytes.subarray(0,4).toString('hex')!=='504b0304')throw Error('ZIP inválido');
 if(file.path.endsWith('.png')&&bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG inválido');
 if(file.path.endsWith('.gif')&&!bytes.subarray(0,6).toString().startsWith('GIF8'))throw Error('GIF inválido');
}));
console.log(JSON.stringify({status:'pass',target:base??'dist',emotes:20,originalUploads:60,textUploads:74,files:manifest.files.length},null,2));
