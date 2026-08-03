/**
 * "As fases do game" — as 5 etapas do processo seletivo.
 *
 * Mora aqui, e não dentro da seção, porque a timeline, o llms.txt e as tools do
 * WebMCP contam a mesma história. As datas têm de bater com INSCRICOES_ABREM /
 * INSCRICOES_FECHAM / INICIO_NA_EMPRESA em src/data/site.ts.
 *
 * `icone` é o nome do arquivo em images/timeline/ e `cor` é a chave do mapa de
 * cores da seção — os dois só interessam ao render.
 */

export interface Fase {
  icone: string;
  titulo: string;
  data: string;
  cor: 'sky-dark' | 'sky' | 'sky-mid';
}

export const FASES: Fase[] = [
  { icone: 'tl-1', titulo: 'Inscrições', data: 'De 05/08 a 04/09', cor: 'sky-dark' },
  { icone: 'tl-2', titulo: 'Desafio de Vídeo', data: 'Setembro', cor: 'sky' },
  { icone: 'tl-3', titulo: 'Dinâmicas Online', data: 'Setembro e outubro', cor: 'sky-mid' },
  { icone: 'tl-4', titulo: 'Entrevistas Online', data: 'Setembro e outubro', cor: 'sky-dark' },
  { icone: 'tl-5', titulo: 'Início na Empresa', data: 'Janeiro', cor: 'sky' },
];
