#!/usr/bin/env python3
"""
Gera os 6 painéis de perfil de canal (Twitch & Kick) em alta resolução (320x120 px)
nos formatos PNG e SVG, utilizando a tipografia Rajdhani, chanfros táticos de 45°,
paleta oficial IVEXI (#140A1F, #732EB8, #D6D65C, #FAFAFA) e o logotipo oficial
compacto da marca (streamer-vulgomaniaco-compact-512w.png) na lateral esquerda,
sem marcas d'água da guilda e sem ícones geométricos improvisados.
"""

import os
import shutil
import base64
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PANELS_PNG_DIR = os.path.join(BASE_DIR, 'brand', 'panels', 'png')
PANELS_SVG_DIR = os.path.join(BASE_DIR, 'brand', 'panels', 'svg')
SRC_PANELS_DIR = os.path.join(BASE_DIR, 'src', 'assets', 'panels')
COMPACT_LOGO_PATH = os.path.join(BASE_DIR, 'brand', 'logo', 'png', 'streamer-vulgomaniaco-compact-512w.png')
FONT_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'rajdhani-bold.ttf')
INTER_PATH = os.path.join(BASE_DIR, 'brand', 'fonts', 'inter-medium.ttf')

os.makedirs(PANELS_PNG_DIR, exist_ok=True)
os.makedirs(PANELS_SVG_DIR, exist_ok=True)
os.makedirs(SRC_PANELS_DIR, exist_ok=True)

PANELS = [
    {
        'id': 'painel-sobre',
        'title': 'SOBRE O CANAL',
        'subtitle': 'ALBION ONLINE • GAMEPLAY & RESENHA',
        'tag': 'STREAMER',
        'color': '#D6D65C',
        'desc_short': 'Sou o Vulgo! Foco em Albion Online, combate PvP e resenha.',
    },
    {
        'id': 'painel-regras',
        'title': 'REGRAS DO CHAT',
        'subtitle': 'BOA CONVIVÊNCIA & RESPEITO MÚTUO',
        'tag': 'DIRETRIZES',
        'color': '#FAFAFA',
        'desc_short': 'Respeito mútuo sempre. Zoeira saudável sem toxicidade.',
    },
    {
        'id': 'painel-discord-guilda',
        'title': 'DISCORD DO CANAL',
        'subtitle': 'COMUNIDADE & ALBION ONLINE',
        'tag': 'COMUNIDADE',
        'color': '#D6D65C',
        'desc_short': 'Ponto de encontro diário. Entre pra jogar junto no Albion!',
    },
    {
        'id': 'painel-setup',
        'title': 'SETUP DE STREAM',
        'subtitle': 'HARDWARE & PERIFÉRICOS GAMER',
        'tag': 'PERIFÉRICOS',
        'color': '#FAFAFA',
        'desc_short': 'Setup dedicado para stream 1080p60 e máximo rendimento.',
    },
    {
        'id': 'painel-pix-apoio',
        'title': 'PIX & APOIO',
        'subtitle': 'ALERTAS AO VIVO NA TRANSMISSÃO',
        'tag': 'FORTALECER',
        'color': '#D6D65C',
        'desc_short': 'Apoie o canal diretamente com alertas sonoros em live.',
    },
    {
        'id': 'painel-horarios',
        'title': 'HORÁRIOS DE LIVE',
        'subtitle': 'SEG A SEX 19H • FDS EVENTOS & RESENHA',
        'tag': 'AGENDA',
        'color': '#FAFAFA',
        'desc_short': 'Segunda a Sexta às 19h e eventos especiais no final de semana.',
    },
]

def generate_panel_png(panel):
    w, h = 640, 240  # 2x supersampling para qualidade nítida em 320x120
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Cores
    c_dark = (20, 10, 31, 255)       # #140A1F
    c_surface = (32, 14, 49, 255)     # #200E31
    c_purple = (115, 46, 184, 255)   # #732EB8
    c_neon = (214, 214, 92, 255)     # #D6D65C
    c_white = (250, 250, 250, 255)   # #FAFAFA
    c_muted = (168, 155, 184, 255)

    cut = 28  # chanfro 45 graus

    # 1. Fundo chanfrado com gradiente escuro profissional (SEM marcas d'água da guilda)
    body_points = [
        (cut, 0),
        (w - cut, 0),
        (w, cut),
        (w, h - cut),
        (w - cut, h),
        (cut, h),
        (0, h - cut),
        (0, cut)
    ]
    draw.polygon(body_points, fill=c_dark)

    # 2. Textura interna tática sutil
    for y in range(0, h, 20):
        draw.line([(0, y), (y, 0)], fill=(32, 16, 50, 120), width=1)
        draw.line([(w - y, h), (w, h - y)], fill=(32, 16, 50, 120), width=1)

    # 3. Moldura de borda chanfrada em Roxo Místico
    draw.polygon(body_points, outline=c_purple, width=3)

    # 4. Acentos de canto esportivos em Amarelo Neon
    c_len = 38
    # Top-left
    draw.line([(cut, 0), (cut + c_len, 0)], fill=c_neon, width=4)
    draw.line([(0, cut), (0, cut + c_len)], fill=c_neon, width=4)
    # Bottom-right
    draw.line([(w - cut - c_len, h), (w - cut, h)], fill=c_neon, width=4)
    draw.line([(w, h - cut - c_len), (w, h - cut)], fill=c_neon, width=4)

    # 5. Box Tático Lateral Esquerdo para o Logotipo Oficial Compacto
    box_w, box_h = 144, 180
    box_x, box_y = 36, (h - box_h) // 2
    b_cut = 16
    icon_box_points = [
        (box_x + b_cut, box_y),
        (box_x + box_w, box_y),
        (box_x + box_w, box_y + box_h),
        (box_x, box_y + box_h),
        (box_x, box_y + b_cut)
    ]
    draw.polygon(icon_box_points, fill=c_surface, outline=c_purple, width=2)
    # Linha neon de destaque no topo da moldura
    draw.line([(box_x + b_cut, box_y), (box_x + box_w, box_y)], fill=c_neon, width=3)

    # Tag de Identificação no topo do box
    try:
        font_tag = ImageFont.truetype(FONT_PATH, 16)
        font_title = ImageFont.truetype(FONT_PATH, 38)
        font_sub = ImageFont.truetype(FONT_PATH, 20)
        font_foot = ImageFont.truetype(INTER_PATH, 15)
    except:
        font_tag = font_title = font_sub = font_foot = ImageFont.load_default()

    tag_text = panel['tag']
    draw.text((box_x + 16, box_y + 14), tag_text, font=font_tag, fill=c_neon)
    # Ponto luminoso de status
    draw.ellipse([box_x + box_w - 22, box_y + 16, box_x + box_w - 14, box_y + 24], fill=c_neon)

    # 6. Aplicação Exclusiva do Logotipo Oficial Compacto (streamer-vulgomaniaco-compact-512w.png)
    if os.path.exists(COMPACT_LOGO_PATH):
        try:
            compact_logo = Image.open(COMPACT_LOGO_PATH).convert('RGBA')
            # Redimensiona mantendo a proporção para caber perfeitamente no box lateral
            target_logo_size = 114
            compact_logo = compact_logo.resize((target_logo_size, target_logo_size), Image.Resampling.LANCZOS)
            
            logo_x = box_x + (box_w - target_logo_size) // 2
            logo_y = box_y + 46  # Centralizado abaixo da barra de tag
            img.paste(compact_logo, (logo_x, logo_y), compact_logo)
        except Exception as e:
            print(f"Aviso ao colar logotipo compacto: {e}")

    # 7. Textos do Lado Direito
    text_x = box_x + box_w + 32

    # Título Principal (Rajdhani Bold 38px)
    title_text = panel['title']
    draw.text((text_x + 2, 44 + 2), title_text, font=font_title, fill=(10, 5, 18, 255))
    draw.text((text_x, 44), title_text, font=font_title, fill=c_white if panel['color'] == '#FAFAFA' else c_neon)

    # Subtítulo de Operação
    sub_text = panel['subtitle']
    draw.text((text_x, 102), sub_text, font=font_sub, fill=(225, 215, 240, 255))

    # Barra inferior de branding limpa e humanizada: VULGOMANIACO • ALBION ONLINE
    foot_text = "VULGOMANIACO  •  ALBION ONLINE"
    draw.line([(text_x, 142), (w - 40, 142)], fill=(75, 30, 120, 255), width=1)
    draw.text((text_x, 154), foot_text, font=font_foot, fill=c_muted)

    # Redimensiona para o tamanho final nativo de 320x120 px com antialiasing Lanczos
    final_img = img.resize((320, 120), Image.Resampling.LANCZOS)

    # Salva PNG mestre
    out_png = os.path.join(PANELS_PNG_DIR, f"{panel['id']}.png")
    final_img.save(out_png, 'PNG', optimize=True)

    # Copia para src/assets/panels
    src_png = os.path.join(SRC_PANELS_DIR, f"{panel['id']}.png")
    shutil.copyfile(out_png, src_png)

    # Salva versão SVG correspondente com o logotipo embutido
    out_svg = os.path.join(PANELS_SVG_DIR, f"{panel['id']}.svg")
    generate_panel_svg(panel, out_svg)
    src_svg = os.path.join(SRC_PANELS_DIR, f"{panel['id']}.svg")
    shutil.copyfile(out_svg, src_svg)

    print(f"✓ Painel gerado com sucesso: {panel['id']} (320x120 PNG + SVG)")

def generate_panel_svg(panel, filepath):
    title_fill = "#FAFAFA" if panel['color'] == '#FAFAFA' else "#D6D65C"
    
    # Converte o logo compacto oficial para base64 para embutir no SVG
    base64_logo = ""
    if os.path.exists(COMPACT_LOGO_PATH):
        try:
            with open(COMPACT_LOGO_PATH, "rb") as image_file:
                base64_logo = f"data:image/png;base64,{base64.b64encode(image_file.read()).decode('utf-8')}"
        except Exception:
            pass

    logo_image_tag = ""
    if base64_logo:
        # Box em 320x120: box_x=18, box_y=15, box_w=72, box_h=90, logo=57x57 centrado em x=25, y=38
        logo_image_tag = f'<image href="{base64_logo}" x="25" y="38" width="58" height="58" preserveAspectRatio="xMidYMid meet" />'

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140A1F" />
      <stop offset="100%" stop-color="#241037" />
    </linearGradient>
  </defs>

  <!-- Fundo Chanfrado 45 graus (Sem marcas d'água) -->
  <polygon points="14,0 306,0 320,14 320,106 306,120 14,120 0,106 0,14" fill="url(#bgGrad)" stroke="#732EB8" stroke-width="2" />

  <!-- Acentos Neon nos Cantos -->
  <line x1="14" y1="0" x2="34" y2="0" stroke="#D6D65C" stroke-width="3" />
  <line x1="0" y1="14" x2="0" y2="34" stroke="#D6D65C" stroke-width="3" />
  <line x1="286" y1="120" x2="306" y2="120" stroke="#D6D65C" stroke-width="3" />
  <line x1="320" y1="86" x2="320" y2="106" stroke="#D6D65C" stroke-width="3" />

  <!-- Box Lateral do Logotipo Oficial -->
  <polygon points="26,18 90,18 90,102 18,102 18,26" fill="#1b0c2a" stroke="#732EB8" stroke-width="1.5" />
  <line x1="26" y1="18" x2="90" y2="18" stroke="#D6D65C" stroke-width="2" />
  <text x="24" y="29" font-family="'Rajdhani', sans-serif" font-weight="700" font-size="8" fill="#D6D65C">{panel['tag']}</text>
  <circle cx="82" cy="27" r="2.5" fill="#D6D65C" />

  <!-- Logotipo Oficial Compacto da Marca (streamer-vulgomaniaco-compact-512w) -->
  {logo_image_tag}

  <!-- Textos -->
  <text x="104" y="44" font-family="'Rajdhani', sans-serif" font-weight="700" font-size="20" fill="{title_fill}" letter-spacing="1">
    {panel['title']}
  </text>
  <text x="104" y="68" font-family="'Rajdhani', sans-serif" font-weight="600" font-size="11" fill="#c4b8d6" letter-spacing="0.5">
    {panel['subtitle']}
  </text>
  <line x1="104" y1="82" x2="302" y2="82" stroke="#4b1e78" stroke-width="1" />
  <text x="104" y="98" font-family="'Inter', sans-serif" font-weight="500" font-size="8" fill="#a89bb8" letter-spacing="0.5">
    VULGOMANIACO  •  ALBION ONLINE
  </text>
</svg>"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(svg)

def main():
    print("Iniciando geração dos 6 painéis de perfil de canal com o logotipo compacto oficial...")
    for panel in PANELS:
        generate_panel_png(panel)
    print("✓ Todos os 6 painéis de perfil gerados com sucesso!")

if __name__ == '__main__':
    main()
