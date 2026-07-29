import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
const r = await p.evaluate(async () => {
  const el = document.querySelector('[data-trilha-progresso]');
  const alvo = document.querySelector('#jornada');
  const topo = alvo.getBoundingClientRect().top + window.scrollY;
  const amostras = [];
  for (const frac of [-0.2, 0, 0.25, 0.5, 0.75, 1.0, 1.2]) {
    window.scrollTo(0, topo - window.innerHeight * 0.5 + alvo.offsetHeight * frac);
    await new Promise(r => setTimeout(r, 350));
    const t = getComputedStyle(el).transform;
    const m = t === 'none' ? 1 : Number(t.split('(')[1]?.split(',')[3] ?? 1);
    amostras.push(Number(m.toFixed(2)));
  }
  return amostras;
});
console.log('scaleY da trilha ao longo do scroll:', JSON.stringify(r));
console.log(r[0] < 0.3 && r[r.length-1] > 0.9 && new Set(r).size > 3 ? '=> LINHA SE DESENHA PROGRESSIVAMENTE' : '=> NAO PROGRESSIVO');
await b.close();
