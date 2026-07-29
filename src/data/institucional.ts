/**
 * Slides do carrossel institucional (seção azul).
 *
 * Textos conferidos contra os nós 4188:12513 · 12523 · 12533 · 12541 · 12551.
 * As fotos vieram do render do Figma — as do projeto React anterior eram
 * outras (as 5 divergiam).
 */

export interface SlideInstitucional {
  titulo: string;
  /** pode conter <strong> para os trechos em negrito do Figma */
  corpo: string;
  foto: string;
  alt: string;
}

export const INSTITUCIONAL: SlideInstitucional[] = [
  {
    titulo: 'Na Unilever, acreditamos no poder de se entregar para fazer acontecer.',
    corpo:
      'É esse movimento que nos trouxe até aqui: somos uma das maiores empresas de bens de consumo do mundo, com mais de <strong>400 marcas presentes em cerca de 190 países e produtos usados por 3,4 bilhões de pessoas</strong> todos os dias.',
    foto: `${import.meta.env.BASE_URL}images/inst/inst-1.webp`,
    alt: 'Estagiária apresentando um produto Seda em um salão',
  },
  {
    titulo: 'Há 95 anos fazemos parte da vida dos brasileiros,',
    corpo:
      'transformando o dia a dia em algo especial. E isso vale tanto para quem consome nossas marcas quanto para quem cresce com a gente.',
    foto: `${import.meta.env.BASE_URL}images/inst/inst-2.webp`,
    alt: 'Duas pessoas cozinhando juntas',
  },
  {
    titulo: 'Aqui, desenvolvimento e impacto caminham juntos, todos os dias.',
    corpo: '',
    foto: `${import.meta.env.BASE_URL}images/inst/inst-3.webp`,
    alt: 'Time comemorando em reunião',
  },
  {
    titulo: 'Somos um grande laboratório de experiências:',
    corpo:
      'Combinamos excelência, inovação, alta performance e um compromisso inegociável com sustentabilidade. Hoje, atuamos com 92% de energia renovável, 72% de redução absoluta de emissões de gases de efeito estufa e 97% do fornecimento global é livre de desmatamento.',
    foto: `${import.meta.env.BASE_URL}images/inst/inst-4.webp`,
    alt: 'Profissional trabalhando em laboratório',
  },
  {
    titulo: 'Valorizamos quem se importa, pensa à frente e foca no que importa.',
    corpo:
      'Nomes como OMO, Dove, TRESemmé, Hellmann’s e Rexona são apenas alguns exemplos de marcas que entregam tudo: cuidado, força, sabor, beleza real e conforto. E essa entrega vai além dos produtos: está também nas oportunidades que criamos para quem quer crescer com a gente.',
    foto: `${import.meta.env.BASE_URL}images/inst/inst-5.webp`,
    alt: 'Time colaborando em frente ao computador',
  },
];
