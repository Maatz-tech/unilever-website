/**
 * Dados compartilhados do site — definidos UMA vez, importados onde precisa.
 * Regra do playbook (Fase 6, DRY): listas de nav/social/legal moram aqui.
 */

/** Formulário de inscrição, na plataforma da Eureca. */
export const INSCRICAO_URL = 'https://app.eureca.me/programas/019f413b-d816-74d6-bd34-8573ea9014cf/';

/**
 * UTMs fixas de tudo que sai do hotsite para a Eureca. O que varia entre um
 * CTA e outro é só o `utm_content`, que diz de QUAL bloco da página a pessoa
 * saiu — é o que permite ler no relatório qual seção converte.
 */
const UTM_BASE = {
  utm_source: 'hotsite',
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

/** Assinatura do rodapé. UTMs próprias: aqui a origem é o site, não o CTA. */
export const MAATZ_URL =
  'https://maatz.com.br/?utm_source=unilever-eureca&utm_medium=footer&utm_campaign=portfolio';

/**
 * Vídeo do programa no YouTube.
 * TODO: trocar pelo vídeo de 2027 quando o cliente entregar (ver PROJECT.md).
 */
export const VIDEO_YOUTUBE_ID = 'rHH1sZPhw9U';

export const NAV_LINKS = [
  { label: 'O programa', href: '#o-programa' },
  { label: 'A Unilever', href: '#a-unilever' },
  { label: 'Pré-requisitos', href: '#pre-requisitos' },
  { label: 'Localidades', href: '#localidades' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Jornada', href: '#jornada' },
] as const;

/**
 * Só entram redes com link de verdade — o rodapé renderiza esta lista e nada
 * mais. O TikTok segue de fora por não ter endereço; o componente de ícone
 * continua no projeto, então voltar é acrescentar a linha aqui.
 *
 * São DOIS Instagram de propósito: o de carreiras (conteúdo do programa) e o
 * institucional do Brasil. Como o ícone é o mesmo nos dois, o `label` precisa
 * diferenciar — ele vira aria-label e title, que é o que separa um do outro
 * para leitor de tela e no hover.
 */
export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/unilever/', icon: 'LinkedIn' },
  {
    label: 'Instagram Carreiras Unilever',
    href: 'https://www.instagram.com/carreirasunilever/reels/',
    icon: 'Instagram',
  },
  {
    label: 'Instagram Unilever Brasil',
    href: 'https://www.instagram.com/unileverbrasil',
    icon: 'Instagram',
  },
  {
    label: 'YouTube Carreiras Unilever',
    href: 'https://www.youtube.com/@carreirasunilever',
    icon: 'YouTube',
  },
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
