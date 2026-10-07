# 🎬 Guia de Importação da Coleção de Cenas no OBS Studio

Este pacote inclui a configuração completa de cenas do **VulgoManiaco - Albion Online Stream Pack** pronta para importação direta no **OBS Studio**.

---

## 🚀 Passo a Passo: Importação no OBS Studio

### 1. Obtenha o arquivo JSON de Cenas
Você pode utilizar o arquivo local incluído no projeto:
- `obs/vulgomaniaco-albion-scene-collection.json`

Ou fazer o download com 1 clique direto pelo **Painel de Controle** da stream em:
- `http://localhost:5173/control` (com a opção de definir seu IP de rede ou URL personalizada).

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
3. O OBS carregará automaticamente todas as **5 cenas profissionais** e suas respectivas fontes de navegador e camadas!

---

## 🎨 Cenas Pré-Configuradas e Estrutura

| Cena | Descrição | Fontes Inclusas |
| :--- | :--- | :--- |
| **`⏳ 01 - ABERTURA (Starting Soon)`** | Tela de início da live com cronômetro regressivo e música de fundo | Navegador: `/scenes/starting` (1080p, 60fps) |
| **`🎮 02 - GAMEPLAY (Albion Online)`** | Cena principal de gameplay com HUD, minimapa e facecam | • **Alertas de Stream**: `/alerts`<br>• **Overlay Gameplay**: `/overlay/gameplay`<br>• **Webcam**: Enquadramento 16:9 posicionado e calibrado<br>• **Captura de Jogo**: Albion Online |
| **`☕ 03 - INTERVALO (Pausa / BRB)`** | Tela de pausa rápida (café/banheiro) com chat e aviso interativo | Navegador: `/scenes/brb` (1080p, 60fps) |
| **`💬 04 - JUST CHATTING`** | Cena de conversa com o chat, reunião de guilda e resenha | • Navegador: `/scenes/chatting`<br>• **Webcam**: Enquadramento 16:9 expandido e calibrado |
| **`🛑 05 - ENCERRAMENTO (Ending Stream)`** | Tela final de agradecimento e redes sociais | Navegador: `/scenes/ending` (1080p, 60fps) |

---

## ⚙️ Ajustes Finais Recomendados (Apenas 2 cliques!)

Após importar a coleção, faça apenas a seleção dos seus dispositivos físicos no OBS:

### 1. Vincular sua Câmera (Webcam)
1. Clique na cena **`🎮 02 - GAMEPLAY (Albion Online)`**.
2. Na lista de Fontes, dê **duplo clique** em **`Webcam Facecam (Câmera 16:9)`**.
3. No campo **Dispositivo**, selecione a sua câmera real (ex: *Logitech C920, Elgato Cam Link, DroidCam, etc.*).
4. Clique em **OK**.
5. *(Opcional)* Repita o mesmo procedimento na cena **`💬 04 - JUST CHATTING`** na fonte **`Webcam Just Chatting (Câmera 16:9)`**.

### 2. Vincular o Jogo (Albion Online)
1. Na cena **`🎮 02 - GAMEPLAY (Albion Online)`**, dê duplo clique em **`Captura de Jogo (Albion Online)`**.
2. Escolha **Capturar janela específica** e selecione o executável do Albion Online (ou deixe em captura em tela cheia).
3. Clique em **OK**.

---

## 🌐 Usando em Outro Computador ou Rede Local (Tailscale / Wi-Fi)

Caso o OBS esteja rodando em um computador diferente daquele que executa o servidor web:
1. Abra o painel de controle do pacote: `http://<SEU-IP>:5173/control`.
2. No card **Exportar Coleção de Cenas OBS**, digite a URL base da sua rede (ex: `http://192.168.1.100:5173` ou seu IP Tailscale).
3. Clique em **Baixar Coleção OBS (.json)**.
4. O arquivo gerado já virá com todas as URLs dos navegadores apontando para o seu IP remoto!
