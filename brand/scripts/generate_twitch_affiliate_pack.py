#!/usr/bin/env python3
"""
Gerador Oficial do Pack de Afiliado Twitch de Alta Definição (Designer Grade)
Canal: VulgoManiaco | Guilda: IVEXI | Albion Online

Combina ilustrações ricas com iluminação volumétrica, cel-shading,
efeitos visuais autênticos de Overcharge e montaria de Albion,
contornos com alto contraste (18px e 28px) e empacotamento completo em ZIP.
"""

import os
import math
import shutil
import zipfile
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BRAND_TWITCH_DIR = os.path.join(BASE_DIR, 'brand', 'twitch')
PUBLIC_TWITCH_DIR = os.path.join(BASE_DIR, 'public', 'assets', 'twitch')
SRC_TWITCH_DIR = os.path.join(BASE_DIR, 'src', 'assets', 'twitch')

CHIBI_PATH = os.path.join(BASE_DIR, 'src', 'assets', 'images', 'corvo-streamer-chibi-transparente.png')
FONT_BOLD_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'rajdhani-bold.ttf')
FONT_INTER_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'inter-medium.ttf')

AI_HYPE_PATH = os.path.join(BASE_DIR, 'brand', 'twitch', 'ai_raw', 'emote_hype.png')
AI_MONTA_PATH = os.path.join(BASE_DIR, 'brand', 'twitch', 'ai_raw', 'emote_monta.png')

# Paleta Oficial IVEXI
C_PURPLE = (115, 46, 184, 255)         # #732EB8
C_PURPLE_LIGHT = (165, 80, 240, 255)
C_PURPLE_DARK = (45, 15, 75, 255)
C_DARK = (14, 7, 22, 255)              # #0E0716
C_NEON = (214, 214, 92, 255)            # #D6D65C
C_WHITE = (255, 255, 255, 255)
C_SILVER_LIGHT = (235, 240, 250, 255)
C_SILVER = (180, 185, 200, 255)
C_SILVER_DARK = (100, 105, 120, 255)
C_GOLD_LIGHT = (255, 225, 120, 255)
C_GOLD = (245, 195, 55, 255)
C_GOLD_DARK = (160, 115, 20, 255)
C_CYAN = (92, 225, 230, 255)
C_CYAN_LIGHT = (180, 250, 255, 255)
C_RED = (235, 55, 75, 255)
C_RED_DARK = (130, 20, 35, 255)

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def draw_star(draw, cx, cy, r_out, r_in, fill):
    points = []
    for i in range(8):
        angle = i * math.pi / 4 - math.pi / 2
        r = r_out if i % 2 == 0 else r_in
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(points, fill=fill)

def draw_lightning(draw, p1, p2, width, fill, branch=True):
    # Relâmpago estilizado com zigue-zague
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    dist = math.hypot(dx, dy)
    steps = max(3, int(dist // 35))
    
    pts = [p1]
    for i in range(1, steps):
        ratio = i / steps
        bx = p1[0] + dx * ratio
        by = p1[1] + dy * ratio
        perp_x = -dy / dist * (18 if i % 2 == 1 else -18)
        perp_y = dx / dist * (18 if i % 2 == 1 else -18)
        pts.append((bx + perp_x, by + perp_y))
    pts.append(p2)
    
    draw.line(pts, fill=fill, width=width, joint='curve')
    if branch and len(pts) >= 3:
        b_start = pts[len(pts) // 2]
        b_end = (b_start[0] + 30, b_start[1] + 25)
        draw.line([b_start, b_end], fill=fill, width=max(2, width - 2))

def add_badge_tag(im, text, bg_color=C_DARK, border_color=C_NEON, text_color=C_NEON, y_offset=390):
    """Adiciona tag chanfrada e-sports na base do emote com legibilidade profissional"""
    size = im.width
    draw = ImageDraw.Draw(im)
    font = get_font(FONT_BOLD_PATH, 74)
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    pad_x = 28
    bx0 = max(24, (size - tw) // 2 - pad_x)
    bx1 = min(size - 24, (size + tw) // 2 + pad_x)
    by0 = y_offset
    by1 = by0 + 92
    chamfer = 18
    
    # Sombra da tag
    shadow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.polygon([
        (bx0 + chamfer, by0), (bx1 - chamfer, by0),
        (bx1, by0 + chamfer), (bx1, by1),
        (bx0, by1), (bx0, by0 + chamfer)
    ], fill=(5, 2, 10, 200))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    im.paste(shadow, (0, 4), shadow)
    
    # Corpo da tag
    draw.polygon([
        (bx0 + chamfer, by0), (bx1 - chamfer, by0),
        (bx1, by0 + chamfer), (bx1, by1),
        (bx0, by1), (bx0, by0 + chamfer)
    ], fill=bg_color, outline=border_color, width=7)
    
    # Texto
    tx = (size - tw) // 2
    ty = by0 + (92 - th) // 2 - 8
    # Sombra do texto
    draw.text((tx + 3, ty + 3), text, font=font, fill=(0, 0, 0, 230))
    draw.text((tx, ty), text, font=font, fill=text_color)

def extract_alpha_from_black(im_path, threshold=20):
    """Remove fundo preto puro preservando bordas com anti-aliasing e cores suaves, ou preserva canal alfa se já existir."""
    if not os.path.exists(im_path):
        return None
    raw = Image.open(im_path)
    if raw.mode == 'RGBA':
        extrema = raw.getextrema()
        if len(extrema) >= 4 and extrema[3][0] < 220:
            return raw
    im = raw.convert('RGB')
    arr = np.array(im, dtype=np.float32)
    brightness = np.max(arr, axis=2)
    alpha = np.clip((brightness - threshold) / 28.0 * 255.0, 0, 255).astype(np.uint8)
    rgba = np.dstack([arr.astype(np.uint8), alpha])
    return Image.fromarray(rgba, 'RGBA')

def tight_crop_to_square(im, padding_ratio=0.02):
    """Remove o excesso de borda transparente e enquadra o sujeito preenchendo ~96% do canvas quadrado."""
    alpha = im.split()[-1]
    bbox = alpha.point(lambda p: 255 if p > 15 else 0).getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    w = x1 - x0
    h = y1 - y0
    max_side = max(w, h)
    
    pad = int(max_side * padding_ratio)
    cx = (x0 + x1) / 2.0
    cy = (y0 + y1) / 2.0
    
    half_side = (max_side / 2.0) + pad
    new_x0 = int(cx - half_side)
    new_y0 = int(cy - half_side)
    new_x1 = int(cx + half_side)
    new_y1 = int(cy + half_side)
    
    crop_w = new_x1 - new_x0
    crop_h = new_y1 - new_y0
    
    square = Image.new('RGBA', (crop_w, crop_h), (0, 0, 0, 0))
    square.paste(im, (-new_x0, -new_y0))
    return square

def load_ai_asset_if_exists(filenames, default_func=None, tight_crop=True):
    """Verifica se algum arquivo de IA foi salvo na pasta ai_raw e carrega com alfa e enquadramento otimizado."""
    for fname in filenames:
        fpath = os.path.join(BRAND_TWITCH_DIR, 'ai_raw', fname)
        if os.path.exists(fpath):
            img = extract_alpha_from_black(fpath)
            if img:
                if tight_crop:
                    img = tight_crop_to_square(img, padding_ratio=0.02)
                return img.resize((512, 512), Image.Resampling.LANCZOS)
    if default_func:
        return default_func()
    return None

# =============================================================================
# 1. EMOTES DESIGNER (512x512 Master)
# =============================================================================

def render_emote_energiza_pro():
    """vulgoENERGIZA: A Piada Interna Oficial ('Bota pra fora, energiza e monta, GG!')"""
    size = 512
    ai_path = os.path.join(BRAND_TWITCH_DIR, 'ai_raw', 'emote_energiza.png')
    ai_img = extract_alpha_from_black(ai_path)
    if ai_img:
        ai_img = tight_crop_to_square(ai_img, padding_ratio=0.02)
        im = ai_img.resize((size, size), Image.Resampling.LANCZOS)
    else:
        im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(im)
        glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([30, 20, 482, 472], fill=(115, 46, 184, 180))
        glow = glow.filter(ImageFilter.GaussianBlur(45))
        im.paste(glow, (0, 0), glow)
        
        lightnings = [
            ((40, 80), (140, 160)),
            ((470, 70), (370, 160)),
            ((30, 310), (130, 250)),
            ((480, 300), (380, 250)),
            ((256, 15), (256, 110)),
        ]
        for p1, p2 in lightnings:
            draw_lightning(draw, p1, p2, 9, C_CYAN)
            draw_lightning(draw, p1, p2, 4, C_WHITE, branch=False)
            
        if os.path.exists(CHIBI_PATH):
            chibi = Image.open(CHIBI_PATH).convert('RGBA')
            chibi.thumbnail((370, 370), Image.Resampling.LANCZOS)
            cx = (size - chibi.width) // 2
            cy = 40
            im.paste(chibi, (cx, cy), chibi)
            draw_star(draw, cx + 135, cy + 148, 16, 5, C_NEON)
            draw_star(draw, cx + 220, cy + 148, 16, 5, C_NEON)
            draw_star(draw, cx + 135, cy + 148, 8, 3, C_WHITE)
            draw_star(draw, cx + 220, cy + 148, 8, 3, C_WHITE)
        
        gem = [(370, 200), (430, 250), (370, 310), (310, 250)]
        draw.polygon(gem, fill=C_PURPLE, outline=C_CYAN, width=6)
        draw.polygon([(370, 200), (430, 250), (370, 250)], fill=C_PURPLE_LIGHT)
        draw_star(draw, 370, 250, 18, 5, C_WHITE)
        
    add_badge_tag(im, "ENERGIZA!", bg_color=C_DARK, border_color=C_NEON, text_color=C_NEON, y_offset=392)
    return im

def render_emote_monta_pro():
    """vulgoMONTA: Chamada de Cavalgada em Bando na Black Zone"""
    size = 512
    ai_img = extract_alpha_from_black(AI_MONTA_PATH)
    if ai_img:
        ai_img = tight_crop_to_square(ai_img, padding_ratio=0.02)
        im = ai_img.resize((size, size), Image.Resampling.LANCZOS)
    else:
        im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        if os.path.exists(CHIBI_PATH):
            chibi = Image.open(CHIBI_PATH).convert('RGBA')
            chibi.thumbnail((360, 360), Image.Resampling.LANCZOS)
            im.paste(chibi, (76, 50), chibi)
            
    add_badge_tag(im, "MONTA!", bg_color=C_PURPLE_DARK, border_color=C_GOLD, text_color=C_GOLD_LIGHT, y_offset=392)
    return im

def render_emote_hype_pro():
    """vulgoHYPE: Corvo em Chamas e Euforia Total"""
    size = 512
    ai_img = extract_alpha_from_black(AI_HYPE_PATH)
    if ai_img:
        ai_img = tight_crop_to_square(ai_img, padding_ratio=0.02)
        im = ai_img.resize((size, size), Image.Resampling.LANCZOS)
    else:
        im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        if os.path.exists(CHIBI_PATH):
            chibi = Image.open(CHIBI_PATH).convert('RGBA')
            chibi.thumbnail((360, 360), Image.Resampling.LANCZOS)
            im.paste(chibi, (76, 50), chibi)
            
    add_badge_tag(im, "HYPE!", bg_color=C_DARK, border_color=C_NEON, text_color=C_NEON, y_offset=392)
    return im

def render_emote_gg_pro():
    """vulgoGG: Troféu de Ouro e Óculos de Streamer Pro-Player"""
    size = 512
    ai_path = os.path.join(BRAND_TWITCH_DIR, 'ai_raw', 'emote_gg.png')
    ai_img = extract_alpha_from_black(ai_path)
    if ai_img:
        ai_img = tight_crop_to_square(ai_img, padding_ratio=0.02)
        im = ai_img.resize((size, size), Image.Resampling.LANCZOS)
    else:
        im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(im)
        glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([50, 40, 462, 452], fill=(245, 195, 55, 140))
        glow = glow.filter(ImageFilter.GaussianBlur(40))
        im.paste(glow, (0, 0), glow)
        
        if os.path.exists(CHIBI_PATH):
            chibi = Image.open(CHIBI_PATH).convert('RGBA')
            chibi.thumbnail((340, 340), Image.Resampling.LANCZOS)
            im.paste(chibi, (40, 60), chibi)
            cx, cy = 40, 60
            draw.polygon([(cx + 105, cy + 135), (cx + 175, cy + 135), (cx + 165, cy + 170), (cx + 115, cy + 170)], fill=(10, 5, 15, 255), outline=C_GOLD, width=4)
            draw.polygon([(cx + 195, cy + 135), (cx + 265, cy + 135), (cx + 255, cy + 170), (cx + 205, cy + 170)], fill=(10, 5, 15, 255), outline=C_GOLD, width=4)
            draw.line([(cx + 175, cy + 145), (cx + 195, cy + 145)], fill=C_GOLD, width=5)
            draw.line([(cx + 115, cy + 142), (cx + 135, cy + 162)], fill=C_WHITE, width=3)
            draw.line([(cx + 205, cy + 142), (cx + 225, cy + 162)], fill=C_WHITE, width=3)
            
        trophy = [(330, 160), (460, 160), (430, 275), (360, 275)]
        draw.polygon(trophy, fill=C_GOLD, outline=C_WHITE, width=6)
        draw.polygon([(360, 275), (430, 275), (410, 320), (380, 320)], fill=C_GOLD_DARK)
        draw.polygon([(350, 320), (440, 320), (450, 360), (340, 360)], fill=C_DARK, outline=C_GOLD, width=4)
        draw.arc([300, 170, 350, 240], 90, 270, fill=C_GOLD, width=9)
        draw.arc([440, 170, 490, 240], 270, 90, fill=C_GOLD, width=9)
        draw.polygon([(395, 200), (410, 225), (395, 250), (380, 225)], fill=C_PURPLE, outline=C_NEON, width=3)
        draw_star(draw, 395, 160, 20, 6, C_WHITE)
        
    add_badge_tag(im, "GG!", bg_color=C_PURPLE_DARK, border_color=C_GOLD, text_color=C_GOLD_LIGHT, y_offset=392)
    return im
    
    # Mascote Chibi
    if os.path.exists(CHIBI_PATH):
        chibi = Image.open(CHIBI_PATH).convert('RGBA')
        chibi.thumbnail((340, 340), Image.Resampling.LANCZOS)
        im.paste(chibi, (40, 60), chibi)
        
        # Óculos de Sol Streamer 'Deal With It'
        cx, cy = 40, 60
        draw.polygon([(cx + 105, cy + 135), (cx + 175, cy + 135), (cx + 165, cy + 170), (cx + 115, cy + 170)], fill=(10, 5, 15, 255), outline=C_GOLD, width=4)
        draw.polygon([(cx + 195, cy + 135), (cx + 265, cy + 135), (cx + 255, cy + 170), (cx + 205, cy + 170)], fill=(10, 5, 15, 255), outline=C_GOLD, width=4)
        draw.line([(cx + 175, cy + 145), (cx + 195, cy + 145)], fill=C_GOLD, width=5)
        # Reflexo branco no óculos
        draw.line([(cx + 115, cy + 142), (cx + 135, cy + 162)], fill=C_WHITE, width=3)
        draw.line([(cx + 205, cy + 142), (cx + 225, cy + 162)], fill=C_WHITE, width=3)
        
    # Troféu de Ouro Reluzente à direita
    trophy = [(330, 160), (460, 160), (430, 275), (360, 275)]
    draw.polygon(trophy, fill=C_GOLD, outline=C_WHITE, width=6)
    draw.polygon([(360, 275), (430, 275), (410, 320), (380, 320)], fill=C_GOLD_DARK)
    draw.polygon([(350, 320), (440, 320), (450, 360), (340, 360)], fill=C_DARK, outline=C_GOLD, width=4)
    # Alças do troféu
    draw.arc([300, 170, 350, 240], 90, 270, fill=C_GOLD, width=9)
    draw.arc([440, 170, 490, 240], 270, 90, fill=C_GOLD, width=9)
    # Gema roxa no troféu
    draw.polygon([(395, 200), (410, 225), (395, 250), (380, 225)], fill=C_PURPLE, outline=C_NEON, width=3)
    draw_star(draw, 395, 160, 20, 6, C_WHITE)
    
    add_badge_tag(im, "GG!", bg_color=C_PURPLE_DARK, border_color=C_WHITE, text_color=C_WHITE, y_offset=392)
    return im

def render_emote_rage_pro():
    """vulgoRAGE: Fúria Black Zone e Teclado Quebrado"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Aura vermelha intensa
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([40, 30, 472, 462], fill=(235, 55, 75, 180))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    im.paste(glow, (0, 0), glow)
    
    if os.path.exists(CHIBI_PATH):
        chibi = Image.open(CHIBI_PATH).convert('RGBA')
        # Tinge o mascote de vermelho de fúria
        r, g, b, a = chibi.split()
        r = r.point(lambda p: min(255, int(p * 1.35 + 40)))
        chibi = Image.merge('RGBA', (r, g, b, a))
        chibi.thumbnail((360, 360), Image.Resampling.LANCZOS)
        cx = (size - chibi.width) // 2
        cy = 45
        im.paste(chibi, (cx, cy), chibi)
        
        # Labaredas e fumaça saindo do fone
        draw.arc([cx - 10, cy + 60, cx + 60, cy + 130], 0, 180, fill=C_WHITE, width=8)
        draw.arc([cx + 310, cy + 60, cx + 380, cy + 130], 0, 180, fill=C_WHITE, width=8)
        
    # Teclas mecânicas voando estilhaçadas
    keys = [
        [(110, 310), (145, 300), (155, 330), (120, 340)],
        [(370, 300), (405, 310), (395, 340), (360, 330)],
        [(240, 330), (275, 330), (275, 360), (240, 360)]
    ]
    for k in keys:
        draw.polygon(k, fill=C_SILVER, outline=C_DARK, width=4)
        
    add_badge_tag(im, "RAGE!", bg_color=C_RED_DARK, border_color=C_WHITE, text_color=C_WHITE, y_offset=392)
    return im

def render_emote_lurk_pro():
    """vulgoLURK: Modo Furtivo Ninja / Anti-Ghost"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 60, 452, 452], fill=(20, 10, 35, 200))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    if os.path.exists(CHIBI_PATH):
        chibi = Image.open(CHIBI_PATH).convert('RGBA')
        chibi.thumbnail((320, 320), Image.Resampling.LANCZOS)
        cx = (size - chibi.width) // 2
        cy = 110
        im.paste(chibi, (cx, cy), chibi)
        
        # Capuz Ninja Escuro
        hood = [(cx + 40, cy + 30), (256, cy - 25), (cx + 280, cy + 30), (cx + 260, cy + 120), (cx + 60, cy + 120)]
        draw.polygon(hood, fill=(10, 5, 18, 240), outline=C_PURPLE, width=7)
        
        # Olhos em fenda neon amarelo brilhando na sombra
        draw.ellipse([cx + 105, cy + 70, cx + 135, cy + 85], fill=C_NEON)
        draw.ellipse([cx + 185, cy + 70, cx + 215, cy + 85], fill=C_NEON)
        draw.line([(cx + 120, cy + 70), (cx + 120, cy + 85)], fill=C_DARK, width=3)
        draw.line([(cx + 200, cy + 70), (cx + 200, cy + 85)], fill=C_DARK, width=3)
        
    # Moita de emboscada de Albion
    bushes = [
        [(30, 370), (140, 260), (250, 370)],
        [(170, 380), (280, 250), (390, 380)],
        [(310, 370), (420, 270), (490, 370)]
    ]
    for b in bushes:
        draw.polygon(b, fill=(12, 28, 18, 255), outline=(40, 120, 50, 255), width=7)
        
    add_badge_tag(im, "LURK", bg_color=C_DARK, border_color=C_PURPLE, text_color=C_NEON, y_offset=392)
    return im

def render_emote_rip_pro():
    """vulgoRIP: Lápide Cômica de Albion ('PERDEU O SET!')"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 50, 452, 452], fill=(115, 46, 184, 150))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    im.paste(glow, (0, 0), glow)
    
    # Lápide em Arco de Pedra com Textura Chanfrada
    tomb = [(130, 410), (130, 170), (256, 90), (382, 170), (382, 410)]
    draw.polygon(tomb, fill=(35, 30, 45, 255), outline=C_SILVER, width=12)
    draw.polygon([(145, 400), (145, 180), (256, 105), (367, 180), (367, 400)], fill=(20, 15, 30, 255))
    
    # Racha na pedra
    draw.line([(256, 105), (280, 150), (260, 200)], fill=C_SILVER_DARK, width=4)
    
    # Inscrição RIP entalhada
    font_rip = get_font(FONT_BOLD_PATH, 100)
    bbox = font_rip.getbbox("RIP")
    tw = bbox[2] - bbox[0]
    draw.text(((size - tw) // 2, 180), "RIP", font=font_rip, fill=C_SILVER_LIGHT)
    
    # Pena de Corvo cravada ao lado com brilho místico
    draw.line([(90, 430), (160, 270)], fill=C_PURPLE, width=14)
    draw_star(draw, 160, 270, 16, 5, C_NEON)
    
    add_badge_tag(im, "PERDEU O SET!", bg_color=C_PURPLE_DARK, border_color=C_PURPLE, text_color=C_NEON, y_offset=392)
    return im

# =============================================================================
# 2. DISTINTIVOS DE INSCRITO (Sub Loyalty Badges 3D - 512x512 Master)
# =============================================================================

def render_sub_badge_1m_pro():
    """1 Mês: Pena Mística de Corvo com Runas Fluorescentes"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([120, 80, 392, 432], fill=(115, 46, 184, 150))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Pluma esquerda (Ametista escuro)
    feather_l = [(330, 80), (270, 110), (210, 180), (190, 270), (210, 360), (240, 400), (260, 330), (280, 250), (330, 80)]
    draw.polygon(feather_l, fill=C_PURPLE_DARK, outline=C_SILVER_LIGHT, width=8)
    
    # Pluma direita (Púrpura vibrante com chanfros)
    feather_r = [(330, 80), (370, 120), (390, 210), (370, 300), (340, 370), (310, 410), (330, 340), (340, 250), (330, 80)]
    draw.polygon(feather_r, fill=C_PURPLE, outline=C_SILVER_LIGHT, width=8)
    
    # Haste da pena metálica em prata
    draw.line([(170, 450), (330, 80)], fill=C_SILVER_LIGHT, width=16)
    draw.line([(170, 450), (330, 80)], fill=C_WHITE, width=6)
    
    # Runa mágica entalhada brilhando
    draw_star(draw, 330, 80, 22, 7, C_NEON)
    draw_star(draw, 230, 270, 14, 4, C_CYAN)
    return im

def render_sub_badge_2m_pro():
    """2 Meses: Garra de Aço Tática de Albion"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([100, 100, 412, 412], fill=(80, 30, 150, 140))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Manopla / Braçadeira com rebites
    draw.polygon([(190, 360), (322, 360), (340, 450), (172, 450)], fill=C_DARK, outline=C_SILVER, width=10)
    
    # 3 Lâminas curvas forjadas em aço
    talons = [
        [(190, 360), (150, 260), (130, 170), (180, 230), (210, 330)],
        [(256, 350), (256, 210), (256, 110), (280, 210), (285, 330)],
        [(322, 360), (362, 260), (382, 170), (332, 230), (302, 330)],
    ]
    for t in talons:
        draw.polygon(t, fill=C_SILVER, outline=C_WHITE, width=7)
        # Sulco de sangue / canaleta com esmalte roxo
        draw.line([t[1], t[2]], fill=C_PURPLE, width=4)
        
    # Gema central ametista
    gem = [(256, 375), (280, 405), (256, 435), (232, 405)]
    draw.polygon(gem, fill=C_PURPLE, outline=C_NEON, width=5)
    draw_star(draw, 256, 405, 10, 3, C_WHITE)
    draw_star(draw, 256, 105, 18, 5, C_NEON)
    return im

def render_sub_badge_3m_pro():
    """3 Meses: Escudo Tático IVEXI Chanfrado"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    shield = [
        (120, 80), (392, 80),
        (442, 140), (442, 300),
        (256, 460),
        (70, 300), (70, 140)
    ]
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.polygon(shield, fill=(245, 195, 55, 160))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Borda em Ouro Chanfrado 3D
    draw.polygon(shield, fill=C_GOLD, outline=C_WHITE, width=10)
    
    # Campo interno em Ametista Escura
    inner_shield = [
        (145, 105), (367, 105),
        (410, 155), (410, 290),
        (256, 430),
        (102, 290), (102, 155)
    ]
    draw.polygon(inner_shield, fill=C_PURPLE_DARK, outline=C_PURPLE, width=8)
    
    # Brasão do Corvo IVEXI em Ouro Esculpido
    corvo_crest = [(256, 170), (330, 230), (305, 320), (256, 360), (207, 320), (182, 230)]
    draw.polygon(corvo_crest, fill=C_GOLD, outline=C_WHITE, width=6)
    draw.polygon([(256, 205), (295, 245), (280, 295), (256, 325), (232, 295), (217, 245)], fill=C_DARK)
    draw.line([(256, 170), (256, 360)], fill=C_GOLD, width=6)
    
    draw_star(draw, 256, 95, 22, 7, C_WHITE)
    return im

def render_sub_badge_6m_pro():
    """6 Meses: Elmo de Corvo Sombrio de Albion"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([90, 70, 422, 442], fill=(115, 46, 184, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    im.paste(glow, (0, 0), glow)
    
    # Pluma superior do elmo
    crest = [(256, 50), (295, 100), (330, 70), (305, 140), (256, 120), (207, 140), (182, 70), (217, 100)]
    draw.polygon(crest, fill=C_GOLD, outline=C_WHITE, width=6)
    
    # Casco do Elmo Medieval
    helm = [(150, 140), (362, 140), (410, 230), (390, 360), (256, 460), (122, 360), (102, 230)]
    draw.polygon(helm, fill=C_DARK, outline=C_SILVER_LIGHT, width=12)
    
    # Bico de combate de corvo
    beak = [(256, 220), (310, 290), (256, 390), (202, 290)]
    draw.polygon(beak, fill=C_PURPLE, outline=C_GOLD, width=8)
    
    # Visor luminoso amarelo neon
    draw.polygon([(180, 220), (235, 235), (230, 250), (175, 235)], fill=C_NEON)
    draw.polygon([(332, 220), (277, 235), (282, 250), (337, 235)], fill=C_NEON)
    
    draw_star(draw, 256, 45, 22, 7, C_WHITE)
    return im

def render_sub_badge_9m_pro():
    """9 Meses: Cristal de Energia Sifada (Siphoned Core)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Aura de Overcharge
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([70, 70, 442, 442], fill=(160, 60, 255, 180))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    im.paste(glow, (0, 0), glow)
    
    # Raios orbitais
    draw_lightning(draw, (80, 160), (180, 90), 8, C_CYAN)
    draw_lightning(draw, (430, 160), (330, 90), 8, C_NEON)
    draw_lightning(draw, (90, 360), (200, 420), 8, C_NEON)
    draw_lightning(draw, (420, 360), (310, 420), 8, C_CYAN)
    
    # Aro rúnico dourado
    draw.ellipse([90, 90, 422, 422], outline=C_GOLD, width=10)
    
    # Cristal Facetado Central (Lapidação Diamante)
    gem = [(256, 80), (380, 180), (380, 340), (256, 440), (132, 340), (132, 180)]
    draw.polygon(gem, fill=C_PURPLE, outline=C_WHITE, width=10)
    
    # Facetas com iluminação volumétrica
    draw.polygon([(256, 80), (380, 180), (256, 260)], fill=(180, 90, 255, 255))
    draw.polygon([(380, 180), (380, 340), (256, 260)], fill=(130, 50, 205, 255))
    draw.polygon([(380, 340), (256, 440), (256, 260)], fill=(80, 25, 150, 255))
    draw.polygon([(256, 440), (132, 340), (256, 260)], fill=(105, 35, 180, 255))
    draw.polygon([(132, 340), (132, 180), (256, 260)], fill=(150, 70, 230, 255))
    draw.polygon([(132, 180), (256, 80), (256, 260)], fill=(210, 120, 255, 255))
    
    draw_star(draw, 256, 260, 36, 12, C_WHITE)
    draw_star(draw, 256, 75, 22, 7, C_NEON)
    return im

def render_sub_badge_12m_pro():
    """1 Ano: Coroa Imperial de Corvo (Lendária)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 60, 452, 452], fill=(245, 195, 55, 190))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    im.paste(glow, (0, 0), glow)
    
    # Asas de Corvo Douradas Abertas
    left_wing = [(256, 310), (130, 230), (60, 160), (40, 230), (70, 320), (150, 370), (256, 390)]
    right_wing = [(256, 310), (382, 230), (452, 160), (472, 230), (442, 320), (362, 370), (256, 390)]
    draw.polygon(left_wing, fill=C_GOLD_DARK, outline=C_GOLD_LIGHT, width=8)
    draw.polygon(right_wing, fill=C_GOLD_DARK, outline=C_GOLD_LIGHT, width=8)
    
    # Base da Coroa
    base = [(110, 380), (402, 380), (380, 450), (132, 450)]
    draw.polygon(base, fill=C_GOLD, outline=C_WHITE, width=8)
    
    # Pontas da Coroa Imperial
    spikes = [
        (110, 380), (95, 230), (150, 300),
        (195, 190), (256, 280), (317, 190),
        (362, 300), (417, 230), (402, 380)
    ]
    draw.polygon(spikes, fill=C_GOLD, outline=C_WHITE, width=10)
    
    # Grande Gema Central Ametista
    gem = [(256, 220), (295, 275), (256, 330), (217, 275)]
    draw.polygon(gem, fill=C_PURPLE, outline=C_NEON, width=7)
    draw_star(draw, 256, 275, 18, 5, C_WHITE)
    
    # Estrela imperial de topo
    draw_star(draw, 256, 140, 32, 10, C_WHITE)
    draw_star(draw, 256, 140, 18, 5, C_NEON)
    return im

# =============================================================================
# 3. MOEDA DE PONTOS DO CANAL (3D Relief)
# =============================================================================

def render_channel_point_coin_pro():
    """Moeda Rúnica Dourada da Guilda IVEXI"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([50, 50, 462, 462], fill=(245, 195, 55, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(38))
    im.paste(glow, (0, 0), glow)
    
    # Borda externa chanfrada em ouro
    draw.ellipse([60, 60, 452, 452], fill=C_GOLD, outline=C_WHITE, width=12)
    # Aro rúnico rebaixado
    draw.ellipse([95, 95, 417, 417], fill=C_DARK, outline=C_GOLD_DARK, width=10)
    # Centro em ametista nobre
    draw.ellipse([125, 125, 387, 387], fill=C_PURPLE_DARK, outline=C_PURPLE, width=8)
    
    # Corvo guerreiro entalhado em relevo dourado
    corvo = [(256, 160), (325, 225), (305, 315), (256, 355), (207, 315), (187, 225)]
    draw.polygon(corvo, fill=C_GOLD, outline=C_WHITE, width=6)
    draw_star(draw, 256, 256, 20, 6, C_WHITE)
    
    # Estrelas rúnicas ao redor
    for deg in range(0, 360, 45):
        rad = math.radians(deg)
        x = 256 + int(130 * math.cos(rad))
        y = 256 + int(130 * math.sin(rad))
        draw_star(draw, x, y, 8, 3, C_NEON)
        
    return im

# =============================================================================
# EXPORTAÇÃO E SINCRONIZAÇÃO
# =============================================================================

def export_asset_sizes(master_img, target_name, brand_category_dir, public_category_dir, src_category_dir, sizes):
    """Exporta o master em todas as resoluções e replica em brand/, public/ e src/"""
    for w, h in sizes:
        resized = master_img.resize((w, h), Image.Resampling.LANCZOS)
        res_str = f"{w}x{h}" if w != 512 else "512_master"
        
        # Subpastas organizadas
        b_res_dir = os.path.join(brand_category_dir, res_str)
        p_res_dir = os.path.join(public_category_dir, res_str)
        s_res_dir = os.path.join(src_category_dir, res_str)
        os.makedirs(b_res_dir, exist_ok=True)
        os.makedirs(p_res_dir, exist_ok=True)
        os.makedirs(s_res_dir, exist_ok=True)
        
        filename = f"{target_name}-{res_str}.png"
        resized.save(os.path.join(b_res_dir, filename), 'PNG', optimize=True)
        resized.save(os.path.join(p_res_dir, filename), 'PNG', optimize=True)
        resized.save(os.path.join(s_res_dir, filename), 'PNG', optimize=True)
        
        # Arquivo na raiz pública e src para consumo web rápido
        quick_name = f"{target_name}_{res_str}.png"
        resized.save(os.path.join(public_category_dir, quick_name), 'PNG', optimize=True)
        resized.save(os.path.join(src_category_dir, quick_name), 'PNG', optimize=True)

# =============================================================================
# 4. DISTINTIVOS DE BITS (Tiered Gemstones)
# =============================================================================

def render_bit_1():
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    poly = [(256, 80), (390, 190), (360, 390), (256, 440), (150, 370), (120, 210)]
    draw.polygon(poly, fill=(85, 80, 95, 255), outline=C_SILVER_LIGHT, width=12)
    draw.line([(256, 80), (256, 440)], fill=(130, 125, 140, 255), width=8)
    draw_star(draw, 256, 260, 26, 9, C_PURPLE)
    return im

def render_bit_100():
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    poly = [(256, 70), (400, 210), (360, 420), (256, 440), (152, 420), (112, 210)]
    draw.polygon(poly, fill=C_SILVER, outline=C_WHITE, width=12)
    draw.polygon([(256, 140), (340, 220), (256, 370), (172, 220)], fill=C_PURPLE, outline=C_NEON, width=6)
    draw_star(draw, 256, 70, 20, 6, C_WHITE)
    return im

def render_bit_1000():
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    gem = [(140, 130), (372, 130), (442, 230), (256, 440), (70, 230)]
    draw.polygon(gem, fill=C_PURPLE, outline=C_WHITE, width=10)
    draw.polygon([(140, 130), (372, 130), (256, 230)], fill=(175, 90, 245, 255))
    draw.polygon([(70, 230), (140, 130), (256, 230)], fill=(140, 60, 215, 255))
    draw.polygon([(372, 130), (442, 230), (256, 230)], fill=(110, 40, 185, 255))
    draw.polygon([(70, 230), (256, 440), (256, 230)], fill=(150, 70, 225, 255))
    draw.polygon([(442, 230), (256, 440), (256, 230)], fill=(90, 30, 165, 255))
    draw_star(draw, 256, 230, 22, 7, C_WHITE)
    return im

def render_bit_5000():
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    draw.polygon([(100, 260), (256, 450), (412, 260), (360, 220), (256, 350), (152, 220)], fill=C_GOLD, outline=C_WHITE, width=8)
    draw.polygon([(180, 70), (235, 170), (180, 300), (125, 200)], fill=C_PURPLE, outline=C_NEON, width=7)
    draw.polygon([(332, 70), (387, 200), (332, 300), (277, 170)], fill=C_PURPLE, outline=C_NEON, width=7)
    draw_star(draw, 256, 190, 28, 8, C_WHITE)
    return im

def render_bit_10000():
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    wings = [(70, 190), (145, 300), (256, 400), (367, 300), (442, 190), (412, 150), (256, 260), (100, 150)]
    draw.polygon(wings, fill=C_GOLD, outline=C_WHITE, width=10)
    flame = [(256, 50), (295, 125), (330, 95), (305, 215), (256, 255), (207, 215), (182, 95), (217, 125)]
    draw.polygon(flame, fill=C_PURPLE, outline=C_NEON, width=8)
    draw_star(draw, 256, 160, 24, 7, C_WHITE)
    draw_star(draw, 256, 40, 30, 9, C_NEON)
    return im

def generate_all():
    print("🎨 Iniciando geração Designer-Grade do Pack de Afiliado Twitch...")
    
    categories = ['sub_badges', 'emotes', 'channel_points', 'bit_badges']
    for cat in categories:
        os.makedirs(os.path.join(BRAND_TWITCH_DIR, cat), exist_ok=True)
        os.makedirs(os.path.join(PUBLIC_TWITCH_DIR, cat), exist_ok=True)
        os.makedirs(os.path.join(SRC_TWITCH_DIR, cat), exist_ok=True)
        
    badge_sizes = [(18, 18), (36, 36), (72, 72), (512, 512)]
    emote_sizes = [(28, 28), (56, 56), (112, 112), (512, 512)]
    
    # 1. Distintivos de Sub 3D
    print("-> Renderizando 6 Distintivos de Sub de Alta Resolução...")
    sub_badges = [
        ('sub_1m', load_ai_asset_if_exists(['sub_1m.png', 'badge_1m.png', 'sub_badge_1m.png'], render_sub_badge_1m_pro)),
        ('sub_2m', load_ai_asset_if_exists(['sub_2m.png', 'badge_2m.png', 'sub_badge_2m.png'], render_sub_badge_2m_pro)),
        ('sub_3m', load_ai_asset_if_exists(['sub_3m.png', 'badge_3m.png', 'sub_badge_3m.png'], render_sub_badge_3m_pro)),
        ('sub_6m', load_ai_asset_if_exists(['sub_6m.png', 'badge_6m.png', 'sub_badge_6m.png'], render_sub_badge_6m_pro)),
        ('sub_9m', load_ai_asset_if_exists(['sub_9m.png', 'badge_9m.png', 'sub_badge_9m.png'], render_sub_badge_9m_pro)),
        ('sub_1y', load_ai_asset_if_exists(['sub_1y.png', 'badge_1y.png', 'sub_badge_1y.png', 'sub_12m.png'], render_sub_badge_12m_pro)),
    ]
    for name, img in sub_badges:
        export_asset_sizes(img, name, os.path.join(BRAND_TWITCH_DIR, 'sub_badges'), os.path.join(PUBLIC_TWITCH_DIR, 'sub_badges'), os.path.join(SRC_TWITCH_DIR, 'sub_badges'), badge_sizes)
        
    # Organiza pasta dedicada para upload direto na Twitch por Tier
    upload_dest_dir = os.path.join(BRAND_TWITCH_DIR, 'upload_twitch_distintivos')
    os.makedirs(upload_dest_dir, exist_ok=True)
    tier_map = [
        ('01_Mes_1_Recruta', 'sub_1m'),
        ('02_Mes_2_Membro', 'sub_2m'),
        ('03_Mes_3_Capa_IVEXI', 'sub_3m'),
        ('04_Mes_6_Soldado_CTA', 'sub_6m'),
        ('05_Mes_9_Overcharge', 'sub_9m'),
        ('06_Ano_1_Imperador', 'sub_1y'),
    ]
    for folder_name, prefix in tier_map:
        t_dir = os.path.join(upload_dest_dir, folder_name)
        os.makedirs(t_dir, exist_ok=True)
        for sz_str in ['18x18', '36x36', '72x72']:
            src_f = os.path.join(BRAND_TWITCH_DIR, 'sub_badges', sz_str, f'{prefix}-{sz_str}.png')
            if os.path.exists(src_f):
                shutil.copy2(src_f, os.path.join(t_dir, f'{prefix}_{sz_str}.png'))
                
    # Cria ZIP dedicado dos distintivos
    for zpath in [
        os.path.join(BRAND_TWITCH_DIR, 'distintivos-twitch-todos-tamanhos.zip'),
        os.path.join(PUBLIC_TWITCH_DIR, 'distintivos-twitch-todos-tamanhos.zip')
    ]:
        with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as zf:
            for root, dirs, files in os.walk(upload_dest_dir):
                for file in sorted(files):
                    fp = os.path.join(root, file)
                    zf.write(fp, os.path.relpath(fp, upload_dest_dir))
        
    # 2. Emotes da Live
    print("-> Renderizando 7 Emotes Designer (incluindo vulgoENERGIZA, vulgoMONTA, vulgoHYPE e vulgoGG)...")
    emotes = [
        ('vulgoENERGIZA', render_emote_energiza_pro()),
        ('vulgoMONTA', render_emote_monta_pro()),
        ('vulgoHYPE', render_emote_hype_pro()),
        ('vulgoGG', render_emote_gg_pro()),
        ('vulgoRAGE', render_emote_rage_pro()),
        ('vulgoLURK', render_emote_lurk_pro()),
        ('vulgoRIP', render_emote_rip_pro()),
    ]
    for name, img in emotes:
        export_asset_sizes(img, name, os.path.join(BRAND_TWITCH_DIR, 'emotes'), os.path.join(PUBLIC_TWITCH_DIR, 'emotes'), os.path.join(SRC_TWITCH_DIR, 'emotes'), emote_sizes)
        
    # Organiza pasta dedicada para upload de emotes e ZIP
    dest_emotes_dir = os.path.join(BRAND_TWITCH_DIR, 'upload_twitch_emotes')
    os.makedirs(dest_emotes_dir, exist_ok=True)
    for code, _ in emotes:
        edir = os.path.join(dest_emotes_dir, code)
        os.makedirs(edir, exist_ok=True)
        for sz_folder, sz_label in [('28x28', '28x28'), ('56x56', '56x56'), ('112x112', '112x112'), ('512_master', '512x512')]:
            src_f = os.path.join(BRAND_TWITCH_DIR, 'emotes', sz_folder, f'{code}-{sz_folder}.png')
            if os.path.exists(src_f):
                shutil.copy2(src_f, os.path.join(edir, f'{code}_{sz_label}.png'))
                
    for zp in [
        os.path.join(BRAND_TWITCH_DIR, 'emotes-twitch-todos-tamanhos.zip'),
        os.path.join(PUBLIC_TWITCH_DIR, 'emotes-twitch-todos-tamanhos.zip')
    ]:
        with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as zf:
            for root, dirs, files in os.walk(dest_emotes_dir):
                for file in sorted(files):
                    fp = os.path.join(root, file)
                    zf.write(fp, os.path.relpath(fp, dest_emotes_dir))
        
    # 3. Moeda de Pontos do Canal
    print("-> Renderizando Moeda Rúnica da Guilda IVEXI...")
    coin_img = load_ai_asset_if_exists(['coin_channel_points.png', 'moeda_ivexi.png', 'coin.png'], render_channel_point_coin_pro)
    export_asset_sizes(coin_img, 'moeda_ivexi', os.path.join(BRAND_TWITCH_DIR, 'channel_points'), os.path.join(PUBLIC_TWITCH_DIR, 'channel_points'), os.path.join(SRC_TWITCH_DIR, 'channel_points'), emote_sizes)
    
    # 4. Badges de Bits
    print("-> Processando Badges de Bits...")
    bit_badges = [
        ('bits_1', render_bit_1()),
        ('bits_100', render_bit_100()),
        ('bits_1000', render_bit_1000()),
        ('bits_5000', render_bit_5000()),
        ('bits_10000', render_bit_10000()),
    ]
    for name, img in bit_badges:
        export_asset_sizes(img, name, os.path.join(BRAND_TWITCH_DIR, 'bit_badges'), os.path.join(PUBLIC_TWITCH_DIR, 'bit_badges'), os.path.join(SRC_TWITCH_DIR, 'bit_badges'), badge_sizes)
        
    # 5. Criar arquivo ZIP
    print("📦 Atualizando arquivo ZIP unificado...")
    zip_path = os.path.join(PUBLIC_TWITCH_DIR, 'pack-afiliado-twitch-vulgomaniaco.zip')
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        # Guia
        guide_path = os.path.join(BASE_DIR, 'brand', 'twitch', 'LEIA-ME_GUIA_UPLOAD_TWITCH.txt')
        if os.path.exists(guide_path):
            zf.write(guide_path, arcname='LEIA-ME_GUIA_UPLOAD_TWITCH.txt')
        for root, _, files in os.walk(BRAND_TWITCH_DIR):
            for file in files:
                if file.endswith('.png'):
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, BRAND_TWITCH_DIR)
                    zf.write(full_path, arcname=os.path.join('pack_afiliado_vulgomaniaco', rel_path))
                    
    # Sincroniza o zip em src
    shutil.copy(zip_path, os.path.join(SRC_TWITCH_DIR, 'pack-afiliado-twitch-vulgomaniaco.zip'))
    print(f"✅ Pack Designer concluído com sucesso em: {zip_path}")
    print(f"   Tamanho: {os.path.getsize(zip_path) / 1024:.1f} KB")

if __name__ == '__main__':
    generate_all()
