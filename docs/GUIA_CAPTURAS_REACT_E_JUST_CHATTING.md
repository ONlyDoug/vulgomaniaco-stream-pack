# 🎬 Guia de Capturas Perfeitas: Just Chatting & React / VOD Review

Este guia ensina a configuração detalhada de captura de janela, webcam e áudio para as cenas **`🎬 06 - REACT & VOD REVIEW`** e **`💬 04 - JUST CHATTING`** do canal **VulgoManiaco**.

---

## 🎬 1. Cena `06 - REACT & VOD REVIEW`

O objetivo desta cena é um layout no estilo **Cinema 16:9**: uma tela ampla para assistir a lutas de *Albion Online* (ZvZ, ganks, VODs) e vídeos do YouTube, com a câmera do streamer e o chat da Twitch integrados à direita.

### 📐 Mapa de Fontes e Camadas (De Cima para Baixo):

No painel de **Fontes** do OBS, organize exatamente nesta ordem:

```text
▲ 1. 🔔 Camada de Alertas OBS (Navegador: 1920x1080)
│  2. 🎬 HUD React & VOD Review (Navegador: 1920x1080)
│  3. 💬 Chat StreamElements / Twitch (Navegador: 420x500)
│  4. 📷 Webcam do Streamer (Adicionar Existente: 440x248)
▼ 5. 🎬 Captura de Conteúdo / Vídeo (Janela: 1380x776)
```

---

### Passo a Passo das Capturas da Cena de React:

#### A. Captura do Vídeo / YouTube / Review (Área Esquerda: 1380 × 776)
1. No OBS, na caixa de Fontes, clique em **`+`** > **Captura de Janela** (*Window Capture*).
2. Nomeie como: **`🎬 Captura de Vídeo (Navegador / YouTube)`**.
3. Nas propriedades:
   - **Janela**: Selecione o seu navegador com o vídeo aberto (ex: `chrome.exe` ou `msedge.exe`).
   - **Método de Captura**: Selecione **"Windows 10 (1903 e superior)"** (*evita tela preta e captura acelerada por GPU*).
   - **Cursor**: Marque `[x] Capturar cursor` (útil para apontar detalhes nas lutas).
4. **Enquadramento Pixel-Perfect**:
   - Pressione `Ctrl + E` na fonte e defina:
     - **Posição**: `X: 32`, `Y: 86`
     - **Tamanho dos limites**: `1380 × 776`
     - **Tipo de limite**: *Ajustar aos limites internos*.
5. 💡 **Dica Pro (Remover abas do navegador)**:
   - Se o navegador mostrar as abas superiores na live, segure a tecla **`ALT`** no teclado e arraste a borda vermelha superior no OBS para **recortar (crop)** a barra de abas e URL!

#### B. Câmera Lateral (Canto Superior Direito: 440 × 248)
1. Clique em **`+`** > **Dispositivo de Captura de Vídeo**.
2. **IMPORTANTE**: Escolha **"Adicionar Existente"** (*Add Existing*) e selecione a sua webcam que já foi configurada na Gameplay.  
   *(Isso evita conflito de driver da câmera).*
3. Pressione `Ctrl + E` na fonte:
   - **Posição**: `X: 1448`, `Y: 86`
   - **Tamanho dos limites**: `440 × 248`
   - **Tipo de limite**: *Ajustar aos limites internos*.

#### C. Chat da Live (Canto Inferior Direito: 420 × 500)
1. Clique em **`+`** > **Navegador** (*Browser*).
2. Nomeie como **`💬 Chat React`**.
3. Cole a URL do StreamElements (ou Twitch Popout).
4. Dimensões: Largura **`420`**, Altura **`500`**.
5. Posição: `X: 1458`, `Y: 486`.

---

## 💬 2. Cena `04 - JUST CHATTING`

O objetivo desta cena é valorizar a imagem da câmera em tamanho grande para conversa com o chat, abertura de reuniões de guilda e resenhas táticas.

### 📐 Mapa de Fontes e Camadas (De Cima para Baixo):

```text
▲ 1. 🔔 Camada de Alertas OBS (Navegador: 1920x1080)
│  2. 💬 HUD Just Chatting (Navegador: 1920x1080)
│  3. 💬 Chat StreamElements / Twitch (Navegador: 550x660)
▼ 4. 📷 Webcam do Streamer (Adicionar Existente: 1224x640)
```

---

### Passo a Passo das Capturas da Cena de Just Chatting:

#### A. Câmera Principal Grande (Área Esquerda: 1224 × 640)
1. Clique em **`+`** > **Dispositivo de Captura de Vídeo**.
2. Selecione **"Adicionar Existente"** > selecione sua webcam.
3. Pressione `Ctrl + E`:
   - **Posição**: `X: 40`, `Y: 106`
   - **Tamanho dos limites**: `1224 × 640`
   - **Tipo de limite**: *Ajustar aos limites internos*.
4. A câmera ficará perfeitamente abraçada pela moldura tática e pelo pedestal `VULGOMANIACO • AO VIVO`.

#### B. Chat da Transmissão (Coluna Direita: 550 × 660)
1. Clique em **`+`** > **Navegador** (*Browser*).
2. Nomeie como **`💬 Chat Just Chatting`**.
3. Dimensões: Largura **`550`**, Altura **`660`**.
4. Posição: `X: 1308`, `Y: 175`.

---

## 🔊 3. Como Configurar o Áudio dos Vídeos de React

Para que o streamer e a live ouçam o vídeo com som cristalino e sem eco de microfone:

1. No OBS Studio, vá em **Configurações** > **Áudio**.
2. Em **Dispositivos de Áudio Globais**:
   - **Áudio do Desktop**: Selecione o seu fone de ouvido padrão (ex: *Headset Realtek / Fone USB*).
3. Todo som reproduzido no Chrome/YouTube sairá automaticamente na barra **Desktop Audio** do mixer do OBS.
4. **Volume ideal**: Deixe a barra de áudio do Desktop oscilando na faixa amarela (entre `-15 dB` e `-10 dB`) para que o som do vídeo nunca cubra a sua voz no microfone.

---

## 🛡️ Checklist Anti-Erros (Padrão Ouro):

- [x] O HUD está **ACIMA** da webcam para exibir as cantoneiras e o pedestal de nome?
- [x] O método de captura da janela está em **Windows 10 (1903 e superior)** para não dar tela preta?
- [x] A câmera foi adicionada como **"Adicionar Existente"** para não travar?
- [x] O chat está alinhado na moldura tática direita?
