# Mascote Oficial: Corvo Chibi Guerreiro (IVEXI)

Este diretório armazena os ativos oficiais e as diretrizes de aplicação do mascote da **IVEXI**, guilda de Albion Online (Servidor Américas).

---

## 1. Conceito e Identidade

O mascote da IVEXI é um **Corvo Chibi Guerreiro**, projetado na estética **"O Caos Neon"** da guilda:
- **Dualidade Visual:** Combina a bravura e agressividade do PVP na Blackzone (armadura completa de placas medievais, espada e escudo de combate) com o carisma e acolhimento da comunidade (proporções chibi, expressão enérgica e olhar resoluto).
- **Escudo com Emblema:** Porta com orgulho o escudo de cavaleiro exibindo o brasão oficial da IVEXI com bordas iluminadas em roxo neon.
- **Contorno Caos Neon:** Finalizado com iluminação de contorno (rim light) em verde-limão vibrante (`#B8FF00` / `#C5FF2A`) e reflexos violeta (`#9D4EDD`), garantindo contraste absoluto sobre fundos escuros e gameplays de Albion.

---

## 2. Inventário de Arquivos

| Arquivo | Formato | Dimensões | Descrição / Aplicação |
|---|---|---|---|
| `mascote-corvo-puxando-overlay.png` | PNG (32-bit RGBA) | 886 x 869 | **Asset Master transparente.** Corvo chibi em pose de esforço puxando borda lateral. Ideal para OBS, overlays, stickers e thumbnails. |
| `mascote-corvo-chibi-sticker.jpg` | JPG | 1024 x 1024 | Ilustração master isolada sobre fundo escuro para edição e derivações. |
| `mascote-corvo-chibi-overlay-card.jpg` | JPG | 1024 x 1024 | Variação com integração visual ao card de recrutamento `TAC-HUD`. |
| `overlay-corvo-chibi-16x9.jpg` | JPG | 1792 x 1008 | Composição 16:9 ilustrada completa no cenário de batalha com vulcão e dragão. |

---

## 3. Diretrizes de Aplicação

### A. Stream Overlay (OBS Studio / Twitch / YouTube)
- **Posicionamento:** Ancorado na borda externa esquerda do HUD lateral direito, na altura do entalhe de recrutamento (entre $Y = 220\text{px}$ e $Y = 520\text{px}$ em 1080p).
- **Escala Recomendada:** Altura entre $260\text{px}$ e $285\text{px}$ no layout Full HD ($1920 \times 1080$), preservando a visão livre do centro da tela para o combate.
- **Efeito Visual:** Drop shadow suave (`rgba(0, 0, 0, 0.7)`) combinado com glow roxo (`rgba(115, 46, 184, 0.4)`).
- **Animação (CSS):** Movimento suave de oscilação vertical (*breathing/pulling float* de 4 segundos) simulando o esforço de puxar o painel para dentro da tela.

### B. Mídias Sociais & Miniaturas (Thumbnails)
- O mascote pode ser aplicado no canto inferior esquerdo ou direito das capas de vídeo, reforçando a identidade visual do bando sem competir com o título do vídeo.
- Pode ser utilizado em figurinhas de WhatsApp e emojis do Discord para saudações, vitórias no CTA e chamadas de recrutamento.

---

## 4. O que Evitar
- ❌ **Não distorcer as proporções:** Não alterar o aspect ratio (largura x altura) do mascote.
- ❌ **Não remover o brasão do escudo:** O emblema IVEXI deve permanecer legível.
- ❌ **Não usar sobreposições gigantes:** O mascote é um elemento de personalidade; ele não deve obstruir a barra de habilidades nem os pontos de vida do jogador.
