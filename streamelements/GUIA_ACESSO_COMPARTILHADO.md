# 🛡️ Guia Oficial: Configuração de Alertas no StreamElements via Acesso Compartilhado

Este guia explica como configurar os **Alertas Profissionais da Guilda IVEXI & VulgoManiaco** no **StreamElements** utilizando o recurso de **Acesso Compartilhado (*Shared Access / Channel Manager*)**, sem precisar de senhas ou chaves privadas do streamer.

---

## ⏱️ Tempo Estimado: Menos de 3 Minutos

---

## 📌 Passo 1: Acessar o Canal do Cliente no StreamElements

1. Acesse o site do [StreamElements](https://streamelements.com) e faça login com a **sua própria conta**.
2. No canto superior direito (ou esquerdo, dependendo do layout), clique no seu **Avatar / Nome de Usuário**.
3. Na lista suspensa de canais onde você tem acesso, selecione o canal do cliente:  
   👉 **`vulgoomaniaco`**
4. Você verá o painel de controle do canal dele carregado na tela.

---

## 🎨 Passo 2: Criar o Overlay de Alertas (1080p)

1. No menu lateral esquerdo, clique em **Streaming Tools** e depois em **Overlays** (ou *Minhas Sobreposições*).
2. Clique no botão azul **New Overlay** (*Nova Sobreposição*).
3. Na janela de resolução:
   - Selecione **1080p** (`1920x1080`).
   - Clique em **Start** (*Iniciar*).
4. No menu inferior ou central, clique em **(+) Add Widget** (*Adicionar Widget*).
5. Navegue até a categoria: **Static / Custom** > selecione **Custom Widget**.
6. No menu lateral esquerdo do widget, clique em **Open Editor** (*Abrir Editor*).

---

## 📋 Passo 3: Colar o Código do Pacote IVEXI nas 4 Abas

No editor do StreamElements, você verá 5 abas na parte superior. Você pode copiar o código direto dos arquivos na pasta `streamelements/` ou usar os botões de **Copiar com 1 Clique** no nosso [Painel de Controle](https://vulgomaniaco-stream-pack.vercel.app/control):

### 1. Aba **HTML**:
- Apague qualquer código existente nessa aba.
- Cole o conteúdo de:  
  👉 [`streamelements/widget.html`](file:///home/onlydoug/projetos/IVEXI-GUILDA-ALBION-ONLINE/streamelements/widget.html)

### 2. Aba **CSS**:
- Apague qualquer código existente nessa aba.
- Cole o conteúdo de:  
  👉 [`streamelements/widget.css`](file:///home/onlydoug/projetos/IVEXI-GUILDA-ALBION-ONLINE/streamelements/widget.css)

### 3. Aba **JS**:
- Apague qualquer código existente nessa aba.
- Cole o conteúdo de:  
  👉 [`streamelements/widget.js`](file:///home/onlydoug/projetos/IVEXI-GUILDA-ALBION-ONLINE/streamelements/widget.js)

### 4. Aba **FIELDS**:
- Apague qualquer código existente nessa aba.
- Cole o conteúdo de:  
  👉 [`streamelements/widget.json`](file:///home/onlydoug/projetos/IVEXI-GUILDA-ALBION-ONLINE/streamelements/widget.json)

### 5. Aba **DATA** (Opcional):
- Cole o conteúdo de:  
  👉 [`streamelements/widget_data.json`](file:///home/onlydoug/projetos/IVEXI-GUILDA-ALBION-ONLINE/streamelements/widget_data.json)

---

## 💾 Passo 4: Salvar e Testar no Editor

1. Clique no botão azul **Done** no canto inferior direito do editor.
2. Na tela do overlay, clique no botão **Save** no canto superior direito.
3. Dê um nome para o overlay, por exemplo:  
   👉 **`Alertas IVEXI - VulgoManiaco`**.
4. Teste imediatamente no próprio StreamElements:
   - No menu inferior, clique em **Emulate** (*Emular*).
   - Clique em **Follower Event** ou **Subscriber Event**.
   - O card tático da IVEXI aparecerá centralizado no topo com o Corvo Chibi Gamer, glow místico e o chime sonoro!

---

## 🎬 Passo 5: Vincular a URL no OBS Studio

1. No canto superior direito do editor do StreamElements, clique no ícone de corrente 🔗 **Copy Overlay URL** (*Copiar Link do Overlay*).
   - O link gerado será algo como: `https://streamelements.com/overlay/6705f12345...`
2. No **OBS Studio**:
   - Vá na cena **`🎮 02 - GAMEPLAY (Albion Online)`**.
   - Dê dois cliques na fonte de navegador: **`🔔 Camada de Alertas OBS`**.
   - Substitua a URL pela URL copiada do StreamElements.
   - Certifique-se de que a resolução está em **Largura: 1920** e **Altura: 1080**.
   - Marque a caixa: **"Controlar áudio via OBS"** (*Control audio via OBS*).
   - Clique em **OK**.
3. Repita o passo para as outras cenas se desejar alertas ativos nelas (Starting, Just Chatting, etc.).

---

## 💎 Vantagens Desta Configuração:
* **Fidelidade Total**: 100% alinhado à identidade visual da guilda IVEXI e ao canal do VulgoManiaco.
* **Zona Segura em Albion**: Centralizado no topo (`y: 70px`), mantendo a visão do combate livre e sem cobrir a Facecam ou o Minimapa.
* **Zero Risco de Segurança**: Nenhuma senha ou dado confidencial é exposto.
* **Fila Anti-Sobreposição**: Se vários eventos ocorrerem ao mesmo tempo, são exibidos um a um ordenadamente.
