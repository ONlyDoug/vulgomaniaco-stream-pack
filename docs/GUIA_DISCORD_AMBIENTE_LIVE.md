# 🎙️ Guia Oficial: Ambiente de Live no Discord (Guilda IVEXI)

> **Canal:** VulgoManiaco | **Comunidade:** Guilda IVEXI — Albion Online  
> **Link do Servidor:** [discord.gg/s246XdGp7q](https://discord.gg/s246XdGp7q)

Este guia documenta o padrão oficial para configurar o ambiente de transmissão ao vivo no Discord da Guilda IVEXI, garantindo que a **call da live fique 100% blindada contra invasões** e que **apenas quem o streamer puxar consiga falar na transmissão**, além de fornecer chat de bate-papo, área de clipes e integração visual no OBS Studio.

---

## 1. Estrutura Visual da Categoria

Seguindo rigorosamente a estética do servidor da guilda (como `╭── ✦ ⚡ ENERGIA E REGEAR`, `# 🎒 | solicitar-regear` e `# 🏦 | gestao-regear`), a categoria da live é nomeada e organizada assim:

```text
╭── ✦ 🎙️ QG DA LIVE
│
├── 💬 | bate-papo              (Texto • Chat aberto com slowmode 5s para os espectadores)
├── 🎬 | clips-e-momentos        (Texto • Envio de links de clipes, jogadas e memes da live)
│
├── 🔊 🔒 🔴 | call-da-live     (Voz   • Restrita: só entra quem o streamer puxa da espera)
└── 🔊 ⏳ | sala-de-espera       (Voz   • Fila: membros entram e aguardam com microfone mutado)
```

---

## 2. Como Funciona a Dinâmica da Call

```text
┌──────────────────────┐         Streamer Arrasta         ┌──────────────────────┐
│  🔊 ⏳ | sala-de-espera│   ──────────────────────────>   │🔊 🔒 🔴 | call-da-live │
│ (Membros entram e    │                                  │ (Bloqueada para todos│
│  aguardam silenciados│   <──────────────────────────   │  Só entra quem for   │
└──────────────────────┘          Devolve à fila          │  puxado pelo streamer│
                                                          └──────────┬───────────┘
                                                                     │
                                                          Streamkit Overlay no OBS
                                                                     ▼
                                                          ┌──────────────────────┐
                                                          │   🖥️ LIVE TWITCH/KICK │
                                                          │   Avatares com neon  │
                                                          │   acendendo na tela  │
                                                          └──────────────────────┘
```

1. **A Fila:** Membros da guilda ou convidados que queiram participar da transmissão entram em `🔊 ⏳ | sala-de-espera`. O canal é configurado para que ninguém consiga falar enquanto aguarda, mantendo a fila em total silêncio.
2. **O Puxão:** Quando o streamer quiser conversar com alguém, ele simplesmente clica no nome do usuário na sala de espera e o arrasta para dentro de `🔊 🔒 🔴 | call-da-live`.
3. **A Participação:** Assim que a pessoa é colocada na call, o microfone dela funciona imediatamente na live.
4. **O Encerramento:** Ao terminar a participação, o streamer arrasta a pessoa de volta para a sala de espera ou a desconecta da call.

---

## 3. Matriz de Permissões Passo a Passo

### Canal de Voz: `🔊 🔒 🔴 | call-da-live`
*Objetivo: Ninguém entra sozinho; apenas o streamer tem a chave para colocar pessoas na call.*

1. Clique com o botão direito no canal `🔊 🔒 🔴 | call-da-live` > **Editar Canal** > **Permissões**.
2. No cargo **`@everyone`**:
   - **Ver Canal:** `✅ Permitido` *(para os membros saberem que a call existe e quem está nela)*
   - **Conectar:** `❌ NEGADO` *(impede qualquer pessoa de clicar e entrar)*
   - **Falar:** `✅ Permitido` *(permite que a pessoa fale assim que for puxada pelo streamer)*
   - **Compartilhar Vídeo / Tela:** `❌ Negado` *(evita que convidados transmitam tela indevida)*
   - **Mover Membros:** `❌ Negado`
3. No cargo do **`👑 Streamer`** (ou `🛡️ Moderador`):
   - **Conectar:** `✅ Permitido`
   - **Mover Membros:** `✅ PERMITIDO` *(permissão chave que permite puxar e devolver usuários)*
   - **Voz Prioritária:** `✅ Permitido` *(diminui o volume dos convidados quando o streamer fala)*
   - **Silenciar Membros:** `✅ Permitido`
   - **Bitrate do Canal:** Ajuste para **96 kbps** ou **128 kbps** para qualidade de áudio cristalina.

---

### Canal de Voz: `🔊 ⏳ | sala-de-espera`
*Objetivo: Sala de espera organizada e sem barulho.*

1. Clique com o botão direito no canal `🔊 ⏳ | sala-de-espera` > **Editar Canal** > **Permissões**.
2. No cargo **`@everyone`**:
   - **Ver Canal:** `✅ Permitido`
   - **Conectar:** `✅ PERMITIDO` *(qualquer pessoa pode entrar para esperar sua vez)*
   - **Falar:** `❌ NEGADO` *(todos ficam mutados por padrão enquanto aguardam)*
   - **Compartilhar Vídeo / Tela:** `❌ Negado`
3. No cargo do **`👑 Streamer`** / `🛡️ Moderador`:
   - Todas as permissões normais ativadas.

---

### Canais de Texto

#### `# 💬 | bate-papo`
- **Ver Canal:** `✅ Permitido` para `@everyone`
- **Enviar Mensagens:** `✅ Permitido` para `@everyone`
- **Modo Lento (Slowmode):** Ativar em **5 segundos** (Configurações do Canal > Geral > Modo Lento: 5s). Isso impede que floods ou spams atrapalhem a leitura do chat durante momentos tensos de PvP.

#### `# 🎬 | clips-e-momentos`
- **Ver Canal:** `✅ Permitido` para `@everyone`
- **Enviar Mensagens & Anexar Arquivos:** `✅ Permitido` para `@everyone`
- **Objetivo:** Onde os membros da guilda postam links de jogadas do Albion Online, clipes da Twitch e memes para o streamer abrir e reagir nos intervalos da live.

---

## 4. Integração Visual com OBS Studio (Discord Streamkit)

Para que os espectadores vejam quem está participando da call e quem está falando com animação luminosa em tempo real na tela da live:

1. Acesse o configurador oficial: **[streamkit.discord.com/overlay](https://streamkit.discord.com/overlay)**
2. Clique no menu superior em **Voice Widget**.
3. Selecione:
   - **Server:** Guilda IVEXI
   - **Voice Channel:** `🔊 🔒 🔴 | call-da-live`
4. Na parte inferior direita, copie a **URL do Widget**.
5. No **OBS Studio**:
   - Clique em `+` na lista de **Fontes** > selecione **Navegador (Browser Source)**.
   - Nomeie como: `🎙️ Discord Call Overlay`.
   - Cole a URL copiada no campo **URL**.
   - Defina: **Largura: `380`** | **Altura: `550`**.
   - No campo **CSS Personalizado**, apague tudo e cole o CSS temático da IVEXI abaixo:

```css
/* ========================================================
   IVEXI GUILD - DISCORD STREAMKIT OVERLAY THEME
   Streamer: VulgoManiaco | Cores: #140A1F, #732EB8, #D6D65C
   ======================================================== */
body {
  background-color: transparent !important;
  overflow: hidden;
  font-family: 'Rajdhani', 'Inter', sans-serif !important;
}

/* Card de cada participante na call */
.voice-state {
  margin-bottom: 10px !important;
  display: flex !important;
  align-items: center !important;
  background: rgba(20, 10, 31, 0.85) !important;
  padding: 6px 14px !important;
  border-radius: 12px !important;
  border: 1px solid rgba(115, 46, 184, 0.5) !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(6px) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Avatar circular */
.avatar {
  border-radius: 50% !important;
  border: 2px solid #30184A !important;
  transition: all 0.2s ease-in-out !important;
}

/* Estado de quem está FALANDO */
.speaking {
  border: 1px solid #D6D65C !important;
  box-shadow: 0 0 16px rgba(214, 214, 92, 0.65), inset 0 0 8px rgba(115, 46, 184, 0.4) !important;
  background: rgba(45, 15, 75, 0.95) !important;
  transform: translateX(4px) !important;
}

.avatar.speaking {
  border: 2px solid #D6D65C !important;
  box-shadow: 0 0 12px #D6D65C !important;
  transform: scale(1.1) !important;
}

/* Nome do participante */
.user {
  color: #FAFAFA !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  text-shadow: 1px 1px 3px #000000 !important;
  letter-spacing: 0.6px !important;
  margin-left: 10px !important;
}

.speaking .user {
  color: #D6D65C !important;
}
```

---

## 5. Isolamento de Áudio no OBS Studio

Isolar o som do Discord é crucial para garantir que você possa regular o volume dos convidados sem diminuir o som dos efeitos sonoros do Albion Online ou a música de fundo:

1. No **OBS Studio**, vá em **Fontes** > clique em **`+`** > **Captura de Áudio de Saída de Aplicação (BETA)**.
2. Nomeie como: `🎧 Áudio Discord`.
3. Na janela de propriedades, selecione o executável: **`Discord.exe`**.
4. **Vantagens Práticas:**
   - **Controle de Volume Exclusivo:** Se um convidado tiver o microfone muito baixo ou muito alto, você ajusta a régua do Discord no mixer do OBS sem afetar o som do seu fone de ouvido.
   - **Botão de Pânico (Mute Imediato):** Se alguém falar algo que viole as diretrizes da Twitch/Kick, você clica no ícone de som da fonte `🎧 Áudio Discord` no mixer para mutar instantaneamente os convidados na live, mantendo o som do jogo e o seu microfone funcionando normalmente!

---

## 6. Criação Automática via Script (1-Clique)

Caso você prefira criar a categoria, os canais e as permissões de forma 100% automatizada em vez de clicar manualmente no Discord:

Execute o script utilitário incluído no projeto:

```bash
python3 scripts/setup_discord_live_channels.py --token "SEU_BOT_TOKEN" --guild-id "ID_DO_SERVIDOR"
```

O script criará a categoria `╭── ✦ 🎙️ QG DA LIVE` com as permissões cirúrgicas configuradas em menos de 3 segundos!
