import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
await p.evaluate(()=>document.querySelector('.marquee-mask')?.setAttribute('data-pausado',''));
await p.locator('[data-story]').first().click();

const r = await p.evaluate(async () => {
  const card = document.querySelector('[data-story-card]');
  const foto = document.querySelector('[data-story-foto]');
  const barra = document.querySelectorAll('[data-story-barra]')[0];
  const leg = document.querySelector('[data-story-legenda]');
  const a = [];
  for (let i = 0; i < 70; i++) {
    a.push({
      card: getComputedStyle(card).transform,
      fotoOp: Number(getComputedStyle(foto).opacity),
      largura: getComputedStyle(barra).width,
      legOp: Number(getComputedStyle(leg).opacity),
    });
    await new Promise(r => requestAnimationFrame(r));
  }
  return {
    cardMoveu: new Set(a.map(x=>x.card)).size > 3,
    fotoMin: Math.min(...a.map(x=>x.fotoOp)),
    barraCresceu: new Set(a.map(x=>x.largura)).size > 3,
    legMin: Math.min(...a.map(x=>x.legOp)),
  };
});
console.log('card entrou com mola  :', r.cardMoveu ? 'SIM' : 'nao');
console.log('foto zoom (op minima) :', r.fotoMin.toFixed(2));
console.log('barra progredindo     :', r.barraCresceu ? 'SIM' : 'nao');
console.log('legenda (op minima)   :', r.legMin.toFixed(2));
await b.close();
