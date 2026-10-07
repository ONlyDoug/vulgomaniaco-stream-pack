import os
import base64
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_streamer_logos():
    mascot_path = 'src/assets/images/corvo-streamer-chibi.png'
    font_path = 'brand/fonts/rajdhani-bold.ttf'
    
    os.makedirs('brand/logo/png', exist_ok=True)
    os.makedirs('brand/logo/svg', exist_ok=True)
    os.makedirs('brand/logo/source', exist_ok=True)
    os.makedirs('src/assets/images', exist_ok=True)
    
    mascot = Image.open(mascot_path).convert('RGBA')
    font_title = ImageFont.truetype(font_path, 118)
    font_sub = ImageFont.truetype(font_path, 34)
    font_h_title = ImageFont.truetype(font_path, 130)
    font_h_sub = ImageFont.truetype(font_path, 38)
    
    # -------------------------------------------------------------
    # 1. BADGE LOCKUP DARK (Vertical - Principal)
    # -------------------------------------------------------------
    cw, ch = 1200, 1350
    badge_dark = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    
    # Mascot at center top
    mx = (cw - mascot.width) // 2
    my = 60
    badge_dark.paste(mascot, (mx, my), mascot)
    
    # Banner geometry
    bx0, bx1 = 120, 1080
    by0 = 960
    by1 = by0 + 280
    chamfer = 45
    points = [
        (bx0 + chamfer, by0),
        (bx1 - chamfer, by0),
        (bx1, by0 + chamfer),
        (bx1, by1 - chamfer - 20),
        (bx1 - chamfer, by1 - 20),
        ((bx0 + bx1) // 2 + 50, by1 - 20),
        ((bx0 + bx1) // 2, by1),
        ((bx0 + bx1) // 2 - 50, by1 - 20),
        (bx0 + chamfer, by1 - 20),
        (bx0, by1 - chamfer - 20),
        (bx0, by0 + chamfer),
    ]
    
    # Drop shadow under banner
    shadow_layer = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_layer)
    sdraw.polygon(points, fill=(5, 2, 10, 190))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(14))
    badge_dark.paste(shadow_layer, (0, 6), shadow_layer)
    
    # Banner surface
    banner_layer = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(banner_layer)
    
    # Deep Dark-Purple fill (#140A1F)
    bdraw.polygon(points, fill=(20, 10, 31, 245))
    
    # Inner bevel
    inset = 6
    inner_points = [
        (bx0 + chamfer + inset, by0 + inset),
        (bx1 - chamfer - inset, by0 + inset),
        (bx1 - inset, by0 + chamfer + inset),
        (bx1 - inset, by1 - chamfer - 20 - inset),
        (bx1 - chamfer - inset, by1 - 20 - inset),
        ((bx0 + bx1) // 2 + 50 - inset, by1 - 20 - inset),
        ((bx0 + bx1) // 2, by1 - inset),
        ((bx0 + bx1) // 2 - 50 + inset, by1 - 20 - inset),
        (bx0 + chamfer + inset, by1 - 20 - inset),
        (bx0 + inset, by1 - chamfer - 20 - inset),
        (bx0 + inset, by0 + chamfer + inset),
    ]
    bdraw.polygon(inner_points, fill=(36, 16, 55, 255))
    
    # Outer stroke in Purple #732EB8 (width 5)
    bdraw.polygon(points, outline=(115, 46, 184, 255), width=5)
    
    # Neon highlight lines #D6D65C
    neon_yellow = (214, 214, 92, 255)
    bdraw.line([points[0], points[1]], fill=neon_yellow, width=3)
    bdraw.line([points[4], points[5], points[6], points[7], points[8]], fill=neon_yellow, width=3)
    
    # Rivets
    for rx, ry in [(bx0 + chamfer + 8, by0 + 16), (bx1 - chamfer - 8, by0 + 16), (bx0 + 20, by1 - chamfer - 10), (bx1 - 20, by1 - chamfer - 10)]:
        bdraw.ellipse([rx - 4, ry - 4, rx + 4, ry + 4], fill=neon_yellow, outline=(115, 46, 184, 255), width=1)
        
    # Text VULGO MANIACO
    text_v = 'VULGO '
    text_m = 'MANIACO'
    w_v = font_title.getbbox(text_v)[2] - font_title.getbbox(text_v)[0]
    w_m = font_title.getbbox(text_m)[2] - font_title.getbbox(text_m)[0]
    total_w = w_v + w_m
    tx = (cw - total_w) // 2
    ty = by0 + 38
    
    # Subtle drop shadow for text
    for ox, oy in [(-2, -2), (2, -2), (-2, 2), (2, 2), (0, 3)]:
        bdraw.text((tx + ox, ty + oy), text_v, font=font_title, fill=(10, 5, 18, 255))
        bdraw.text((tx + w_v + ox, ty + oy), text_m, font=font_title, fill=(10, 5, 18, 255))
        
    bdraw.text((tx, ty), text_v, font=font_title, fill=(250, 250, 250, 255))
    bdraw.text((tx + w_v, ty), text_m, font=font_title, fill=neon_yellow)
    
    # Sub ribbon
    s_plate_y0 = ty + 124
    s_plate_y1 = s_plate_y0 + 48
    s_plate_x0 = (bx0 + bx1) // 2 - 270
    s_plate_x1 = (bx0 + bx1) // 2 + 270
    sp_points = [
        (s_plate_x0 + 14, s_plate_y0),
        (s_plate_x1 - 14, s_plate_y0),
        (s_plate_x1, s_plate_y0 + 14),
        (s_plate_x1, s_plate_y1 - 14),
        (s_plate_x1 - 14, s_plate_y1),
        (s_plate_x0 + 14, s_plate_y1),
        (s_plate_x0, s_plate_y1 - 14),
        (s_plate_x0, s_plate_y0 + 14),
    ]
    bdraw.polygon(sp_points, fill=(20, 10, 31, 255), outline=(115, 46, 184, 255), width=2)
    
    text_sub = 'ALBION ONLINE  •  GUILDA IVEXI'
    w_sub = font_sub.getbbox(text_sub)[2] - font_sub.getbbox(text_sub)[0]
    sub_x = (cw - w_sub) // 2
    sub_y = s_plate_y0 + 6
    bdraw.text((sub_x, sub_y), text_sub, font=font_sub, fill=(214, 214, 92, 230))
    
    badge_dark.paste(banner_layer, (0, 0), banner_layer)
    
    # Save Badge Dark Master & scaled
    badge_dark_master_path = 'brand/logo/png/streamer-vulgomaniaco-badge-dark-master.png'
    badge_dark.save(badge_dark_master_path, format='PNG', optimize=True)
    badge_dark.resize((1024, int(1024 * (ch / cw))), Image.Resampling.LANCZOS).save('brand/logo/png/streamer-vulgomaniaco-badge-dark-1024w.png', optimize=True)
    badge_dark.resize((512, int(512 * (ch / cw))), Image.Resampling.LANCZOS).save('brand/logo/png/streamer-vulgomaniaco-badge-dark-512w.png', optimize=True)
    
    # Copy to src/assets/images
    badge_dark.save('src/assets/images/logo-streamer-vulgomaniaco-badge.png', format='PNG', optimize=True)
    
    # -------------------------------------------------------------
    # 2. BADGE LOCKUP LIGHT (Para fundos claros)
    # -------------------------------------------------------------
    badge_light = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    badge_light.paste(mascot, (mx, my), mascot)
    
    banner_light_layer = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    bldraw = ImageDraw.Draw(banner_light_layer)
    bldraw.polygon(points, fill=(245, 243, 248, 250), outline=(115, 46, 184, 255), width=5)
    bldraw.polygon(inner_points, fill=(235, 230, 242, 255))
    bldraw.line([points[0], points[1]], fill=(115, 46, 184, 255), width=3)
    bldraw.line([points[4], points[5], points[6], points[7], points[8]], fill=(115, 46, 184, 255), width=3)
    bldraw.polygon(sp_points, fill=(240, 235, 248, 255), outline=(115, 46, 184, 255), width=2)
    
    bldraw.text((tx, ty), text_v, font=font_title, fill=(20, 10, 31, 255))
    bldraw.text((tx + w_v, ty), text_m, font=font_title, fill=(115, 46, 184, 255))
    bldraw.text((sub_x, sub_y), text_sub, font=font_sub, fill=(20, 10, 31, 230))
    
    badge_light.paste(shadow_layer, (0, 6), shadow_layer)
    badge_light.paste(banner_light_layer, (0, 0), banner_light_layer)
    badge_light.save('brand/logo/png/streamer-vulgomaniaco-badge-light-master.png', format='PNG', optimize=True)
    
    # -------------------------------------------------------------
    # 3. HORIZONTAL LOCKUP DARK (Novo Design: Base Tática Contínua e Brasão Integrado)
    # -------------------------------------------------------------
    hw, hh = 1600, 560
    h_dark = Image.new('RGBA', (hw, hh), (0, 0, 0, 0))
    
    # Recorte ajustado do mascote para eliminar margens vazias
    mascot_crop = mascot.crop((164, 73, 906, 935))
    m_h = 420
    m_w = int(mascot_crop.width * (m_h / mascot_crop.height))
    mascot_h = mascot_crop.resize((m_w, m_h), Image.Resampling.LANCZOS)
    
    # Camada tática integrada (Brasão esquerdo + Caixa direita + Base contínua)
    h_layer = Image.new('RGBA', (hw, hh), (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(h_layer)
    
    # 3.1 Brasão de apoio traseiro para o mascote (elimina a sensação de vazio ao redor do corvo)
    crest_x0, crest_x1 = 40, m_w + 80
    crest_y0, crest_y1 = 30, 465
    c_chamfer = 35
    crest_pts = [
        (crest_x0 + c_chamfer, crest_y0),
        (crest_x1 - c_chamfer, crest_y0),
        (crest_x1, crest_y0 + c_chamfer),
        (crest_x1, crest_y1),
        (crest_x0, crest_y1),
        (crest_x0, crest_y0 + c_chamfer),
    ]
    hdraw.polygon(crest_pts, fill=(20, 10, 31, 245), outline=(115, 46, 184, 255), width=3)
    hdraw.line([(crest_x0 + c_chamfer, crest_y0), (crest_x1 - c_chamfer, crest_y0)], fill=neon_yellow, width=3)
    
    # 3.2 Placa de tipografia à direita (intertravada com o brasão do mascote)
    h_box_x0 = crest_x1 - 10
    h_box_x1 = 1560
    h_box_y0 = 50
    h_box_y1 = 465
    b_chamfer = 30
    h_points = [
        (h_box_x0, h_box_y0),
        (h_box_x1 - b_chamfer, h_box_y0),
        (h_box_x1, h_box_y0 + b_chamfer),
        (h_box_x1, h_box_y1),
        (h_box_x0, h_box_y1),
    ]
    hdraw.polygon(h_points, fill=(25, 12, 38, 245), outline=(115, 46, 184, 255), width=3)
    hdraw.line([(h_box_x0, h_box_y0), (h_box_x1 - b_chamfer, h_box_y0)], fill=neon_yellow, width=3)
    
    # 3.3 Base tática de ancoragem contínua (percorre toda a parte inferior de ponta a ponta)
    base_x0, base_x1 = 40, 1560
    base_y0, base_y1 = 445, 530
    base_chamfer = 24
    base_pts = [
        (base_x0 + base_chamfer, base_y0),
        (base_x1 - base_chamfer, base_y0),
        (base_x1, base_y0 + base_chamfer),
        (base_x1 - base_chamfer, base_y1),
        (base_x0 + base_chamfer, base_y1),
        (base_x0, base_y0 + base_chamfer),
    ]
    hdraw.polygon(base_pts, fill=(20, 10, 31, 255), outline=(115, 46, 184, 255), width=3)
    hdraw.line([(base_x0 + base_chamfer, base_y0), (base_x1 - base_chamfer, base_y0)], fill=neon_yellow, width=2)
    hdraw.line([(base_x0 + base_chamfer, base_y1), (base_x1 - base_chamfer, base_y1)], fill=neon_yellow, width=2)
    
    # Texto na base contínua de ancoragem
    font_base = ImageFont.truetype(font_path, 28)
    base_text = 'ALBION ONLINE MMORPG  •  GUILDA IVEXI  •  TWITCH.TV/VULGOMANIACO'
    bw_base = font_base.getbbox(base_text)[2] - font_base.getbbox(base_text)[0]
    hdraw.text(((hw - bw_base) // 2 + 100, base_y0 + 22), base_text, font=font_base, fill=(214, 214, 92, 245))
    
    # Rebites de detalhamento tático na base
    for rx, ry in [(base_x0 + base_chamfer + 10, base_y0 + 16), (base_x1 - base_chamfer - 10, base_y0 + 16)]:
        hdraw.ellipse([rx - 4, ry - 4, rx + 4, ry + 4], fill=neon_yellow, outline=(115, 46, 184, 255), width=1)
        
    # 3.4 Tipografia Principal VULGO MANIACO
    h_tx = h_box_x0 + 45
    h_ty = h_box_y0 + 35
    for ox, oy in [(-2, -2), (2, -2), (-2, 2), (2, 2), (0, 3)]:
        hdraw.text((h_tx + ox, h_ty + oy), text_v, font=font_h_title, fill=(10, 5, 18, 255))
        hdraw.text((h_tx + font_h_title.getbbox(text_v)[2] - font_h_title.getbbox(text_v)[0] + ox, h_ty + oy), text_m, font=font_h_title, fill=(10, 5, 18, 255))
    hdraw.text((h_tx, h_ty), text_v, font=font_h_title, fill=(250, 250, 250, 255))
    h_wv = font_h_title.getbbox(text_v)[2] - font_h_title.getbbox(text_v)[0]
    hdraw.text((h_tx + h_wv, h_ty), text_m, font=font_h_title, fill=neon_yellow)
    
    # Faixa descritiva intermediária
    sub_box_y = h_ty + 155
    hdraw.line([(h_tx, sub_box_y), (h_box_x1 - 45, sub_box_y)], fill=(115, 46, 184, 180), width=2)
    hdraw.text((h_tx, sub_box_y + 14), 'STREAMER OFICIAL NA TWITCH  •  PVP & BLACK ZONE', font=font_h_sub, fill=(196, 184, 214, 240))
    
    # Aplica a estrutura tática na imagem transparente
    h_dark.paste(h_layer, (0, 0), h_layer)
    
    # Posiciona o mascote ancorado exatamente acima da base tática contínua
    m_px = 65
    m_py = base_y0 - m_h  # 445 - 420 = 25
    h_dark.paste(mascot_h, (m_px, m_py), mascot_h)
    
    h_dark.save('brand/logo/png/streamer-vulgomaniaco-horizontal-dark-master.png', format='PNG', optimize=True)
    h_dark.resize((1024, int(1024 * (hh / hw))), Image.Resampling.LANCZOS).save('brand/logo/png/streamer-vulgomaniaco-horizontal-dark-1024w.png', optimize=True)
    h_dark.save('src/assets/images/logo-streamer-vulgomaniaco-horizontal.png', format='PNG', optimize=True)
    
    # -------------------------------------------------------------
    # 4. COMPACT / AVATAR LOCKUP (512x512)
    # -------------------------------------------------------------
    avatar = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    # Circular mask / frame
    frame = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    fdraw = ImageDraw.Draw(frame)
    fdraw.ellipse([8, 8, 504, 504], fill=(20, 10, 31, 255), outline=(115, 46, 184, 255), width=8)
    fdraw.ellipse([16, 16, 496, 496], outline=neon_yellow, width=3)
    avatar.paste(frame, (0, 0), frame)
    
    # Mascot centered in circular frame
    m_crop = mascot.crop((164, 73, 906, 935))
    m_avatar = m_crop.resize((440, int(440 * (m_crop.height / m_crop.width))), Image.Resampling.LANCZOS)
    avatar.paste(m_avatar, ((512 - m_avatar.width) // 2, 35), m_avatar)
    
    # Small tactical badge at bottom of circle
    abdraw = ImageDraw.Draw(avatar)
    ab_points = [
        (80, 420),
        (432, 420),
        (412, 475),
        (100, 475),
    ]
    abdraw.polygon(ab_points, fill=(20, 10, 31, 245), outline=neon_yellow, width=2)
    font_av = ImageFont.truetype(font_path, 34)
    av_text = 'VULGOMANIACO'
    av_w = font_av.getbbox(av_text)[2] - font_av.getbbox(av_text)[0]
    abdraw.text(((512 - av_w) // 2, 430), av_text, font=font_av, fill=neon_yellow)
    
    avatar.save('brand/logo/png/streamer-vulgomaniaco-compact-512w.png', format='PNG', optimize=True)
    avatar.save('src/assets/images/logo-streamer-vulgomaniaco-avatar.png', format='PNG', optimize=True)
    
    # -------------------------------------------------------------
    # 4.1 MASCOTE CHIBI ISOLADO COM TRANSPARÊNCIA PURA (ZERO BOLA PRETA)
    # -------------------------------------------------------------
    mascot_transparent = Image.new('RGBA', mascot.size, (0, 0, 0, 0))
    mascot_transparent.paste(mascot, (0, 0), mascot)
    mascot_transparent.save('brand/logo/png/streamer-mascote-chibi-transparente.png', format='PNG', optimize=True)
    mascot_transparent.save('src/assets/images/corvo-streamer-chibi-transparente.png', format='PNG', optimize=True)
    
    # -------------------------------------------------------------
    # 5. MONOCHROME WHITE MASTER
    # -------------------------------------------------------------
    badge_mono = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    # Convert mascot to grayscale / white silhouette
    m_alpha = mascot.split()[3]
    m_mono = Image.new('RGBA', mascot.size, (255, 255, 255, 255))
    m_mono.putalpha(m_alpha)
    badge_mono.paste(m_mono, (mx, my), m_mono)
    
    bmdraw = ImageDraw.Draw(badge_mono)
    bmdraw.polygon(points, fill=(0, 0, 0, 200), outline=(255, 255, 255, 255), width=5)
    bmdraw.text((tx, ty), text_v + text_m, font=font_title, fill=(255, 255, 255, 255))
    bmdraw.text((sub_x, sub_y), text_sub, font=font_sub, fill=(255, 255, 255, 255))
    badge_mono.save('brand/logo/png/streamer-vulgomaniaco-mono-master.png', format='PNG', optimize=True)
    
    # -------------------------------------------------------------
    # 6. SVG MASTERS
    # -------------------------------------------------------------
    # Convert mascot PNG to base64 for embedding in the SVG
    with open(mascot_path, 'rb') as f:
        mascot_b64 = base64.b64encode(f.read()).decode('utf-8')
        
    svg_badge = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cw} {ch}" width="{cw}" height="{ch}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&amp;display=swap');
      .font-rajdhani {{ font-family: 'Rajdhani', sans-serif; font-weight: 700; text-transform: uppercase; }}
      .neon-glow {{ filter: drop-shadow(0 0 10px rgba(214, 214, 92, 0.7)); }}
      .purple-glow {{ filter: drop-shadow(0 0 12px rgba(115, 46, 184, 0.8)); }}
    </style>
    <linearGradient id="bannerBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#140A1F" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#241037" stop-opacity="0.98"/>
    </linearGradient>
  </defs>
  
  <!-- Mascote Corvo Chibi Gamer -->
  <image href="data:image/png;base64,{mascot_b64}" x="{mx}" y="{my}" width="{mascot.width}" height="{mascot.height}"/>
  
  <!-- Sombra do Escudo Tático -->
  <polygon points="{points[0][0]},{points[0][1]+8} {points[1][0]},{points[1][1]+8} {points[2][0]},{points[2][1]+8} {points[3][0]},{points[3][1]+8} {points[4][0]},{points[4][1]+8} {points[5][0]},{points[5][1]+8} {points[6][0]},{points[6][1]+8} {points[7][0]},{points[7][1]+8} {points[8][0]},{points[8][1]+8} {points[9][0]},{points[9][1]+8} {points[10][0]},{points[10][1]+8}" fill="#05020A" opacity="0.7" filter="blur(8px)"/>

  <!-- Placa Tática Chanfrada -->
  <polygon points="{points[0][0]},{points[0][1]} {points[1][0]},{points[1][1]} {points[2][0]},{points[2][1]} {points[3][0]},{points[3][1]} {points[4][0]},{points[4][1]} {points[5][0]},{points[5][1]} {points[6][0]},{points[6][1]} {points[7][0]},{points[7][1]} {points[8][0]},{points[8][1]} {points[9][0]},{points[9][1]} {points[10][0]},{points[10][1]}" fill="url(#bannerBg)" stroke="#732EB8" stroke-width="5"/>

  <!-- Bordas Neon de Destaque -->
  <line x1="{points[0][0]}" y1="{points[0][1]}" x2="{points[1][0]}" y2="{points[1][1]}" stroke="#D6D65C" stroke-width="3" class="neon-glow"/>
  <polyline points="{points[4][0]},{points[4][1]} {points[5][0]},{points[5][1]} {points[6][0]},{points[6][1]} {points[7][0]},{points[7][1]} {points[8][0]},{points[8][1]}" fill="none" stroke="#D6D65C" stroke-width="3" class="neon-glow"/>

  <!-- Rebites Sextavados Táticos -->
  <circle cx="{bx0 + chamfer + 8}" cy="{by0 + 16}" r="4" fill="#D6D65C" stroke="#732EB8" stroke-width="1.5"/>
  <circle cx="{bx1 - chamfer - 8}" cy="{by0 + 16}" r="4" fill="#D6D65C" stroke="#732EB8" stroke-width="1.5"/>
  <circle cx="{bx0 + 20}" cy="{by1 - chamfer - 10}" r="4" fill="#D6D65C" stroke="#732EB8" stroke-width="1.5"/>
  <circle cx="{bx1 - 20}" cy="{by1 - chamfer - 10}" r="4" fill="#D6D65C" stroke="#732EB8" stroke-width="1.5"/>

  <!-- Tipografia Principal VULGOMANIACO -->
  <text x="{cw//2}" y="{ty + 95}" text-anchor="middle" class="font-rajdhani" font-size="118" letter-spacing="4">
    <tspan fill="#FAFAFA">VULGO </tspan>
    <tspan fill="#D6D65C" class="neon-glow">MANIACO</tspan>
  </text>

  <!-- Sub-faixa de Chancela IVEXI GUILD -->
  <polygon points="{sp_points[0][0]},{sp_points[0][1]} {sp_points[1][0]},{sp_points[1][1]} {sp_points[2][0]},{sp_points[2][1]} {sp_points[3][0]},{sp_points[3][1]} {sp_points[4][0]},{sp_points[4][1]} {sp_points[5][0]},{sp_points[5][1]} {sp_points[6][0]},{sp_points[6][1]} {sp_points[7][0]},{sp_points[7][1]}" fill="#140A1F" stroke="#732EB8" stroke-width="2"/>
  <text x="{cw//2}" y="{sub_y + 26}" text-anchor="middle" class="font-rajdhani" font-size="34" fill="#D6D65C" letter-spacing="3" opacity="0.95">
    ALBION ONLINE  •  IVEXI GUILD
  </text>
</svg>'''

    with open('brand/logo/svg/streamer-vulgomaniaco-badge-dark.svg', 'w', encoding='utf-8') as f:
        f.write(svg_badge)
    with open('brand/logo/source/streamer-vulgomaniaco-badge-dark.svg', 'w', encoding='utf-8') as f:
        f.write(svg_badge)
        
    pts_crest_str = ' '.join(f"{p[0]},{p[1]}" for p in crest_pts)
    pts_box_str = ' '.join(f"{p[0]},{p[1]}" for p in h_points)
    pts_base_str = ' '.join(f"{p[0]},{p[1]}" for p in base_pts)

    svg_horizontal = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {hw} {hh}" width="{hw}" height="{hh}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&amp;display=swap');
      .font-rajdhani {{ font-family: 'Rajdhani', sans-serif; font-weight: 700; text-transform: uppercase; }}
      .neon-glow {{ filter: drop-shadow(0 0 10px rgba(214, 214, 92, 0.7)); }}
    </style>
  </defs>
  
  <!-- 1. Brasão Traseiro do Mascote -->
  <polygon points="{pts_crest_str}" fill="#140A1F" stroke="#732EB8" stroke-width="3"/>
  <line x1="{crest_x0 + c_chamfer}" y1="{crest_y0}" x2="{crest_x1 - c_chamfer}" y2="{crest_y0}" stroke="#D6D65C" stroke-width="3" class="neon-glow"/>

  <!-- 2. Box Tático de Tipografia -->
  <polygon points="{pts_box_str}" fill="#190C26" stroke="#732EB8" stroke-width="3"/>
  <line x1="{h_box_x0}" y1="{h_box_y0}" x2="{h_box_x1 - b_chamfer}" y2="{h_box_y0}" stroke="#D6D65C" stroke-width="3" class="neon-glow"/>

  <!-- 3. Base Tática Contínua de Ancoragem (Unindo Mascote e Tipografia) -->
  <polygon points="{pts_base_str}" fill="#140A1F" stroke="#732EB8" stroke-width="3"/>
  <line x1="{base_x0 + base_chamfer}" y1="{base_y0}" x2="{base_x1 - base_chamfer}" y2="{base_y0}" stroke="#D6D65C" stroke-width="2"/>
  <line x1="{base_x0 + base_chamfer}" y1="{base_y1}" x2="{base_x1 - base_chamfer}" y2="{base_y1}" stroke="#D6D65C" stroke-width="2"/>
  <text x="{hw // 2 + 100}" y="{base_y0 + 26}" text-anchor="middle" class="font-rajdhani" font-size="28" fill="#D6D65C" letter-spacing="3">
    ALBION ONLINE MMORPG  •  GUILDA IVEXI  •  TWITCH.TV/VULGOMANIACO
  </text>

  <!-- 4. Mascote Ancorado Diretamente Acima da Base Contínua -->
  <image href="data:image/png;base64,{mascot_b64}" x="{m_px}" y="{m_py}" width="{m_w}" height="{m_h}"/>

  <!-- 5. Tipografia Principal -->
  <text x="{h_tx}" y="{h_ty + 100}" class="font-rajdhani" font-size="118" letter-spacing="4">
    <tspan fill="#FAFAFA">VULGO </tspan>
    <tspan fill="#D6D65C" class="neon-glow">MANIACO</tspan>
  </text>
  <line x1="{h_tx}" y1="{sub_box_y}" x2="{h_box_x1 - 45}" y2="{sub_box_y}" stroke="#732EB8" stroke-width="2" opacity="0.8"/>
  <text x="{h_tx}" y="{sub_box_y + 35}" class="font-rajdhani" font-size="34" fill="#C4B8D6" letter-spacing="2" opacity="0.95">
    STREAMER OFICIAL NA TWITCH  •  PVP &amp; BLACK ZONE
  </text>
</svg>'''

    with open('brand/logo/svg/streamer-vulgomaniaco-horizontal-dark.svg', 'w', encoding='utf-8') as f:
        f.write(svg_horizontal)
        
    svg_wordmark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" width="900" height="240">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&amp;display=swap');
      .font-rajdhani {{ font-family: 'Rajdhani', sans-serif; font-weight: 700; text-transform: uppercase; }}
      .neon-glow {{ filter: drop-shadow(0 0 10px rgba(214, 214, 92, 0.7)); }}
    </style>
  </defs>
  <rect width="900" height="240" fill="none"/>
  <text x="450" y="140" text-anchor="middle" class="font-rajdhani" font-size="110" letter-spacing="6">
    <tspan fill="#FAFAFA">VULGO </tspan>
    <tspan fill="#D6D65C" class="neon-glow">MANIACO</tspan>
  </text>
  <text x="450" y="195" text-anchor="middle" class="font-rajdhani" font-size="28" fill="#D6D65C" letter-spacing="5" opacity="0.9">
    ALBION ONLINE  •  GUILDA IVEXI
  </text>
</svg>'''

    with open('brand/logo/svg/streamer-vulgomaniaco-wordmark.svg', 'w', encoding='utf-8') as f:
        f.write(svg_wordmark)

    print('Todos os assets de logotipo do streamer VulgoManiaco gerados com sucesso!')

if __name__ == '__main__':
    create_streamer_logos()
