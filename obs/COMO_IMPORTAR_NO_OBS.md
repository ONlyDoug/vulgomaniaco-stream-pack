# 🎬 Guia de Importação da Coleção de Cenas no OBS Studio

Este pacote inclui a configuração completa de cenas do **VulgoManiaco - Albion Online Stream Pack** pronta para importação direta no **OBS Studio**.

> 🌐 **Hospedagem Oficial em Nuvem (Vercel):**  
> Todas as fontes de navegador já estão configuradas para carregar a partir do link oficial:  
> 👉 **`https://vulgomaniaco-stream-pack.vercel.app`**  
> O cliente **NÃO precisa rodar nenhum servidor local**! Basta importar e usar.

---

## 🚀 Passo a Passo: Importação no OBS Studio

### 1. Obtenha o arquivo JSON de Cenas
Você pode utilizar o arquivo local incluído no projeto:
- `obs/vulgomaniaco-albion-scene-collection.json`

Ou fazer o download com 1 clique direto pelo **Painel de Controle Oficial** em:
- 👉 [https://vulgomaniaco-stream-pack.vercel.app/control](https://vulgomaniaco-stream-pack.vercel.app/control)

---

### 2. Importar no OBS Studio
1. Abra o **OBS Studio** no computador da stream.
2. No menu superior, clique em **Coleção de Cenas** (*Scene Collection*).
3. Selecione a opção **Importar** (*Import*).
4. Na janela do assistente de importação:
   - Clique nos três pontos `...` (Procurar) na linha de seleção.
   - Navegue até a pasta e selecione o arquivo:  
     `vulgomaniaco-albion-scene-collection.json`.
5. Clique no botão **Importar** (*Import*).

---

### 3. Ativar a Coleção de Cenas
1. No menu superior, clique novamente em **Coleção de Cenas**.
2. Clique sobre o nome da coleção recém-importada:  
   👉 **`VulgoManiaco - Albion Online Stream Pack`**.
3. O OBS carregará automaticamente todas as **5 cenas profissionais**, overlays, alertas e proteção anti-ghost direto da nuvem!

---

## 🎨 Cenas Pré-Configuradas e Estrutura (1080p @ 60 FPS)

| Cena | Descrição | Fontes Inclusas (Conectadas na Nuvem) |
| :--- | :--- | :--- |
| **`⏳ 01 - ABERTURA (Starting Soon)`** | Tela de início da live com cronômetro regressivo e redes | Navegador: `https://vulgomaniaco-stream-pack.vercel.app/scenes/starting` |
| **`🎮 02 - GAMEPLAY (Albion Online)`** | Cena principal com Facecam 16:9 e **Anti-Ghost SEMPRE ATIVO no minimapa** | • **Alertas de Stream**: `/alerts`<br>• **Overlay Gameplay**: `/overlay/gameplay`<br>• **Webcam**: Posição `x:28, y:706` (388×244 px)<br>• **Captura de Jogo**: Albion Online |
| **`☕ 03 - INTERVALO (Pausa / BRB)`** | Tela de pausa rápida com chat interativo e mascote oficial | Navegador: `https://vulgomaniaco-stream-pack.vercel.app/scenes/brb` |
| **`💬 04 - JUST CHATTING`** | Cena de conversa com o chat, reunião e resenha | • Navegador: `https://vulgomaniaco-stream-pack.vercel.app/scenes/chatting`<br>• **Webcam**: Enquadramento 16:9 expandido (`1224×640 px`) |
| **`🛑 05 - ENCERRAMENTO (Ending Stream)`** | Tela final de agradecimento e redes sociais | Navegador: `https://vulgomaniaco-stream-pack.vercel.app/scenes/ending` |

---

## ⚙️ Ajustes Finais (Apenas 2 cliques no OBS!)

Após importar a coleção, faça apenas a seleção dos seus dispositivos físicos no OBS:

### 1. Vincular sua Câmera (Webcam)
1. Clique na cena **`🎮 02 - GAMEPLAY (Albion Online)`**.
2. Na lista de Fontes, dê **duplo clique** em **`📷 Webcam do Streamer (Facecam Gameplay)`**.
3. No campo **Dispositivo**, selecione a sua câmera real (ex: *Logitech C920, Elgato Cam Link, etc.*).
4. Clique em **OK**.
5. *(Opcional)* Repita na cena **`💬 04 - JUST CHATTING`** na fonte de webcam grande.

### 2. Vincular o Jogo (Albion Online)
1. Na cena **`🎮 02 - GAMEPLAY (Albion Online)`**, dê duplo clique em **`⚔️ Captura de Jogo (Albion Online)`**.
2. Escolha **Capturar janela específica** e selecione o executável do Albion Online (ou captura de tela).
3. Clique em **OK**.

### 3. Alertas Oficiais da Live (StreamElements)
A coleção já vem com a fonte de navegador **`🔔 Camada de Alertas OBS`** configurada em `1920x1080`:
- **Opção A (Mais rápida via Painel)**: Deixe a URL padrão e cole o link do seu overlay do StreamElements no [Painel de Controle](https://vulgomaniaco-stream-pack.vercel.app/control). A rota `/alerts` renderiza o widget automaticamente.
- **Opção B (Direto no OBS)**: Dê duplo clique em **`🔔 Camada de Alertas OBS`**, cole a URL copiada do StreamElements (`https://streamelements.com/overlay/...`) e marque **"Controlar áudio via OBS"**.
