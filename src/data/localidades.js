/**
 * Estados, cidades e áreas de atuação do programa.
 *
 * Lista fechada pelo cliente em 30/07/2026: são três estados, e cada cidade tem
 * suas próprias áreas — não existe uma lista de áreas por estado. O modal de
 * "Confira as áreas" é montado a partir daqui.
 *
 * `pino` é o centro do path do estado no viewBox do mapa (613×639), medido no
 * SVG renderizado. É onde nasce o pino pulsante, então acompanha o estado: se a
 * lista mudar, o mapa muda com ela.
 */

export const localidades = [
  {
    uf: 'sp',
    nome: 'São Paulo',
    pino: { cx: 395.9, cy: 441.7 },
    cidades: [
      {
        nome: 'São Paulo',
        areas: [
          'Marketing',
          'Trade Marketing',
          'Recursos Humanos',
          'Tecnologia da Informação',
          'Jurídico',
          'Finanças',
          'Análise de Dados',
          'Inteligência de Mercado',
          'Compras',
          'Supply Chain',
          'Pesquisa & Desenvolvimento',
        ],
      },
      { nome: 'Valinhos', areas: ['Recursos Humanos', 'Pesquisa & Desenvolvimento', 'Supply Chain'] },
      { nome: 'Louveira', areas: ['Sustentabilidade'] },
      { nome: 'Aguaí', areas: ['Supply Chain'] },
      { nome: 'Indaiatuba', areas: ['Supply Chain'] },
    ],
  },
  {
    uf: 'mg',
    nome: 'Minas Gerais',
    pino: { cx: 446.1, cy: 376.2 },
    cidades: [
      { nome: 'Pouso Alegre', areas: ['Supply Chain', 'Recursos Humanos'] },
      { nome: 'Belo Horizonte', areas: ['Vendas'] },
    ],
  },
  {
    uf: 'pe',
    nome: 'Pernambuco',
    pino: { cx: 560.9, cy: 212.5 },
    cidades: [
      { nome: 'Igarassu', areas: ['Supply Chain'] },
      { nome: 'Recife', areas: ['Vendas'] },
    ],
  },
]
