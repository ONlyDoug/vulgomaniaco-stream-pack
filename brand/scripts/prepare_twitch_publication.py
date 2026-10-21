#!/usr/bin/env python3
"""Empacota as duas opções aprovadas; não redesenha emotes nem altera o v2."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import hashlib, json, zipfile, re
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'brand/twitch/estudos/texto-v1'
manifest=json.loads((SOURCE/'manifest.json').read_text())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
files={}
def include(source,target=None):
 p=SOURCE/source
 files[target or source]={'source':source,'path':target or source,'sha256':sha(p),'bytes':p.stat().st_size}
originals=[];text=[]
for emote in manifest['emotes']:
 for f in emote['originals']:
  assert sha(SOURCE/f['path'])==f['sha256']
  originals.append((f['path'],f"{emote['id']}/{Path(f['path']).name}"))
  include(f['path']); include(f['still'])
 for variant in emote['variants']:
  for f in variant['files']:
   assert sha(SOURCE/f['path'])==f['sha256']
   text.append((f['path'],f"{emote['id']}/{variant['id']}/{Path(f['path']).name}"))
   include(f['path']);include(f['still'])
assert len(originals)==60 and len(text)==74 and len(manifest['emotes'])==20
for filename,entries,note in [
 ('emotes-sem-texto.zip',originals,'20 emotes originais: 60 PNG/GIF em 112, 56 e 28px.'),
 ('emotes-com-texto.zip',text,'20 emotes com texto: 74 PNG/GIF, incluindo versões completas e alternativas curtas. BOTA PRA FORA não possui 56/28px; ENERGIZA, BATE FOOD e TESOURO não possuem 28px nas variantes completas. As variantes curtas cobrem os tamanhos pequenos. Nenhuma imagem foi inventada para preencher tamanhos indisponíveis.')]:
 with zipfile.ZipFile(SOURCE/filename,'w',zipfile.ZIP_DEFLATED) as archive:
  for src,name in entries:
   info=zipfile.ZipInfo(name,(2026,10,21,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
   archive.writestr(info,(SOURCE/src).read_bytes())
  archive.writestr('LEIA-ME.txt',note+'\nOs códigos são sugestões. Confira o prefixo do seu canal. Não inclui Sub Badges, flairs ou resgates.\n')
 include(filename)
page=(SOURCE/'index.html').read_text()
page=page.replace('Estudo de texto nos emotes — IVEXI','Emotes com e sem texto — IVEXI').replace('Estudo tipográfico 01','Emotes com e sem texto')
page=page.replace('Esta é uma comparação, não uma atualização do pacote.','Disponíveis para download: emotes originais sem texto e versões com texto.')
page=page.replace('Abreviações como BOTA!, OC!, FOOD!, GEMA e LOOT são sugestões.','As opções com texto incluem BOTA!, OC!, FOOD!, GEMA e LOOT, além das palavras completas nos tamanhos disponíveis.')
page=page.replace('Sugestão para comparação · não aprovada','Versão com texto').replace('As artes do pacote publicado permanecem intactas.','O pacote v2 e as seis Sub Badges continuam disponíveis no hub.')
page=page.replace('<a href="estudo-texto-emotes.zip" download>Baixar estudo ZIP</a>','<a href="emotes-sem-texto.zip" download>Baixar emotes sem texto · ZIP</a><a href="emotes-com-texto.zip" download>Baixar emotes com texto · ZIP</a>')
page=page.replace('<a href="validation.json">Validação técnica</a>','<a href="/badges">Voltar ao pack Twitch</a>')
page=page.replace('<h1>Palavras como apoio à expressão</h1>','<a href="/">← Voltar ao hub</a><h1>Emotes com e sem texto</h1>')
(SOURCE/'publication-index.html').write_text(page)
include('publication-index.html','index.html')
(SOURCE/'PUBLICACAO.md').write_text('# Emotes com e sem texto\n\nPublicação aprovada na conversa de 2026-10-21. Os 20 originais continuam disponíveis (60 arquivos); versões com texto completo e curto somam 74 arquivos. Os sete tamanhos indisponíveis são sinalizados na página. Os dois ZIPs contêm somente uploads e instruções. Os GIFs preservam movimento e letras incorporadas.\n\nA escolha individual para upload no canal fica com quem baixa os arquivos. O pacote Twitch v2, seus downloads e as Sub Badges são preservados.\n')
include('PUBLICACAO.md','README.md')
font=ImageFont.truetype(str(ROOT/'brand/fonts/rajdhani-bold.ttf'),20)
small=ImageFont.truetype(str(ROOT/'brand/fonts/rajdhani-bold.ttf'),15)
for theme,bg,fg in [('escura','#18181B','#FAFAFA'),('clara','#F7F7F8','#140A1F')]:
 with Image.open(SOURCE/f'prancha-{theme}.png') as im:
  im=im.convert('RGB');draw=ImageDraw.Draw(im);draw.rectangle((0,0,im.width,79),fill=bg)
  draw.text((20,14),'EMOTES — ORIGINAL / TEXTO COMPLETO / ALTERNATIVA CURTA — 112, 56 e 28px reais',font=font,fill=fg)
  draw.text((20,42),'Duas opções para o chat. Tamanhos indisponíveis sinalizados; pacote v2 preservado.',font=small,fill=fg)
  im.save(SOURCE/f'publication-prancha-{theme}.png',optimize=True)
 include(f'publication-prancha-{theme}.png',f'prancha-{theme}.png')
include('comparacao-28px.png')
publication={'version':1,'approval':'Conversa de 2026-10-21: original + todas as versões com texto','emotes':20,'originalUploads':60,'textUploads':74,'blockedSizes':7,'files':list(files.values())}
(SOURCE/'publication-manifest.json').write_text(json.dumps(publication,ensure_ascii=False,indent=2)+'\n')
print('Publicação preparada: 60 originais + 74 com texto; dois ZIPs; página estática.')
