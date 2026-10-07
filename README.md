# 🎮 VulgoManiaco — Albion Online Stream Pack

Pacote oficial e profissional de Overlays, Cenas, Alertas e Painéis para lives de **Albion Online** do canal **VulgoManiaco**, projetado para **OBS Studio** com design system e-sports dark (#140A1F, #732EB8, #D6D65C, #FAFAFA), facecam 16:9 pixel-perfect e proteção tática **Anti-Ghost (Anti-Snipe)** permanente no minimapa.

---

## 🚀 Cenas Pré-Configuradas (1080p @ 60 FPS)

| Cena OBS | Rota Web | Descrição |
| :--- | :--- | :--- |
| **⏳ 01 - ABERTURA** | `/scenes/starting` | Contagem regressiva, avisos de redes e som de espera |
| **🎮 02 - GAMEPLAY** | `/overlay/gameplay` | Moldura de Webcam 16:9 + Escudo Anti-Ghost sobre o minimapa |
| **☕ 03 - INTERVALO** | `/scenes/brb` | Pausa tática rápida com chat integrado e mascote oficial |
| **💬 04 - JUST CHATTING** | `/scenes/chatting` | Câmera ampla, bate-papo e resenha com o clã |
| **🛑 05 - ENCERRAMENTO** | `/scenes/ending` | Agradecimentos, créditos finais e redes sociais |
| **🔔 ALERTAS OBS** | `/alerts` | Alertas dinâmicos com animações neon (Follow, Sub, Pix, Raid) |
| **🎛️ CONTROLE STREAMER** | `/control` | Painel web interativo para disparo de alertas e testes |
| **🎨 PAINÉIS 320px** | `/panels` | 6 painéis para perfil da Twitch/Kick prontos para download |

---

## 🛡️ Proteção Tática Anti-Ghost (Anti-Snipe)
- **Sempre Ativo por Padrão:** Desenvolvido especificamente para Albion Online. O escudo cobre com precisão cirúrgica as coordenadas do minimapa no **canto inferior direito** (`x: 1616, y: 776`, `272 × 272 px`), impedindo stream snipe em zonas PvP (Black Zone e ZvZ).
- Inclui o **Logotipo Oficial da Marca** e o **QR Code oficial do Discord do canal** com link direto para a comunidade.

---

## 📦 Como Importar no OBS Studio com 1 Clique

1. Baixe o arquivo de coleção de cenas:
   - `obs/vulgomaniaco-albion-scene-collection.json` (ou diretamente pelo Painel de Controle em `/control`).
2. Abra o **OBS Studio** > menu superior **Coleção de Cenas** > **Importar**.
3. Selecione o arquivo baixado.
4. Clique em **Coleção de Cenas** e ative **VulgoManiaco - Albion Online Stream Pack**.
5. Dê duplo clique na webcam nas cenas 02 e 04 para selecionar a sua câmera física!

---

## 🛠️ Tecnologias
- **React 18 + TypeScript + Vite**
- **Tailwind CSS** com design tokens customizados
- **BroadcastChannel API** para sincronização em tempo real
- **Vitest + React Testing Library** para testes automatizados
- **Deploy Vercel** (CDN global com 100% de disponibilidade)
