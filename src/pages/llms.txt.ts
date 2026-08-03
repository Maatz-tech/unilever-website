/**
 * llms.txt — resumo do hotsite em Markdown, para LLMs e agentes.
 *
 * Spec: llmstxt.org. A auditoria "Agentic Browsing" do Lighthouse checa três
 * coisas neste arquivo: existir um H1, passar de 50 caracteres e ter pelo menos
 * um link em formato Markdown — URL solta ou lista com traço NÃO conta como
 * link. Sem o arquivo a auditoria fica N/A (404 não é falha).
 *
 * Nada aqui é escrito à mão duas vezes: o conteúdo é montado dos mesmos dados
 * que a página renderiza. Mudou cidade, benefício, data ou link de inscrição,
 * este arquivo muda junto no próximo build.
 *
 * ATENÇÃO: enquanto o deploy for o repo de projeto no GitHub Pages, o arquivo
 * responde em /unilever-website/llms.txt. A convenção (e a auditoria) esperam a
 * RAIZ do domínio — só vale quando o base virar '/' no astro.config.mjs.
 */

import type { APIRoute } from 'astro';
import { localidades } from '../data/localidades.js';
import { PILARES, BENEFICIOS } from '../data/beneficios';
import { REQUISITOS } from '../data/requisitos';
import { FASES } from '../data/jornada';
import {
  inscricaoUrl,
  DATAS_LEGIVEIS,
  UNILEVER_URL,
  EURECA_URL,
  NAV_LINKS,
} from '../data/site';

/** Descrição de cada âncora do menu — o menu diz o nome, aqui diz o que tem lá. */
const O_QUE_TEM: Record<string, string> = {
  '#o-programa': 'o que é o programa e o vídeo de apresentação',
  '#a-unilever': 'quem é a Unilever e suas marcas',
  '#pre-requisitos': 'quem pode se inscrever',
  '#localidades': 'estados, cidades e áreas de atuação',
  '#beneficios': 'o que a pessoa estagiária recebe',
  '#jornada': 'as etapas do processo seletivo',
};

export const GET: APIRoute = ({ site }) => {
  // Sem `site` configurado o arquivo ainda sai, só com âncoras relativas — mas
  // aí a auditoria não enxerga link absoluto, então o build de produção tem de
  // ter o domínio no astro.config.mjs.
  const base = site?.href ?? '/';
  const url = (ancora: string) => new URL(ancora, base).href;

  const secoes = NAV_LINKS.map(
    ({ label, href }) => `- [${label}](${url(href)}): ${O_QUE_TEM[href] ?? label}`
  ).join('\n');

  const cidadesPorEstado = localidades
    .map((uf) => `- **${uf.nome}**: ${uf.cidades.map((c) => c.nome).join(', ')}`)
    .join('\n');

  const areasPorCidade = localidades
    .flatMap((uf) => uf.cidades.map((c) => `- ${c.nome} (${uf.nome}): ${c.areas.join(', ')}`))
    .join('\n');

  const corpo = `# Programa de Estágio Unilever 2027

> Hotsite do Programa de Estágio da Unilever Brasil para 2027, operado em
> parceria com a Eureca. Inscrições ${DATAS_LEGIVEIS.inscricoes}, início na
> empresa em ${DATAS_LEGIVEIS.inicio}. Estágio de 30 horas semanais, em formato
> híbrido e presencial, em ${localidades.length} estados.

## Inscrição

- [Formulário de inscrição](${inscricaoUrl('llms-txt')}): candidatura oficial, na plataforma da Eureca, aberta até 04/09/2026

## Seções da página

${secoes}

## Pré-requisitos

${REQUISITOS.map((r) => `- **${r.titulo}**: ${r.texto}`).join('\n')}

## Localidades

${cidadesPorEstado}

### Áreas de atuação por cidade

${areasPorCidade}

## Benefícios

${PILARES.map((p) => `- **${p.titulo}**: ${p.texto}`).join('\n')}

Além disso: ${BENEFICIOS.map((b) => b.texto.replace(/\*$/, '')).join(', ')}.

## Etapas do processo seletivo

${FASES.map((f, i) => `${i + 1}. **${f.titulo}** — ${f.data}`).join('\n')}

## Opcional

- [Unilever Brasil](${UNILEVER_URL}): site institucional da empresa
- [Eureca](${EURECA_URL}): plataforma que opera o processo seletivo
`;

  return new Response(corpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
