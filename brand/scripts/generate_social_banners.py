#!/usr/bin/env python3
"""
Gera os banners de redes sociais oficiais do streamer VulgoManiaco:
1. Twitch/YouTube Offline Screen (1920x1080 PNG)
2. Twitch Channel Header Banner (1200x480 PNG)
3. YouTube Channel Header Banner (2560x1440 PNG) com safe zone centralizada de 1546x423 px

Utiliza os logotipos aprovados 'O Escudo Tático' (Badge e Horizontal),
cenário atmosférico de Albion Online (youtube-bg.png), paleta oficial (#140A1F, #732EB8, #D6D65C, #FAFAFA)
e linguagem humana, acolhedora e conectada com a comunidade.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TWITCH_DIR = os.path.join(BASE_DIR, 'brand', 'social', 'twitch')
YOUTUBE_DIR = os.path.join(BASE_DIR, 'brand', 'social', 'youtube')
SRC_IMG_DIR = os.path.join(BASE_DIR, 'src', 'assets', 'images')

BADGE_LOGO_PATH = os.path.join(BASE_DIR, 'brand', 'logo', 'png', 'streamer-vulgomaniaco-badge-dark-master.png')
HORIZ_LOGO_PATH = os.path.join(BASE_DIR, 'brand', 'logo', 'png', 'streamer-vulgomaniaco-horizontal-dark-master.png')
ALBION_BG_PATH = os.path.join(BASE_DIR, 'brand', 'templates', 'assets', 'youtube-bg.png')
FONT_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'rajdhani-bold.ttf')
INTER_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'inter-medium.ttf')

os.makedirs(TWITCH_DIR, exist_ok=True)
os.makedirs(YOUTUBE_DIR, exist_ok=True)

def prepare_background(target_w, target_h, overlay_alpha=215):
    """Gera fundo rico mesclando arte de Albion com overlay dark e roxo místico"""
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
        return Image.alpha_composite(bg, overlay)
    return Image.new('RGBA', (target_w, target_h), (20, 10, 31, 255))

def generate_offline_banner():
    """Tela de Offline 1920x1080 para Twitch / Kick / YouTube de alto padrão"""
    w, h = 1920, 1080
    img = prepare_background(w, h, overlay_alpha=200)
    draw = ImageDraw.Draw(img)

    # 1. Iluminação radial e mística no centro atrás do logotipo
    for r in range(550, 120, -30):
        alpha = int(55 * (1 - r / 550))
        draw.ellipse([w // 2 - r, h // 2 - r - 80, w // 2 + r, h // 2 + r - 80], fill=(115, 46, 184, alpha))

    # Linhas de grade sutis
    for x in range(0, w, 120):
        draw.line([(x, 0), (x, h)], fill=(75, 30, 120, 45), width=1)
    for y in range(0, h, 120):
        draw.line([(0, y), (w, y)], fill=(75, 30, 120, 45), width=1)

    # 2. Moldura externa chanfrada com cantoneiras neon esportivas
    cut = 45
    border_pts = [
        (cut, 35), (w - cut, 35), (w - 35, cut), (w - 35, h - cut),
        (w - cut, h - 35), (cut, h - 35), (35, h - cut), (35, cut)
    ]
    draw.polygon(border_pts, outline=(115, 46, 184, 255), width=3)
    # Cantoneiras neon
    draw.line([(cut, 35), (cut + 80, 35)], fill=(214, 214, 92, 255), width=5)
    draw.line([(35, cut), (35, cut + 80)], fill=(214, 214, 92, 255), width=5)
    draw.line([(w - cut - 80, h - 35), (w - cut, h - 35)], fill=(214, 214, 92, 255), width=5)
    draw.line([(w - 35, h - cut - 80), (w - 35, h - cut)], fill=(214, 214, 92, 255), width=5)

    # 3. Logotipo Master Badge Oficial no Centro com profundidade
    if os.path.exists(BADGE_LOGO_PATH):
        badge = Image.open(BADGE_LOGO_PATH).convert('RGBA')
        bw, bh = badge.size
        target_bh = 520
        target_bw = int(bw * (target_bh / bh))
        badge_resized = badge.resize((target_bw, target_bh), Image.Resampling.LANCZOS)
        bx = (w - target_bw) // 2
        by = (h - target_bh) // 2 - 90
        # Sombra suave e difusa sob o badge (glow místico sem 'bola preta')
        shadow_box = Image.new('RGBA', (target_bw + 80, target_bh + 80), (0, 0, 0, 0))
        s_draw = ImageDraw.Draw(shadow_box)
        s_draw.ellipse([40, 40, target_bw + 40, target_bh + 40], fill=(75, 30, 120, 80))
        shadow_box = shadow_box.filter(ImageFilter.GaussianBlur(25))
        img.paste(shadow_box, (bx - 40, by - 30), shadow_box)
        img.paste(badge_resized, (bx, by), badge_resized)

    # 4. Tipografia Profissional e Acolhedora
    try:
        font_status = ImageFont.truetype(FONT_PATH, 50)
        font_body1 = ImageFont.truetype(INTER_PATH, 22)
        font_body2 = ImageFont.truetype(INTER_PATH, 20)
        font_sched = ImageFont.truetype(FONT_PATH, 26)
        font_social = ImageFont.truetype(INTER_PATH, 18)
    except:
        font_status = font_body1 = font_body2 = font_sched = font_social = ImageFont.load_default()

    # Status Tag
    status_text = "CANAL OFFLINE • VOLTAMOS EM BREVE!"
    draw.text((w // 2 - 370, h - 260), status_text, font=font_status, fill=(214, 214, 92, 255))

    # Copy humana e focada na comunidade oficial
    body1 = "A stream tá off por enquanto, mas a resenha continua firme no Discord da Guilda IVEXI!"
    draw.text((w // 2 - 430, h - 195), body1, font=font_body1, fill=(250, 250, 250, 240))

    body2 = "Cole com a gente pra bater papo, tirar dúvidas de builds e não perder os avisos das lives."
    draw.text((w // 2 - 440, h - 160), body2, font=font_body2, fill=(196, 184, 214, 255))

    # Tarja tática inferior com programação e redes oficiais
    bar_y = h - 105
    bar_pts = [(w // 2 - 460, bar_y), (w // 2 + 460, bar_y), (w // 2 + 450, bar_y + 40), (w // 2 - 450, bar_y + 40)]
    draw.polygon(bar_pts, fill=(36, 16, 55, 230), outline=(115, 46, 184, 255), width=2)

    sched_text = "LIVES DE SEGUNDA A SEXTA ÀS 19H  •  DISCORD.GG/S246XDGP7Q  •  TWITCH.TV/VULGOMANIACO"
    draw.text((w // 2 - 440, bar_y + 8), sched_text, font=font_sched, fill=(214, 214, 92, 255))

    out_file = os.path.join(TWITCH_DIR, 'twitch-offline-banner-1080p.png')
    img.save(out_file, 'PNG', optimize=True)
    print(f"✓ Offline Banner gerado: {out_file} (1920x1080)")

def generate_twitch_header():
    """Banner de Cabeçalho Twitch 1200x480 de alta qualidade"""
    w, h = 1200, 480
    img = prepare_background(w, h, overlay_alpha=190)
    draw = ImageDraw.Draw(img)

    # Brilho central
    for r in range(400, 80, -25):
        alpha = int(45 * (1 - r / 400))
        draw.ellipse([w // 2 - r, h // 2 - r - 20, w // 2 + r, h // 2 + r - 20], fill=(115, 46, 184, alpha))

    # Moldura chanfrada
    cut = 24
    draw.polygon([
        (cut, 16), (w - cut, 16), (w - 16, cut), (w - 16, h - cut),
        (w - cut, h - 16), (cut, h - 16), (16, h - cut), (16, cut)
    ], outline=(115, 46, 184, 255), width=2)
    draw.line([(cut, 16), (cut + 60, 16)], fill=(214, 214, 92, 255), width=3)
    draw.line([(w - cut - 60, h - 16), (w - cut, h - 16)], fill=(214, 214, 92, 255), width=3)

    # Logotipo Horizontal
    if os.path.exists(HORIZ_LOGO_PATH):
        horiz = Image.open(HORIZ_LOGO_PATH).convert('RGBA')
        hw, hh = horiz.size
        target_hh = 250
        target_hw = int(hw * (target_hh / hh))
        horiz_resized = horiz.resize((target_hw, target_hh), Image.Resampling.LANCZOS)
        hx = (w - target_hw) // 2
        hy = (h - target_hh) // 2 - 35
        img.paste(horiz_resized, (hx, hy), horiz_resized)

    try:
        font_tag = ImageFont.truetype(FONT_PATH, 24)
        font_links = ImageFont.truetype(INTER_PATH, 16)
    except:
        font_tag = font_links = ImageFont.load_default()

    tag_text = "ALBION ONLINE MMORPG • COMBATE PvP NA BLACK ZONE & GUILDA IVEXI"
    draw.text((w // 2 - 360, h - 110), tag_text, font=font_tag, fill=(214, 214, 92, 255))

    links_text = "DISCORD DA GUILDA: DISCORD.GG/S246XDGP7Q   |   SEG A SEX 19H   |   TWITCH.TV/VULGOMANIACO"
    draw.text((w // 2 - 340, h - 70), links_text, font=font_links, fill=(235, 225, 245, 255))

    out_file = os.path.join(TWITCH_DIR, 'twitch-header-banner-1200x480.png')
    img.save(out_file, 'PNG', optimize=True)
    print(f"✓ Twitch Header Banner gerado: {out_file} (1200x480)")

def generate_youtube_header():
    """Banner de Cabeçalho YouTube 2560x1440 com safe zone centralizada de 1546x423 px"""
    w, h = 2560, 1440
    img = prepare_background(w, h, overlay_alpha=205)
    draw = ImageDraw.Draw(img)

    # Safe zone central (1546 x 423)
    sz_w, sz_h = 1546, 423
    sz_x = (w - sz_w) // 2
    sz_y = (h - sz_h) // 2

    # Fundo dentro da safe zone com destaque
    draw.rectangle([sz_x, sz_y, sz_x + sz_w, sz_y + sz_h], fill=(24, 12, 38, 200))
    draw.rectangle([sz_x, sz_y, sz_x + sz_w, sz_y + sz_h], outline=(115, 46, 184, 255), width=2)
    # Acentos de canto na safe zone
    draw.line([(sz_x, sz_y), (sz_x + 60, sz_y)], fill=(214, 214, 92, 255), width=3)
    draw.line([(sz_x + sz_w - 60, sz_y + sz_h), (sz_x + sz_w, sz_y + sz_h)], fill=(214, 214, 92, 255), width=3)

    # Logotipo Horizontal centralizado na safe zone
    if os.path.exists(HORIZ_LOGO_PATH):
        horiz = Image.open(HORIZ_LOGO_PATH).convert('RGBA')
        hw, hh = horiz.size
        target_hh = 260
        target_hw = int(hw * (target_hh / hh))
        horiz_resized = horiz.resize((target_hw, target_hh), Image.Resampling.LANCZOS)
        hx = sz_x + (sz_w - target_hw) // 2
        hy = sz_y + (sz_h - target_hh) // 2 - 30
        img.paste(horiz_resized, (hx, hy), horiz_resized)

    try:
        font_sz = ImageFont.truetype(FONT_PATH, 28)
        font_sub = ImageFont.truetype(INTER_PATH, 18)
    except:
        font_sz = font_sub = ImageFont.load_default()

    footer_text = "ALBION ONLINE • GAMEPLAY, BUILDS & GUILDA IVEXI"
    draw.text((sz_x + sz_w // 2 - 270, sz_y + sz_h - 85), footer_text, font=font_sz, fill=(214, 214, 92, 255))

    social_text = "INSCREVA-SE NO CANAL  |  DISCORD DA GUILDA: DISCORD.GG/S246XDGP7Q  |  TWITCH.TV/VULGOMANIACO"
    draw.text((sz_x + sz_w // 2 - 350, sz_y + sz_h - 45), social_text, font=font_sub, fill=(250, 250, 250, 230))

    out_file = os.path.join(YOUTUBE_DIR, 'youtube-header-banner-2560x1440.png')
    img.save(out_file, 'PNG', optimize=True)
    print(f"✓ YouTube Header Banner gerado: {out_file} (2560x1440)")

def main():
    print("Iniciando geração dos banners sociais premium...")
    generate_offline_banner()
    generate_twitch_header()
    generate_youtube_header()
    print("✓ Todos os banners sociais gerados com sucesso!")

if __name__ == '__main__':
    main()

