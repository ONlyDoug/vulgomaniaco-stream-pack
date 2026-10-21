# Estudo de texto nos emotes — v1

Status: propostas para comparação; nenhuma palavra, abreviação ou composição está aprovada. O pacote Twitch v2 e o portal publicado não são substituídos por este estudo.

Abra `index.html` no navegador. O catálogo funciona localmente, tem fundo claro/escuro, pausa dos GIFs, respeito a movimento reduzido, modo de comparação em 28px e seleção individual para os 20 emotes. O botão **Exportar minhas escolhas JSON** guarda as decisões em um arquivo; seleções não são persistidas automaticamente ao fechar a página. As opções sem versão de 28px ficam desabilitadas para evitar escolher um conjunto incompleto para o chat.

## O que foi produzido

- 15 emotes estáticos e cinco animados, com texto dentro dos pixels de cada PNG/GIF.
- Propostas com o texto completo; sugestões curtas para BOTA PRA FORA/BOTA!, ENERGIZA/OC!, BATE FOOD/FOOD!, CRISTAL/GEMA e TESOURO/LOOT. As palavras curtas são hipóteses, não decisões.
- Exportação nativa em 112, 56 e 28px quando a tipografia cabe sem desrespeitar o limite de leitura.
- Originais copiados sem alteração para comparação; três pranchas PNG e ZIP do estudo.
- `manifest.json`: arquivos, hashes, dimensões, métricas de letras e bloqueios. `validation.json`: conferência técnica e preservação dos 195 arquivos do pacote v2.

## Composição e reprodução

As letras usam a Rajdhani Bold existente no projeto, amarelo IVEXI `#D6D65C` e contorno escuro `#140A1F`. O arquivo da fonte não é redistribuído dentro do estudo. Metadados da TTF: Copyright 2014 Indian Type Foundry e referência `http://scripts.sil.org/OFL`; nenhuma ilustração ou fonte externa foi baixada.

Cada tamanho recebe tipografia própria. Altura mínima da letra H: 6px no arquivo de 28px, 8px no de 56px e 12px no de 112px. Compressão horizontal do texto limitada a 20%. Não se reduz a fonte abaixo desses limites para forçar palavras a caber. A altura mínima é um limite de produção; não comprova leitura humana nem aprova uma composição.

A ilustração recebe apenas escala proporcional de 93% e pequeno reposicionamento fixo. Na lápide RIP, a escala original é mantida e o texto ocupa a base. LOVE e BATE FOOD recebem texto no alto para preservar coração, comida e bico; os demais usam a base. Revisar individualmente a sobreposição nos elementos secundários antes de aprovar.

Os animados usam os frames já exportados e aprovados, com a mesma transformação em todos os frames, preservando duração e loop. Texto com alfa binário é composto antes da codificação com paleta compartilhada: suas cores opacas ficam estáveis entre frames. Os PNGs mantêm suavização de borda. A validação verifica movimento, transparência, integridade e região opaca do texto em todos os frames dos GIFs.

Fonte editável: `brand/templates/twitch-texto-v1/config.json`. Exportador: `brand/scripts/preview_twitch_text.py`. Dependência de produção: Pillow já disponível no ambiente; não há dependência nova no portal.

```bash
python3 brand/scripts/preview_twitch_text.py
python3 brand/scripts/preview_twitch_text.py --check
```

Execute a partir da raiz do projeto. O exportador pode ser executado novamente, sem editar os originais. As pranchas mostram o primeiro frame dos GIFs; conferir movimento no catálogo HTML.

## Limites encontrados

Sete combinações de proposta/tamanho foram bloqueadas: BOTA PRA FORA em 56 e 28px; ENERGIZA, BATE FOOD e TESOURO em 28px; ENERGIZA e BATE FOOD animados em 28px. As alternativas curtas cobrem esses casos, mas ainda precisam de escolha explícita.

MONTA (estático e animado) e CRISTAL atingem a altura mínima de 6px em 28px: considerar leitura limítrofe e comparar com a versão sem texto. GEMA tem letras maiores que CRISTAL, mas muda a palavra; OC! também muda a mensagem e pode não ser entendido pelo público. Nenhuma dessas alternativas deve ser publicada automaticamente.

A revisão compara leitura, expressão, objetos importantes, contorno em fundos claro/escuro e ausência de cortes. Não é um ensaio com espectadores reais. Badges, flairs, moeda e resgates não entram na alteração. Nenhum commit, push ou deploy faz parte desta etapa de comparação.

## Verificação realizada

- Exportação: 74 arquivos candidatos, com 19 GIFs de 24 frames cada; duração e loop originais preservados, texto opaco estável, margens sem corte, formatos e dimensões corretos e limites de bytes respeitados.
- Preservação: SHA-256 dos 195 arquivos do pacote aprovado conferidos antes/depois; 60 cópias originais no estudo idênticas aos arquivos para upload do v2.
- Catálogo: conferência em Chromium de 20 cards, 134 imagens em tamanho nativo, sete posições bloqueadas, todos os links locais, tema claro/escuro, pausa, preferência de movimento reduzido e exportação de escolhas por teclado.
- Layout: desktop 1440×1000 e celulares 375/320×850. Correção aplicada à quebra de títulos longos em 320px; prévias nativas mantidas sem esconder overflow. Originais e propostas alinhados para comparação.
- Revisão de composição: GG, RIP e HYPE mantêm rosto/objeto principal reconhecíveis; coração e comida preservados com texto no alto. MONTA e CRISTAL em 28px continuam limítrofes; decidir por comparação com os originais, sem aprovação automática.

QA reproduzível do navegador, usando uma instalação de Playwright existente (sem instalar dependência no portal):

```bash
PLAYWRIGHT_MODULE=/caminho/para/playwright node brand/scripts/verify_twitch_text_browser.cjs
python3 brand/scripts/preview_twitch_text.py --bundle-only
```

`browser-validation.json` registra a conferência técnica; as escolhas de teste do navegador não são aprovações da pessoa usuária. A aprovação visual final permanece pendente. O ZIP inclui o HTML, cópias originais, propostas, pranchas e relatórios e pode ser extraído em outra pasta para revisão offline.
