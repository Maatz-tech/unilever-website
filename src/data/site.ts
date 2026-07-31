/**
 * Dados compartilhados do site — definidos UMA vez, importados onde precisa.
 * Regra do playbook (Fase 6, DRY): listas de nav/social/legal moram aqui.
 */

/** URL do formulário de inscrição. TODO: confirmar destino real (ver PROJECT.md) */
export const INSCRICAO_URL = '#inscricao';

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
 * mais. Facebook e TikTok saíram por não terem endereço; os componentes de
 * ícone continuam no projeto, então voltar é acrescentar a linha aqui.
 */
export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/unilever/', icon: 'LinkedIn' },
  { label: 'Instagram', href: 'https://www.instagram.com/carreirasunilever/reels/', icon: 'Instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@carreirasunilever', icon: 'YouTube' },
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
