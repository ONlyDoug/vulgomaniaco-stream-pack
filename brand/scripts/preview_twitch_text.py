#!/usr/bin/env python3
"""Estudo tipográfico reversível. Usa apenas os PNGs/GIFs finais já aprovados."""
from pathlib import Path
import argparse
import hashlib
import html
import json
import zipfile
import shutil
from PIL import Image, ImageDraw, ImageFont, ImageColor

ROOT = Path(__file__).resolve().parents[2]
PACK = ROOT / 'brand/twitch/v2'
OUT = ROOT / 'brand/twitch/estudos/texto-v1'
CONFIG_PATH = ROOT / 'brand/templates/twitch-texto-v1/config.json'
CONFIG = json.loads(CONFIG_PATH.read_text())
FONT = ROOT / CONFIG['font']
COLORS = {key: ImageColor.getrgb(value) for key, value in CONFIG['palette'].items()}


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_frames(path):
    with Image.open(path) as image:
        loop = image.info.get('loop', 0)
        frames, durations = [], []
        for index in range(getattr(image, 'n_frames', 1)):
            image.seek(index)
            frames.append(image.convert('RGBA').copy())
            durations.append(image.info.get('duration', 0))
    return frames, durations, loop


def typography(text, size):
    """Ajusta fonte por resolução, sem reduzir abaixo da altura mínima de letras."""
    stroke = max(1, round(size / 28))
    margin = max(1, round(size / 56))
    available = size - 2 * (stroke + margin)
    target = {28: 12, 56: 20, 112: 34}[size]
    for font_size in range(target, 1, -1):
        font = ImageFont.truetype(str(FONT), font_size)
        bbox = font.getbbox(text)
        cap = font.getbbox('H')[3] - font.getbbox('H')[1]
        if cap < CONFIG['minCapHeight'][str(size)]:
            break
        width = bbox[2] - bbox[0]
        squeeze = min(1, available / max(width, 1))
        if squeeze < CONFIG['minTextWidthScale']:
            continue
        height = bbox[3] - bbox[1]
        layer = Image.new('RGBA', (width + 2 * stroke, height + 2 * stroke))
        draw = ImageDraw.Draw(layer)
        draw.text((stroke - bbox[0], stroke - bbox[1]), text, font=font,
                  fill=COLORS['accent'], stroke_width=stroke, stroke_fill=COLORS['ink'])
        layer = layer.resize((min(size - 2 * margin, round(layer.width * squeeze)), layer.height), Image.Resampling.LANCZOS)
        return layer, {'fontSize': font_size, 'capHeight': cap, 'textWidthScale': round(squeeze, 3),
                       'stroke': stroke, 'minimumCapHeight': CONFIG['minCapHeight'][str(size)]}
    return None, {'reason': 'Texto não cabe preservando altura mínima das letras e proporção tipográfica.',
                  'minimumCapHeight': CONFIG['minCapHeight'][str(size)]}


def compose(frame, text_layer, placement, binary_text=False):
    size = frame.width
    art_size = round(size * CONFIG['artScale'])
    art = frame.resize((art_size, art_size), Image.Resampling.LANCZOS)
    result = Image.new('RGBA', (size, size))
    x = (size - art_size) // 2
    # A mesma transformação é usada em cada frame; não há recorte/recentralização por pose.
    y = size - art_size if placement == 'top' else 0
    if placement == 'stone':
        art, x, y = frame, 0, 0
    result.alpha_composite(art, (x, y))
    text_x = (size - text_layer.width) // 2
    text_y = max(1, round(size / 56)) if placement == 'top' else size - text_layer.height - max(1, round(size / 56))
    overlay = Image.new('RGBA', result.size)
    overlay.alpha_composite(text_layer, (text_x, text_y))
    if binary_text:
        overlay.putalpha(overlay.getchannel("A").point(lambda a: 255 if a >= 128 else 0))
    result.alpha_composite(overlay)
    return result, overlay


def save_gif(frames, durations, loop, path):
    # Paleta comum, índice zero transparente e cores da tipografia reservadas.
    # Não aplicar a limpeza de pequenas ilhas do exportador de ilustrações às letras.
    sheet = Image.new('RGB', (frames[0].width * len(frames), frames[0].height))
    for index, frame in enumerate(frames):
        flat = Image.new('RGBA', frame.size, COLORS['ink'] + (255,))
        flat.alpha_composite(frame)
        sheet.paste(flat.convert('RGB'), (index * frame.width, 0))
    adaptive = sheet.quantize(colors=123, method=Image.Quantize.MEDIANCUT)
    palette = Image.new('P', (1, 1))
    reserved = [0, 0, 0] + list(COLORS['ink']) + list(COLORS['paper']) + list(COLORS['accent']) + list(COLORS['purple'])
    palette.putpalette((reserved + adaptive.getpalette()[:123 * 3])[:768])
    encoded = []
    for frame in frames:
        indexed = frame.convert('RGB').quantize(palette=palette, dither=Image.Dither.NONE)
        alpha = frame.getchannel('A')
        # O índice zero pertence só à transparência, inclusive quando RGB aproxima preto.
        pixels = list(indexed.getdata())
        indexed.putdata([0 if a < 128 else max(1, p) for p, a in zip(pixels, alpha.getdata())])
        indexed.info['transparency'] = 0
        encoded.append(indexed)
    encoded[0].save(path, save_all=True, append_images=encoded[1:], duration=durations,
                    loop=loop, disposal=2, transparency=0, optimize=False)


def generate():
    OUT.mkdir(parents=True, exist_ok=True)
    previous = json.loads((OUT / 'manifest.json').read_text()) if (OUT / 'manifest.json').exists() else None
    original_manifest = json.loads((PACK / 'manifest.json').read_text())
    assets = {a['id']: a for a in original_manifest['assets']}
    if len(CONFIG['emotes']) != 20 or len({r['id'] for r in CONFIG['emotes']}) != 20:
        raise ValueError('O estudo deve conter exatamente os 20 emotes distintos.')
    protected = {p.relative_to(ROOT).as_posix(): sha(p) for p in PACK.rglob('*') if p.is_file()}
    result = {'schemaVersion': 1, 'status': 'estudo-nao-aprovado', 'font': CONFIG['font'],
              'configSha256': sha(CONFIG_PATH), 'fontSha256': sha(FONT),
              'approvedPackHashes': protected, 'emotes': []}
    for rule in CONFIG['emotes']:
        asset = assets[rule['id']]
        entry = {'id': rule['id'], 'code': asset['code'], 'extension': asset['extension'],
                 'placement': rule['placement'], 'note': rule['note'],
                 'originals': [], 'variants': []}
        originals = {}
        for source in asset['files']:
            path = PACK / source['path']
            if sha(path) != source['sha256']:
                raise ValueError(f'Original divergente: {path}')
            frames, durations, loop = read_frames(path)
            originals[source['width']] = (frames, durations, loop)
            original_copy = OUT / 'originals' / asset['id'] / path.name
            original_copy.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(path, original_copy)
            original_still = original_copy
            if asset['extension'] == 'gif':
                original_still = original_copy.with_suffix('.png')
                frames[0].save(original_still)
            entry['originals'].append({'size': source['width'], 'path': original_copy.relative_to(OUT).as_posix(),
                                      'still': original_still.relative_to(OUT).as_posix(), 'sha256': source['sha256']})
        for variant, text in [('full', rule['text'])] + ([('short', rule['short'])] if rule.get('short') else []):
            proposal = {'id': variant, 'text': text, 'status': 'sugestao-nao-aprovada', 'files': [], 'blocked': []}
            for size, (frames, durations, loop) in originals.items():
                layer, metrics = typography(text, size)
                if layer is None:
                    proposal['blocked'].append({'size': size, **metrics})
                    continue
                folder = OUT / 'assets' / asset['id'] / variant
                folder.mkdir(parents=True, exist_ok=True)
                path = folder / f"{asset['id']}_{size}x{size}.{asset['extension']}"
                composed = [compose(frame, layer, rule['placement'], asset['extension'] == 'gif') for frame in frames]
                images = [pair[0] for pair in composed]
                mask = composed[0][1]
                mask_path = folder / f'{size}x{size}_text-mask.png'
                mask.save(mask_path)
                if asset['extension'] == 'gif':
                    save_gif(images, durations, loop, path)
                    still = folder / f'{asset["id"]}_{size}x{size}_still.png'
                    with Image.open(path) as final:
                        final.convert('RGBA').save(still)
                else:
                    images[0].save(path, optimize=True)
                    still = path
                proposal['files'].append({'size': size, 'path': path.relative_to(OUT).as_posix(),
                    'still': still.relative_to(OUT).as_posix(), 'textMask': mask_path.relative_to(OUT).as_posix(),
                    'metrics': metrics, 'sha256': sha(path), 'bytes': path.stat().st_size,
                    'originalFrames': len(frames), 'durationMs': sum(durations), 'loop': loop})
            entry['variants'].append(proposal)
        result['emotes'].append(entry)
    for path, digest in protected.items():
        if sha(ROOT / path) != digest:
            raise AssertionError(f'Original alterado: {path}')
    if previous:
        def generated_paths(m):
            paths = set()
            for item in m['emotes']:
                for variant in item['variants']:
                    for record in variant['files']:
                        paths.update(record[key] for key in ['path', 'still', 'textMask'])
            return paths
        for obsolete in generated_paths(previous) - generated_paths(result):
            candidate = (OUT / obsolete).resolve()
            if candidate.is_relative_to(OUT.resolve()) and candidate.is_file():
                candidate.unlink()
    (OUT / 'manifest.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    return result


def validate(manifest):
    failures, checked, blocked = [], 0, []
    if manifest['configSha256'] != sha(CONFIG_PATH) or manifest['fontSha256'] != sha(FONT):
        failures.append('Configuração ou fonte mudou; reconstruir as propostas.')
    if len(manifest['emotes']) != 20 or {a['id'] for a in manifest['emotes']} != {r['id'] for r in CONFIG['emotes']}:
        failures.append('Inventário de emotes divergente.')
    for item in manifest['emotes']:
        has_chat_variant = False
        for original in item['originals']:
            if sha(OUT / original['path']) != original['sha256']:
                failures.append(f"{original['path']}: cópia original divergente")
        for variant in item['variants']:
            blocked += [{'id': item['id'], 'variant': variant['id'], 'text': variant['text'], **b} for b in variant['blocked']]
            for file in variant['files']:
                path = OUT / file['path']
                frames, durations, loop = read_frames(path)
                with Image.open(path) as encoded:
                    if encoded.format.lower() != item['extension']:
                        failures.append(f'{path}: formato binário divergente')
                checked += 1
                if sha(path) != file['sha256'] or any(f.size != (file['size'], file['size']) for f in frames):
                    failures.append(f'{path}: hash ou dimensão inválida')
                if path.stat().st_size > (512000 if item['extension'] == 'gif' else 1000000):
                    failures.append(f'{path}: excede limite de bytes do pacote')
                for frame in frames:
                    bounds = frame.getchannel('A').point(lambda a: 255 if a >= 128 else 0).getbbox()
                    if not bounds or bounds[0] < 1 or bounds[1] < 1 or bounds[2] > frame.width - 1 or bounds[3] > frame.height - 1:
                        failures.append(f'{path}: conteúdo opaco toca a borda do canvas')
                if any(f.getpixel((0, 0))[3] != 0 for f in frames):
                    failures.append(f'{path}: margem transparente ausente')
                if item['extension'] == 'gif':
                    if len(frames) != file['originalFrames']:
                        failures.append(f'{path}: quantidade de frames divergente')
                    if sum(durations) != file['durationMs'] or loop != file['loop']:
                        failures.append(f'{path}: duração/loop divergente')
                    with Image.open(OUT / file['textMask']) as mask_image:
                        mask = mask_image.getchannel('A')
                        positions = [(x, y) for y in range(mask.height) for x in range(mask.width) if mask.getpixel((x, y)) > 250]
                    if not positions:
                        failures.append(f'{path}: máscara do texto vazia')
                    expected = [frames[0].getpixel(p) for p in positions]
                    if any([f.getpixel(p) for p in positions] != expected for f in frames):
                        failures.append(f'{path}: texto instável entre frames')
                    if len({f.tobytes() for f in frames}) < 2:
                        failures.append(f'{path}: movimento perdido')
                has_chat_variant |= file['size'] == 28
        if not has_chat_variant:
            failures.append(f'{item["id"]}: nenhuma proposta disponível em 28px')
    for path, digest in manifest['approvedPackHashes'].items():
        if sha(ROOT / path) != digest:
            failures.append(f'{path}: original aprovado alterado')
    report = {'status': 'pass' if not failures else 'fail', 'emotes': len(manifest['emotes']),
              'candidateFiles': checked, 'blockedProposals': blocked, 'protectedFiles': len(manifest['approvedPackHashes']),
              'failures': failures, 'visualApproval': 'pending', 'publication': 'unchanged'}
    (OUT / 'validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    if failures:
        raise AssertionError('\n'.join(failures))
    return report


def previews(manifest):
    cards = []
    chat = []
    for item in manifest['emotes']:
        variants = [{'id': 'original', 'text': 'Original sem texto', 'files': [
            {**f, 'path': f['path'], 'still': f['still']} for f in item['originals']], 'blocked': []}] + item['variants']
        columns = []
        options = ['<option value="pending">Ainda não decidir</option>']
        for variant in variants:
            label = 'Original sem texto' if variant['id'] == 'original' else ('Texto completo: ' if variant['id'] == 'full' else 'Alternativa curta: ') + variant['text']
            sizes = []
            by_size = {f['size']: f for f in variant['files']}
            for size in [112, 56, 28]:
                if size in by_size:
                    file = by_size[size]
                    still = file['still']
                    sizes.append(f'<figure><img src="{html.escape(file["path"])}" data-still="{html.escape(still)}" data-motion="{html.escape(file["path"])}" alt="{html.escape(item["code"] + " — " + label)}" width="{size}" height="{size}"><figcaption>{size}×{size}</figcaption></figure>')
                else:
                    sizes.append(f'<div class="blocked" role="note">{size}px<br>não cabe<br>com leitura mínima</div>')
            downloadable = ''.join(f'<a href="{html.escape(f["path"])}" download>{f["size"]}px {item["extension"].upper()}</a>' for f in variant['files'])
            status = '<p class="status">Arte aprovada · original preservado</p>' if variant['id'] == 'original' else '<p class="status">Sugestão para comparação · não aprovada</p>'
            columns.append(f'<section class="variant" data-variant="{variant["id"]}"><h3>{html.escape(label)}</h3>{status}<div class="sizes">{"".join(sizes)}</div><div class="downloads">{downloadable}</div></section>')
            disabled = ' disabled' if variant['blocked'] else ''
            options.append(f'<option value="{variant["id"]}"{disabled}>{html.escape(label)}{" — sem versão legível em 28px" if disabled else ""}</option>')
            if 28 in by_size:
                f = by_size[28]
                still = f['still']
                chat.append(f'<div class="chat-row"><span>{html.escape(item["code"])}</span><span class="chat-label">{html.escape(label)}</span><b>Vulgo:</b><img src="{html.escape(f["path"])}" data-motion="{html.escape(f["path"])}" data-still="{html.escape(still)}" width="28" height="28" alt="{html.escape(item["code"] + " " + label)}"><span>É isso, guilda!</span></div>')
        cards.append(f'<article id="{item["id"]}"><h2>{html.escape(item["code"])} <small>{item["extension"].upper()}</small></h2><p>{html.escape(item["note"])}</p><div class="variants">{"".join(columns)}</div><label class="choice">Sua escolha para {html.escape(item["code"])}<select data-emote="{item["id"]}">{"".join(options)}</select></label></article>')
    document = '''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Estudo de texto nos emotes — IVEXI</title><style>
*{box-sizing:border-box}body{--bg:#18181b;--fg:#fafafa;--panel:#241037;--muted:#cbc4d5;--border:#655477;margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui}body.light{--bg:#f7f7f8;--fg:#140a1f;--panel:#fff;--muted:#53465d;--border:#b9adc3}header,main,footer{max-width:1400px;margin:auto;padding:24px}header{padding-bottom:0}h1,h2,h3{font-family:Rajdhani,system-ui;line-height:1.2}h1{font-size:36px;margin:12px 0}h2{font-size:26px;margin:0;overflow-wrap:anywhere}h3{font-size:19px;margin:0 0 10px;min-height:46px}small{font:12px system-ui}p{color:var(--muted);max-width:100ch}button,select,a{font:inherit}button,select{background:var(--panel);color:var(--fg);border:1px solid var(--border);border-radius:8px;padding:10px 14px}button{cursor:pointer;max-width:100%}button[aria-pressed=true]{outline:2px solid #a88a0c}button:disabled{opacity:.65}a{color:inherit;text-underline-offset:3px}a:focus-visible,button:focus-visible,select:focus-visible{outline:3px solid #a675ef;outline-offset:3px}.controls,.downloads{display:flex;gap:12px;flex-wrap:wrap}.notice{border-left:4px solid #d6d65c;padding:12px 16px;background:var(--panel)}article{background:var(--panel);padding:20px;border:1px solid var(--border);border-radius:12px;margin-bottom:24px;scroll-margin-top:20px}.variants{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:20px}.variant{min-width:0;border-top:1px solid var(--border);padding-top:16px}.sizes{background:var(--bg);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:space-around;gap:8px;min-height:170px;padding:10px}.sizes figure{margin:0;display:flex;align-items:center;flex-direction:column;gap:6px}img{object-fit:contain;max-width:none;flex-shrink:0}figcaption,.status,.blocked{font-size:12px}.status{min-height:36px}.blocked{max-width:72px;color:var(--muted);text-align:center}.downloads{gap:10px;margin-top:12px;font-size:13px}.choice{display:flex;flex-direction:column;gap:8px;margin-top:20px}.choice select{max-width:100%;min-width:0;width:100%}.chat-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);font-size:14px}.chat-row>span:first-child{width:170px;overflow-wrap:anywhere}.chat-label{width:240px;color:var(--muted);font-size:12px}#chat{margin-bottom:28px;padding:20px;border:1px solid var(--border);border-radius:12px}.only-chat .sizes figure:not(:last-child){display:none}.only-chat .sizes{min-height:100px}#selection-status{display:block;margin-top:12px;color:var(--muted)}@media(max-width:500px){header,main,footer{padding:16px}h1{font-size:30px}article{padding:14px}.chat-row>span:first-child,.chat-label{width:auto}.chat-row{gap:6px}select{width:100%}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
</style><header><p>IVEXI · VulgoManiaco · Estudo tipográfico 01</p><h1>Palavras como apoio à expressão</h1><p>20 emotes, incluindo cinco animados. As letras estão dentro dos PNGs e dos GIFs, para acompanhar o arquivo enviado à Twitch. Compare primeiro em 28px. As artes do pacote publicado permanecem intactas.</p><p class="notice">Esta é uma comparação, não uma atualização do pacote. Abreviações como BOTA!, OC!, FOOD!, GEMA e LOOT são sugestões. Quando o texto completo não cabe com a altura mínima de letras, a versão pequena é bloqueada em vez de exportar letras ilegíveis.</p><div class="controls"><button id="dark" aria-pressed="true">Fundo escuro</button><button id="light" aria-pressed="false">Fundo claro</button><button id="motion" aria-pressed="false">Pausar animações</button><button id="size" aria-pressed="false">Mostrar só 28px</button><button id="save">Exportar minhas escolhas JSON</button><a href="prancha-escura.png" download>Prancha escura PNG</a><a href="prancha-clara.png" download>Prancha clara PNG</a><a href="comparacao-28px.png" download>Comparação em 28px PNG</a><a href="estudo-texto-emotes.zip" download>Baixar estudo ZIP</a></div><output id="selection-status" aria-live="polite">Nenhuma escolha registrada. Exporte suas escolhas antes de fechar.</output><p id="motion-status"></p></header><main><section id="chat" aria-labelledby="chat-title"><h2 id="chat-title">Comparação no chat · 28px reais</h2>'''+''.join(chat)+'''</section>'''+''.join(cards)+'''</main><footer><p>Letras nas artes: Rajdhani Bold, fonte já presente no projeto. Texto e composição feitos por código; nenhuma ilustração nova. <a href="README.md">Leia o relatório de comparação</a> · <a href="validation.json">Validação técnica</a></p></footer><script>
const $=id=>document.getElementById(id);const motion=matchMedia('(prefers-reduced-motion: reduce)');let userPaused=false;
function updateMotion(){const paused=userPaused||motion.matches;document.querySelectorAll('img[data-motion]').forEach(img=>{img.src=paused?img.dataset.still:img.dataset.motion});$('motion').textContent=paused?'Reproduzir animações':'Pausar animações';$('motion').setAttribute('aria-pressed',String(paused));$('motion').disabled=motion.matches;$('motion-status').textContent=motion.matches?'Movimento reduzido ativo: primeiro frame visível. Os downloads continuam sendo GIFs.':'';}
motion.addEventListener('change',updateMotion);$('motion').onclick=()=>{userPaused=!userPaused;updateMotion()};updateMotion();
for(const theme of ['dark','light'])$(theme).onclick=()=>{document.body.classList.toggle('light',theme==='light');$('light').setAttribute('aria-pressed',String(theme==='light'));$('dark').setAttribute('aria-pressed',String(theme==='dark'))};
$('size').onclick=()=>{const active=document.body.classList.toggle('only-chat');$('size').setAttribute('aria-pressed',String(active));$('size').textContent=active?'Mostrar todos os tamanhos':'Mostrar só 28px'};
const selects=[...document.querySelectorAll('select[data-emote]')];selects.forEach(select=>select.onchange=()=>{$('selection-status').textContent=selects.filter(s=>s.value!=='pending').length+'/20 escolhas registradas. Exporte antes de fechar.'});
$('save').onclick=()=>{const data={study:'texto-v1',status:'escolhas-para-revisao',choices:selects.map(s=>({emote:s.dataset.emote,variant:s.value}))};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='escolhas-texto-emotes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
</script></html>'''
    (OUT / 'index.html').write_text(document)
    make_sheets(manifest)


def make_sheets(manifest):
    font = ImageFont.truetype(str(FONT), 20)
    small = ImageFont.truetype(str(FONT), 15)
    for name, background, foreground in [('escura', '#18181B', '#FAFAFA'), ('clara', '#F7F7F8', '#140A1F')]:
        sheet = Image.new('RGB', (1080, 80 + len(manifest['emotes']) * 165), background)
        draw = ImageDraw.Draw(sheet)
        draw.text((20, 14), 'ESTUDO — ORIGINAL / TEXTO COMPLETO / SUGESTÃO CURTA — 112, 56 e 28px reais', font=font, fill=foreground)
        draw.text((20, 42), 'Nenhum texto aprovado. Não substitui o pacote Twitch v2.', font=small, fill=foreground)
        for row, item in enumerate(manifest['emotes']):
            y = 80 + row * 165
            draw.text((20, y), item['code'], font=font, fill=foreground)
            variants = [{'text': 'Original', 'files': [{'size': f['size'], 'path': f['path']} for f in item['originals']]}] + item['variants']
            for col, variant in enumerate(variants):
                x = 20 + col * 350
                draw.text((x, y + 25), variant['text'], font=small, fill=foreground)
                for offset, size in [(0, 112), (130, 56), (205, 28)]:
                    file = next((f for f in variant['files'] if f['size'] == size), None)
                    if file:
                        path = (OUT / file['path']).resolve()
                        with Image.open(path) as image:
                            rgba = image.convert('RGBA')
                            sheet.paste(rgba, (x + offset, y + 46 + (112 - size) // 2), rgba)
                    else:
                        draw.text((x + offset, y + 85), 'Não cabe', font=small, fill=foreground)
        sheet.save(OUT / f'prancha-{name}.png', optimize=True)
    sheet = Image.new('RGB', (1100, 64 + len(manifest['emotes']) * 48), '#18181B')
    draw = ImageDraw.Draw(sheet)
    draw.text((20, 12), 'CHAT 28px — ORIGINAL / TEXTO COMPLETO / ALTERNATIVA CURTA — sem ampliação', font=font, fill='#FAFAFA')
    for row, item in enumerate(manifest['emotes']):
        y = 64 + row * 48
        draw.text((20, y + 5), item['code'], font=small, fill='#FAFAFA')
        variants = [{'text': 'Original', 'files': [{'size': f['size'], 'path': f['path']} for f in item['originals']]}] + item['variants']
        for col, variant in enumerate(variants):
            x = 225 + col * 280
            file = next((f for f in variant['files'] if f['size'] == 28), None)
            if file:
                with Image.open((OUT / file['path']).resolve()) as image:
                    rgba = image.convert('RGBA')
                    sheet.paste(rgba, (x, y), rgba)
                draw.text((x + 36, y + 5), variant['text'], font=small, fill='#FAFAFA')
            else:
                draw.text((x, y + 5), 'Não cabe: ' + variant['text'], font=small, fill='#D6D65C')
    sheet.save(OUT / 'comparacao-28px.png', optimize=True)


def bundle():
    with zipfile.ZipFile(OUT / 'estudo-texto-emotes.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(OUT.rglob('*')):
            if path.is_file() and path.suffix in {'.png', '.gif', '.json', '.md', '.html'}:
                info = zipfile.ZipInfo(path.relative_to(OUT).as_posix(), (2026, 10, 20, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o644 << 16
                data = path.read_bytes()
                if path.relative_to(OUT).as_posix() == 'index.html':
                    data = data.replace(b'<a href="estudo-texto-emotes.zip" download>Baixar estudo ZIP</a>', b'<span>Estudo ZIP extraido</span>')
                archive.writestr(info, data)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Validar sem reconstruir as propostas')
    parser.add_argument('--bundle-only', action='store_true', help='Atualizar ZIP após a revisão, sem redesenhar os arquivos')
    args = parser.parse_args()
    if args.check or args.bundle_only:
        manifest = json.loads((OUT / 'manifest.json').read_text())
        report = validate(manifest)
    else:
        manifest = generate()
        report = validate(manifest)
        previews(manifest)
    if not args.check:
        bundle()
    print(json.dumps({k: v for k, v in report.items() if k != 'blockedProposals'}, ensure_ascii=False, indent=2))
    print('Propostas bloqueadas:', [(b['id'], b['variant'], b['size']) for b in report['blockedProposals']])


if __name__ == '__main__':
    main()
