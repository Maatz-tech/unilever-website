import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4500/', { waitUntil:'networkidle' });
const r = await p.evaluate(() => {
  const m = (sel, rot) => { const e=document.querySelector(sel); if(!e) return null; const b=e.getBoundingClientRect(); return {rot, l:Math.round(b.left), w:Math.round(b.width), r:Math.round(1440-b.right)}; };
  return [
    m('.hero-viewport','hero (palco)'),
    m('header .container-lp','header'),
    m('#o-programa .container-lp','sobre'),
    m('#localidades .container-lp','localidades'),
    m('#beneficios .container-lp','beneficios'),
  ].filter(Boolean);
});
for (const x of r) console.log(`${x.rot.padEnd(16)} largura ${String(x.w).padStart(5)}  margens ${x.l}/${x.r}`);
await b.close();
