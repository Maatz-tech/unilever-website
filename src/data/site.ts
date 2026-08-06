/**
 * Dados compartilhados do site — definidos UMA vez, importados onde precisa.
 * Regra do playbook (Fase 6, DRY): listas de nav/social/legal moram aqui.
 */

/** Formulário de inscrição, na plataforma da Eureca. */
export const INSCRICAO_URL = 'https://app.eureca.me/programas/019f413b-d816-74d6-bd34-8573ea9014cf/';

/**
 * Datas do processo, confirmadas pelo cliente: inscrições de 05/08 a 04/09 de
 * 2026 e início na empresa em janeiro de 2027 — daí o nome do programa. Têm de
 * bater com a seção "As fases do game" (src/data/jornada.ts).
 *
 * Formato ISO porque quem consome primeiro é o JSON-LD do JobPosting; o texto
 * legível para humano fica em DATAS_LEGIVEIS.
 */
export const INSCRICOES_ABREM = '2026-08-05';
export const INSCRICOES_FECHAM = '2026-09-04T23:59:59-03:00';
export const INICIO_NA_EMPRESA = '2027-01-01';

/** As mesmas datas escritas como a página fala delas. */
export const DATAS_LEGIVEIS = {
  inscricoes: 'de 05/08/2026 a 04/09/2026',
  inicio: 'janeiro de 2027',
} as const;

/**
 * Origem de tudo que sai daqui: é sempre este hotsite. Fica numa constante
 * porque quem lê o relatório é o analytics do site de destino, onde um
 * `hotsite` genérico não diria de qual.
 */
const UTM_SOURCE = 'hotsite-unilever';

/**
 * UTMs fixas de tudo que sai do hotsite para a Eureca. O que varia entre um
 * CTA e outro é só o `utm_content`, que diz de QUAL bloco da página a pessoa
 * saiu — é o que permite ler no relatório qual seção converte.
 */
const UTM_BASE = {
  utm_source: UTM_SOURCE,
  utm_medium: 'cta',
  utm_campaign: 'estagio-unilever-2027',
} as const;

/**
 * Monta o link de inscrição carimbado com a origem.
 * `origem` usa o id da seção (ou `header`/`hero`) para o relatório bater com a
 * âncora do menu.
 */
export function inscricaoUrl(origem: string): string {
  const params = new URLSearchParams({ ...UTM_BASE, utm_content: origem });
  return `${INSCRICAO_URL}?${params}`;
}

/**
 * Links de rodapé que saem para site institucional, não para o formulário.
 * Mesma origem dos CTAs; o que muda é o `utm_medium` (footer, não cta) e o
 * `utm_content`, que separa qual dos dois logos do rodapé foi clicado.
 */
const UTM_RODAPE = `utm_source=${UTM_SOURCE}&utm_medium=footer`;

/** Logo da Unilever no rodapé. */
export const UNILEVER_URL = `https://www.unilever.com.br/?${UTM_RODAPE}&utm_campaign=estagio-unilever-2027&utm_content=logo-unilever`;

/** Logo da Eureca no rodapé. */
export const EURECA_URL = `https://eureca.me/?${UTM_RODAPE}&utm_campaign=estagio-unilever-2027&utm_content=logo-eureca`;

/**
 * Assinatura do rodapé. Único link com origem própria: no analytics da Maatz
 * o que identifica este trabalho é o par de clientes, não o nome do hotsite.
 */
export const MAATZ_URL =
  'https://maatz.com.br/?utm_source=unilever-eureca&utm_medium=footer&utm_campaign=portfolio';

/**
 * Vídeo do programa — reel do Instagram (@projectsunlightbr).
 * O shortcode é o trecho depois de `/p/` na URL do post.
 */
export const VIDEO_INSTAGRAM_SHORTCODE = 'DbqaueUAi9r';

export const NAV_LINKS = [
  { label: 'O programa', href: '#o-programa' },
  { label: 'A Unilever', href: '#a-unilever' },
  { label: 'Pré-requisitos', href: '#pre-requisitos' },
  { label: 'Localidades', href: '#localidades' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Jornada', href: '#jornada' },
] as const;

/**
 * Lista e ordem vieram fechadas do cliente — o rodapé renderiza isto e nada
 * mais. O TikTok segue de fora por não ter endereço; o componente de ícone
 * continua no projeto, então voltar é acrescentar a linha aqui.
 *
 * O `label` vira aria-label e title de cada link.
 */
export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/carreirasunilever/reels/',
    icon: 'Instagram',
  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/unilever', icon: 'LinkedIn' },
  { label: 'YouTube', href: 'https://www.youtube.com/user/projectsunlightBR', icon: 'YouTube' },
  { label: 'Facebook', href: 'https://www.facebook.com/unilever', icon: 'Facebook' },
  { label: 'X', href: 'https://x.com/UnileverBrasil', icon: 'X' },
] as const;

/** Avisos oficiais da Unilever (versão Brasil / português) */
export const LEGAL_LINKS = [
  {
    label: 'Aviso de Cookies',
    href: 'https://www.unilevernotices.com/cookie-notices/brazil-portuguese.html',
  },
  {
    label: 'Política de Privacidade',
    href: 'https://www.unilevernotices.com/privacy-notices/brazil-portuguese.html',
  },
] as const;
