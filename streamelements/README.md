# StreamElements Custom Widget • Canal VulgoManiaco (Guilda IVEXI)

Este pacote contém os arquivos copilados para o **Custom Widget** no **StreamElements**, cobrindo 100% dos eventos da transmissão com áudio equalizado em -14 LUFS e design tático.

---

## 📁 Estrutura de Arquivos

* `alerts/widget.html`: Estrutura HTML do card com o Corvo Chibi Gamer oficial.
* `alerts/widget.css`: Folha de estilos com chanfros táticos, neon IVEXI e animações de entrada/saída.
* `alerts/widget.js`: Lógica completa de eventos (`follower-latest`, `subscriber-latest`, `tip-latest`, `cheer-latest`, `raid-latest`, `hypetrain-latest`) com fila sequencial e sintetizador sonoro procedural nativo.
* `alerts/fields.json`: Formulário de customização visual do painel StreamElements (duração, volume, som customizado).
* `alerts/data.json`: Valores padrão de configuração.

---

## ⚡ Como Instalar no StreamElements (60 segundos)

1. Acesse o **[StreamElements Dashboard](https://streamelements.com/)**.
2. Vá em **Streaming Tools** > **Overlays** e abra seu overlay (ou crie um novo em `1080p`).
3. Clique em **Add Widget (+)** > **STATIC / CUSTOM** > **Custom Widget**.
4. No menu à esquerda, abra o **Editor de Código** (Open Editor).
5. Cole o conteúdo de cada arquivo em sua respectiva aba:
   * Cole `widget.html` na aba **HTML**
   * Cole `widget.css` na aba **CSS**
   * Cole `widget.js` na aba **JS**
   * Cole `fields.json` na aba **FIELDS**
   * Cole `data.json` na aba **DATA**
6. Clique em **Done** e depois em **Save** no topo direito.

---

## 🎯 Teste Rápido

Você pode emular todos os 14 alertas do checklist diretamente pelo menu **Emulate** do StreamElements ou pelo painel web do projeto em:
`https://vulgomaniaco-stream-pack.vercel.app/control`
