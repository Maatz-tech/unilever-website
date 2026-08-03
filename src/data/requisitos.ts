/**
 * Pré-requisitos do programa — copy conferida contra o Figma (4188:12133).
 *
 * Mora aqui, e não dentro da seção, porque três lugares leem a mesma lista: os
 * cards de RequisitosSection, o JobPosting do JSON-LD e as tools do WebMCP.
 */

export interface Requisito {
  icone: string;
  titulo: string;
  texto: string;
}

export const REQUISITOS: Requisito[] = [
  {
    icone: `${import.meta.env.BASE_URL}images/icons/req-graduacao.svg`,
    titulo: 'Graduação em andamento',
    texto:
      'Cursando alguma Instituição de Ensino Superior – Bacharel, Licenciatura ou Tecnólogo, com previsão de conclusão entre 12/2027 e 12/2028.',
  },
  {
    icone: `${import.meta.env.BASE_URL}images/icons/req-hibrido.svg`,
    titulo: 'Formato híbrido e presencial',
    texto: 'Ter disponibilidade para estagiar em formato híbrido e presencial.',
  },
  {
    icone: `${import.meta.env.BASE_URL}images/icons/req-horas.svg`,
    titulo: '30 horas semanais',
    texto: 'Ter disponibilidade para estagiar 30 horas semanais, sem compensação de horas (6h diárias).',
  },
];
