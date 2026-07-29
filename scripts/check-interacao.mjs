import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

// mapa: clicar em Minas Gerais
await p.locator('#localidades [data-chip="mg"]').click();
await p.waitForTimeout(200);
const nome = await p.locator('#localidades [data-uf-nome]').textContent();
const cidades = await p.locator('#localidades [data-uf-cidades] li').count();
const pathAtivo = await p.locator('#localidades [data-uf="mg"]').getAttribute('aria-pressed');
console.log('mapa: chip MG ->', nome, '|', cidades, 'cidades | path aria-pressed:', pathAtivo);

// mapa: clicar direto no path do Ceará
await p.locator('#localidades [data-uf="ce"]').click({ force: true });
await p.waitForTimeout(200);
console.log('mapa: clique no path CE ->', await p.locator('#localidades [data-uf-nome]').textContent());

// trilha: a linha se desenha no scroll?
const trilha = await p.evaluate(async () => {
  const el = document.querySelector('[data-trilha-progresso]');
  const antes = getComputedStyle(el).transform;
  document.querySelector('#jornada').scrollIntoView({ block:'center' });
  await new Promise(r => setTimeout(r, 600));
  window.scrollBy(0, 400);
  await new Promise(r => setTimeout(r, 600));
  return { antes, depois: getComputedStyle(el).transform };
});
console.log('trilha: antes', trilha.antes, '-> depois', trilha.depois);
await b.close();
