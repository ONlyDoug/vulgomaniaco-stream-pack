#!/usr/bin/env python3
"""
Gerador Oficial do Pack de Afiliado Twitch (Distintivos de Inscrito, Emotes, Moeda e Bits)
Canal: VulgoManiaco | Guilda: IVEXI | Jogo: Albion Online

Gera todos os arquivos em 4 resoluções cada (transparentes PNG com supersampling)
e empacota o arquivo ZIP pronto para upload no Twitch Creator Dashboard.
"""

import os
import math
import shutil
import zipfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BRAND_TWITCH_DIR = os.path.join(BASE_DIR, 'brand', 'twitch')
PUBLIC_TWITCH_DIR = os.path.join(BASE_DIR, 'public', 'assets', 'twitch')

CHIBI_PATH = os.path.join(BASE_DIR, 'src', 'assets', 'images', 'corvo-streamer-chibi-transparente.png')
EMBLEM_PATH = os.path.join(BASE_DIR, 'src', 'assets', 'images', 'ivexi-emblema.png')
FONT_BOLD_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'rajdhani-bold.ttf')
FONT_INTER_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'inter-medium.ttf')

# Paleta Oficial IVEXI & VulgoManiaco
C_PURPLE = (115, 46, 184, 255)       # #732EB8
C_PURPLE_DARK = (45, 15, 75, 255)
C_DARK = (20, 10, 31, 255)            # #140A1F
C_NEON = (214, 214, 92, 255)          # #D6D65C
C_WHITE = (255, 255, 255, 255)
C_SILVER = (200, 205, 220, 255)
C_GOLD = (245, 197, 66, 255)
C_GOLD_DARK = (180, 130, 25, 255)
C_CYAN = (92, 225, 230, 255)
C_RED = (235, 60, 75, 255)

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

def draw_lightning(draw, p1, p2, width, fill):
    mx = (p1[0] + p2[0]) // 2 + 15
    my = (p1[1] + p2[1]) // 2 - 10
    draw.line([p1, (mx, my), p2], fill=fill, width=width)

# =============================================================================
# 1. RENDERIZADORES DOS 6 DISTINTIVOS DE INSCRITO (512x512 Master)
# =============================================================================

def render_badge_1m():
    """1 Mês: Pena de Corvo Mística"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow místico de fundo
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([140, 100, 372, 430], fill=(115, 46, 184, 110))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Haste da pena (prata)
    draw.line([(180, 440), (330, 90)], fill=C_SILVER, width=12)
    
    # Pluma esquerda (roxo místico escuro)
    feather_left = [
        (330, 90), (280, 120), (230, 180), (210, 260), 
        (220, 340), (240, 390), (210, 420), (250, 400),
        (260, 320), (280, 240), (300, 160), (330, 90)
    ]
    draw.polygon(feather_left, fill=C_PURPLE)
    
    # Pluma direita (roxo vibrante)
    feather_right = [
        (330, 90), (360, 130), (380, 200), (370, 270), 
        (350, 340), (320, 380), (300, 410), (320, 390),
        (330, 330), (340, 250), (330, 170), (330, 90)
    ]
    draw.polygon(feather_right, fill=(155, 75, 230, 255))
    
    # Haste frontal fina iluminada
    draw.line([(180, 440), (330, 90)], fill=C_WHITE, width=4)
    
    # Detalhes e estrias
    for y in range(160, 380, 30):
        draw.line([(280, y), (250, y + 15)], fill=C_SILVER, width=3)
        draw.line([(310, y - 5), (340, y + 10)], fill=(220, 180, 255, 220), width=3)
        
    # Faíscas neon
    draw_star(draw, 340, 100, 16, 5, C_NEON)
    draw_star(draw, 190, 390, 12, 4, C_CYAN)
    
    return im

def render_badge_2m():
    """2 Meses: Garra de Aço Tática de Albion"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([120, 120, 392, 392], fill=(80, 30, 140, 120))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    im.paste(glow, (0, 0), glow)
    
    # Base da pata de corvo mecânica/armadurada
    draw.polygon([(210, 350), (302, 350), (320, 440), (192, 440)], fill=C_DARK)
    draw.polygon([(210, 350), (302, 350), (320, 440), (192, 440)], outline=C_SILVER, width=6)
    
    # 3 Garras curvas afiadas em arco
    talons = [
        [(210, 350), (170, 260), (150, 180), (190, 230), (220, 320)], # Garra esquerda
        [(256, 340), (256, 210), (256, 120), (276, 210), (280, 320)], # Garra central
        [(302, 350), (342, 260), (362, 180), (322, 230), (292, 320)], # Garra direita
    ]
    for talon in talons:
        draw.polygon(talon, fill=C_SILVER)
        draw.polygon(talon, outline=(255, 255, 255, 240), width=4)
        
    # Gema central incrustada na base (roxa)
    gem_poly = [(256, 360), (280, 390), (256, 420), (232, 390)]
    draw.polygon(gem_poly, fill=C_PURPLE)
    draw.polygon(gem_poly, outline=C_NEON, width=4)
    draw_star(draw, 256, 390, 10, 3, C_WHITE)
    draw_star(draw, 256, 115, 16, 5, C_NEON)
    
    return im

def render_badge_3m():
    """3 Meses: Escudo Tático IVEXI Chanfrado"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Escudo chanfrado
    shield = [
        (130, 90), (382, 90), 
        (432, 140), (432, 300), 
        (256, 450), 
        (80, 300), (80, 140)
    ]
    # Sombra
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.polygon(shield, fill=(214, 214, 92, 140))
    glow = glow.filter(ImageFilter.GaussianBlur(25))
    im.paste(glow, (0, 0), glow)
    
    # Preenchimento fundo
    draw.polygon(shield, fill=C_DARK)
    draw.polygon(shield, outline=C_GOLD, width=12)
    
    # Borda interna chanfrada roxa
    inner_shield = [
        (150, 110), (362, 110), 
        (402, 150), (402, 290), 
        (256, 420), 
        (110, 290), (110, 150)
    ]
    draw.polygon(inner_shield, fill=C_PURPLE_DARK, outline=C_PURPLE, width=6)
    
    # Brasão do Corvo IVEXI estilizado
    draw.polygon([(256, 170), (320, 230), (300, 310), (256, 350), (212, 310), (192, 230)], fill=C_NEON)
    draw.polygon([(256, 200), (290, 240), (275, 290), (256, 320), (237, 290), (222, 240)], fill=C_DARK)
    draw.line([(256, 170), (256, 350)], fill=C_NEON, width=5)
    
    draw_star(draw, 256, 100, 18, 6, C_WHITE)
    return im

def render_badge_6m():
    """6 Meses: Elmo de Corvo Sombrio de Albion"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow púrpura e amarelo
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([100, 80, 412, 432], fill=(115, 46, 184, 150))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    im.paste(glow, (0, 0), glow)
    
    # Crina / Pluma do Elmo (penas superiores)
    crest = [(256, 60), (290, 110), (320, 80), (300, 150), (256, 130), (212, 150), (192, 80), (222, 110)]
    draw.polygon(crest, fill=C_NEON)
    
    # Corpo do Elmo (Metal escuro / Aço temperado)
    helm = [
        (160, 150), (352, 150), 
        (400, 230), (380, 360), 
        (256, 450), 
        (132, 360), (112, 230)
    ]
    draw.polygon(helm, fill=C_DARK, outline=C_SILVER, width=10)
    
    # Placas laterais articuladas
    draw.polygon([(160, 170), (210, 170), (190, 280), (140, 270)], fill=(35, 20, 50, 255), outline=C_PURPLE, width=4)
    draw.polygon([(352, 170), (302, 170), (322, 280), (372, 270)], fill=(35, 20, 50, 255), outline=C_PURPLE, width=4)
    
    # Bico do Elmo Tático (formato de bico de corvo de metal)
    beak = [(256, 220), (300, 290), (256, 380), (212, 290)]
    draw.polygon(beak, fill=C_PURPLE, outline=C_NEON, width=6)
    
    # Visor Luminoso Neon Amarelo (Olhos do Corvo)
    draw.polygon([(190, 230), (240, 240), (235, 255), (185, 245)], fill=C_NEON)
    draw.polygon([(322, 230), (272, 240), (277, 255), (327, 245)], fill=C_NEON)
    
    draw_star(draw, 256, 55, 20, 6, C_WHITE)
    return im

def render_badge_9m():
    """9 Meses: Cristal de Energia Sifada (Siphoned Energy)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Aura de energia radiante
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([90, 90, 422, 422], fill=(160, 60, 255, 160))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Raios elétricos orbitando o cristal
    draw_lightning(draw, (90, 180), (190, 110), 6, C_CYAN)
    draw_lightning(draw, (420, 180), (330, 110), 6, C_NEON)
    draw_lightning(draw, (110, 360), (210, 410), 6, C_NEON)
    draw_lightning(draw, (400, 360), (310, 410), 6, C_CYAN)
    
    # Anel rúnico em volta
    draw.ellipse([100, 100, 412, 412], outline=C_NEON, width=6)
    
    # Cristal Facetado Central (Hexágono duplo)
    top_gem = [(256, 90), (370, 180), (370, 332), (256, 422), (142, 332), (142, 180)]
    draw.polygon(top_gem, fill=C_PURPLE, outline=C_WHITE, width=8)
    
    # Facetas internas
    draw.polygon([(256, 90), (370, 180), (256, 256)], fill=(165, 80, 240, 255))
    draw.polygon([(370, 180), (370, 332), (256, 256)], fill=(130, 50, 200, 255))
    draw.polygon([(370, 332), (256, 422), (256, 256)], fill=(90, 30, 160, 255))
    draw.polygon([(256, 422), (142, 332), (256, 256)], fill=(110, 40, 180, 255))
    draw.polygon([(142, 332), (142, 180), (256, 256)], fill=(145, 65, 220, 255))
    draw.polygon([(142, 180), (256, 90), (256, 256)], fill=(190, 100, 255, 255))
    
    # Núcleo estelar brilhante
    draw_star(draw, 256, 256, 32, 10, C_WHITE)
    draw_star(draw, 256, 85, 18, 6, C_NEON)
    
    return im

def render_badge_12m():
    """1 Ano: Coroa Imperial de Corvo (Lendária)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow dourado supremo
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([80, 80, 432, 432], fill=(245, 197, 66, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Asas de Corvo Douradas abertas nas laterais
    left_wing = [(256, 300), (140, 240), (80, 180), (60, 240), (90, 320), (160, 360), (256, 380)]
    right_wing = [(256, 300), (372, 240), (432, 180), (452, 240), (422, 320), (352, 360), (256, 380)]
    draw.polygon(left_wing, fill=C_GOLD_DARK, outline=C_GOLD, width=6)
    draw.polygon(right_wing, fill=C_GOLD_DARK, outline=C_GOLD, width=6)
    
    # Base da Coroa (ouro e chanfros)
    crown_base = [(120, 380), (392, 380), (372, 440), (140, 440)]
    draw.polygon(crown_base, fill=C_GOLD, outline=C_WHITE, width=6)
    
    # Pontas da Coroa Imperial
    crown_spikes = [
        (120, 380), (110, 240), (160, 300), 
        (200, 200), (256, 280), (312, 200), 
        (352, 300), (402, 240), (392, 380)
    ]
    draw.polygon(crown_spikes, fill=C_GOLD, outline=C_WHITE, width=8)
    
    # Grande Gema Central Ametista
    gem = [(256, 230), (290, 280), (256, 330), (222, 280)]
    draw.polygon(gem, fill=C_PURPLE, outline=C_NEON, width=6)
    draw_star(draw, 256, 280, 14, 4, C_WHITE)
    
    # Gemas menores nas pontas
    draw.ellipse([100, 225, 120, 245], fill=C_PURPLE, outline=C_WHITE, width=2)
    draw.ellipse([190, 185, 210, 205], fill=C_PURPLE, outline=C_WHITE, width=2)
    draw.ellipse([302, 185, 322, 205], fill=C_PURPLE, outline=C_WHITE, width=2)
    draw.ellipse([392, 225, 412, 245], fill=C_PURPLE, outline=C_WHITE, width=2)
    
    # Estrela do topo imperial
    draw_star(draw, 256, 150, 28, 9, C_WHITE)
    draw_star(draw, 256, 150, 16, 5, C_NEON)
    
    return im

# =============================================================================
# 2. RENDERIZADORES DOS 7 EMOTES DA LIVE (512x512 Master)
# =============================================================================

def load_mascot_scaled(size=(420, 420)):
    if os.path.exists(CHIBI_PATH):
        chibi = Image.open(CHIBI_PATH).convert('RGBA')
        chibi.thumbnail(size, Image.Resampling.LANCZOS)
        return chibi
    # Fallback caso não encontre o arquivo
    im = Image.new('RGBA', size, (115, 46, 184, 255))
    return im

def render_emote_energiza():
    """EMOTE PRINCIPAL / PIADA INTERNA: 'Bota pra fora, energiza e monta, GG!' (vulgoENERGIZA)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Aura circular de Overcharge pulsando
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([40, 40, 472, 472], fill=(115, 46, 184, 160))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    im.paste(glow, (0, 0), glow)
    
    # Raios elétricos de Overcharge de Albion
    lightnings = [
        ((60, 100), (140, 180)),
        ((450, 100), (370, 180)),
        ((50, 320), (130, 260)),
        ((460, 320), (380, 260)),
        ((256, 40), (256, 120)),
    ]
    for p1, p2 in lightnings:
        draw_lightning(draw, p1, p2, 8, C_CYAN)
        draw_lightning(draw, p1, p2, 4, C_WHITE)
        
    # Mascote Chibi no centro
    chibi = load_mascot_scaled((360, 360))
    cx = (size - chibi.width) // 2
    cy = 50
    im.paste(chibi, (cx, cy), chibi)
    
    # Olhos em faísca neon (Overcharge Mode)
    draw_star(draw, cx + 130, cy + 145, 14, 4, C_NEON)
    draw_star(draw, cx + 215, cy + 145, 14, 4, C_NEON)
    
    # Gema de Energia Sifada voando na lateral
    gem_box = [(370, 220), (430, 260), (370, 320), (310, 260)]
    draw.polygon(gem_box, fill=C_PURPLE, outline=C_CYAN, width=6)
    draw_star(draw, 370, 260, 14, 4, C_WHITE)
    
    # Tag de Ação Inferior: "ENERGIZA!" com chanfro
    bx0, by0, bx1, by1 = 40, 390, 472, 485
    draw.polygon([
        (bx0 + 20, by0), (bx1 - 20, by0), 
        (bx1, by0 + 20), (bx1, by1), 
        (bx0, by1), (bx0, by0 + 20)
    ], fill=C_DARK, outline=C_NEON, width=8)
    
    # Texto ENERGIZA!
    font = get_font(FONT_BOLD_PATH, 74)
    text = "ENERGIZA!"
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    tx = (size - tw) // 2
    draw.text((tx, by0 + 10), text, font=font, fill=C_NEON)
    
    return im

def render_emote_monta():
    """EMOTE COMPLEMENTAR: 'MONTA!' (vulgoMONTA)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Fundo e poeira de galope
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([50, 60, 462, 462], fill=(214, 214, 92, 130))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Silhueta estilizada de montaria blindada de Albion (cavalo/lobo)
    horse_body = [(80, 380), (140, 250), (220, 220), (320, 240), (430, 290), (420, 380)]
    draw.polygon(horse_body, fill=C_DARK, outline=C_SILVER, width=8)
    # Rédeas e espada
    draw.line([(180, 260), (320, 300)], fill=C_GOLD, width=6)
    draw.line([(340, 160), (430, 80)], fill=C_SILVER, width=12) # Espada erguida
    draw.polygon([(430, 80), (445, 65), (455, 75), (440, 90)], fill=C_WHITE)
    
    # Mascote Chibi cavalgando
    chibi = load_mascot_scaled((280, 280))
    im.paste(chibi, (116, 60), chibi)
    
    # Tag de Ação Inferior: "MONTA!"
    bx0, by0, bx1, by1 = 70, 395, 442, 490
    draw.polygon([(bx0 + 20, by0), (bx1 - 20, by0), (bx1, by1), (bx0, by1)], fill=C_PURPLE, outline=C_GOLD, width=8)
    
    font = get_font(FONT_BOLD_PATH, 78)
    text = "MONTA!"
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    draw.text(((size - tw) // 2, by0 + 8), text, font=font, fill=C_WHITE)
    
    return im

def render_emote_hype():
    """vulgoHYPE: Corvo em chamas roxas e headset piscando"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Chamas místicas roxas e neon
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([50, 40, 462, 440], fill=(160, 40, 240, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    chibi = load_mascot_scaled((360, 360))
    im.paste(chibi, (76, 50), chibi)
    
    # Partículas de Hype
    draw_star(draw, 100, 110, 20, 6, C_NEON)
    draw_star(draw, 412, 110, 20, 6, C_NEON)
    draw_star(draw, 70, 260, 16, 5, C_WHITE)
    draw_star(draw, 442, 260, 16, 5, C_WHITE)
    
    # Tag HYPE!
    bx0, by0, bx1, by1 = 60, 395, 452, 490
    draw.polygon([(bx0 + 20, by0), (bx1 - 20, by0), (bx1, by1), (bx0, by1)], fill=C_DARK, outline=C_NEON, width=8)
    font = get_font(FONT_BOLD_PATH, 80)
    text = "HYPE!"
    bbox = font.getbbox(text)
    draw.text(((size - (bbox[2] - bbox[0])) // 2, by0 + 6), text, font=font, fill=C_NEON)
    
    return im

def render_emote_gg():
    """vulgoGG: Troféu dourado e sinal de vitória"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow dourado
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 50, 452, 452], fill=(245, 197, 66, 140))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    chibi = load_mascot_scaled((320, 320))
    im.paste(chibi, (40, 60), chibi)
    
    # Troféu de Ouro à direita
    trophy_cup = [(330, 150), (460, 150), (430, 270), (360, 270)]
    draw.polygon(trophy_cup, fill=C_GOLD, outline=C_WHITE, width=6)
    # Alças
    draw.arc([300, 160, 350, 230], 90, 270, fill=C_GOLD, width=8)
    draw.arc([440, 160, 490, 230], 270, 90, fill=C_GOLD, width=8)
    # Haste e base do troféu
    draw.polygon([(380, 270), (410, 270), (410, 320), (380, 320)], fill=C_GOLD_DARK)
    draw.polygon([(350, 320), (440, 320), (450, 360), (340, 360)], fill=C_DARK, outline=C_GOLD, width=4)
    draw_star(draw, 395, 200, 16, 5, C_WHITE)
    
    # Tag GG
    bx0, by0, bx1, by1 = 100, 395, 412, 490
    draw.polygon([(bx0 + 20, by0), (bx1 - 20, by0), (bx1, by1), (bx0, by1)], fill=C_PURPLE, outline=C_WHITE, width=8)
    font = get_font(FONT_BOLD_PATH, 82)
    text = "GG!"
    bbox = font.getbbox(text)
    draw.text(((size - (bbox[2] - bbox[0])) // 2, by0 + 5), text, font=font, fill=C_WHITE)
    
    return im

def render_emote_rage():
    """vulgoRAGE: Corvo pistola, teclado quebrado e fumaça (gank na Black Zone)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow vermelho / fúria
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 50, 452, 452], fill=(235, 60, 75, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    chibi = load_mascot_scaled((360, 360))
    im.paste(chibi, (76, 50), chibi)
    
    # Fumaça saindo do headset
    draw.arc([60, 100, 120, 160], 0, 180, fill=C_WHITE, width=6)
    draw.arc([400, 100, 460, 160], 0, 180, fill=C_WHITE, width=6)
    
    # Teclas voando quebradas
    keys = [
        [(110, 320), (140, 310), (150, 335), (120, 345)],
        [(370, 310), (400, 320), (390, 345), (360, 335)],
        [(240, 340), (270, 340), (270, 365), (240, 365)]
    ]
    for key in keys:
        draw.polygon(key, fill=C_SILVER, outline=C_DARK, width=3)
        
    # Tag RAGE!
    bx0, by0, bx1, by1 = 60, 395, 452, 490
    draw.polygon([(bx0 + 20, by0), (bx1 - 20, by0), (bx1, by1), (bx0, by1)], fill=C_RED, outline=C_WHITE, width=8)
    font = get_font(FONT_BOLD_PATH, 80)
    text = "RAGE!"
    bbox = font.getbbox(text)
    draw.text(((size - (bbox[2] - bbox[0])) // 2, by0 + 6), text, font=font, fill=C_WHITE)
    
    return im

def render_emote_lurk():
    """vulgoLURK: Corvo ninja com capuz espiando (Anti-ghost mode)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Fundo sombrio
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([80, 80, 432, 432], fill=(20, 10, 35, 180))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    im.paste(glow, (0, 0), glow)
    
    # Folhagem / Moita tática de Albion
    bushes = [
        [(40, 360), (140, 260), (240, 360)],
        [(180, 380), (280, 250), (380, 380)],
        [(320, 370), (420, 270), (480, 370)]
    ]
    for bush in bushes:
        draw.polygon(bush, fill=(15, 30, 20, 255), outline=(50, 130, 60, 255), width=6)
        
    # Corvo espiando por cima
    chibi = load_mascot_scaled((320, 320))
    im.paste(chibi, (96, 120), chibi)
    
    # Capuz sombrio
    hood = [(150, 140), (256, 90), (362, 140), (342, 230), (170, 230)]
    draw.polygon(hood, fill=(10, 5, 15, 230), outline=C_PURPLE, width=6)
    
    # Olhos misteriosos brilhando através do capuz
    draw.ellipse([210, 180, 235, 195], fill=C_NEON)
    draw.ellipse([277, 180, 302, 195], fill=C_NEON)
    
    # Tag LURK
    bx0, by0, bx1, by1 = 80, 395, 432, 490
    draw.polygon([(bx0 + 20, by0), (bx1 - 20, by0), (bx1, by1), (bx0, by1)], fill=C_DARK, outline=C_PURPLE, width=8)
    font = get_font(FONT_BOLD_PATH, 80)
    text = "LURK"
    bbox = font.getbbox(text)
    draw.text(((size - (bbox[2] - bbox[0])) // 2, by0 + 6), text, font=font, fill=C_NEON)
    
    return im

def render_emote_rip():
    """vulgoRIP: Lápide cômica de Albion com pena roxa (perdeu o set)"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow espectral
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([80, 60, 432, 432], fill=(115, 46, 184, 130))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Lápide em arco de pedra
    draw.polygon([(140, 420), (140, 180), (256, 110), (372, 180), (372, 420)], fill=C_DARK, outline=C_SILVER, width=10)
    
    # Inscrição RIP na pedra
    font_rip = get_font(FONT_BOLD_PATH, 92)
    bbox = font_rip.getbbox("RIP")
    draw.text(((size - (bbox[2] - bbox[0])) // 2, 180), "RIP", font=font_rip, fill=C_SILVER)
    
    # Pena de Corvo cravada no chão ao lado
    draw.line([(100, 440), (160, 280)], fill=C_PURPLE, width=12)
    draw_star(draw, 160, 280, 12, 4, C_NEON)
    
    # Tag de Ação Inferior: "PERDEU O SET"
    bx0, by0, bx1, by1 = 40, 400, 472, 485
    draw.polygon([(bx0 + 15, by0), (bx1 - 15, by0), (bx1, by1), (bx0, by1)], fill=(30, 10, 45, 255), outline=C_PURPLE, width=6)
    font_sub = get_font(FONT_BOLD_PATH, 54)
    text = "PERDEU O SET!"
    bbox = font_sub.getbbox(text)
    draw.text(((size - (bbox[2] - bbox[0])) // 2, by0 + 12), text, font=font_sub, fill=C_NEON)
    
    return im

# =============================================================================
# 3. RENDERIZADOR DE PONTOS DO CANAL (Channel Points Icon)
# =============================================================================

def render_channel_point_coin():
    """Moeda Rúnica Dourada da Guilda IVEXI"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Glow dourado
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 60, 452, 452], fill=(245, 197, 66, 150))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Borda externa da moeda (Ouro com chanfros)
    draw.ellipse([70, 70, 442, 442], fill=C_GOLD, outline=C_WHITE, width=10)
    
    # Aro interno rúnico
    draw.ellipse([105, 105, 407, 407], fill=C_DARK, outline=C_GOLD_DARK, width=8)
    
    # Gravura do Mascote ou Emblema IVEXI no centro
    draw.ellipse([135, 135, 377, 377], fill=C_PURPLE_DARK, outline=C_PURPLE, width=6)
    
    # Corvo estilizado no centro
    corvo_poly = [(256, 170), (320, 230), (300, 310), (256, 350), (212, 310), (192, 230)]
    draw.polygon(corvo_poly, fill=C_GOLD, outline=C_WHITE, width=4)
    draw_star(draw, 256, 256, 16, 5, C_WHITE)
    
    # Inscrição rúnica ao redor
    for deg in range(0, 360, 45):
        rad = math.radians(deg)
        x = 256 + int(120 * math.cos(rad))
        y = 256 + int(120 * math.sin(rad))
        draw_star(draw, x, y, 6, 2, C_NEON)
        
    return im

# =============================================================================
# 4. RENDERIZADORES DOS 5 DISTINTIVOS DE BITS (Bit Badges)
# =============================================================================

def render_bit_1():
    """1 Bit: Fragmento Rúnico de Pedra"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    poly = [(256, 90), (380, 190), (350, 380), (256, 430), (150, 360), (130, 210)]
    draw.polygon(poly, fill=(90, 85, 100, 255), outline=C_SILVER, width=10)
    draw.line([(256, 90), (256, 430)], fill=(130, 125, 140, 255), width=6)
    draw_star(draw, 256, 260, 24, 8, C_PURPLE)
    return im

def render_bit_100():
    """100 Bits: Prisma de Ferro e Prata Lapidada"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([100, 100, 412, 412], fill=(200, 205, 220, 120))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    im.paste(glow, (0, 0), glow)
    
    poly = [(256, 80), (390, 210), (350, 410), (256, 430), (162, 410), (122, 210)]
    draw.polygon(poly, fill=C_SILVER, outline=C_WHITE, width=10)
    draw.polygon([(256, 140), (330, 220), (256, 360), (182, 220)], fill=C_PURPLE, outline=C_NEON, width=4)
    draw_star(draw, 256, 80, 16, 5, C_WHITE)
    return im

def render_bit_1000():
    """1.000 Bits: Ametista Facetada IVEXI"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([80, 80, 432, 432], fill=(115, 46, 184, 160))
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    im.paste(glow, (0, 0), glow)
    
    gem = [(150, 140), (362, 140), (432, 230), (256, 430), (80, 230)]
    draw.polygon(gem, fill=C_PURPLE, outline=C_WHITE, width=8)
    draw.polygon([(150, 140), (362, 140), (256, 230)], fill=(160, 80, 230, 255))
    draw.polygon([(80, 230), (150, 140), (256, 230)], fill=(130, 50, 200, 255))
    draw.polygon([(362, 140), (432, 230), (256, 230)], fill=(100, 30, 170, 255))
    draw.polygon([(80, 230), (256, 430), (256, 230)], fill=(140, 60, 210, 255))
    draw.polygon([(432, 230), (256, 430), (256, 230)], fill=(80, 20, 150, 255))
    draw_star(draw, 256, 230, 18, 5, C_WHITE)
    return im

def render_bit_5000():
    """5.000 Bits: Cristal Duplo Dourado e Ametista"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([70, 70, 442, 442], fill=(245, 197, 66, 160))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Suporte em ouro
    draw.polygon([(110, 260), (256, 440), (402, 260), (350, 220), (256, 340), (162, 220)], fill=C_GOLD, outline=C_WHITE, width=6)
    # Cristais gêmeos
    draw.polygon([(190, 80), (240, 170), (190, 290), (140, 200)], fill=C_PURPLE, outline=C_NEON, width=6)
    draw.polygon([(322, 80), (372, 200), (322, 290), (272, 170)], fill=C_PURPLE, outline=C_NEON, width=6)
    draw_star(draw, 256, 200, 24, 7, C_WHITE)
    return im

def render_bit_10000():
    """10.000 Bits: Relíquia Ancestral com Chamas Místicas"""
    size = 512
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Super glow místico
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([60, 50, 452, 452], fill=(214, 214, 92, 170))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    im.paste(glow, (0, 0), glow)
    
    # Cálice / Relíquia de ouro e asas
    wings = [(80, 200), (150, 300), (256, 390), (362, 300), (432, 200), (402, 160), (256, 260), (110, 160)]
    draw.polygon(wings, fill=C_GOLD, outline=C_WHITE, width=8)
    
    # Chama mística púrpura
    flame = [(256, 60), (290, 130), (320, 100), (300, 210), (256, 250), (212, 210), (192, 100), (222, 130)]
    draw.polygon(flame, fill=C_PURPLE, outline=C_NEON, width=6)
    draw_star(draw, 256, 170, 20, 6, C_WHITE)
    draw_star(draw, 256, 50, 26, 8, C_NEON)
    return im

# =============================================================================
# EXPORTADOR PRINCIPAL E EMPACOTAMENTO
# =============================================================================

def export_asset_sizes(master_img, target_name, brand_category_dir, public_category_dir, sizes):
    """Exporta o master nas resoluções especificadas e salva nos diretórios correspondentes"""
    for w, h in sizes:
        resized = master_img.resize((w, h), Image.Resampling.LANCZOS)
        
        # Subpastas por resolução (ex: 18x18, 72x72 ou master)
        res_str = f"{w}x{h}" if w != 512 else "512_master"
        b_res_dir = os.path.join(brand_category_dir, res_str)
        p_res_dir = os.path.join(public_category_dir, res_str)
        os.makedirs(b_res_dir, exist_ok=True)
        os.makedirs(p_res_dir, exist_ok=True)
        
        filename = f"{target_name}-{res_str}.png"
        b_path = os.path.join(b_res_dir, filename)
        p_path = os.path.join(p_res_dir, filename)
        
        resized.save(b_path, 'PNG', optimize=True)
        resized.save(p_path, 'PNG', optimize=True)
        
        # Salva também na raiz da categoria pública para acesso rápido
        quick_path = os.path.join(public_category_dir, f"{target_name}_{res_str}.png")
        resized.save(quick_path, 'PNG', optimize=True)

def generate_all():
    print("🎨 Iniciando geração do Pack de Afiliado Twitch para VulgoManiaco & Guilda IVEXI...")
    
    # Diretórios
    categories = ['sub_badges', 'emotes', 'channel_points', 'bit_badges']
    for cat in categories:
        os.makedirs(os.path.join(BRAND_TWITCH_DIR, cat), exist_ok=True)
        os.makedirs(os.path.join(PUBLIC_TWITCH_DIR, cat), exist_ok=True)
        
    badge_sizes = [(18, 18), (36, 36), (72, 72), (512, 512)]
    emote_sizes = [(28, 28), (56, 56), (112, 112), (512, 512)]
    
    # 1. Distintivos de Sub
    print("-> Gerando 6 Distintivos de Inscrito (Sub Badges)...")
    sub_badges = [
        ('sub_1m', render_badge_1m()),
        ('sub_2m', render_badge_2m()),
        ('sub_3m', render_badge_3m()),
        ('sub_6m', render_badge_6m()),
        ('sub_9m', render_badge_9m()),
        ('sub_1y', render_badge_12m()),
    ]
    for name, img in sub_badges:
        export_asset_sizes(img, name, os.path.join(BRAND_TWITCH_DIR, 'sub_badges'), os.path.join(PUBLIC_TWITCH_DIR, 'sub_badges'), badge_sizes)
        
    # 2. Emotes
    print("-> Gerando 7 Emotes da Live (incluindo vulgoENERGIZA e vulgoMONTA)...")
    emotes = [
        ('vulgoENERGIZA', render_emote_energiza()),
        ('vulgoMONTA', render_emote_monta()),
        ('vulgoHYPE', render_emote_hype()),
        ('vulgoGG', render_emote_gg()),
        ('vulgoRAGE', render_emote_rage()),
        ('vulgoLURK', render_emote_lurk()),
        ('vulgoRIP', render_emote_rip()),
    ]
    for name, img in emotes:
        export_asset_sizes(img, name, os.path.join(BRAND_TWITCH_DIR, 'emotes'), os.path.join(PUBLIC_TWITCH_DIR, 'emotes'), emote_sizes)
        
    # 3. Pontos do Canal
    print("-> Gerando Ícone de Pontos do Canal (Moeda IVEXI)...")
    coin_img = render_channel_point_coin()
    export_asset_sizes(coin_img, 'moeda_ivexi', os.path.join(BRAND_TWITCH_DIR, 'channel_points'), os.path.join(PUBLIC_TWITCH_DIR, 'channel_points'), emote_sizes)
    
    # 4. Badges de Bits
    print("-> Gerando 5 Distintivos de Bits...")
    bit_badges = [
        ('bits_1', render_bit_1()),
        ('bits_100', render_bit_100()),
        ('bits_1000', render_bit_1000()),
        ('bits_5000', render_bit_5000()),
        ('bits_10000', render_bit_10000()),
    ]
    for name, img in bit_badges:
        export_asset_sizes(img, name, os.path.join(BRAND_TWITCH_DIR, 'bit_badges'), os.path.join(PUBLIC_TWITCH_DIR, 'bit_badges'), badge_sizes)
        
    # 5. Criar arquivo ZIP oficial para download em 1 clique
    print("📦 Empacotando arquivo ZIP unificado...")
    zip_path = os.path.join(PUBLIC_TWITCH_DIR, 'pack-afiliado-twitch-vulgomaniaco.zip')
    
    instructions = """=============================================================
GUIA OFICIAL: PACK DE AFILIADO TWITCH - VULGOMANIACO & GUILDA IVEXI
=============================================================

Parabens pelo status de Afiliado da Twitch!
Este pacote contem todos os arquivos rigorosamente calibrados para as
dimensoes e pesos exigidos pela Twitch.

-------------------------------------------------------------
1. COMO SUBIR OS DISTINTIVOS DE INSCRITO (SUB BADGES):
-------------------------------------------------------------
1. Acesse o Painel de Controle do Criador da Twitch:
   https://dashboard.twitch.tv
2. No menu lateral esquerdo, clique em:
   Recompensas de Espectador > Inscricoes (Subscriptions) > Distintivos de Fidelidade (Loyalty Badges).
3. Selecione cada nivel (1 Mes, 2 Meses, 3 Meses, 6 Meses, 9 Meses e 1 Ano):
   - Modo Recomendado: Voce pode subir diretamente o arquivo da pasta '512_master/'
     com o modo "Redimensionamento Automatico" ativado na Twitch!
   - Ou subir manualmente cada um dos 3 arquivos (18x18, 36x36 e 72x72) das respectivas pastas.
4. Clique em "Salvar Alteracoes".

-------------------------------------------------------------
2. COMO SUBIR OS EMOTES DE CANAL (TIER 1 & SEGUIDORES):
-------------------------------------------------------------
1. No menu lateral, va em:
   Recompensas de Espectador > Emoticons > Emotes de Assinante.
2. Clique no botao (+) para adicionar um novo emote no Tier 1:
   - Emote 1: 'vulgoENERGIZA' (A piada interna / chamada de combate de Albion!)
   - Emote 2: 'vulgoMONTA'
   - Emote 3: 'vulgoHYPE'
   - Emote 4: 'vulgoGG'
   - Emote 5: 'vulgoRAGE'
   - Bônus: 'vulgoLURK' e 'vulgoRIP'
3. Arraste a versao Master (512x512) ou os 3 arquivos (28x28, 56x56, 112x112).
4. Defina o codigo de chat do emote e clique em "Enviar para Aprovacao".

-------------------------------------------------------------
3. COMO SUBIR OS PONTOS DO CANAL (CHANNEL POINTS):
-------------------------------------------------------------
1. No menu lateral, va em:
   Recompensas de Espectador > Pontos do Canal > Personalizar Exibicao de Pontos.
2. Faca o upload do icone 'moeda_ivexi' nas resolucoes 28x28, 56x56 e 112x112.
3. Defina o nome dos pontos (sugestao: 'Prata de Albion' ou 'Energia IVEXI').

-------------------------------------------------------------
4. COMO SUBIR OS DISTINTIVOS DE BITS:
-------------------------------------------------------------
1. No menu lateral, va em:
   Recompensas de Espectador > Recompensas de Bits > Distintivos de Bits.
2. Suba os distintivos de 1, 100, 1.000, 5.000 e 10.000 bits.

Sucesso nas lives e GG!
Canal VulgoManiaco & Guilda IVEXI
"""
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        # Adiciona o guia
        zf.writestr('LEIA-ME_GUIA_UPLOAD_TWITCH.txt', instructions)
        
        # Percorre a pasta BRAND_TWITCH_DIR e adiciona todos os arquivos
        for root, _, files in os.walk(BRAND_TWITCH_DIR):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, BRAND_TWITCH_DIR)
                zf.write(full_path, arcname=os.path.join('pack_afiliado_vulgomaniaco', rel_path))
                
    print(f"✅ Pack completo gerado com sucesso em: {zip_path}")
    print(f"   Tamanho do arquivo ZIP: {os.path.getsize(zip_path) / 1024:.1f} KB")

if __name__ == '__main__':
    generate_all()
