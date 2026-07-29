import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
const r = await p.evaluate(async () => {
  const stage = document.querySelector('.hero-stage');
  const bgs = stage.querySelectorAll('[data-hero-bg]');
  const pes = stage.querySelectorAll('[data-hero-pes]');
  const a = [];
  const t0 = performance.now();
  while (performance.now() - t0 < 8000) {
    a.push({
      bg0: Number(getComputedStyle(bgs[0]).opacity),
      bg1: Number(getComputedStyle(bgs[1]).opacity),
      p1o: Number(getComputedStyle(pes[1]).opacity),
      p1t: getComputedStyle(pes[1]).transform,
    });
    await new Promise(r => requestAnimationFrame(r));
  }
  return {
    trocou: a.some(x => x.bg1 > 0.05),
    bg0min: Math.min(...a.map(x=>x.bg0)),
    bg1max: Math.max(...a.map(x=>x.bg1)),
    pessoaMoveu: new Set(a.filter(x => x.p1o > 0 && x.p1o < 1).map(x => x.p1t)).size > 1,
    pessoaApareceu: Math.max(...a.map(x=>x.p1o)),
  };
});
console.log('trocou de slide:', r.trocou, '| fundo0 ->', r.bg0min.toFixed(2), '| fundo1 ->', r.bg1max.toFixed(2));
console.log('pessoa do slide 2: opacidade max', r.pessoaApareceu.toFixed(2), '| animou transform:', r.pessoaMoveu ? 'SIM' : 'nao');
await b.close();
