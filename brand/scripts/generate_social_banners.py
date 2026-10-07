#!/usr/bin/env python3
"""
Gera os banners de redes sociais oficiais do streamer VulgoManiaco:
1. Twitch/YouTube Offline Screen (1920x1080 PNG)
2. Twitch Channel Header Banner (1200x480 PNG)
3. YouTube Channel Header Banner (2560x1440 PNG) com safe zone centralizada de 1546x423 px

Utiliza o novo logotipo horizontal aprovado, cenário atmosférico de Albion Online (youtube-bg.png),
paleta oficial (#140A1F, #732EB8, #D6D65C, #FAFAFA), tipografia 100% calculada e centralizada,
e cards táticos equilibrados, com ZERO artefatos circulares ('bola no meio') e 100% de opacidade.
"""

import os
import shutil
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TWITCH_DIR = os.path.join(BASE_DIR, 'brand', 'social', 'twitch')
YOUTUBE_DIR = os.path.join(BASE_DIR, 'brand', 'social', 'youtube')
PUBLIC_TWITCH_DIR = os.path.join(BASE_DIR, 'public', 'brand', 'social', 'twitch')
PUBLIC_YOUTUBE_DIR = os.path.join(BASE_DIR, 'public', 'brand', 'social', 'youtube')

HORIZ_LOGO_PATH = os.path.join(BASE_DIR, 'brand', 'logo', 'png', 'streamer-vulgomaniaco-horizontal-dark-master.png')
ALBION_BG_PATH = os.path.join(BASE_DIR, 'brand', 'templates', 'assets', 'youtube-bg.png')
FONT_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'rajdhani-bold.ttf')
INTER_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'inter-medium.ttf')

os.makedirs(TWITCH_DIR, exist_ok=True)
os.makedirs(YOUTUBE_DIR, exist_ok=True)
os.makedirs(PUBLIC_TWITCH_DIR, exist_ok=True)
os.makedirs(PUBLIC_YOUTUBE_DIR, exist_ok=True)

def prepare_background(target_w, target_h, overlay_alpha=215):
    """Gera fundo rico mesclando arte de Albion com overlay dark e 100% de opacidade (sem buracos transparentes)"""
    if os.path.exists(ALBION_BG_PATH):
        bg = Image.open(ALBION_BG_PATH).convert('RGBA')
        bw, bh = bg.size
        scale = max(target_w / bw, target_h / bh)
        nw, nh = int(bw * scale), int(bh * scale)
        bg = bg.resize((nw, nh), Image.Resampling.LANCZOS)
        left = (nw - target_w) // 2
        top = (nh - target_h) // 2
        bg = bg.crop((left, top, left + target_w, top + target_h))
        overlay = Image.new('RGBA', (target_w, target_h), (20, 10, 31, overlay_alpha))
        composited = Image.alpha_composite(bg, overlay)
        # Garante fundo sólido com alpha 255 em todos os pixels (sem transparência acidental)
        solid = Image.new('RGBA', (target_w, target_h), (20, 10, 31, 255))
        return Image.alpha_composite(solid, composited)
    return Image.new('RGBA', (target_w, target_h), (20, 10, 31, 255))

def draw_centered_text(draw, y, text, font, fill, total_w):
    """Calcula bounding box exata e desenha texto perfeitamente centralizado no eixo X"""
    bb = font.getbbox(text)
    tw = bb[2] - bb[0]
    draw.text(((total_w - tw) // 2, y), text, font=font, fill=fill)
    return tw

def generate_offline_banner():
    """Tela de Offline 1920x1080 com tipografia centralizada e cards estruturados (sem bolas no meio)"""
    w, h = 1920, 1080
    img = prepare_background(w, h, overlay_alpha=215)
    draw = ImageDraw.Draw(img)

    # 1. Linhas de grade tática sutis e sólidas
    for x in range(0, w, 120):
        draw.line([(x, 35), (x, h - 35)], fill=(38, 18, 60, 255), width=1)
    for y in range(0, h, 120):
        draw.line([(35, y), (w - 35, y)], fill=(38, 18, 60, 255), width=1)

    # 2. Moldura externa chanfrada com cantoneiras esportivas em neon
    cut = 45
    border_pts = [
        (cut, 35), (w - cut, 35), (w - 35, cut), (w - 35, h - cut),
        (w - cut, h - 35), (cut, h - 35), (35, h - cut), (35, cut)
    ]
    draw.polygon(border_pts, outline=(115, 46, 184, 255), width=3)
    # Acentos de canto neon
    draw.line([(cut, 35), (cut + 80, 35)], fill=(214, 214, 92, 255), width=5)
    draw.line([(35, cut), (35, cut + 80)], fill=(214, 214, 92, 255), width=5)
    draw.line([(w - cut - 80, h - 35), (w - cut, h - 35)], fill=(214, 214, 92, 255), width=5)
    draw.line([(w - 35, h - cut - 80), (w - 35, h - cut)], fill=(214, 214, 92, 255), width=5)

    # 3. Logotipo Horizontal Aprovado e Integrado (sem halo ou círculos)
    if os.path.exists(HORIZ_LOGO_PATH):
        horiz = Image.open(HORIZ_LOGO_PATH).convert('RGBA')
        hw, hh = horiz.size
        target_hh = 340
        target_hw = int(hw * (target_hh / hh))
        horiz_resized = horiz.resize((target_hw, target_hh), Image.Resampling.LANCZOS)
        hx = (w - target_hw) // 2
        hy = 195
        img.paste(horiz_resized, (hx, hy), horiz_resized)

    # 4. Tipografia Centralizada e Balanceada
    try:
        font_status = ImageFont.truetype(FONT_PATH, 48)
        font_body1 = ImageFont.truetype(INTER_PATH, 22)
        font_body2 = ImageFont.truetype(INTER_PATH, 20)
        font_sched = ImageFont.truetype(FONT_PATH, 25)
        font_foot = ImageFont.truetype(INTER_PATH, 16)
    except:
        font_status = font_body1 = font_body2 = font_sched = font_foot = ImageFont.load_default()

    # Título de Status
    draw_centered_text(draw, 605, "CANAL OFFLINE • VOLTAMOS EM BREVE!", font_status, (214, 214, 92, 255), w)

    # Mensagens de Comunidade
    draw_centered_text(draw, 678, "A stream tá off por enquanto, mas a resenha continua firme no Discord da Guilda IVEXI!", font_body1, (250, 250, 250, 255), w)
    draw_centered_text(draw, 714, "Cole com a gente pra bater papo, conferir builds e não perder os avisos das lives.", font_body2, (196, 184, 214, 255), w)

    # 5. Card Tático Inferior perfeitamente centrado com agenda e links
    card_w, card_h = 1160, 72
    card_x = (w - card_w) // 2
    card_y = 785
    c_cut = 18
    c_pts = [
        (card_x + c_cut, card_y), (card_x + card_w - c_cut, card_y),
        (card_x + card_w, card_y + c_cut), (card_x + card_w, card_y + card_h - c_cut),
        (card_x + card_w - c_cut, card_y + card_h), (card_x + c_cut, card_y + card_h),
        (card_x, card_y + card_h - c_cut), (card_x, card_y + c_cut)
    ]
    draw.polygon(c_pts, fill=(28, 12, 44, 255), outline=(115, 46, 184, 255), width=2)
    draw.line([(card_x + c_cut, card_y), (card_x + 70, card_y)], fill=(214, 214, 92, 255), width=3)
    draw.line([(card_x + card_w - 70, card_y + card_h), (card_x + card_w - c_cut, card_y + card_h)], fill=(214, 214, 92, 255), width=3)

    sched_t = "LIVES DE SEGUNDA A SEXTA ÀS 19H   •   DISCORD.GG/S246XDGP7Q   •   TWITCH.TV/VULGOMANIACO"
    bb_s = font_sched.getbbox(sched_t)
    tw_s = bb_s[2] - bb_s[0]
    draw.text(((w - tw_s) // 2, card_y + 20), sched_t, font=font_sched, fill=(214, 214, 92, 255))

    # Rodapé institucional
    draw_centered_text(draw, 930, "GUILDA IVEXI  •  ALBION ONLINE MMORPG  •  STREAMER PACK OFICIAL", font_foot, (148, 132, 172, 255), w)

    out_file = os.path.join(TWITCH_DIR, 'twitch-offline-banner-1080p.png')
    img.save(out_file, 'PNG', optimize=True)
    # Sincroniza em public/
    shutil.copyfile(out_file, os.path.join(PUBLIC_TWITCH_DIR, 'twitch-offline-banner-1080p.png'))
    print(f"✓ Offline Banner gerado: {out_file} (1920x1080)")

def generate_twitch_header():
    """Banner de Cabeçalho Twitch 1200x480 com card centralizado e sem círculos"""
    w, h = 1200, 480
    img = prepare_background(w, h, overlay_alpha=215)
    draw = ImageDraw.Draw(img)

    # 1. Linhas de grade sutis
    for x in range(0, w, 80):
        draw.line([(x, 16), (x, h - 16)], fill=(36, 16, 56, 255), width=1)
    for y in range(0, h, 80):
        draw.line([(16, y), (w - 16, y)], fill=(36, 16, 56, 255), width=1)

    # 2. Moldura chanfrada externa
    cut = 24
    draw.polygon([
        (cut, 16), (w - cut, 16), (w - 16, cut), (w - 16, h - cut),
        (w - cut, h - 16), (cut, h - 16), (16, h - cut), (16, cut)
    ], outline=(115, 46, 184, 255), width=2)
    draw.line([(cut, 16), (cut + 60, 16)], fill=(214, 214, 92, 255), width=4)
    draw.line([(16, cut), (16, cut + 60)], fill=(214, 214, 92, 255), width=4)
    draw.line([(w - cut - 60, h - 16), (w - cut, h - 16)], fill=(214, 214, 92, 255), width=4)
    draw.line([(w - 16, h - cut - 60), (w - 16, h - cut)], fill=(214, 214, 92, 255), width=4)

    # 3. Logotipo Horizontal perfeitamente centrado
    if os.path.exists(HORIZ_LOGO_PATH):
        horiz = Image.open(HORIZ_LOGO_PATH).convert('RGBA')
        hw, hh = horiz.size
        target_hh = 240
        target_hw = int(hw * (target_hh / hh))
        horiz_resized = horiz.resize((target_hw, target_hh), Image.Resampling.LANCZOS)
        hx = (w - target_hw) // 2
        hy = 52
        img.paste(horiz_resized, (hx, hy), horiz_resized)

    # 4. Card Tático Centralizado com informações do canal
    card_w, card_h = 980, 92
    card_x = (w - card_w) // 2
    card_y = 330
    c_cut = 14
    c_pts = [
        (card_x + c_cut, card_y), (card_x + card_w - c_cut, card_y),
        (card_x + card_w, card_y + c_cut), (card_x + card_w, card_y + card_h - c_cut),
        (card_x + card_w - c_cut, card_y + card_h), (card_x + c_cut, card_y + card_h),
        (card_x, card_y + card_h - c_cut), (card_x, card_y + c_cut)
    ]
    draw.polygon(c_pts, fill=(28, 12, 44, 255), outline=(115, 46, 184, 255), width=2)
    draw.line([(card_x + c_cut, card_y), (card_x + 60, card_y)], fill=(214, 214, 92, 255), width=3)
    draw.line([(card_x + card_w - 60, card_y + card_h), (card_x + card_w - c_cut, card_y + card_h)], fill=(214, 214, 92, 255), width=3)

    try:
        font_tag = ImageFont.truetype(FONT_PATH, 23)
        font_links = ImageFont.truetype(INTER_PATH, 15)
    except:
        font_tag = font_links = ImageFont.load_default()

    tag_text = "ALBION ONLINE MMORPG   •   COMBATE PvP NA BLACK ZONE   •   GUILDA IVEXI"
    draw_centered_text(draw, card_y + 16, tag_text, font_tag, (214, 214, 92, 255), w)

    draw.line([(card_x + 80, card_y + 49), (card_x + card_w - 80, card_y + 49)], fill=(75, 30, 120, 255), width=1)

    links_text = "DISCORD DA GUILDA: DISCORD.GG/S246XDGP7Q   •   SEG A SEX 19H   •   TWITCH.TV/VULGOMANIACO"
    draw_centered_text(draw, card_y + 57, links_text, font_links, (245, 240, 255, 255), w)

    out_file = os.path.join(TWITCH_DIR, 'twitch-header-banner-1200x480.png')
    img.save(out_file, 'PNG', optimize=True)
    shutil.copyfile(out_file, os.path.join(PUBLIC_TWITCH_DIR, 'twitch-header-banner-1200x480.png'))
    print(f"✓ Twitch Header Banner gerado: {out_file} (1200x480)")

def generate_youtube_header():
    """Banner de Cabeçalho YouTube 2560x1440 com safe zone centralizada de 1546x423 px"""
    w, h = 2560, 1440
    img = prepare_background(w, h, overlay_alpha=215)
    draw = ImageDraw.Draw(img)

    # Safe zone central (1546 x 423)
    sz_w, sz_h = 1546, 423
    sz_x = (w - sz_w) // 2
    sz_y = (h - sz_h) // 2

    # Fundo dentro da safe zone com destaque
    draw.rectangle([sz_x, sz_y, sz_x + sz_w, sz_y + sz_h], fill=(24, 12, 38, 220))
    draw.rectangle([sz_x, sz_y, sz_x + sz_w, sz_y + sz_h], outline=(115, 46, 184, 255), width=2)
    # Acentos de canto na safe zone
    draw.line([(sz_x, sz_y), (sz_x + 60, sz_y)], fill=(214, 214, 92, 255), width=3)
    draw.line([(sz_x + sz_w - 60, sz_y + sz_h), (sz_x + sz_w, sz_y + sz_h)], fill=(214, 214, 92, 255), width=3)

    # Logotipo Horizontal centralizado na safe zone
    if os.path.exists(HORIZ_LOGO_PATH):
        horiz = Image.open(HORIZ_LOGO_PATH).convert('RGBA')
        hw, hh = horiz.size
        target_hh = 240
        target_hw = int(hw * (target_hh / hh))
        horiz_resized = horiz.resize((target_hw, target_hh), Image.Resampling.LANCZOS)
        hx = sz_x + (sz_w - target_hw) // 2
        hy = sz_y + 35
        img.paste(horiz_resized, (hx, hy), horiz_resized)

    try:
        font_sz = ImageFont.truetype(FONT_PATH, 28)
        font_sub = ImageFont.truetype(INTER_PATH, 17)
    except:
        font_sz = font_sub = ImageFont.load_default()

    footer_text = "ALBION ONLINE MMORPG   •   COMBATE PvP NA BLACK ZONE   •   GUILDA IVEXI"
    draw_centered_text(draw, sz_y + sz_h - 95, footer_text, font_sz, (214, 214, 92, 255), w)

    social_text = "INSCREVA-SE NO CANAL   •   DISCORD DA GUILDA: DISCORD.GG/S246XDGP7Q   •   TWITCH.TV/VULGOMANIACO"
    draw_centered_text(draw, sz_y + sz_h - 52, social_text, font_sub, (250, 250, 250, 240), w)

    out_file = os.path.join(YOUTUBE_DIR, 'youtube-header-banner-2560x1440.png')
    img.save(out_file, 'PNG', optimize=True)
    shutil.copyfile(out_file, os.path.join(PUBLIC_YOUTUBE_DIR, 'youtube-header-banner-2560x1440.png'))
    print(f"✓ YouTube Header Banner gerado: {out_file} (2560x1440)")

def main():
    print("Iniciando geração dos banners sociais premium com alinhamento 100% centrado...")
    generate_offline_banner()
    generate_twitch_header()
    generate_youtube_header()
    print("✓ Todos os banners sociais gerados com sucesso e sincronizados em brand/ e public/!")

if __name__ == '__main__':
    main()
