# Especificação integrada: Publicar pacote Twitch v2

| Campo | Valor |
| --- | --- |
| Formato | Specsfy/2.0 |
| ID | SPEC-0003 |
| Slug | 0003-publicar-pacote-twitch-v2 |
| Status | Implementing |
| Effort | 3 |
| Effort updated at | 2026-10-20 |
| Effort rationale | Integração de assets aprovados, galeria, verificação binária e publicação. |
| Definition Gate | Passed |
| Plan Gate | Passed |
| Delivery Gate | In Progress |
| Interface para pessoas | Sim |
| Atualizada em | 2026-10-20 |

## Ato I — Definir

### 1. Problema e resultado
O portal ainda apresenta o pacote antigo. Publicar as 38 peças novas e seus 114 arquivos, manual PDF e pranchas; preservar seis Sub Badges e rotas OBS.

### 2. Research e esclarecimentos
Fontes: plano explicitamente autorizado nesta conversa, manifesto `brand/twitch/v2/manifest.json`, README v2, componentes e testes existentes, `brand/brand-guide.pdf` (14 páginas). Nenhuma fonte externa de requisitos. A origem Git é ONlyDoug/vulgomaniaco-stream-pack, main. A publicação por push foi explicitamente solicitada. Nenhuma dúvida de escopo aberta.

### 3. Escopo e atores
Streamers consultam, simulam e baixam artes, sem conta. Inclui 20 emotes, dois flairs, nove Bit Badges, moeda e seis resgates. Fora de escopo: expansão para 50 emotes, configuração automática da Twitch e mudanças no Centro de Comando.

### 4. Princípios e restrições do projeto
Preservar alterações locais alheias. Manifesto é fonte dos formatos, dimensões e hashes. Fontes de produção ficam fora de public. Reutilizar React 19, Tailwind 3, Vite e Vitest existentes.

### 5. Histórias de usuário
#### US-001 — Consultar e baixar o pacote (P1)
Como streamer quero conferir e baixar cada arte nova, mantendo minhas Sub Badges, para preparar o canal.
**Teste independente**: abrir /badges e baixar os arquivos por categoria.
**Requisitos**: FR-001, NFR-001.

### 6. Cenários BDD de aceite
#### AC-001 — Catálogo completo
**Cobre**: US-001, FR-001, NFR-001
```gherkin
Dado o manifesto com 38 peças novas
Quando abro /badges
Então vejo 20 emotes separados por slot, dois flairs, nove Bit Badges, moeda e seis resgates
E continuo vendo as seis Sub Badges existentes
```
#### AC-002 — Downloads íntegros
**Cobre**: US-001, FR-001, NFR-001
```gherkin
Dado o pacote v2 validado
Quando consulto seus downloads
Então tenho 114 arquivos individuais nos tamanhos reais e hashes originais
E encontro ZIP novo, manual PDF, pranchas e download separado das Sub Badges
```
#### AC-003 — Prévia controlável
**Cobre**: US-001, FR-001, NFR-001
```gherkin
Dado o simulador e as prévias
Quando alterno o fundo ou pauso as animações
Então as artes permanecem visíveis nos tamanhos reais e GIFs mostram o primeiro frame
E movimento reduzido impede reprodução e controles funcionam por teclado
E posso aplicar flairs às Sub Badges no chat
```

### 7. Requisitos
- **FR-001**: Disponibilizar catálogo, simulador com flairs, prévias nos três fundos, pausa de GIFs, 114 downloads e documentos; preservar Sub Badges e integrar cartão no hub.
- **NFR-001**: Sincronização reproduzível antes de dev/build; integridade SHA-256, formatos binários corretos, fontes privadas ao build, teclado, movimento reduzido e reflow mobile; publicação verificada no commit enviado.

### 8. Plano técnico
Sincronizar somente uploads listados, stills do primeiro frame, manifesto, ZIP, manual e duas pranchas para public/assets/twitch/v2. Importar manifesto tipado no catálogo. Extrair AssetCard, AssetImage, ChatSimulator e SubBadgesSection. Não alterar rotas OBS. Build e testes antes de push; rollback por git revert somente em regressão confirmada.

### 9. Modelo de dados
Catálogo estático versionado: Asset com id, code, category de slot, extension PNG/GIF, milestone opcional, files com path/dimensões/hash. Sem banco, migration ou persistência nova.

### 10. Interfaces e contratos
#### Interface para pessoas
Sim, galeria pública de download.
#### Stack e convenções de interface
React 19, TypeScript, Tailwind 3, tokens IVEXI; componentes próprios existentes sem biblioteca nova.
#### Telas e responsabilidades
/badges consulta/baixa; / acessa galeria pelo cartão atualizado. SubBadgesSection preserva conteúdo e downloads antigos.
#### Fluxo de informação e navegação
Manifesto local → catálogo → seções/cards → arquivos públicos. Nenhuma entrada de rede do usuário.
#### Menus e navegação principal
Menu público: item Pack Twitch v2, destino /badges, acessível a partir do cartão / → /badges, retorno ao hub e âncoras por categoria. Nenhuma permissão exigida.
#### Formulários e ações
Botões de fundo e pausa; selects com labels para Sub Badge e flair; links de download reais com download. Sem criação, edição ou exclusão de registros.
#### Composição e disposição
BadgesGallery coordena estado, AssetCard mostra três dimensões e downloads, AssetImage troca GIF por still, ChatSimulator aplica badge/flair a 18px e emotes a 28px. Registrar em INTERFACE.md.
#### Blocos React e componentes selecionados
AssetCard, AssetImage, ChatSimulator e SubBadgesSection são componentes próprios, extraídos da galeria existente. Sem dependência shadcn/ui ou ReUI neste catálogo estático.
#### Revisão visual durante o desenvolvimento
Inspecionar bordas, espaçamentos, margens, padding e tipografia nos três fundos, desktop 1440px e mobile 375/320px, flairs e movimento reduzido.
#### Estados e acessibilidade
Fundo escuro/claro/IVEXI, pausado/reproduzindo/redução de movimento. Sem loading remoto. Foco visível, botões nativos, aria-pressed, labels e alt. Uma coluna mobile, duas médias, três desktop; ações quebram linha.

## Ato II — Projetar e provar
### 11. Estratégia TDD
Vitest já adotado. AffiliatePack.test.tsx deriva três casos dos três AC com marcadores individuais. RED registrado em /tmp/ivexi-v2-red.log antes de alterar produção. Teste adicional cobre movimento reduzido. Verificador binário independente confere SHA-256 e assinatura de arquivos locais/publicados.

### 12. Plano de testes e rastreabilidade
US-001, FR-001 e NFR-001 → AC-001/002/003 → três casos marcados em tests/features/twitch/AffiliatePack.test.tsx. Regressão completa existente, TypeScript/build, Playwright desktop/mobile/teclado/movimento e download HTTP.

### 13. Validações
- GREEN final: `npm test -- --reporter=dot --maxWorkers=1` — 40/40 em oito arquivos; `npm run build` — TypeScript e Vite aprovados, 69 módulos. Sem lint configurado no projeto.
- Navegador Chromium/Playwright: catálogo 38, seis Sub Badges, 114 links e 114 imagens em dimensão nativa; 12 combinações de flairs, acionamento por Enter/Espaço, transição de movimento reduzido acompanhada ao vivo, mobile 375/320px sem overflow, sete rotas OBS com transparência e sem erros de página. Recursos externos de fontes/widgets isolados para verificar o portal. As rotas de metas não usam PreviewWrapper; preservadas e cobertas pela regressão existente.
- VISUAL: screenshots desktop 1440×1000 e mobile 375/320×850 em `/tmp/ivexi-v2-*`; inspeção direta de cabeçalho, chat, seguidores e animados: bordas, espaçamentos, margens, padding, Inter/Rajdhani, quebras e alinhamentos coerentes com tokens IVEXI. Emotes legíveis em 28px, badges/flairs em 18px; os menores preservam silhueta. Nenhum ajuste de arte necessário. Não é uma auditoria integral de conformidade WCAG.
- `git diff --check`: passou. `git fetch origin` e comparação HEAD...origin/main: 0/0 antes de commit.

- PROJECT.md revisado: a galeria amplia o catálogo já existente, sem mudar a finalidade, atores ou fronteiras do streamer pack. AGENTS/CLAUDE revisados: nenhuma convenção global nova. `.specsfy/STACK.md` e `.specsfy/PACKAGES.md` atualizados; sem novas dependências.

#### Gate do Ato II — Plano
- Resultado: VALID DRAFT no validador de tarefas e OK no validador de interface; três predecessores TDD distintos, seis tarefas e cobertura dos seis IDs. RED comprovado em /tmp/ivexi-v2-red.log; Plan Gate aprovado após a verificação.

#### Gate do Ato I — Definição
- Resultado: READY em 2026-10-20; validate_spec.mjs --allow-draft passou. Revisão semântica: plano fornecido cobre escopo, atores, limites, interface, integridade e publicação; três cenários distintos para cada US/FR/NFR. Nenhum bloqueio material.

- Setup: doctor OK, monitor CURRENT após revisão das instruções; nenhuma regra durável nova. Projeto sem banco ativo; check_database_safety SAFE.
- Baseline e resultados da entrega: baseline: 41 testes passaram em 8 arquivos. RED: 4 falhas esperadas no teste novo (catálogo, documentos, pausa e movimento). GREEN: 40 testes passaram em 8 arquivos; `npm run build` passou com tipos e Vite. `node scripts/verify-twitch-v2.mjs`: 158 arquivos íntegros, incluindo os 114 uploads, 15 stills, cinco documentos e 24 arquivos de Sub Badges.

### 14. Tarefas

- [x] T001 [TEST] [TDD] [US-001] Derivar teste TDD AC-001 em tests/features/twitch/AffiliatePack.test.tsx — Refs: US-001, FR-001, NFR-001, AC-001, AC-002, AC-003 — Depends: none
  - [x] **PREP**: Confirmar escopo e dependências.
  - [x] **EXECUTE**: Caso individual com marcador SPECSFY escrito no AffiliatePack.test.tsx.
  - [x] **VERIFY**: RED observado antes de produção; GREEN na suíte completa.
  - [x] **VISUAL**: Não aplicável: tarefa materializa teste, sem alterar interface.
  - [x] **EVIDENCE**: Registrar resultados na seção 13.
  - [x] **IMPROVE**: Três casos distintos cobrem catálogo, download e interações, sem duplicação.

- [x] T005 [TEST] [TDD] [US-001] Derivar teste TDD AC-002 em tests/features/twitch/AffiliatePack.test.tsx — Refs: US-001, FR-001, NFR-001, AC-001, AC-002, AC-003 — Depends: none
  - [x] **PREP**: Confirmar escopo e dependências.
  - [x] **EXECUTE**: Caso individual com marcador SPECSFY escrito no AffiliatePack.test.tsx.
  - [x] **VERIFY**: RED observado antes de produção; GREEN na suíte completa.
  - [x] **VISUAL**: Não aplicável: tarefa materializa teste, sem alterar interface.
  - [x] **EVIDENCE**: Registrar resultados na seção 13.
  - [x] **IMPROVE**: Três casos distintos cobrem catálogo, download e interações, sem duplicação.

- [x] T006 [TEST] [TDD] [US-001] Derivar teste TDD AC-003 em tests/features/twitch/AffiliatePack.test.tsx — Refs: US-001, FR-001, NFR-001, AC-001, AC-002, AC-003 — Depends: none
  - [x] **PREP**: Confirmar escopo e dependências.
  - [x] **EXECUTE**: Caso individual com marcador SPECSFY escrito no AffiliatePack.test.tsx.
  - [x] **VERIFY**: RED observado antes de produção; GREEN na suíte completa.
  - [x] **VISUAL**: Não aplicável: tarefa materializa teste, sem alterar interface.
  - [x] **EVIDENCE**: Registrar resultados na seção 13.
  - [x] **IMPROVE**: Três casos distintos cobrem catálogo, download e interações, sem duplicação.

#### Fase de interface

- [x] T002 [CODE] [US-001] Integrar assets, sincronização, galeria, simulador e hub em src/features/badges/ e scripts/ — Refs: US-001, FR-001, NFR-001, AC-001, AC-002, AC-003 — Depends: T001, T005, T006
  - [x] **PREP**: Escopo e predecessores RED confirmados; especialistas React/UI consultados.
  - [x] **EXECUTE**: Código e documentação produzidos; fontes preservadas fora de public.
  - [x] **VERIFY**: 40 testes, build, verificador binário e navegador aprovados (seção 13).
  - [x] **VISUAL**: Desktop 1440px e mobile 375/320px conferidos, incluindo bordas, espaçamentos, margens, padding e tipografia; documentação sem superfície visual própria.
  - [x] **EVIDENCE**: Registrar resultados na seção 13.
  - [x] **IMPROVE**: Componentes extraídos e verificador detecta hashes divergentes ou fallback HTML.

  <!-- specsfy:evidence {"task":"T002","refs":["US-001","FR-001","NFR-001","AC-001","AC-002","AC-003"],"files":["src/features/badges/BadgesGallery.tsx","src/features/badges/AssetCard.tsx","src/features/badges/ChatSimulator.tsx","scripts/sync-twitch-v2.mjs"],"commands":[{"run":"npm test -- --reporter=dot --maxWorkers=1","exit":0},{"run":"npm run build","exit":0},{"run":"node scripts/verify-twitch-v2.mjs","exit":0}]} -->

- [x] T003 [DOC] [US-001] Atualizar INTERFACE.md e docs/ — Refs: US-001, FR-001, NFR-001, AC-001, AC-002, AC-003 — Depends: T002
  - [x] **PREP**: Escopo e predecessores RED confirmados; especialistas React/UI consultados.
  - [x] **EXECUTE**: Código e documentação produzidos; fontes preservadas fora de public.
  - [x] **VERIFY**: 40 testes, build, verificador binário e navegador aprovados (seção 13).
  - [x] **VISUAL**: Desktop 1440px e mobile 375/320px conferidos, incluindo bordas, espaçamentos, margens, padding e tipografia; documentação sem superfície visual própria.
  - [x] **EVIDENCE**: Registrar resultados na seção 13.
  - [x] **IMPROVE**: Componentes extraídos e verificador detecta hashes divergentes ou fallback HTML.

- [ ] T004 [OPS] [US-001] Verificar build, navegador e arquivos; publicar origin/main e confirmar Ready — Refs: US-001, FR-001, NFR-001, AC-001, AC-002, AC-003 — Depends: T002, T003
  - [ ] **PREP**: Confirmar escopo e dependências.
  - [ ] **EXECUTE**: Produzir entrega descrita.
  - [ ] **VERIFY**: Executar verificações pertinentes.
  - [ ] **VISUAL**: Conferir desktop/mobile, bordas, espaçamentos e tipografia; não aplicável em tarefa só de testes/documentação.
  - [ ] **EVIDENCE**: Registrar resultados na seção 13.
  - [ ] **IMPROVE**: Rever duplicação e falhas de download.


### 15. Ordem de execução
T001/T005/T006 → T002 → T003 → T004. Execução sequencial.

## Ato III — Entregar e validar
### 16. Dependências, riscos e suposições
Assets já produzidos; Vercel ligada a origin/main conforme plano. Riscos: fallback SPA retornar HTML em download e regressão em OBS; verificar assinatura/hash e rotas. Fontes preservadas fora de public. Rollback: git revert do commit de publicação e push, se necessário.

### 17. Decisões
- DEC-001: manter seis Sub Badges, separando download legado do pacote v2.
- DEC-002: extrair stills reais dos GIFs uma vez; sincronizar com Node sem dependência Python no build Vercel.
- DEC-003: nenhuma alteração de banco ou regra global. Revisão de AGENTS/CLAUDE não introduz convenção nova nesta tarefa.

### 18. Definition of Done
- [ ] Testes, tipos e build passam.
- [ ] 114 arquivos e documentos íntegros; revisão visual e teclado concluídos.
- [ ] Docs e mapa atualizados.
- [ ] Commit publicado em origin/main, Vercel Ready e produção verificada.
