// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// GitHub Pages serve o repo de projeto em /<repo>/, então o base só é aplicado
// no build da Action (GITHUB_ACTIONS=true). Local/dev roda na raiz ('/').
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  // Domínio final do hotsite. Alimenta canonical, og:url, sitemap, os @id do
  // JSON-LD e os links do llms.txt.
  site: 'https://estagiounilever.com.br',
  // TODO: quando o DNS apontar para o domínio acima, trocar por base: '/' e
  // criar public/CNAME — enquanto o deploy for o repo de projeto no GitHub
  // Pages, tudo (inclusive robots.txt e llms.txt) vive sob /unilever-website/.
  base: isGithubActions ? '/unilever-website/' : '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});