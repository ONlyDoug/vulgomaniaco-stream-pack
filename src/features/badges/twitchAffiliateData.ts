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
