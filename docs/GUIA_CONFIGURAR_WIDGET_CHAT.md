# 💬 Guia Prático: Como Configurar o Widget de Chat no OBS Studio

Este guia ensina o passo a passo exato para posicionar e exibir o chat da Twitch nas cenas **`🎬 06 - REACT & VOD REVIEW`** e **`💬 04 - JUST CHATTING`** do canal **VulgoManiaco** (`twitch.tv/vulgoomaniaco`).

---

## 🎯 Visão Geral das Medidas no OBS (Pixel-Perfect)

| Cena | Posição no OBS (X, Y) | Tamanho da Fonte (Largura × Altura) |
| :--- | :--- | :--- |
| **`🎬 06 - REACT & VOD REVIEW`** | `X: 1458`, `Y: 486` | **`420 × 500 px`** (encaixe exato na moldura direita) |
| **`💬 04 - JUST CHATTING`** | `X: 1280`, `Y: 110` | **`600 × 800 px`** (coluna inteira da direita) |

---

## 🚀 Método 1: Chat Popout Nativo da Twitch (Mais Fácil & Sem Cadastro)

Este método usa a própria janela de chat da Twitch com um CSS personalizado transparente e limpo.

### 1. No OBS Studio
1. Selecione a cena **`🎬 06 - REACT & VOD REVIEW`**.
2. Na caixa de **Fontes** (*Sources*), clique no botão **`+`** e selecione **Navegador** (*Browser*).
3. Digite o nome: **`💬 Chat Twitch (React)`** e clique em **OK**.

### 2. Configurações da Fonte de Navegador
- **URL**:
  ```text
  https://www.twitch.tv/popout/vulgoomaniaco/chat?popout=
  ```
- **Largura (Width)**: `420`
- **Altura (Height)**: `500`
- **FPS**: `60`
- Marque as caixas:
  - `[x] Desativar fonte quando não visível`
  - `[x] Reiniciar navegador quando a cena se tornar ativa`

### 3. CSS Personalizado (Fundo Transparente & Estilo IVEXI)
No campo **CSS Personalizado** (*Custom CSS*), apague todo o conteúdo padrão do OBS e cole o código abaixo:

```css
/* Fundo 100% transparente e tipografia limpa */
body {
  background-color: transparent !important;
  margin: 0px auto;
  overflow: hidden !important;
  color: #FAFAFA !important;
  font-family: 'Inter', -apple-system, sans-serif !important;
}

/* Oculta áreas desnecessárias para a live (cabeçalho, barra de digitação e pontos) */
.chat-room, .stream-chat {
  background: transparent !important;
}

.chat-input,
.stream-chat-header,
.community-points-summary,
.channel-leaderboard {
  display: none !important;
}

/* Formatação e legibilidade das mensagens na tela */
.chat-line__message {
  padding: 4px 6px !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9) !important;
  font-size: 14px !important;
  line-height: 1.35 !important;
}

.chat-author__display-name {
  font-weight: 700 !important;
}
```

### 4. Ajustar a Posição na Tela
- No OBS, arraste a caixa vermelha do chat para dentro da moldura **`CHAT DA LIVE`** (canto inferior direito).
- Ou clique com botão direito na fonte > **Transformar** > **Editar Transformação** e defina:
  - Posição: `X: 1458`, `Y: 486`
  - Tamanho: `420 × 500`

---

## 🎨 Método 2: StreamElements Chatbox (Com Animações & Desaparecimento de Mensagens)

Se você preferir que as mensagens desapareçam automaticamente após 30 segundos (fade out) ou usar temas com animações:

1. Acesse o **[Dashboard do StreamElements](https://streamelements.com)** conectado com a Twitch do canal **vulgoomaniaco**.
2. No menu lateral, acesse **Streaming Tools** > **Overlays**.
3. Clique em **New Overlay** (resolução 1080p).
4. Clique no botão azul **`+` (Add Widget)** > **Stream Tools** > **Your Stream's Chat**.
5. No menu lateral do widget de chat:
   - **Theme**: Selecione *Dark* ou *Custom*.
   - **Font**: Selecione *Rajdhani* ou *Inter*.
   - **Message Fade**: Ative se quiser que mensagens sumam após 15s ou 30s.
   - **Background**: Garanta que o fundo esteja com opacidade zero (transparente).
6. Clique em **Save** no canto superior direito (nomeie como `Chat React IVEXI`).
7. Clique no botão de corrente 🔗 (**Copy Overlay URL**).
8. No OBS Studio:
   - Adicione uma fonte de **Navegador** (*Browser*).
   - Cole a URL copiada do StreamElements.
   - Largura: `420`, Altura: `500`.
   - Posicione em `X: 1458`, `Y: 486`.

---

## ⚡ Atalho Rápido no Painel de Controle Web
Você também pode copiar os links e o CSS com **1 clique** diretamente pelo nosso painel:
👉 **[https://vulgomaniaco-stream-pack.vercel.app/control](https://vulgomaniaco-stream-pack.vercel.app/control)**
