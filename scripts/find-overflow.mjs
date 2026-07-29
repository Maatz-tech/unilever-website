import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1024,height:900} });
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
const r = await p.evaluate(() => {
  const base = document.documentElement.scrollWidth;
  const W = window.innerWidth;
  const culpados = [];
  const secoes = [...document.querySelectorAll('body > *, main > *')];
  for (const s of secoes) {
    const antes = s.style.display;
    s.style.display = 'none';
    const agora = document.documentElement.scrollWidth;
    if (agora < base) culpados.push({ tag: s.tagName, id: s.id || s.className?.toString().slice(0,40), reduziu: base - agora });
    s.style.display = antes;
  }
  return { base, W, culpados };
});
console.log('scrollWidth', r.base, 'viewport', r.W);
for (const c of r.culpados) console.log('  culpado:', c.tag, c.id, '| reduz', c.reduziu);
await b.close();
