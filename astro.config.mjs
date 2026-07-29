// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// GitHub Pages serve o repo de projeto em /<repo>/, então o base só é aplicado
// no build da Action (GITHUB_ACTIONS=true). Local/dev roda na raiz ('/').
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  // TODO: trocar pelo domínio final antes do deploy (ver PROJECT.md)
  site: 'https://exemplo.com.br',
  base: isGithubActions ? '/unilever-website/' : '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});