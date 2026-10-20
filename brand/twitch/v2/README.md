# Pack Twitch v2 — VulgoManiaco / IVEXI

Produção autorizada na conversa: 20 emotes iniciais, curadoria completa dos
conceitos e seis ícones de resgate. Identidade: corvo chibi streamer das
referências existentes, roxo IVEXI e acentos neon.

## Arquivos

- `upload/`: somente os 114 arquivos para upload manual, separados por categoria,
  slot e dimensão. Códigos são sugestões; conferir o prefixo disponível no canal.
- `sources/`: ilustrações originais transparentes, sprites de animação e prompts.
- `previews/index.html`: catálogo local com animações, tamanhos reais e fundos
  escuro/claro; abrir diretamente no navegador.
- `previews/contact-sheet.png`: visão geral de todas as peças.
- `previews/flairs.png`: os dois adornos sobre as seis Sub Badges existentes.
- `manifest.json`: associação de categoria, marco, fonte e hashes dos arquivos.
- `validation.json`: resultados técnicos reproduzíveis da exportação.
- `pack-twitch-vulgomaniaco-v2.zip`: arquivos de upload, guia, manifesto e
  validação. Fontes e prévias ficam disponíveis no projeto, fora do ZIP.

## Contrato de exportação

| Ativo | Formato | Tamanhos | Limite por arquivo |
| --- | --- | --- | --- |
| Emote estático | PNG transparente | 112, 56, 28 px | 1.000.000 bytes |
| Emote animado | GIF transparente | 112, 56, 28 px | 512.000 bytes |
| Flair e Bit Badge | PNG transparente | 72, 36, 18 px | 25.000 bytes |
| Moeda e resgates | PNG transparente | 112, 56, 28 px | 25.000 bytes |

O enquadramento usa 93% da maior dimensão da silhueta, com tolerância de
arredondamento de um pixel nos tamanhos pequenos. Não se estica a arte para
preencher ambos os eixos. Os flairs são uma exceção de composição: molduras
parciais vazadas preservam o centro das badges e são ancoradas na base, sem
centralizar verticalmente o adorno. GIFs usam canvas fixo,
transparência binária própria do formato, descarte do frame anterior e loop
infinito. O alvo é 24 frames / 2 segundos, sem flashes.

## Distribuição

| Grupo | Peças |
| --- | --- |
| Seguidor | GG, LURK, RIP, LOVE, KKK |
| Tier 1 estático | BOTAPRAFORA, ENERGIZA, MONTA, BATEFOOD, HYPE |
| Tier 1 animado | HYPE, ENERGIZA, MONTA, BATEFOOD, RAGE |
| Tier 2 estático | RAGE |
| Tier 3 estático | REI |
| Bits emotes | CRISTAL (1.000), TESOURO (5.000), LENDA (10.000) |
| Flairs | Tier 2 prateado, Tier 3 dourado |
| Bit Badges | 1, 100, 1.000, 5.000, 10.000, 25.000, 50.000, 75.000, 100.000 |
| Pontos | Moeda IVEXI |
| Resgates | Hidratar, alongar, destacar mensagem, escolher música, bate food, energiza |

Os emotes de recompensa de Bits são três PNGs desbloqueáveis; não são
Cheermotes animados. Os ícones de resgate não criam ou configuram recompensas.
As Sub Badges originais não são geradas, alteradas ou incluídas no ZIP novo.

## Expansão futura

Reservar mais 15 slots estáticos e 15 animados de Tier 1, chegando a 50
emotes no total. Esta entrega não contém essas 30 artes. Associar os slots
adicionais aos marcos efetivamente liberados no painel do canal antes de
produzi-los; a disponibilidade de um slot não é inferida dos arquivos.

## Procedência e reprodução

Artes novas: Imagegen integrado; referência de identidade fornecida pelo
projeto em `brand/twitch/referencias/03_referencia_personagem_mascote.png`.
Prompts em `sources/prompts.json`. Os conceitos anteriores são preservados,
com novas composições para escala pequena. Nenhum ativo de terceiros foi
baixado. A procedência jurídica da referência continua sendo a já registrada
pelo projeto, sem nova declaração de licença ou exclusividade.

Para reconstruir exportações, prévias, manifesto, ZIP e relatório:

```bash
python3 brand/scripts/export_twitch_v2.py
```

O exportador exige Pillow e NumPy já disponíveis no ambiente e falha se
qualquer fonte ou limite técnico obrigatório não puder ser validado.

## Publicação no portal

`npm run sync:twitch` verifica os 114 hashes e copia uploads, stills, manifesto, ZIP e pranchas para `public/assets/twitch/v2/`. Copia também `brand/brand-guide.pdf` como `manual.pdf` e o ZIP existente de Sub Badges para um download separado. O comando roda automaticamente em `predev` e `prebuild`; não exige Python no ambiente de publicação. Os 15 stills PNG em `previews/stills/` são o primeiro frame RGBA dos respectivos GIFs, extraídos com Pillow durante esta entrega e reconstruídos pelo exportador `brand/scripts/export_twitch_v2.py`.

A galeria `/badges` importa o manifesto e organiza os dez grupos. Fontes, sprites, prompts e ferramentas de produção não são copiados para public. Os diretórios públicos gerados são ignorados pelo Git; o pacote fonte e os documentos necessários ao build são versionados.

Verificação reproduzível de assinaturas PNG/GIF/ZIP/PDF e hashes:

```bash
node scripts/verify-twitch-v2.mjs
node scripts/verify-twitch-v2.mjs https://vulgomaniaco-stream-pack.vercel.app
```

A verificação abrange os 114 uploads, 15 stills, cinco documentos e 24 arquivos individuais das seis Sub Badges preservadas.
