import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'domcontentloaded' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

// 1) cascata + mola na carga
const carga = await p.evaluate(async () => {
  const alvos = {
    lockup: '.hero-stage [data-hero-in="0"]',
    cta: '.hero-stage [data-hero-in="1"]',
    marca: '.hero-stage [data-hero-in="2"]',
    badge: '.hero-stage [data-hero-badge]',
    bg0: '.hero-stage [data-hero-slide]:first-child [data-hero-bg]',
  };
  const r = {};
  for (const k in r) {}
  const amostras = {};
  for (const k in alvos) amostras[k] = [];
  for (let i = 0; i < 90; i++) {
    for (const [k, sel] of Object.entries(alvos)) {
      const el = document.querySelector(sel);
      if (el) amostras[k].push({ o: Number(getComputedStyle(el).opacity), t: getComputedStyle(el).transform });
    }
    await new Promise(r => requestAnimationFrame(r));
  }
  const out = {};
  for (const [k, a] of Object.entries(amostras)) {
    out[k] = {
      minOp: Math.min(...a.map(x => x.o)),
      maxOp: Math.max(...a.map(x => x.o)),
      moveu: new Set(a.map(x => x.t)).size > 1,
    };
  }
  return out;
});
for (const [k, v] of Object.entries(carga)) {
  console.log(`${k.padEnd(8)} opacidade ${v.minOp.toFixed(2)}→${v.maxOp.toFixed(2)} | transform variou: ${v.moveu ? 'SIM' : 'nao'}`);
}
await b.close();
