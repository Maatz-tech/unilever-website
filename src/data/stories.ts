/**
 * Depoimentos dos stories.
 *
 * Migrado do projeto React anterior (../unilever). Os nomes, áreas e textos
 * são de rascunho — o Figma também mostra placeholder ("Lorena Marques",
 * "Bruna Henriques"). Substituir quando o cliente entregar o material real.
 */

export interface Story {
  nome: string;
  area: string;
  foto: string;
  depoimento: string;
}

export const STORIES: Story[] = [
  {
    nome: 'Lorena Marques',
    area: 'Marketing',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-01.webp`,
    depoimento:
      'Desde a primeira semana eu já estava dentro de um projeto de verdade. Aqui ninguém te deixa jogando sozinha.',
  },
  {
    nome: 'Caio Ribeiro',
    area: 'Supply Chain',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-02.webp`,
    depoimento:
      'O que mais me surpreendeu foi a autonomia. Meu gestor confia no meu trabalho e me desafia todos os dias.',
  },
  {
    nome: 'Marina Duarte',
    area: 'Finanças',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-03.webp`,
    depoimento:
      'Entrei achando que ia só aprender planilha. Hoje apresento resultados direto pra liderança da área.',
  },
  {
    nome: 'Pedro Nakamura',
    area: 'Tecnologia',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-04.webp`,
    depoimento:
      'Trabalhar com marcas que estão na casa de milhões de pessoas muda completamente a sua noção de impacto.',
  },
  {
    nome: 'Júlia Fontes',
    area: 'Pesquisa & Desenvolvimento',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-05.webp`,
    depoimento:
      'No laboratório, cada teste vira aprendizado. É ciência aplicada no produto que chega na gôndola.',
  },
  {
    nome: 'Rafael Teixeira',
    area: 'Vendas',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-06.webp`,
    depoimento:
      'O programa me colocou em campo desde cedo. Visitar o ponto de venda é onde o game acontece de verdade.',
  },
  {
    nome: 'Bianca Rocha',
    area: 'Recursos Humanos',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-07.webp`,
    depoimento:
      'A cultura de diversidade não é discurso: eu vivo isso no meu time todos os dias.',
  },
  {
    nome: 'Thiago Almeida',
    area: 'Logística',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-08.webp`,
    depoimento:
      'Ver uma operação desse tamanho por dentro é uma aula que nenhuma faculdade consegue dar.',
  },
  {
    nome: 'Camila Ferreira',
    area: 'Jurídico',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-09.webp`,
    depoimento:
      'Aqui estagiário participa das discussões importantes. Minha opinião é ouvida — e cobrada também.',
  },
  {
    nome: 'Lucas Prado',
    area: 'Manufatura',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-10.webp`,
    depoimento:
      'A fábrica é gigante, mas o time faz você se sentir em casa desde o primeiro dia de integração.',
  },
  {
    nome: 'Aline Santos',
    area: 'Sustentabilidade',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-11.webp`,
    depoimento:
      'Trabalho com metas reais de sustentabilidade, em projetos que impactam a cadeia inteira.',
  },
  {
    nome: 'Gabriel Moura',
    area: 'Trade Marketing',
    foto: `${import.meta.env.BASE_URL}images/stories/foto-12.webp`,
    depoimento:
      'As mentorias me ajudaram a entender pra onde quero crescer. O programa te prepara pro jogo longo.',
  },
]
