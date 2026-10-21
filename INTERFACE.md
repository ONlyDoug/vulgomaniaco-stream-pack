# Interface do projeto

<!-- markdownlint-disable MD013 -->

Este arquivo é a fonte canônica para construir e reaproveitar a interface.
Atualize-o antes e depois de cada tarefa que criar ou mudar uma tela React.
Leia `DESIGNSYSTEM.MD` antes de escolher a composição macro. Este arquivo
registra componentes, blocos e telas locais; as regras globais de SaaS vivem em
`DESIGNSYSTEM.MD`.

## Base observada

- Stack: Vite + React 19 + TypeScript + Tailwind CSS + Vitest
- Política: overlays e telas 1080p modulares com transparência alfa e sincronização BroadcastChannel.
- Primitives: Componentes React e tokens semânticos IVEXI.
- Composições: Layouts com proporções HUD táticas de Albion Online.

Confirme os manifests e as fronteiras principais antes de completar o modelo genérico.

## Design system

| Item | Localização ou valor | Uso no projeto |
| --- | --- | --- |
| Tokens e tema | `src/shared/tokens/colors.ts` | Cores IVEXI (Roxo Corvo, Preto Blackzone, Amarelo Neon), tipografia Rajdhani/Inter |
| Configuração Tailwind | `tailwind.config.js` | Classes temáticas `ivexi-*`, sombras e drop-shadow neon |
| Estilos Globais | `src/index.css` | Canvas 1080p para OBS Browser Source, background transparente |
| Sincronização OBS | `BroadcastChannel('vulgomaniaco_obs_channel')` | Comunicação em tempo real entre `/control` e overlays |

## Blocos criados e reaproveitáveis

| Bloco | Tipo | Arquivo | Origem | Finalidade e API pública | Estados e acessibilidade | Consumidores | Reaproveitar ou estender |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `GameplayOverlay` | Domínio / Tela | `src/features/gameplay/GameplayOverlay.tsx` | Próprio | Viewport 1080p transparente para overlay de gameplay no OBS. Props: `channelName?: string`, `antiSnipeActive?: boolean`. | Renderização transparente 60fps, pointer-events desabilitados para captura limpa. | Rota `/overlay/gameplay` | Ponto de entrada do overlay de transmissão. |
| `FacecamFrame` | Domínio / Composição | `src/features/gameplay/FacecamFrame.tsx` | Próprio | Moldura 16:9 com bordas neon nos ângulos para sobreposição de webcam sobre a área de chat. | Área interna vazada transparente com sombra suave. | `GameplayOverlay` | Usar para qualquer moldura de câmera secundária. |
| `MascotBadge` | Domínio / Composição | `src/features/gameplay/MascotBadge.tsx` | Próprio | Insígnia do Corvo Streamer acoplada à base da moldura. Props: `imageSrc?: string`. | Fallback automático para SVG vetorial em caso de erro no carregamento da imagem (`onError`). | `FacecamFrame`, `GameplayOverlay` | Usar como avatar do canal e selo de identidade. |
| `AntiSnipeShield` | Domínio / Composição | `src/features/gameplay/AntiSnipeShield.tsx` | Próprio | Escudo tático comutável para cobrir coordenadas do minimapa no topo direito. Props: `active?: boolean`. | Visível / Oculto com pulso neon tático. | `GameplayOverlay` | Reutilizar sempre que coordenadas de jogo precisarem de ocultação. |
| `StartingScene` | Domínio / Tela | `src/features/scenes/StartingScene.tsx` | Próprio | Tela de início com temporizador regressivo de 5 min e carrossel de redes sociais (Twitch, Kick, YouTube, Discord). | Contagem regressiva ativa (formato MM:SS), rotação de redes a cada 8s. | Rota `/scenes/starting` | Usar como cena de abertura de live. |
| `BrbScene` | Domínio / Tela | `src/features/scenes/BrbScene.tsx` | Próprio | Tela de intervalo com animação do mascote Corvo e status pulsante "Já Voltamos!". | Animação em loop, pulso visual suave. | Rota `/scenes/brb` | Usar como cena de pausa temporária. |
| `EndingScene` | Domínio / Tela | `src/features/scenes/EndingScene.tsx` | Próprio | Tela de encerramento com agradecimentos à guilda ivexi e links de redes sociais. | Estático com brilho atmosférico e links de comunidade. | Rota `/scenes/ending` | Usar como cena final de transmissão. |
| `AlertOverlay` | Domínio / Tela | `src/features/alerts/AlertOverlay.tsx` | Próprio | Viewport 1080p transparente para Browser Source de alertas no OBS. Utiliza fila FIFO `useAlertQueue`. | Sem alerta (transparente) / Alerta ativo / Fila em processamento. | Rota `/alerts` | Camada de overlay isolada para alertas. |
| `AlertCard` | Domínio / Composição | `src/features/alerts/AlertCard.tsx` | Próprio | Card de notificação estilizado com cores neon ivexi para seguidor, sub, doação ou raid. | Animação bounce de entrada e pulso neon. | `AlertOverlay` | Usar para qualquer notificação de evento ao vivo. |
| `ControlDashboard` | Domínio / Tela | `src/features/control/ControlDashboard.tsx` | Próprio | Painel interativo de operação para o streamer disparar alertas e alternar modo anti-snipe. | Status ao vivo, botões interativos e feedback imediato. | Rota `/control` | Painel de controle no segundo monitor ou mobile. |
| `PanelsGallery` | Domínio / Tela | `src/features/panels/PanelsGallery.tsx` | Próprio | Galeria de 6 painéis de 320px com botão de exportação em lote para Twitch e Kick. | Grade responsiva, status de exportação, WCAG AAA. | Rota `/panels` | Visualização e download dos painéis de perfil. |
| `PanelCard` | Domínio / Composição | `src/features/panels/PanelCard.tsx` | Próprio | Card de painel padronizado na largura fixa de 320px com cabeçalho de mascote e texto de alto contraste. | Foco, hover com borda neon e contraste WCAG AAA. | `PanelsGallery` | Usar para qualquer painel de descrição do canal. |

## Telas e composição

| Tela ou rota | Arquivo | Componentes React usados | Dados e ações | Estados |
| --- | --- | --- | --- | --- |
| `/overlay/gameplay` | `src/features/gameplay/GameplayOverlay.tsx` | `FacecamFrame`, `MascotBadge`, `AntiSnipeShield` | Nome do canal `VulgoManiaco`, estado Anti-Snipe | Normal / Escudo Ativo / Fallback SVG |
| `/scenes/starting` | `src/features/scenes/StartingScene.tsx` | `CountdownTimer`, `SocialsCarousel` | Timer regressivo, lista de redes | Contagem ativa / 00:00 final |
| `/scenes/brb` | `src/features/scenes/BrbScene.tsx` | `MascotLoop`, `StatusPulse` | Mensagem de intervalo | Intervalo em loop |
| `/scenes/ending` | `src/features/scenes/EndingScene.tsx` | `CreditsCard`, `CommunityLinks` | Lista de agradecimentos e links | Encerramento |
| `/alerts` | `src/features/alerts/AlertOverlay.tsx` | `AlertCard`, `useAlertQueue` | Fila de alertas, eventos remotos | Transparente / Notificação ativa |
| `/control` | `src/features/control/ControlDashboard.tsx` | Botões de teste e toggle Anti-Snipe | BroadcastChannel postMessage | Dashboard interativo |
| `/panels` | `src/features/panels/PanelsGallery.tsx` | `PanelCard`, `exportPanels` | 6 painéis temáticos de 320px, exportação | Grade de painéis / Exportando |

## Regras de composição

1. Páginas e rotas coordenam dados e compõem componentes; não concentram a
   grade, formulário, filtros, overlays ou cartões reutilizáveis.
2. Antes de criar um componente, consulte esta tabela e reaproveite o item
   existente quando ele atender à mesma intenção.
3. Todo item instalado de shadcn/ui ou ReUI entra na tabela com seu arquivo,
   origem, explicação, API, estados e consumidores reais.
4. ReUI usa somente itens gratuitos `@reui/c-*`; use shadcn/ui para
  primitives e ReUI para composições de produto.
5. Para dashboards, registre a pergunta operacional, escopo, filtros,
   indicadores, visualizações, tabela de investigação e estados. Prefira
   blocos existentes de ReUI e primitives shadcn/ui antes de criar uma nova
   composição.
6. Em CRUD, reutilize o mesmo `PageHeader` nas telas de lista, detalhe,
   criação e edição. Registre uma única implementação, suas props, variações e
   consumidores; não duplique markup de cabeçalho por página.
7. Linhas de `DataGrid` com detalhe usam link acessível em toda a área; a
   listagem ocupa a largura disponível, exibe a coluna `ID` e oferece ações de
   editar e apagar. Ações internas usam `TableRowAction` ou equivalente e não
   propagam a navegação.
8. Formulários de criar e editar usam seções com coluna de contexto e painel
   em duas colunas nos breakpoints largos, refluindo para uma no mobile.
9. Toda tela renderiza `Breadcrumb` com o nome da equipe ativa, o módulo e o
   título atual. Em Laravel, reaproveite o `Breadcrumb` ou `Breadcrumbs` do
   layout existente e registre o componente real em vez de criar outro.
10. Ao criar um bloco, registre-o nesta tabela na mesma tarefa. Ao alterar ou
  remover um bloco, atualize seus consumidores e a orientação de reuso.

<!-- markdownlint-enable MD013 -->


## Centro de Comando planejado — SPEC-0002

Fonte normativa: `specs/draft/0002-centro-de-comando-de-live-para-vulgomaniaco/spec.md`, seção 10. Status Draft, sem componentes novos implementados. A tabela da spec lista blocos/caminhos propostos, responsabilidades, origem e regras de reuso. Não incluir esses caminhos no inventário de componentes existentes até implementação. Exceção macro do layout fixo registrada em DESIGNSYSTEM.MD com alcance exclusivo do novo painel.

Preservar GameplayOverlay, AntiSnipeShield, AlertOverlay, AlertCard e identidade. ControlDashboard existente usa estado local e BroadcastChannel; o rótulo Sincronização OBS no inventário acima descreve o uso pretendido em overlays, não uma integração OBS WebSocket comprovada. BroadcastChannel não comprova comunicação entre processos/WebViews. AntiSnipeShield no código atual está em bottom/right com 404x388, diferindo da descrição topo direito do inventário: verificar cobertura no OBS antes de estender. Nenhuma revisão visual, prova de isolamento ou ensaio Windows do novo Centro foi realizada.


Atualização planejada de 2026-10-08, SPEC-0002/FR-030: barra e Anti-Sniper persistem durante configurações em live nas mesmas posições. A seção 10 propõe OperationalShell e AntiSniperControl únicos compartilhados entre telas; não há arquivos implementados nem inventário de componentes entregues para esses nomes. Exceção localizada em DESIGNSYSTEM.MD; preservar demais telas e controles existentes.

## Pack Twitch v2 — SPEC-0003

Rota pública `/badges`, link nativo no cartão do hub `/`, breadcrumb e âncoras para dez categorias. React 19 / Vite / Tailwind 3; sem nova biblioteca de UI. Estados: três fundos de prévia, GIF reproduzindo/pausado, preferência de movimento reduzido, Sub Badge e flair selecionados. Sem formulário de edição nem persistência.

| Componente | Arquivo | Origem / API | Consumidores e reuso |
| --- | --- | --- | --- |
| BadgesGallery | src/features/badges/BadgesGallery.tsx | Próprio, sem props; estado de fundo/pausa e assinatura matchMedia com limpeza | /badges; coordena os blocos abaixo |
| AssetCard | src/features/badges/AssetCard.tsx | Próprio; asset, paused, themeClass; três dimensões reais e links de download PNG/GIF | BadgesGallery; para todas as 38 peças |
| AssetImage | src/features/badges/AssetCard.tsx | Próprio; asset, file, paused, alt opcional; GIF substituído por primeiro frame PNG quando pausado | AssetCard e ChatSimulator; não altera o arquivo de download |
| ChatSimulator | src/features/badges/ChatSimulator.tsx | Próprio; themeClass/paused, selects nativos rotulados, badge/flair a 18px e emotes a 28px | BadgesGallery; aplicação de flairs vazados sobre as seis Sub Badges |
| SubBadgesSection | src/features/badges/SubBadgesSection.tsx | Extraído da galeria anterior; themeClass; preserva títulos, descrições, master e três downloads de cada badge | BadgesGallery; seis badges existentes, com 72/36/18px reais |

Controles por teclado nativos, botões de fundo com aria-pressed, pausa desabilitada durante movimento reduzido. Catálogo sem chamadas de API: dados importados de brand/twitch/v2/manifest.json via twitchV2Data.ts. Grade 1/2/3 colunas, links com quebra de linha. Uploads e documentos são sincronizados antes de dev/build; sources não são servidas pelo build.

## Emotes com e sem texto

Página estática `/emotes/index.html`, acessível por links nativos no hub e `/badges`. Reaproveita a comparação aprovada, com fundos, pausa, movimento reduzido, tamanhos reais, escolha individual e dois ZIPs. Sincronização em scripts/sync-twitch-comparison.mjs; originais e pacote v2 preservados.
