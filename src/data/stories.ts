/**
 * Depoimentos dos stories — material real entregue pelo cliente.
 *
 * A ordem é a dos cards no Figma (esquerda para a direita, de cima para baixo),
 * conforme veio na entrega. Os nomes estão na forma escolhida para exibição.
 *
 * Cada pessoa tem DUAS fotos, e elas não são recortes da mesma imagem: a de
 * perfil é o avatar do anel na faixa e do cabeçalho do card; a de stories é a
 * vertical 9/16 que preenche o card aberto.
 *
 * As áreas de atuação não vieram na entrega — por isso não existe mais o campo
 * `area` que o rascunho tinha.
 */

export interface Story {
  nome: string;
  /** vertical 9/16, preenche o card do visualizador */
  foto: string;
  /** quadrada, vai no anel da faixa e no cabeçalho do card */
  avatar: string;
  depoimento: string;
}

const foto = (slug: string) => `${import.meta.env.BASE_URL}images/stories/${slug}.webp`;
const avatar = (slug: string) => `${import.meta.env.BASE_URL}images/stories/${slug}-avatar.webp`;

export const STORIES: Story[] = [
  {
    nome: 'Bruna Falci',
    foto: foto('bruna'),
    avatar: avatar('bruna'),
    depoimento:
      'Trabalhar na Unilever tem sido uma experiência enriquecedora, marcada por aprendizados constantes e desafios que impulsionam o meu crescimento. Aqui, tenho também o privilégio de conhecer pessoas incríveis, sempre dispostas a apoiar, compartilhar conhecimento e contribuir para o meu desenvolvimento, o que torna essa jornada ainda mais especial!',
  },
  {
    nome: 'Lorena Marques',
    foto: foto('lorena'),
    avatar: avatar('lorena'),
    depoimento:
      'Trabalhar na Unilever é sentir cada emoção de corpo e alma. É preciso ter o coração aberto para as surpresas e as realizações do caminho. Espero que o seu esteja pronto!',
  },
  {
    nome: 'Ana Beatriz',
    foto: foto('ana'),
    avatar: avatar('ana'),
    depoimento:
      'Minha jornada na Unilever tem sido cheia de aprendizados, desafios e pessoas incríveis. Aqui, me sinto acolhida para crescer, desenvolver novas habilidades e fazer parte de um time que realmente faz a diferença.',
  },
  {
    nome: 'Murilo Andrade',
    foto: foto('murilo'),
    avatar: avatar('murilo'),
    depoimento:
      'Trabalhar na Unilever é sentir-se acolhido e pertencer a um time de pessoas extraordinárias.',
  },
  {
    nome: 'Isabela Guimarães',
    foto: foto('isabela'),
    avatar: avatar('isabela'),
    depoimento:
      'Ser estagiária na Unilever é ter a certeza de que nenhum dia será igual ao outro e que grandes desafios sempre vão aparecer. É um ambiente que me dá a liberdade para construir a minha própria jornada, onde cada obstáculo superado me faz crescer e ter a certeza de que estou no lugar certo.',
  },
  {
    nome: 'Douglas Hamasaki',
    foto: foto('douglas'),
    avatar: avatar('douglas'),
    depoimento:
      'Trabalhar na Unilever é ter o desafio de melhorar todo dia e sentir o acolhimento das pessoas o tempo todo.',
  },
  {
    nome: 'Amanda Fonseca',
    foto: foto('amanda'),
    avatar: avatar('amanda'),
    depoimento:
      'Trabalhar na Unilever é ter a liberdade de construir seu caminho enquanto gera impacto e aprende constantemente.',
  },
  {
    nome: 'Maitê Santos',
    foto: foto('maite'),
    avatar: avatar('maite'),
    depoimento:
      'Ser estagiária na Unilever é trabalhar em um ambiente que valoriza a autenticidade e acredita que as diferenças nos tornam mais fortes. É aprender todos os dias, ter voz para contribuir com ideias e crescer ao lado de pessoas que enxergam a diversidade como um diferencial que soma ao negócio e às equipes.',
  },
  {
    nome: 'Silas Fernando',
    foto: foto('silas'),
    avatar: avatar('silas'),
    depoimento:
      'Estagiar na Unilever significa crescimento, onde consigo exercer o ápice do meu desempenho e das minhas entregas. Tenho aprendido todos os dias, me desenvolvido e me aproximado cada vez mais do profissional que desejo ser. Aqui, eu posso realizar meus sonhos.',
  },
  {
    nome: 'Kizie Karoline',
    foto: foto('kizie'),
    avatar: avatar('kizie'),
    depoimento:
      'Ser Estag na Unilever é conhecer um novo mundo de oportunidades, ser desafiada e encorajada a buscar o melhor a cada entrega, e que cada entrega importa muito. Sempre com apoio e autonomia certa para o aprendizado e desenvolvimento.',
  },
  {
    nome: 'Victória Campos',
    foto: foto('victoria'),
    avatar: avatar('victoria'),
    depoimento:
      'Não é sobre ter uma carreira na Unilever, e sim ter a Unilever em sua carreira. A maior troca é aquela em que você entende o valor do ambiente e a troca genuína da cultura da empresa.',
  },
  {
    nome: 'Camila Fischer',
    foto: foto('camila'),
    avatar: avatar('camila'),
    depoimento:
      'Minha jornada na Unilever tem sido marcada por aprendizado constante, desafios inspiradores e muitas conexões. Aqui, encontrei um ambiente que valoriza novas perspectivas, incentiva o desenvolvimento profissional e me permite contribuir de forma significativa enquanto construo minha carreira.',
  },
  {
    nome: 'Lucas Epitácio',
    foto: foto('lucas'),
    avatar: avatar('lucas'),
    depoimento:
      'Trabalhar na Unilever está sendo aprender que marketing vai muito além de vender produtos. É construir marcas que fazem parte da rotina das pessoas, do sabonete à maionese, e saber que cada projeto pode impactar a vida de milhões de brasileiros.',
  },
  {
    nome: 'Sarah Fernandes',
    foto: foto('sarah'),
    avatar: avatar('sarah'),
    depoimento:
      'Estagiar na Unilever é uma experiência incrível, cheia de descobertas e aprendizados a cada dia! Aqui, estou cercada de pessoas incríveis, que fazem questão de contribuir para o meu crescimento diariamente.',
  },
];
