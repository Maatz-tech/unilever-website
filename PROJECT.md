# PROJECT — LP Programa de Estágio Unilever 2027 (Eureca)

## Project meta

- **Nome:** `unilever-estagio-2027`
- **fileKey Figma:** `RQaIpzUd9oxg3IZsFDkVnP` — "LP - Unilever (Eureca)"
- **Home Desktop node:** `4188:11936` (1440 × 8157)
- **Home Mobile node:** `4204:18870` (390 × 9471)
- **Outras páginas:** nenhuma (single page)
- **Fonte(s):** Century Gothic Paneuropean — Regular + Bold ⚠️ **licenciada, ver Pendências**
- **Paleta base:** ver Design tokens
- **Domínio final:** `https://estagiounilever.com.br` — já no `astro.config.mjs`. O DNS ainda não aponta: enquanto o deploy for o repo de projeto no GitHub Pages, o site vive em `/unilever-website/`. Ao apontar, trocar `base` por `'/'` e criar `public/CNAME`.
- **Assinatura de rodapé:** Unilever + eureca · "Desenvolvido por Maatz"

---

## Design tokens (de `get_variable_defs`)

| Token Figma | Hex | Token CSS proposto |
|---|---|---|
| Primary/Night | `#133062` | `--color-night` |
| Primary/Sky | `#0066cc` | `--color-sky` |
| Primary/Dark | `#004d99` | `--color-sky-dark` |
| Primary/Mid | `#47a3ff` | `--color-sky-mid` |
| Primary/Pale | `#c2e0ff` | `--color-sky-pale` |
| Primary/Water · Aqua/Mid | `#23e7ff` | `--color-aqua` |
| Primary/Earth | `#f6f7f0` | `--color-earth` |
| Primary/Cloud · white | `#ffffff` | `--color-cloud` |

Padrão visual recorrente: botão `bg-sky` com `drop-shadow(0 6px 0 var(--color-sky-dark))` e `rounded-[16px]` — vira variante `.btn-primary`. Variante invertida (fundo branco, texto sky) nas seções navy.

Divisores entre seções são **vetores em zig-zag/entalhe** (`divider-start` / `divider-end`), não bordas retas — exportar como SVG.

---

## Inventário de seções

Ordem da página. Nodes desktop → mobile.

| # | Seção | Desktop | Mobile | Notas |
|---|---|---|---|---|
| 1 | ✅ **Navbar** | `4188:11937` | `4204:18871` | Logo Unilever, 6 links (O programa · A Unilever · Pré Requisitos · Localidades · Benefícios · Jornada), CTA "Inscreva-se". Mobile: só logo + CTA. |
| 2 | ✅ **Hero (carrossel, 5 slides)** | `4208:20696` | `4238:22271` | "BORA ELEVAR O GAME?", badge "Inscrições abertas!", CTA, faixa de marcas (Dove/OMO/Hellmann's/Rexona). Moldura aqua com cantos recortados. |
| 3 | ✅ **Stories (marquee de avatares)** | `4188:11971` | `4204:19438` | Node dedicado: `4193:15243`. Círculos com anel gradiente + nome, scroll horizontal infinito. |
| 4 | ✅ **Sobre o programa** | `4188:12051` | `4204:19413` | H2 em 2 colunas + grid de 4 imagens (uma com overlay "Assista ao vídeo") + CTA. |
| 5 | ✅ **Slides institucional (carrossel, 5)** | `4188:12078` | — | Fundo sky. Card branco: texto + foto. Contador `1 / 5` + setas. |
| 6 | ✅ **Pré-requisitos** | `4188:12133` | `4204:18959` | Fundo night. Eyebrow "Pré Requisitos" + h2 + 3 cards com ícone + foto + CTA. |
| 7 | ✅ **Localidades (mapa interativo)** | `4188:12169` | `4204:19006` | Mapa do Brasil em SVG clicável + card "Estado selecionado" + chips de 9 estados. **Maior complexidade técnica.** |
| 8 | ✅ **Benefícios** | `4188:12263` | `4204:19127` | Fundo night, 2 blocos: "A Unilever joga junto com você" (foto + 4 itens) e "Quais serão os benefícios" (10 chips com ícone). |
| 9 | ✅ **Timeline / Jornada** | `4208:19812` | `4204:19231` | Fundo earth. "As fases do game" — 6 etapas numeradas + ilustração de traço. |
| 10 | ✅ **Marquee de texto** | `4188:12431` | `4204:19320` | "Programa de Estágio Unilever 2027 · BORA ELEVAR O GAME?" em loop. |
| 11 | ✅ **Footer** | `4188:12470` | `4204:19359` | Logos Unilever + eureca, ícones sociais (IG, FB, in, TikTok). |
| 12 | ✅ **Footer bottom** | `4188:12496` | `4204:19397` | Aviso de Cookies · Política de Privacidade · Desenvolvido por Maatz. |

### Nodes dos slides

**Hero desktop:** `4208:20349` · `4208:20370` · `4208:20390` · `4236:21539` · `4223:20946`
**Hero mobile:** `4223:20981` · `4223:20995` · `4223:21009` · `4236:21593` · `4223:21023`
**Institucional:** `4188:12513` · `4188:12523` · `4188:12533` · `4188:12541` · `4188:12551`

---

## Referências salvas

- `docs/reference/home-desktop.png` (1440×8157)
- `docs/reference/home-mobile.png` (390×9471)
- `docs/reference/slice-0..5.png` — fatias legíveis do desktop

---

## Mapa de animações (Framer Motion — Fase 6.5 do playbook)

| Onde | Animação | API |
|---|---|---|
| Hero (5 slides) | crossfade da camada de foto, autoplay com pausa no hover | vanilla `animate` — **sem ilha React** |
| Slides institucional | mesma coisa, com contador | `motion/react` + `AnimatePresence` (ilha) |
| Stories | marquee horizontal infinito | vanilla `animate` com `repeat: Infinity` |
| Marquee de texto | idem | vanilla |
| Entradas de seção | fade + subida + **blur 10px→0** | vanilla `inView` |
| Títulos | palavra a palavra com blur (`RevealText.astro`) | vanilla `stagger` |
| Listas de cards | stagger de 0.13s entre filhos | vanilla `stagger` |
| Mapa de estados | hover/active de path SVG | CSS puro |
| Botões | hover/press | CSS (`transition`) |

Hero é **acima do fold** → não pode entrar com `opacity: 0`. Só o troca-slides anima.

**Descoberta da Fase 4:** os 5 slides do hero têm conteúdo de primeiro plano
idêntico (shape, lockup, CTA, headline, badge, faixa de marcas). Só a foto muda.
Logo o hero não precisa de `AnimatePresence` nem de ilha React — é um crossfade
de camada de imagem, resolvido em vanilla `motion` com zero hidratação.

---

## Pendências (bloqueantes até resposta)

1. ~~**Fonte Century Gothic Paneuropean**~~ — ✅ **decidido:** rodar com **Jost** (Google Fonts) como fallback. O cliente entrega a Century Gothic depois. Para trocar: colocar os `.woff2` em `public/fonts/` e descomentar os dois `@font-face` no fim do bloco de tokens em `src/styles/global.css`. A Century já está na frente da cadeia `--font-sans`, então assume sozinha — **nenhuma outra linha do projeto muda**.
2. ~~**Domínio final**~~ — ✅ `estagiounilever.com.br`, já configurado. Falta o DNS apontar; aí vêm o `base: '/'` e o `public/CNAME`. Só depois disso o `llms.txt` responde na raiz, que é onde a auditoria do Lighthouse procura.
3. **Destino do CTA "Inscreva-se"** — URL do formulário de inscrição (Gupy/Eureca?).
4. **Links reais:** redes sociais, Aviso de Cookies, Política de Privacidade.
5. **Vídeo** — está com o reel `DbqaueUAi9r` do Instagram (@projectsunlightbr),
   embedado no lightbox. Para trocar, só o shortcode em `src/data/site.ts`.
   O embed do Instagram não aceita autoplay: o play é do usuário, dentro do
   iframe. O iframe segue sem `src` até o clique, então nada de Instagram
   carrega (nem cookie) antes disso.
6. **Stories** — são links para conteúdos reais ou decorativos?
7. **Foto do slide 2 do hero** — o asset de origem vem rotacionado 90° no Figma, e a rotação não sai no CSS exportado. Está usando o render do Figma (1x, 639×581) em vez do recorte 2x dos outros quatro. Fica levemente mais suave em tela retina. Resolve se o designer exportar a camada já na orientação final.
8. **Dados do mapa** — lista completa de cidades/áreas por estado (o Figma mostra só São Paulo aberto).
9. **Token do origin trial do WebMCP** — as tools em `src/components/WebMcp.astro` só ligam em produção com um token emitido para `estagiounilever.com.br` em [developer.chrome.com/origintrials](https://developer.chrome.com/origintrials) (trial "WebMCP"). O `<meta http-equiv="origin-trial">` já está no `<head>` do `Base.astro`, comentado, esperando o token. Sem token nada quebra — a API simplesmente não é encontrada. O trial vai até o **Chrome 156**: quando terminar, ou o recurso vira nativo, ou o componente sai. Para testar antes: `chrome://flags/#enable-webmcp-testing`.

---

## Notas de implementação do hero

- Desktop e mobile são **geometrias independentes**. Tentei derivar o mobile do
  desktop por fator de escala e não funcionou: cada slide mobile tem asset de
  fundo e recorte próprios, e a pessoa fica sempre em `top: 253.68` (não
  escalonado). Os valores em `HeroSection.astro` vêm dos nós mobile reais.
- O desfoque dos slides 2–5 é CSS no desktop (`blur-[2px]`) e já vem **embutido
  no asset** no mobile — não aplicar os dois.
- A moldura aqua do mobile é o mesmo SVG girado −90°. O Figma exporta isso com
  `100cqw`/`100cqh`; essas unidades saíram 100px curtas aqui, então a caixa é
  dimensionada em `em` e o filho é centrado e girado.
- `scripts/hero-assets.py` regenera todos os recortes a partir de
  `/tmp/claude-501/hero`. **Exceção:** `pes-2.webp` não é gerado pelo script
  (fonte rotacionada) — vem do render do Figma e seria sobrescrito.

---

## Aproveitamento do projeto React anterior (`../unilever`)

Migrado em 2026-07-28. O que veio:

- **35 SVGs do mapa** por UF + 7 pins → `public/images/map/`
- 16 ícones + 4 divisores em zigue-zague → `public/images/{icons,dividers}/`
- Fotos de stories, cards e galeria → WebP, **4.0MB → 1.3MB**
- Dados: `brasilPaths.js`, `localidades.js`, `requisitos.js`, `stories.ts`

O legado usa os mesmos tokens de cor e também adotou **Jost** no lugar da
Century Gothic — convergiu com o que extraí do Figma de forma independente.

**Não veio** (e por quê):
- Componentes React: portados um a um pelo loop de validação, não em bloco.
- Hero do legado: tem 3 slides, o Figma tem 5. O nosso já está medido em 0–2px.
- Rotas `/requisitos` e `/styleguide`: fora de escopo (single page).

**Defeitos encontrados no legado** (corrigir conforme cada seção for portada):
1. `Benefits.jsx` tem **Lorem ipsum nos 4 itens** — a copy real está no Figma.
2. Página 480px mais curta que o Figma (7677 vs 8157): espaçamentos divergentes.
3. Preenchimento dos estados no mapa diverge do Figma.
4. Conteúdo entra com `opacity: 0` até o scroll-reveal — se o JS falhar, a
   página fica em branco. Nosso reveal precisa partir de conteúdo visível.

---

## Armadilhas do Figma já encontradas (valem para as próximas seções)

1. **Frames de altura fixa mentem sobre o padding.** Em Pré-requisitos o código
   exportado diz `py-[120px]`, mas o frame tem altura fixa (1041.233) menor que
   o próprio conteúdo — o padding inferior real é 72px. **Sempre conferir a
   altura do frame contra a soma do conteúdo** antes de confiar no padding.
2. **O código exportado às vezes achata gradiente em cor sólida.** O anel dos
   stories saía como `border-solid #47a3ff`; o render mostra gradiente
   aqua → azul. Na dúvida, ampliar o render.
3. **Camadas rotacionadas não trazem a rotação no CSS.** A foto do slide 2 do
   hero vem deitada na fonte.
4. **`100cqw`/`100cqh`** (container queries) do export não resolveram certo aqui
   — dimensionar em `em` a partir do palco.
5. **Nunca derivar o mobile do desktop por fator de escala.** Cada breakpoint
   tem assets e recortes próprios.
6. **`em` de padding resolve contra o font-size do próprio elemento.** Nunca
   colocar `font-size` e `padding` em `em` no mesmo nó.

## Diferenças aceitas (resolvem com a Century Gothic)

A Jost é mais estreita que a Century Gothic, então blocos de texto longo quebram
em menos linhas. Impacto medido: botões ~15% mais estreitos, seção "Sobre o
programa" 48px mais curta no mobile, Pré-requisitos 16px. **Não compensar com
padding falso** — some quando a fonte real entrar.

---

## Reveals — como funcionam (e por que não somem sem JS)

Herdado do `Reveal.jsx` da versão React, mas sem React:

- `revealOnScroll(sel)` — fade + subida 24px + **blur 10px → 0**, 0.7s
- `revealStagger(sel)` — o mesmo, escalonando os filhos diretos em 0.13s
- `revealWords(sel)` — título palavra a palavra (blur 8px, 0.045s de passo).
  As palavras são quebradas em `<span>` no build por `RevealText.astro`,
  então não há reflow no cliente.

O estado inicial invisível vem do CSS, mas **condicionado à classe `.js`** que
um script inline no `<head>` põe no `<html>` antes do primeiro paint:

```css
.js [data-reveal],
.js [data-reveal-stagger] > *,
.js [data-reveal-words] > [data-palavra] { opacity: 0 }
```

Isso resolve os dois extremos: **com** JS não há piscada (o elemento já nasce
invisível), e **sem** JS a regra não se aplica e a página aparece inteira — que
era o defeito do projeto anterior, onde tudo ficava em `opacity: 0` esperando o
framer-motion. Verificado nos três cenários (com JS, `prefers-reduced-motion:
reduce`, e JS desativado).

---

## Inventário de animações portadas do projeto React

`motion` é o mesmo Framer Motion (renomeado na v12), então os **valores**
copiam 1:1 — muda só a sintaxe (imperativa em vez de `initial`/`animate`).
Nada de React: zero hidratação.

| Origem | Animação | Valores | Status |
|---|---|---|---|
| `Hero.jsx` | Ken Burns do fundo | `scale 1.05→1`, 1s easeOut | ✅ |
| `Hero.jsx` | pessoa entra de baixo | `y 60→0` / sai `y -24`, 0.7s | ✅ |
| `Hero.jsx` | cascata na carga | `y 32→0`, 0.6s, delay 0.15·i | ✅ |
| `Hero.jsx` | badge com mola | `scale 0.8→1`, 300/20, delay 0.5 | ✅ |
| `Reveal.jsx` | BlurIn | `blur 10px→0` + `y 24→0`, 0.7s | ✅ |
| `Reveal.jsx` | TextReveal | palavra a palavra, blur 8px, 0.045s | ✅ |
| `Reveal.jsx` | stagger de lista | 0.13s entre filhos | ✅ |
| `UnileverCarousel` | mola do baralho | spring 260/30, mass 0.9 | ✅ |
| `UnileverCarousel` | arrastar/swipe | `dragElastic 0.22`, limiar 60px | ✅ |
| `UnileverCarousel` | whileTap nos botões | `scale 0.9` | ✅ |
| `StoryViewer` | entrada do card | `scale 0.92→1, y 24→0`, 300/28 | ✅ |
| `StoryViewer` | zoom da foto | `scale 1.1→1, op 0.6→1`, 0.5s | ✅ |
| `StoryViewer` | auto-avanço | barra 0→100% em 6s, linear | ✅ |
| `StoryViewer` | zonas de toque | terços laterais | ✅ |
| `VideoLightbox` | entrada | `scale 0.9→1, y 24→0`, 300/28 | ✅ |
| `Stories.jsx` | hover do avatar | lift + scale | ✅ |
| `About.jsx` | zoom da foto no hover | `scale 1.05`, 500ms | ✅ |
| `Requirements` | hover do card de vidro | lift + borda aqua | ✅ |
| `LocationsMap` | **`@keyframes pulso`** nos pinos | `scale 1→3`, `op 0.8→0`, 2.4s | ⏳ seção 7 |
| `Benefits.jsx` | 32 ocorrências | — | ⏳ seção 8 |
| `Timeline.jsx` | 9 ocorrências | — | ⏳ seção 9 |
| `MarqueeStrip` | faixa contínua | — | ⏳ seção 10 |

**Desvio deliberado:** no primeiro paint o fundo do hero não entra de
`opacity: 0` (o legado entrava). Ele é o candidato a LCP e um fade de 1s
atrasaria a métrica; o `scale` roda mesmo assim, então o Ken Burns inicial se
mantém. Nas trocas seguintes o crossfade é completo.

---

## Achados desta rodada

### Copy real de Benefícios (substitui o Lorem ipsum do legado)

Os 4 pilares estavam com texto de preenchimento no projeto React. Os reais,
extraídos do Figma, estão em `src/data/beneficios.ts`:

- **Experiência** — "Atue em projetos reais, com desafios que impactam marcas presentes na rotina de milhões de pessoas."
- **Mentorias** — "Aprenda com lideranças e profissionais experientes, com trocas que apoiam seu desenvolvimento e suas decisões de carreira."
- **Oportunidades internacionais** — "Conecte-se a uma empresa global, amplie sua visão de negócio e tenha contato com diferentes mercados e culturas."
- **Desenvolvimento** — "Fortaleça habilidades como visão de negócio, gestão de tempo, storytelling, aprendizagem contínua e uso de inteligência artificial."

### ⚠️ Para confirmar com o designer

1. **Marquee com ano errado.** O nó `4188:12431` tem 12 itens; metade diz
   "Programa de Estágio Unilever **2026**" numa fonte diferente (Unilever
   Desire), além de "ENTREGA TUDO!". Estão fora da área visível — parecem sobra
   do design do ano anterior. Implementei só os dois itens de 2027 que de fato
   renderizam.
2. **Foto de Benefícios divergia** entre Figma e legado — usei a do Figma.

### Z-index do hero (corrigido)

A pessoa é o sujeito principal e no Figma fica **acima** do conteúdo — o ombro
cobre o shape azul. Eu tinha deixado a pessoa dentro da camada do slide, atrás
de tudo. Ordem correta:

- **desktop:** fundo → moldura → conteúdo → **pessoa** → faixa de marcas
- **mobile:** fundo → moldura → shape/lockup/bora → **pessoa** → CTA → badge

### Armadilhas novas

7. **`h-full` em item flex cujo pai não tem altura definida colapsa para zero.**
   A foto de Benefícios sumiu por isso. Usar `self-stretch`.
8. **Animar `transform` pelo Motion sobrescreve o `translate` do Tailwind.**
   Elementos centrados com `-translate-x-1/2` que vão ser animados precisam ser
   posicionados por `left` explícito.

---

## Entrega — estado final

**12/12 seções prontas.** Altura total: desktop 8048 (Figma 8157), mobile 9414
(Figma 9471). Por seção, a maior diferença é −58px em Benefícios (os pills
quebram em 3 linhas em vez de 4 por causa da Jost); as demais ficam em 0–7px.

### Lighthouse

| | perf | a11y | best practices | SEO |
|---|---|---|---|---|
| desktop | **100** | 96 | 100 | 100 |
| mobile | **95** | 96 | 93 | 100 |

Otimizações que levaram o mobile de 78 → 95:

1. **Imagens no tamanho real de exibição** (2× para retina). Os stories tinham
   1200px para círculos de 98px; a galeria, 1600px para slots de 210px.
   1.03 MB → 0.38 MB.
2. **`data-src` nas imagens do hero.** Os 5 slides ficam empilhados na MESMA
   área, então `loading="lazy"` não adia nada — todos contam como "na
   viewport". Só o fundo do slide 0 vem com `src`; o resto é hidratado no
   `load`. As pessoas também, já que nenhuma é o LCP e todas entram animadas.
3. **`<link rel="preload" media>`** para o fundo do hero, um por breakpoint —
   prioriza o certo sem baixar os dois.
4. **CSS da fonte sem bloquear render** (`media="print"` + `onload`), com
   `<noscript>` de fallback.

### ⚠️ Contraste — decisão do designer

`sky-mid` (#47a3ff) sobre branco dá **2.64:1**, abaixo do mínimo 3.0 do WCAG
para texto grande. Afeta os títulos "Laboratórios" e "Início na empresa" na
timeline, e o texto do marquee. **Não alterei** — é cor de marca definida no
Figma. Escurecer para ~#3d93eb resolveria (3.05:1) com diferença visual mínima.
É o único item que segura a11y em 96.

### SEO

`site` configurado no astro.config, sitemap gerado, `robots.txt`, canonical,
Open Graph, Twitter Card e JSON-LD (Organization + WebSite). Um `<h1>` real
(sr-only) no hero, já que o título do design é imagem.

### Correções de layout responsivo (2026-07-29)

Reportado: hero desalinhado em ultrawide. A auditoria em 8 larguras (390 →
3440) encontrou três problemas:

1. **Hero encostado à esquerda acima de 1440px.** O palco trava em 1392 mas não
   estava centrado. `width: min(100%, 1392px); margin-inline: auto`.
2. **Scroll horizontal em 1024px** — as cascas do baralho institucional tinham
   largura fixa (1149px / 1081px) e estouravam o container. Viraram porcentagem
   (96.39% / 90.7%), mais `overflow-hidden` na seção como guarda.
3. **Larguras fixas em Sobre** (`w-[1160px]`, `w-[548px]`) trocadas por
   `max-w` + `flex-1`.

Verificado: sem overflow horizontal e hero centrado em 390, 768, 1024, 1280,
1440, 1920, 2560 e 3440px.

---

## Paridade de animações com o projeto React (../unilever)

Auditoria feita comando por comando sobre os `initial/animate/whileHover/
whileTap/transition` de cada componente do legado. Portado 1:1:

| Seção | Animação | Valores |
|---|---|---|
| Header | entrada | `y -24 → 0`, 0.5s easeOut |
| Header | logo / links | `opacity .8` · sublinhado que cresce (300ms) |
| Hero | Ken Burns | `scale 1.05 → 1`, 1s |
| Hero | pessoa | `y 60 → 0`, sai em `y -24`, 0.7s |
| Hero | cascata | `y 32 → 0`, delay 0.15·i |
| Hero | badge | mola 300/20, delay 0.5 |
| Stories | avatar | `scale 1.06, y -3` (mola 400/22) · tap 0.95 · anel vira aqua |
| Stories | visualizador | card mola 300/28 · foto `scale 1.1→1, op .6→1` · texto blur 8px delay .25 · barra 6s linear |
| Sobre | título | palavra a palavra, blur 8px, passo 0.045 |
| Sobre | parágrafos | escalonados (delays 0.15 e 0.3) |
| Sobre | fotos | `scale 1.05` no hover (500ms) |
| Sobre | play / véu | `scale 1.1` · véu para `opacity .9` |
| Institucional | baralho | mola 260/30 mass 0.9 |
| Institucional | arraste | `dragElastic .22`, limiar 60px |
| Institucional | setas | `y -2` no hover · tap `scale .9` · inativa clareia |
| Pré-requisitos | cards | stagger 0.13 com blur 10px |
| Pré-requisitos | hover | `y -4`, borda aqua/40, fundo branco/8 |
| Pré-requisitos | ícone | caixa vira aqua cheia e o ícone inverte |
| Localidades | troca de estado | `y 12 → 0`, blur 6px, 0.3s |
| Localidades | pinos | `@keyframes pulso` 2.4s, delay 0.28·i |
| Localidades | "Confira as áreas" | seta desliza 4px · texto escurece |
| Localidades | chips | tap `scale .95` · hover com fundo pale |
| Benefícios | foto | entra da esquerda (`x -40`), 0.7s |
| Benefícios | pilares | entram da direita (`x 32`), blur 8px, delay 0.18·i |
| Benefícios | divisores | `scaleX 0 → 1`, delay 0.18·i + 0.25 |
| Benefícios | pills | `scale 1.04` no hover · stagger 0.08 |
| Timeline | trilha | linha se desenha com o scroll |
| Timeline | ícones | mola 350/20 |
| Timeline | cards | entram da direita (`x 32`), blur 8px, 0.5s |
| Timeline | hover | `y -4`, borda sky-mid/60, sombra |
| Marquee | faixa | 40s linear, pausa no hover |
| Vídeo | lightbox | mola 300/28 |

**Armadilha encontrada:** um elemento com `scaleX(0)` tem largura zero, e o
IntersectionObserver **nunca** reporta interseção para caixas de área zero — o
`drawLine` observava a própria linha e nunca disparava, deixando os divisores de
Benefícios invisíveis. Passou a observar o elemento pai.
