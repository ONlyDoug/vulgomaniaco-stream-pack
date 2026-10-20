#!/usr/bin/env python3
"""Exporta o pack aprovado; não gera ilustrações nem modifica fontes originais."""
from pathlib import Path
from collections import Counter
import hashlib
import html
import json
import math
import zipfile
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
PACK = ROOT / 'brand/twitch/v2'
SOURCE = PACK / 'sources'
PREVIEW = PACK / 'previews'
UPLOAD = PACK / 'upload'
CONFIG = json.loads((SOURCE / 'prompts.json').read_text())
EMOTE_SIZES = [112, 56, 28]
BADGE_SIZES = [72, 36, 18]
DURATIONS = [80, 80, 90] * 8


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def bounds(image, threshold=127):
    return image.getchannel('A').point(lambda a: 255 if a > threshold else 0).getbbox()


def subject_bounds(image):
    """Localiza a silhueta principal para recortar restos da célula vizinha.

    Analisa somente o alfa. Não redesenha, apaga ou altera pixels da fonte.
    """
    alpha = image.getchannel('A')
    w, h = image.size
    scale = min(1, 256/max(w,h))
    sw, sh = max(1, round(w*scale)), max(1, round(h*scale))
    mask = bytearray((np.asarray(alpha.resize((sw,sh), Image.Resampling.NEAREST))>127).astype(np.uint8).tobytes())
    best_count, best = 0, None
    for start in range(len(mask)):
        if not mask[start]:
            continue
        queue = [start]
        mask[start] = 0
        count = 0
        x0, y0, x1, y1 = sw, sh, 0, 0
        while queue:
            pos = queue.pop()
            x, y = pos%sw, pos//sw
            count += 1
            x0, y0, x1, y1 = min(x0,x), min(y0,y), max(x1,x), max(y1,y)
            for adjacent in ([pos-1] if x else []) + ([pos+1] if x+1<sw else []) + ([pos-sw] if y else []) + ([pos+sw] if y+1<sh else []):
                if mask[adjacent]:
                    mask[adjacent] = 0
                    queue.append(adjacent)
        if count>best_count:
            best_count, best = count, (x0,y0,x1+1,y1+1)
    if best is None:
        raise ValueError('Célula sem silhueta principal')
    return (max(0,math.floor((best[0]-1)*w/sw)),
            max(0,math.floor((best[1]-1)*h/sh)),
            min(w,math.ceil((best[2]+1)*w/sw)),
            min(h,math.ceil((best[3]+1)*h/sh)))


def fit(image, size, box=None, bottom=False):
    """93% do maior eixo; preserva proporção, bordas transparentes e RGBA."""
    box = box or bounds(image)
    if box is None:
        raise ValueError('Fonte sem conteúdo opaco')
    cropped = image.crop(box)
    extent = round(size * .93)
    ratio = extent / max(cropped.size)
    dimensions = tuple(max(1, round(n * ratio)) for n in cropped.size)
    # Pillow usa alfa pré-multiplicado na redução RGBA para evitar halos pretos.
    resized = cropped.resize(dimensions, Image.Resampling.LANCZOS)
    result = Image.new('RGBA', (size, size))
    y = size-max(1,round(size*.035))-dimensions[1] if bottom else (size-dimensions[1])//2
    result.paste(resized, ((size-dimensions[0])//2, y))
    return result


def items():
    followers = ['gg', 'lurk', 'rip', 'love', 'kkk']
    tier1 = ['botaprafora', 'energiza', 'monta', 'batefood', 'hype']
    result = []
    for id in followers + tier1 + ['rage', 'rei', 'cristal', 'tesouro', 'lenda']:
        category = ('follower' if id in followers else 'tier1_static' if id in tier1
                    else 'tier2_static' if id == 'rage' else 'tier3_static' if id == 'rei'
                    else 'bits_emotes')
        milestone = {'cristal': 1000, 'tesouro': 5000, 'lenda': 10000}.get(id)
        result.append(dict(id=id, code='vulgo'+id.upper(), category=category,
                           milestone=milestone, source=f'{id}.png', sizes=EMOTE_SIZES,
                           extension='png', limit=1000000))
    for id in ['hype', 'energiza', 'monta', 'batefood', 'rage']:
        result.append(dict(id=id+'_anim', code='vulgo'+id.upper()+'ANIM',
                           category='tier1_animated', milestone=None,
                           source=id+('_sheet_clean.png' if id in ['hype','energiza','rage'] else '_sheet.png'), sizes=EMOTE_SIZES,
                           extension='gif', limit=512000))
    for id, category, milestone, subject in CONFIG['icons']:
        result.append(dict(id=id, code=id, category=category, milestone=milestone,
                           source=id+'.png', sizes=BADGE_SIZES if category in
                           ['bit_badges', 'badge_flairs'] else EMOTE_SIZES,
                           extension='png', limit=25000))
    return result


def sheet_frames(path):
    """Extrai o sprite Imagegen 6x4, sem alterar a arte das células."""
    sheet = Image.open(path).convert('RGBA')
    columns, rows = 6, 4
    frames = []
    for row in range(rows):
        for col in range(columns):
            frames.append(sheet.crop((round(col*sheet.width/columns),
                                      round(row*sheet.height/rows),
                                      round((col+1)*sheet.width/columns),
                                      round((row+1)*sheet.height/rows))))
    # Células podem diferir em 1 pixel devido à resolução de saída do gerador.
    w, h = max(f.width for f in frames), max(f.height for f in frames)
    normalized = []
    for f in frames:
        canvas = Image.new('RGBA', (w, h))
        canvas.paste(f, (0, 0))
        normalized.append(canvas)
    boxes = [bounds(f) for f in normalized]
    if any(b is None for b in boxes):
        raise ValueError(f'{path.name}: célula de animação vazia')
    box = (min(b[0] for b in boxes), min(b[1] for b in boxes),
           max(b[2] for b in boxes), max(b[3] for b in boxes))
    return normalized, box


def gif_frames(frames):
    """Paleta compartilhada e índice zero transparente; sem matte escuro."""
    size = frames[0].width
    atlas = Image.new('RGB', (size*len(frames), size), (250, 250, 250))
    for i, frame in enumerate(frames):
        rgb = Image.new('RGB', frame.size, (250, 250, 250))
        rgb.paste(frame, mask=frame.getchannel('A'))
        atlas.paste(rgb, (i*size, 0))
    palette = atlas.quantize(colors=127, method=Image.Quantize.MEDIANCUT)
    output = []
    for frame in frames:
        q = frame.convert('RGB').quantize(palette=palette, dither=Image.Dither.NONE)
        indices = np.asarray(q).astype(np.uint8) + 1
        indices[np.asarray(frame.getchannel('A')) < 128] = 0
        # A extração de uma grade pode incluir poucos pixels de outra célula.
        # Na máscara binária do GIF, descarta somente ilhas menores que 0,2%
        # do canvas. Preserva componentes independentes grandes, como o raio.
        visible = indices>0
        visited = np.zeros_like(visible, dtype=bool)
        for py, px in np.argwhere(visible):
            if visited[py,px]:
                continue
            stack = [(int(px),int(py))]
            visited[py,px] = True
            component = []
            while stack:
                x, y = stack.pop()
                component.append((x,y))
                for ny in range(max(0,y-1),min(size,y+2)):
                    for nx in range(max(0,x-1),min(size,x+2)):
                        if visible[ny,nx] and not visited[ny,nx]:
                            visited[ny,nx] = True
                            stack.append((nx,ny))
            if len(component)<=max(2,round(size*size*.002)):
                for x,y in component:
                    indices[y,x] = 0
        p = Image.fromarray(indices, 'P')
        p.putpalette([0, 0, 0] + palette.getpalette()[:127*3] + [0]*((256-128)*3))
        p.info['transparency'] = 0
        output.append(p)
    return output


def export(item):
    path = SOURCE / item['source']
    item['sourceSha256'] = sha(path)
    out = UPLOAD / item['category'] / item['code']
    out.mkdir(parents=True, exist_ok=True)
    if item['extension'] == 'gif':
        frames, box = sheet_frames(path)
    else:
        original = Image.open(path).convert('RGBA')
    item['files'] = []
    for size in item['sizes']:
        target = out / f"{item['code']}_{size}x{size}.{item['extension']}"
        if item['extension'] == 'gif':
            # Normaliza as margens de cada célula gerada para 93% do canvas fixo.
            # Evita que diferenças de enquadramento na grade encolham a expressão.
            converted = gif_frames([fit(f, size, subject_bounds(f)) for f in frames])
            converted[0].save(target, save_all=True, append_images=converted[1:],
                              duration=DURATIONS, loop=0, transparency=0,
                              disposal=2, optimize=False)
        else:
            rendered = fit(original, size, bottom=item['category']=='badge_flairs')
            rendered.save(target, optimize=True)
            if target.stat().st_size > item['limit']:
                rendered.quantize(colors=128, method=Image.Quantize.FASTOCTREE,
                                  dither=Image.Dither.NONE).save(target, optimize=True)
        item['files'].append(dict(path=target.relative_to(PACK).as_posix(),
                                  width=size, height=size, bytes=target.stat().st_size,
                                  sha256=sha(target)))


def validate(catalog):
    failures = []
    checks = []
    expected = {'follower': 5, 'tier1_static': 5, 'tier1_animated': 5,
                'tier2_static': 1, 'tier3_static': 1, 'bits_emotes': 3,
                'bit_badges': 9, 'badge_flairs': 2, 'channel_points': 1, 'rewards': 6}
    assert dict(Counter(x['category'] for x in catalog)) == expected
    for item in catalog:
        for record in item['files']:
            path = PACK / record['path']
            image = Image.open(path)
            errors = []
            if image.size != (record['width'], record['height']):
                errors.append('Dimensão incorreta')
            if image.format.lower() != item['extension']:
                errors.append('Formato incorreto')
            if path.stat().st_size > item['limit']:
                errors.append('Peso acima do limite')
            frame_count = getattr(image, 'n_frames', 1)
            duration = 0
            occupied = []
            luminance = []
            for index in range(frame_count):
                image.seek(index)
                duration += image.info.get('duration', 0)
                rgba = image.convert('RGBA')
                alpha = rgba.getchannel('A')
                if alpha.getextrema() != (0, 255):
                    errors.append(f'Frame {index}: transparência ou opacidade ausente')
                if item['category']=='badge_flairs':
                    center = np.asarray(alpha)[round(image.height*.15):round(image.height*.60),
                                               round(image.width*.25):round(image.width*.75)]
                    if float((center<128).mean())<.9:
                        errors.append('Flair cobre o centro da Sub Badge')
                bbox = bounds(rgba)
                if bbox is None:
                    errors.append(f'Frame {index}: vazio')
                    continue
                occupied.append(max(bbox[2]-bbox[0], bbox[3]-bbox[1])/image.width)
                if any(alpha.getpixel(p)>0 for p in [(0,0),(0,image.height-1),
                       (image.width-1,0),(image.width-1,image.height-1)]):
                    errors.append(f'Frame {index}: canto sem margem transparente')
                rgb = np.asarray(rgba).astype(float)/255
                # Sinal auxiliar de luminância média; inspeção visual continua necessária.
                luminance.append(float((rgb[:,:,:3].mean(axis=2)*rgb[:,:,3]).mean()))
            if item['extension'] == 'gif':
                if frame_count != 24 or frame_count > 60:
                    errors.append('Quantidade de frames inválida')
                if duration != 2000 or image.info.get('loop') != 0:
                    errors.append('Duração ou loop inválido')
                abrupt = sum(abs(luminance[(i+1)%len(luminance)]-value) > .10
                             for i, value in enumerate(luminance))
                if abrupt:
                    errors.append('Mudança abrupta de luminância; exige revisão da animação')
            # Tolerância de um pixel para rasterização nos tamanhos mínimos.
            if any(not .90-1/image.width <= o <= .95+1/image.width for o in occupied):
                errors.append('Enquadramento fora de 90–95% (±1 pixel)')
            check = dict(path=record['path'], status='fail' if errors else 'pass',
                         frames=frame_count, durationMs=duration,
                         minOccupiedExtent=round(min(occupied), 4),
                         maxOccupiedExtent=round(max(occupied), 4), bytes=path.stat().st_size,
                         maxFrameMeanLuminanceChange=round(max(abs(luminance[(i+1)%len(luminance)]-v)
                             for i,v in enumerate(luminance)), 4),
                         errors=errors)
            checks.append(check)
            failures.extend(f'{record["path"]}: {e}' for e in errors)
    actual = sorted(p.relative_to(PACK).as_posix() for p in UPLOAD.rglob('*') if p.is_file())
    intended = sorted(f['path'] for item in catalog for f in item['files'])
    if actual != intended or len(actual) != 114:
        failures.append('Inventário de upload divergente; esperado 114 arquivos exatos')
    preserved = json.loads((SOURCE/'preserved-sub-badges.json').read_text())
    changed = [p for p, digest in preserved.items() if not (ROOT/p).exists() or sha(ROOT/p)!=digest]
    if changed:
        failures.append('Sub Badges alteradas: '+', '.join(changed))
    report = dict(status='fail' if failures else 'pass', assets=len(catalog),
                  uploadFiles=len(actual), pngFiles=sum(p.endswith('.png') for p in actual),
                  gifFiles=sum(p.endswith('.gif') for p in actual),
                  preservedSubBadgeFiles=len(preserved), preservedSubBadgesUnchanged=not changed,
                  checks=checks, failures=failures,
                  visualReview='Conferir contact-sheet.png, flairs.png e index.html. '
                  'Validação técnica não certifica legibilidade, alinhamento de sprites ou ausência de flashes.')
    (PACK/'validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
    if failures:
        raise ValueError('\n'.join(failures))
    return report


def font(size):
    return ImageFont.truetype(str(ROOT/'brand/fonts/inter-medium.ttf'), size)


def previews(catalog):
    PREVIEW.mkdir(exist_ok=True)
    sheet = Image.new('RGB', (1200, 130+math.ceil(len(catalog)/6)*190), '#18181b')
    draw = ImageDraw.Draw(sheet)
    draw.text((28, 24), 'VULGOMANIACO / IVEXI', font=font(28), fill='#fafafa')
    draw.text((28, 68), 'TWITCH V2   /   38 ATIVOS   /   ESCALA NATIVA + AMPLIADA', font=font(15), fill='#d6d65c')
    cards = []
    for index, item in enumerate(catalog):
        x, y = (index%6)*200, 130+(index//6)*190
        large = PACK/item['files'][0]['path']
        tiny = PACK/item['files'][-1]['path']
        first = Image.open(large).convert('RGBA')
        small = Image.open(tiny).convert('RGBA')
        sheet.paste(first, (x+(200-first.width)//2, y), first)
        sheet.paste(small, (x+20, y+118), small)
        draw.text((x+60, y+122), item['id'].upper(), font=font(10), fill='#fafafa')
        draw.text((x+20, y+158), item['category'], font=font(10), fill='#b5a7c5')
        imgs = ''.join(f'<figure><img width="{f["width"]}" height="{f["height"]}" src="../{f["path"]}" alt="{html.escape(item["id"])} {f["width"]} px"><figcaption>{f["width"]} px · {f["bytes"]:,} B</figcaption></figure>' for f in item['files'])
        cards.append(f'<article><h2>{html.escape(item["code"])}</h2><p>{item["category"]}'+(f' · {item["milestone"]}' if item['milestone'] else '')+f'</p><div class="sizes">{imgs}</div></article>')
    sheet.save(PREVIEW/'contact-sheet.png', optimize=True)
    (PREVIEW/'index.html').write_text('''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Twitch v2 — IVEXI</title><style>
    *{box-sizing:border-box}body{margin:0;padding:32px;background:#18181b;color:#fafafa;font:15px system-ui}body.light{background:#f4f4f5;color:#18181b}h1{margin:0}header{max-width:1000px;margin-bottom:28px}button{padding:12px 18px;background:#d6d65c;color:#18181b;border:0;border-radius:8px;cursor:pointer;font:inherit}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}article{border:1px solid #7775;border-radius:12px;padding:20px}h2{font-size:18px}p,figcaption{color:#aaa;font-size:13px}body.light p,body.light figcaption{color:#555}.sizes{display:flex;align-items:center;gap:20px;min-height:145px}figure{margin:0}img{object-fit:contain;max-width:none}figcaption{margin-top:8px}a{color:inherit}footer{margin:30px 0}body.paused .sizes img[src$=".gif"]{visibility:hidden}</style><header><h1>VulgoManiaco / IVEXI — Twitch v2</h1><p>38 ativos · 114 arquivos. Imagens em tamanho nativo. Animações iniciam automaticamente e repetem em loop.</p><button id="theme">Alternar fundo claro / escuro</button> <button id="motion">Ocultar animações</button></header><main>'''+''.join(cards)+'''</main><footer><a href="flairs.png">Conferir flairs sobre as Sub Badges existentes</a> · <a href="../validation.json">Validação técnica</a></footer><script>document.getElementById('theme').onclick=()=>document.body.classList.toggle('light');document.getElementById('motion').onclick=function(){const paused=document.body.classList.toggle('paused');this.textContent=paused?'Mostrar animações':'Ocultar animações'}</script></html>''')
    flair_preview(catalog)
    animation_preview(catalog)


def animation_preview(catalog):
    animated = [item for item in catalog if item['extension']=='gif']
    sheet = Image.new('RGB', (1200, 90+len(animated)*160), '#18181b')
    draw = ImageDraw.Draw(sheet)
    draw.text((25,20), 'ANIMAÇÕES / 6 FASES DE CADA LOOP DE 2 SEGUNDOS', font=font(23), fill='#fafafa')
    for row, item in enumerate(animated):
        image = Image.open(PACK/item['files'][0]['path'])
        y = 90+row*160
        for col, index in enumerate([0,4,8,12,16,20]):
            image.seek(index)
            rgba = image.convert('RGBA')
            x = col*200+40
            sheet.paste(rgba, (x,y), rgba)
            draw.text((x,y+120), item['id']+' / '+str(index+1), font=font(10), fill='#fafafa')
    sheet.save(PREVIEW/'animation-frames.png', optimize=True)


def flair_preview(catalog):
    sheet = Image.new('RGB', (1200, 570), '#18181b')
    draw = ImageDraw.Draw(sheet)
    draw.text((25, 20), 'FLAIRS / SUB BADGES EXISTENTES PRESERVADAS', font=font(24), fill='#fafafa')
    badges = ['sub_1m', 'sub_2m', 'sub_3m', 'sub_6m', 'sub_9m', 'sub_1y']
    flairs = [item for item in catalog if item['category']=='badge_flairs']
    for row, flair in enumerate(flairs):
        for col, badge in enumerate(badges):
            x,y = col*200+28, row*240+80
            draw.text((x,y), badge+' / '+flair['id'], font=font(10), fill='#fafafa')
            for size, dx, dy in [(72,0,28),(36,90,28),(18,145,28)]:
                base = Image.open(ROOT/f'brand/twitch/sub_badges/{size}x{size}/{badge}-{size}x{size}.png').convert('RGBA')
                overlay = Image.open(PACK/next(f['path'] for f in flair['files'] if f['width']==size)).convert('RGBA')
                composite = Image.alpha_composite(base, overlay)
                sheet.paste(composite, (x+dx,y+dy), composite)
                light = Image.new('RGBA', (size,size), '#f4f4f5')
                light.alpha_composite(composite)
                sheet.paste(light.convert('RGB'), (x+dx,y+dy+100))
    sheet.save(PREVIEW/'flairs.png', optimize=True)


def export_stills(catalog):
    """Deriva PNGs do primeiro frame real dos GIFs finais para pausa no portal."""
    folder = PREVIEW / 'stills'
    folder.mkdir(parents=True, exist_ok=True)
    for item in catalog:
        if item['extension'] != 'gif':
            continue
        for record in item['files']:
            with Image.open(PACK / record['path']) as image:
                image.seek(0)
                image.convert('RGBA').save(folder / f"{item['id']}_{record['width']}x{record['height']}.png")


def main():
    catalog = items()
    missing = [item['source'] for item in catalog if not (SOURCE/item['source']).exists()]
    if missing:
        raise SystemExit('Fontes pendentes: '+', '.join(missing))
    for item in catalog:
        export(item)
    export_stills(catalog)
    report = validate(catalog)
    previews(catalog)
    manifest = dict(schemaVersion=1, version='2.0.0', brand='IVEXI', channel='VulgoManiaco',
                    generation='Imagegen integrado; prompts em sources/prompts.json',
                    reference='brand/twitch/referencias/03_referencia_personagem_mascote.png',
                    assets=catalog)
    (PACK/'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
    global_path = ROOT/'brand/manifest.json'
    global_manifest = json.loads(global_path.read_text())
    global_manifest['assets'] = [a for a in global_manifest['assets'] if not a['path'].startswith('twitch/v2/')]
    for item in catalog:
        for f in item['files']:
            global_manifest['assets'].append(dict(path='twitch/v2/'+f['path'],
                format=item['extension'], role='twitch_'+item['category'],
                width=f['width'], height=f['height'], sha256=f['sha256']))
    global_path.write_text(json.dumps(global_manifest, ensure_ascii=False, indent=2)+'\n')
    with zipfile.ZipFile(PACK/'pack-twitch-vulgomaniaco-v2.zip', 'w', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(UPLOAD.rglob('*')):
            if path.is_file():
                z.write(path, path.relative_to(PACK))
        for name in ['README.md','manifest.json','validation.json']:
            z.write(PACK/name, name)
    print(json.dumps({k:v for k,v in report.items() if k not in ['checks','visualReview']}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
