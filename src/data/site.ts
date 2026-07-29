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
  { label: 'Pré Requisitos', href: '#pre-requisitos' },
  { label: 'Localidades', href: '#localidades' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Jornada', href: '#jornada' },
] as const;

/** TODO: substituir pelos perfis reais (ver PROJECT.md) */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: 'Instagram' },
  { label: 'Facebook', href: '#', icon: 'Facebook' },
  { label: 'LinkedIn', href: '#', icon: 'LinkedIn' },
  { label: 'TikTok', href: '#', icon: 'TikTok' },
] as const;

/** TODO: substituir pelas URLs reais (ver PROJECT.md) */
export const LEGAL_LINKS = [
  { label: 'Aviso de Cookies', href: '#' },
  { label: 'Política de Privacidade', href: '#' },
] as const;
