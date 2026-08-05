// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// O site tem dois destinos, com raízes diferentes:
//
//   - Hostinger (produção): o conteúdo de dist/ vai na raiz do domínio, então
//     base '/' — é assim que robots.txt, llms.txt e sitemap respondem em /,
//     que é onde os crawlers procuram. Esse é o padrão, e o que `npm run
//     build` local gera.
//   - GitHub Pages (preview): repo de projeto, servido em /unilever-website/.
//     Só o workflow entra aqui, setando DEPLOY_TARGET=pages.
//
// O `site` fica no domínio final nos dois casos de propósito: assim o preview
// do Pages aponta canonical para a produção em vez de disputar indexação com
// ela.
const isPages = process.env.DEPLOY_TARGET === 'pages';

export default defineConfig({
  // Domínio final do hotsite. Alimenta canonical, og:url, sitemap, os @id do
  // JSON-LD e os links do llms.txt.
  site: 'https://estagiounilever.com.br',
  base: isPages ? '/unilever-website/' : '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});