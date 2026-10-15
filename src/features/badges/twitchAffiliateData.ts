/**
 * Dados normativos e metadados oficiais do Pack de Afiliado Twitch
 * Streamer: VulgoManiaco | Guilda: IVEXI | Albion Online
 */

export interface SubBadgeItem {
  id: string;
  tierName: string;
  duration: string;
  title: string;
  description: string;
  concept: string;
  masterUrl: string;
  size72Url: string;
  size36Url: string;
  size18Url: string;
}

export interface EmoteItem {
  id: string;
  code: string;
  name: string;
  category: 'piada_interna' | 'engajamento' | 'humor' | 'bonus';
  isInsideJoke?: boolean;
  description: string;
  contextUsage: string;
  masterUrl: string;
  size112Url: string;
  size56Url: string;
  size28Url: string;
}

export interface ChannelPointItem {
  id: string;
  name: string;
  description: string;
  suggestedName: string;
  masterUrl: string;
  size112Url: string;
  size56Url: string;
  size28Url: string;
}

export interface BitBadgeItem {
  id: string;
  bits: number;
  label: string;
  name: string;
  description: string;
  masterUrl: string;
  size72Url: string;
  size36Url: string;
  size18Url: string;
}

export const ZIP_DOWNLOAD_URL = '/assets/twitch/pack-afiliado-twitch-vulgomaniaco.zip';

export const SUB_BADGES_DATA: SubBadgeItem[] = [
  {
    id: 'sub-1m',
    tierName: 'Base / 1 Mês',
    duration: '1 Mês',
    title: 'Recruta do Bando',
    description: 'Corvinho filhote fofo saindo do ovo de corvo com runas roxas e bandana de novato.',
    concept: 'Início da jornada na guilda. Reconhece os novos membros e inscritos do canal.',
    masterUrl: '/assets/twitch/sub_badges/sub_1m_512_master.png',
    size72Url: '/assets/twitch/sub_badges/sub_1m_72x72.png',
    size36Url: '/assets/twitch/sub_badges/sub_1m_36x36.png',
    size18Url: '/assets/twitch/sub_badges/sub_1m_18x18.png',
  },
  {
    id: 'sub-2m',
    tierName: '2 Meses',
    duration: '2 Meses',
    title: 'Membro da Live',
    description: 'Corvo Chibi estiloso com o boné oficial da Guilda IVEXI virado para frente e moletom dark.',
    concept: 'Primeiros combates e fidelidade confirmada na Black Zone e no chat.',
    masterUrl: '/assets/twitch/sub_badges/sub_2m_512_master.png',
    size72Url: '/assets/twitch/sub_badges/sub_2m_72x72.png',
    size36Url: '/assets/twitch/sub_badges/sub_2m_36x36.png',
    size18Url: '/assets/twitch/sub_badges/sub_2m_18x18.png',
  },
  {
    id: 'sub-3m',
    tierName: '3 Meses',
    duration: '3 Meses',
    title: 'O Fardado (Capa IVEXI)',
    description: 'Corvo Chibi orgulhoso ostentando a Capa Oficial da Guilda IVEXI com franjas neon e brasão de ouro.',
    concept: 'Membro oficial fardado que honra as cores da guilda nas dungeons e no PvP.',
    masterUrl: '/assets/twitch/sub_badges/sub_3m_512_master.png',
    size72Url: '/assets/twitch/sub_badges/sub_3m_72x72.png',
    size36Url: '/assets/twitch/sub_badges/sub_3m_36x36.png',
    size18Url: '/assets/twitch/sub_badges/sub_3m_18x18.png',
  },
  {
    id: 'sub-6m',
    tierName: '6 Meses',
    duration: '6 Meses',
    title: 'Soldado do CTA',
    description: 'Corvo Chibi veterano com ombreiras de ferro, espada curta e armadura de cavaleiro de Albion.',
    concept: 'Membro de elite da guilda com presença garantida no CTA diário das 20h30.',
    masterUrl: '/assets/twitch/sub_badges/sub_6m_512_master.png',
    size72Url: '/assets/twitch/sub_badges/sub_6m_72x72.png',
    size36Url: '/assets/twitch/sub_badges/sub_6m_36x36.png',
    size18Url: '/assets/twitch/sub_badges/sub_6m_18x18.png',
  },
  {
    id: 'sub-9m',
    tierName: '9 Meses',
    duration: '9 Meses',
    title: 'Mestre Overcharge',
    description: 'Corvo Chibi em modo ENERGIZA com headset elétrico neon, raios de alta voltagem e energia sifada.',
    concept: 'Campeão da Black Zone de Albion, imbuído de poder e prestígio máximo.',
    masterUrl: '/assets/twitch/sub_badges/sub_9m_512_master.png',
    size72Url: '/assets/twitch/sub_badges/sub_9m_72x72.png',
    size36Url: '/assets/twitch/sub_badges/sub_9m_36x36.png',
    size18Url: '/assets/twitch/sub_badges/sub_9m_18x18.png',
  },
  {
    id: 'sub-1y',
    tierName: '1 Ano (12 Meses)',
    duration: '1 Ano',
    title: 'Imperador Supremo',
    description: 'Rei Corvo Chibi com a Coroa Imperial de Ouro e Asas, manto real e poder celestial absoluto.',
    concept: 'Lenda viva da comunidade! O grau mais nobre de lealdade ao canal.',
    masterUrl: '/assets/twitch/sub_badges/sub_1y_512_master.png',
    size72Url: '/assets/twitch/sub_badges/sub_1y_72x72.png',
    size36Url: '/assets/twitch/sub_badges/sub_1y_36x36.png',
    size18Url: '/assets/twitch/sub_badges/sub_1y_18x18.png',
  },
];

export const EMOTES_DATA: EmoteItem[] = [
  {
    id: 'vulgo-energiza',
    code: 'vulgoENERGIZA',
    name: 'Bota pra fora, energiza e monta!',
    category: 'piada_interna',
    isInsideJoke: true,
    description: 'Corvo Chibi em modo Overcharge, cercado de raios elétricos ciano/neon e a tag ENERGIZA!',
    contextUsage: 'A chamada oficial de combate de Albion Online antes de engajar no PvP e ganks!',
    masterUrl: '/assets/twitch/emotes/vulgoENERGIZA_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoENERGIZA_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoENERGIZA_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoENERGIZA_28x28.png',
  },
  {
    id: 'vulgo-monta',
    code: 'vulgoMONTA',
    name: 'Monta! (Bônus)',
    category: 'piada_interna',
    isInsideJoke: true,
    description: 'Corvo Chibi cavalgando com armadura medieval e espada erguida.',
    contextUsage: 'Momento de reagrupar o time e montar rápido na montaria blindada.',
    masterUrl: '/assets/twitch/emotes/vulgoMONTA_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoMONTA_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoMONTA_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoMONTA_28x28.png',
  },
  {
    id: 'vulgo-hype',
    code: 'vulgoHYPE',
    name: 'Hype da Live',
    category: 'engajamento',
    description: 'Corvo Chibi em chamas roxas vibrantes, fone piscando e tag neon HYPE!',
    contextUsage: 'Drops raros, chegada de raids, momentos épicos de vitória e sub trains.',
    masterUrl: '/assets/twitch/emotes/vulgoHYPE_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoHYPE_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoHYPE_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoHYPE_28x28.png',
  },
  {
    id: 'vulgo-gg',
    code: 'vulgoGG',
    name: 'GG / Vitória Honrosa',
    category: 'engajamento',
    description: 'Corvo Chibi com troféu de ouro brilhante e bandeira de vitória GG!',
    contextUsage: 'Finalização de lutas, vitórias em masmorras e encerramento de partidas.',
    masterUrl: '/assets/twitch/emotes/vulgoGG_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoGG_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoGG_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoGG_28x28.png',
  },
  {
    id: 'vulgo-rage',
    code: 'vulgoRAGE',
    name: 'Rage da Black Zone',
    category: 'humor',
    description: 'Corvo vermelho de raiva, teclado despedaçado e fumaça saindo do headset.',
    contextUsage: 'Quando morre gankado por 20 jogadores na Black Zone ou perde o set 8.3.',
    masterUrl: '/assets/twitch/emotes/vulgoRAGE_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoRAGE_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoRAGE_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoRAGE_28x28.png',
  },
  {
    id: 'vulgo-lurk',
    code: 'vulgoLURK',
    name: 'Lurk / Anti-Ghost',
    category: 'engajamento',
    description: 'Corvo ninja com capuz sombrio e olhos neon espiando por trás da folhagem.',
    contextUsage: 'Quem assiste quietinho no trabalho ou modo espião de emboscada.',
    masterUrl: '/assets/twitch/emotes/vulgoLURK_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoLURK_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoLURK_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoLURK_28x28.png',
  },
  {
    id: 'vulgo-rip',
    code: 'vulgoRIP',
    name: 'Perdeu o Set / RIP',
    category: 'bonus',
    description: 'Lápide em arco de pedra de Albion com pena roxa cravada e inscrição RIP.',
    contextUsage: 'Zoeira de morte no chat quando o loot é dropado para o inimigo.',
    masterUrl: '/assets/twitch/emotes/vulgoRIP_512_master.png',
    size112Url: '/assets/twitch/emotes/vulgoRIP_112x112.png',
    size56Url: '/assets/twitch/emotes/vulgoRIP_56x56.png',
    size28Url: '/assets/twitch/emotes/vulgoRIP_28x28.png',
  },
];

export const CHANNEL_POINTS_DATA: ChannelPointItem = {
  id: 'moeda-ivexi',
  name: 'Moeda Rúnica da Guilda IVEXI',
  description: 'Moeda de ouro com aro rúnico, brasão do corvo gravado e centro em ametista.',
  suggestedName: 'Prata de Albion ou Energia IVEXI',
  masterUrl: '/assets/twitch/channel_points/moeda_ivexi_512_master.png',
  size112Url: '/assets/twitch/channel_points/moeda_ivexi_112x112.png',
  size56Url: '/assets/twitch/channel_points/moeda_ivexi_56x56.png',
  size28Url: '/assets/twitch/channel_points/moeda_ivexi_28x28.png',
};

export const BIT_BADGES_DATA: BitBadgeItem[] = [
  {
    id: 'bits-1',
    bits: 1,
    label: '1 Bit',
    name: 'Fragmento Rúnico de Pedra',
    description: 'Pedra de cantaria rúnica de Albion com glifo místico gravado.',
    masterUrl: '/assets/twitch/bit_badges/bits_1_512_master.png',
    size72Url: '/assets/twitch/bit_badges/bits_1_72x72.png',
    size36Url: '/assets/twitch/bit_badges/bits_1_36x36.png',
    size18Url: '/assets/twitch/bit_badges/bits_1_18x18.png',
  },
  {
    id: 'bits-100',
    bits: 100,
    label: '100 Bits',
    name: 'Prisma de Ferro e Prata',
    description: 'Metal trabalhado com inserção de esmalte roxo e reflexo prateado.',
    masterUrl: '/assets/twitch/bit_badges/bits_100_512_master.png',
    size72Url: '/assets/twitch/bit_badges/bits_100_72x72.png',
    size36Url: '/assets/twitch/bit_badges/bits_100_36x36.png',
    size18Url: '/assets/twitch/bit_badges/bits_100_18x18.png',
  },
  {
    id: 'bits-1000',
    bits: 1000,
    label: '1.000 Bits',
    name: 'Ametista Facetada IVEXI',
    description: 'Gema facetada pura em corte de diamante com aura púrpura.',
    masterUrl: '/assets/twitch/bit_badges/bits_1000_512_master.png',
    size72Url: '/assets/twitch/bit_badges/bits_1000_72x72.png',
    size36Url: '/assets/twitch/bit_badges/bits_1000_36x36.png',
    size18Url: '/assets/twitch/bit_badges/bits_1000_18x18.png',
  },
  {
    id: 'bits-5000',
    bits: 5000,
    label: '5.000 Bits',
    name: 'Cristal Duplo de Ouro e Ametista',
    description: 'Torres gêmeas de cristal sustentadas por engaste dourado com brilho estelar.',
    masterUrl: '/assets/twitch/bit_badges/bits_5000_512_master.png',
    size72Url: '/assets/twitch/bit_badges/bits_5000_72x72.png',
    size36Url: '/assets/twitch/bit_badges/bits_5000_36x36.png',
    size18Url: '/assets/twitch/bit_badges/bits_5000_18x18.png',
  },
  {
    id: 'bits-10000',
    bits: 10000,
    label: '10.000 Bits',
    name: 'Relíquia Ancestral de Fogo Místico',
    description: 'Cálice imperial alado com chama mística eterna de alta nobreza.',
    masterUrl: '/assets/twitch/bit_badges/bits_10000_512_master.png',
    size72Url: '/assets/twitch/bit_badges/bits_10000_72x72.png',
    size36Url: '/assets/twitch/bit_badges/bits_10000_36x36.png',
    size18Url: '/assets/twitch/bit_badges/bits_10000_18x18.png',
  },
];
