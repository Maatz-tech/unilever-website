import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

const r = await p.evaluate(() => {
  const out = {};
  // headings
  out.h1 = document.querySelectorAll('h1').length;
  out.headings = [...document.querySelectorAll('h1,h2,h3,h4')].map(h => h.tagName);
  // pulos de nivel
  let anterior = 1, pulos = [];
  for (const t of out.headings) {
    const n = Number(t[1]);
    if (n > anterior + 1) pulos.push(`${anterior}->${n}`);
    anterior = n;
  }
  out.pulos = pulos;
  // imagens sem alt
  out.imgSemAlt = [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length;
  // links/botoes sem nome acessivel
  out.semNome = [...document.querySelectorAll('a,button')].filter(el =>
    !el.textContent.trim() && !el.getAttribute('aria-label') && !el.querySelector('img[alt]:not([alt=""])')
  ).map(el => el.tagName + '.' + (el.className || '').toString().slice(0,30));
  // links vazios
  out.hrefVazio = [...document.querySelectorAll('a[href="#"], a[href="#inscricao"]')].length;
  out.lang = document.documentElement.lang;
  out.skipLink = !!document.querySelector('a[href="#main"]');
  return out;
});
console.log('h1:', r.h1, '| lang:', r.lang, '| skip link:', r.skipLink);
console.log('pulos de nivel:', r.pulos.length ? r.pulos.join(', ') : 'nenhum');
console.log('imgs sem alt:', r.imgSemAlt, '| controles sem nome:', r.semNome.length, r.semNome.slice(0,4));
console.log('links placeholder (# / #inscricao):', r.hrefVazio);

// navegacao por teclado: quantos elementos alcancaveis
let n = 0, visitados = new Set();
for (let i = 0; i < 60; i++) {
  await p.keyboard.press('Tab');
  const info = await p.evaluate(() => {
    const el = document.activeElement;
    return el ? el.tagName + ':' + (el.getAttribute('aria-label') || el.textContent?.trim().slice(0,20) || el.className?.toString().slice(0,18)) : null;
  });
  if (info && !visitados.has(info)) { visitados.add(info); n++; }
}
console.log('elementos alcançáveis por Tab:', n);
await b.close();
