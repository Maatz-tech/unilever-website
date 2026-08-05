/**
 * brasil-base.svg — os 24 estados FORA do programa, como imagem estática.
 *
 * Por que existe: os 27 <path> do mapa somam 63 KB e, inline no HTML, eram um
 * terço do documento — 54 KB deles apenas desenho, sem interação, e abaixo da
 * dobra. Aqui eles saem do HTML e viram um arquivo próprio: o browser busca em
 * paralelo, cacheia por conta e o first paint não espera por ele.
 *
 * Os 3 estados do programa (SP, MG, PE) continuam inline no
 * LocalidadesSection: são clicáveis, focáveis por teclado e mudam de cor, então
 * precisam do CSS e dos eventos da página.
 *
 * Gerado no build a partir de brasilPaths.js, e não commitado à mão de
 * propósito: mudou o mapa ou a lista de localidades, este arquivo muda junto.
 *
 * A cor está escrita literal porque SVG carregado via <img> não enxerga o CSS
 * do documento — var(--color-map-off) chegaria vazio. Se o token mudar em
 * global.css, mude aqui também; é o único lugar onde ele está duplicado.
 */

import type { APIRoute } from 'astro';
import { VIEWBOX, ufPaths } from '../../../data/brasilPaths.js';
import { localidades } from '../../../data/localidades.js';

/** Espelha --color-map-off de src/styles/global.css. */
const COR_OFF = '#e5eff9';

export const GET: APIRoute = () => {
  const noPrograma = new Set(localidades.map((l: { uf: string }) => l.uf));
  const decorativos = ufPaths.filter((p: { uf: string }) => !noPrograma.has(p.uf));

  const paths = decorativos
    .map((p: { d: string }) => `<path d="${p.d}" fill="${COR_OFF}" stroke="#fff" stroke-width="1"/>`)
    .join('');

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" ` +
    `role="img" aria-label="Mapa do Brasil">${paths}</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
