/**
 * Tokens de movimento — fonte única de verdade das animações.
 * Ver Fase 6.5 do PLAYBOOK.md.
 *
 * Nunca espalhar `duration: 0.63` mágico pelas seções: importe daqui.
 */

/** ease-out expo — curva padrão do projeto */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** ease-in-out suave, para loops (marquee, autoplay) */
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

export const DUR = {
  fast: 0.25, // micro-interação
  base: 0.45, // entrada de elemento
  slow: 0.7, // transição de slide
} as const;

/** Quanto do elemento precisa estar visível para disparar o reveal */
export const IN_VIEW_AMOUNT = 0.3;

/** Delay entre itens de uma lista */
export const STAGGER = 0.08;

/** Presets declarativos — para uso com motion/react */
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.base, ease: EASE },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DUR.base, ease: EASE },
} as const;

/** True quando o usuário pediu menos movimento. Sempre checar antes de animar. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reveal de scroll — fade + subida + desfoque.
 *
 * O blur é a assinatura do projeto (veio do `BlurIn` da versão React): sem ele
 * a entrada fica seca. Duração 0.7s para dar tempo do desfoque ser percebido.
 *
 * O estado inicial (invisível) vem do CSS, condicionado à classe `.js` que o
 * Base.astro põe no <html>. Assim:
 *   - com JS  → o elemento já nasce invisível, sem piscar ao entrar na tela
 *   - sem JS  → a regra não se aplica e o conteúdo aparece normalmente
 *
 *   import { revealOnScroll } from '../lib/motion';
 *   revealOnScroll('#secao [data-reveal]');
 */
export async function revealOnScroll(selector: string) {
  const alvos = document.querySelectorAll<HTMLElement>(selector);
  if (!alvos.length) return;

  // sem animação: mostra tudo e sai
  if (prefersReducedMotion()) return mostrar(alvos);

  const { animate, inView } = await import('motion');

  inView(
    selector,
    (el) => {
      animate(
        el,
        { opacity: [0, 1], y: [24, 0], filter: ['blur(10px)', 'blur(0px)'] },
        { duration: 0.7, ease: EASE }
      );
    },
    { amount: IN_VIEW_AMOUNT }
  );
}

/**
 * Igual ao revealOnScroll, mas escalona os filhos diretos do container —
 * usado onde o design tem uma lista (cards de pré-requisitos, benefícios).
 */
export async function revealStagger(selector: string, passo = 0.13) {
  const container = document.querySelector<HTMLElement>(selector);
  if (!container) return;

  const filhos = Array.from(container.children) as HTMLElement[];
  if (prefersReducedMotion()) return mostrar(filhos);

  const { animate, inView, stagger } = await import('motion');

  inView(
    selector,
    () => {
      animate(
        filhos,
        { opacity: [0, 1], y: [28, 0], filter: ['blur(10px)', 'blur(0px)'] },
        { duration: 0.6, ease: EASE, delay: stagger(passo) }
      );
    },
    { amount: 0.25 }
  );
}

/**
 * Título revelado palavra a palavra com desfoque — o "TextReveal" do projeto
 * anterior. As palavras já vêm em <span data-palavra> do componente
 * RevealText.astro, então não há reflow no cliente.
 */
export async function revealWords(selector: string, passo = 0.045) {
  const titulo = document.querySelector<HTMLElement>(selector);
  if (!titulo) return;

  const palavras = Array.from(titulo.querySelectorAll<HTMLElement>('[data-palavra]'));
  if (!palavras.length) return;

  if (prefersReducedMotion()) return mostrar([titulo, ...palavras]);

  const { animate, inView, stagger } = await import('motion');

  inView(
    selector,
    () => {
      titulo.style.opacity = '1';
      animate(
        palavras,
        { opacity: [0, 1], y: [14, 0], filter: ['blur(8px)', 'blur(0px)'] },
        { duration: 0.55, ease: EASE, delay: stagger(passo) }
      );
    },
    { amount: 0.5 }
  );
}

/** Tira o estado inicial invisível (usado quando não vamos animar). */
function mostrar(els: ArrayLike<HTMLElement>) {
  for (const el of Array.from(els)) {
    el.style.opacity = '1';
    el.style.filter = 'none';
    el.style.transform = 'none';
  }
}
