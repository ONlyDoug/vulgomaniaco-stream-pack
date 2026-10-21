# Pacote Twitch v2 no portal

A galeria pública `/badges` mostra 38 peças novas e mantém as seis Sub Badges originais. O cartão do hub aponta para ela por um link nativo acessível por teclado.

O manifesto `brand/twitch/v2/manifest.json` determina códigos sugeridos, slots, marcos de Bits, formatos, dimensões e hashes dos 114 uploads. `twitchV2Data.ts` valida as categorias e formatos e deriva os dez grupos exibidos. Os emotes de Bits são PNGs desbloqueáveis, não Cheermotes. Os ícones de resgate não configuram recompensas automaticamente.

| Componente | Responsabilidade |
| --- | --- |
| `BadgesGallery.tsx` | Downloads gerais, categorias, fundo e controle de movimento |
| `AssetCard.tsx` | Três dimensões reais e três links por ativo; `AssetImage` troca GIF pelo primeiro frame |
| `ChatSimulator.tsx` | Duas linhas com emotes a 28px e seletor de Sub Badge/flair a 18px |
| `SubBadgesSection.tsx` | Conteúdo e downloads das seis badges preservadas, a 72/36/18px |

## Build e integridade

```bash
npm ci
npm test
npm run build
node scripts/verify-twitch-v2.mjs
node scripts/verify-twitch-v2.mjs https://vulgomaniaco-stream-pack.vercel.app
```

`predev` e `prebuild` executam `scripts/sync-twitch-v2.mjs`. A sincronização verifica os hashes de todos os uploads antes de copiá-los e inclui os 15 stills do primeiro frame, manifesto, ZIP novo, pranchas e manual. O ZIP das Sub Badges é copiado separadamente. Os arquivos gerados em `public/assets/twitch/v2/` e o ZIP separado não são versionados; são reconstruídos a partir dos arquivos finais versionados em `brand/`.

`.vercelignore` preserva explicitamente `brand/brand-guide.pdf`, necessário ao build, e exclui `brand/twitch/v2/sources/`. Fontes, prompts e sprites de produção não são copiados para a pasta pública. A pausa altera somente as imagens exibidas; links continuam entregando os GIFs originais. Movimento reduzido é consultado na abertura e acompanhado durante o uso. A preferência bloqueia a reprodução enquanto estiver ativa.

O verificador confere SHA-256 e assinaturas PNG/GIF/ZIP/PDF de 158 arquivos: 114 uploads, 15 stills, cinco documentos e 24 arquivos das Sub Badges, incluindo masters. Ele detecta HTML servido pelo fallback de rotas do portal. O download das Sub Badges contém 18 PNGs de upload (três por badge); seus masters continuam nos cartões individuais.

## Entrega

SPEC-0003 registra requisitos, testes, tarefas e evidências. Publicação pelo push para `origin/main`, com build automático Vercel. Conferir estado Ready e SHA do commit, executar a verificação HTTP e percorrer as rotas OBS com `?obs=1`. Em regressão confirmada, reverter o commit de publicação e acompanhar nova implantação. A expansão de 20 para 50 emotes fica fora desta entrega.

## Emotes com e sem texto — 2026-10-21

`/emotes/index.html` publica a comparação aprovada, com links no hub e `/badges`. Os ZIPs separados contêm 60 arquivos originais e 74 com texto. Sete combinações de texto/tamanho são indisponíveis e sinalizadas; nenhuma imagem substituta é inventada. O manifesto de publicação controla os hashes; sync-twitch-v2 importa a sincronização estática antes de dev/build, sem Python na Vercel. A preparação local usa `python3 brand/scripts/prepare_twitch_publication.py`.
