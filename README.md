# unilever-website

Landing page do **Programa de Estágio Unilever 2027** (Eureca).

Astro 5 + Tailwind CSS v4, output estático, animações com Framer Motion
(pacote `motion`, API vanilla — sem hidratação de framework).

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview
```

## Deploy

GitHub Pages via Action (`.github/workflows/deploy.yml`), disparada em push na
`main`. O `base` do Astro só é aplicado no build da Action, então o dev local
roda na raiz.

## Documentação

- `PROJECT.md` — medidas do Figma, decisões, inventário de animações e pendências
- `PLAYBOOK.md` — processo de construção seção a seção
