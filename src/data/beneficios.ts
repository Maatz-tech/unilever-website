/**
 * Benefícios — copy conferida contra o Figma (4188:12263 / 4204:19129).
 *
 * ATENÇÃO: no projeto React anterior os 4 pilares estavam com **Lorem ipsum**.
 * Os textos abaixo são os reais, extraídos do design.
 */

export interface Pilar {
  icone: string;
  titulo: string;
  texto: string;
}

export const PILARES: Pilar[] = [
  {
    icone: `${import.meta.env.BASE_URL}images/icons/read-cv.svg`,
    titulo: 'Experiência',
    texto:
      'Atue em projetos reais, com desafios que impactam marcas presentes na rotina de milhões de pessoas.',
  },
  {
    icone: `${import.meta.env.BASE_URL}images/icons/chats.svg`,
    titulo: 'Mentorias',
    texto:
      'Aprenda com lideranças e profissionais experientes, com trocas que apoiam seu desenvolvimento e suas decisões de carreira.',
  },
  {
    icone: `${import.meta.env.BASE_URL}images/icons/globe.svg`,
    titulo: 'Oportunidades internacionais',
    texto:
      'Conecte-se a uma empresa global, amplie sua visão de negócio e tenha contato com diferentes mercados e culturas.',
  },
  {
    icone: `${import.meta.env.BASE_URL}images/icons/rocket.svg`,
    titulo: 'Desenvolvimento',
    texto:
      'Fortaleça habilidades como visão de negócio, gestão de tempo, storytelling, aprendizagem contínua e uso de inteligência artificial.',
  },
];

export const BENEFICIOS: { icone: string; texto: string }[] = [
  { icone: `${import.meta.env.BASE_URL}images/icons/heartbeat.svg`, texto: 'Vale bem-estar (TotalPass)' },
  { icone: `${import.meta.env.BASE_URL}images/icons/bowl.svg`, texto: 'Vale Refeição ou restaurante no local' },
  { icone: `${import.meta.env.BASE_URL}images/icons/van.svg`, texto: 'Fretados para as fábricas*' },
  { icone: `${import.meta.env.BASE_URL}images/icons/car.svg`, texto: 'Auxílio transporte' },
  { icone: `${import.meta.env.BASE_URL}images/icons/stethoscope.svg`, texto: 'Convênio Médico' },
  { icone: `${import.meta.env.BASE_URL}images/icons/tooth.svg`, texto: 'Convênio Odontológico' },
  { icone: `${import.meta.env.BASE_URL}images/icons/graduation-cap.svg`, texto: 'Plataformas de Cursos CIEE' },
  { icone: `${import.meta.env.BASE_URL}images/icons/hand-heart.svg`, texto: 'Seguro de Vida' },
  { icone: `${import.meta.env.BASE_URL}images/icons/id-card.svg`, texto: 'Suporte na retificação de documentos de pessoas trans' },
  { icone: `${import.meta.env.BASE_URL}images/icons/idiomas.svg`, texto: 'Incentivo para cursos e idiomas' },
];
