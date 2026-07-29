import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

// reveals: entram de opacity 0 e mudam transform/filter?
async function reveal(sel, nome) {
  const r = await p.evaluate(async (s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    const a = [];
    for (let i = 0; i < 55; i++) {
      const c = getComputedStyle(el);
      a.push({ o: Number(c.opacity), t: c.transform, f: c.filter });
      await new Promise(r => requestAnimationFrame(r));
    }
    return { min: Math.min(...a.map(x=>x.o)), max: Math.max(...a.map(x=>x.o)),
             moveu: new Set(a.map(x=>x.t)).size > 2, blur: a.some(x=>x.f.includes('blur') && !x.f.includes('blur(0px)')) };
  }, sel);
  if (!r) { console.log(`${nome.padEnd(30)} NAO ENCONTRADO`); return; }
  console.log(`${nome.padEnd(30)} op ${r.min.toFixed(2)}→${r.max.toFixed(2)} | move ${r.moveu?'sim':'nao'} | blur ${r.blur?'sim':'nao'}`);
}
await reveal('#sobre-paragrafos > p', 'Sobre: paragrafo (stagger)');
await reveal('#beneficios [data-ben-foto]', 'Benef: foto (x -40)');
await reveal('#beneficios [data-ben-pilar]', 'Benef: pilar (x 32)');
await reveal('#beneficios [data-ben-linha]', 'Benef: divisor (scaleX)');
await reveal('#jornada [data-fase-card]', 'Timeline: card (x 32)');

// hovers
async function hover(sel, nome) {
  const el = p.locator(sel).first();
  if (!await el.count()) { console.log(`${nome.padEnd(30)} NAO ENCONTRADO`); return; }
  await el.scrollIntoViewIfNeeded();
  const bx = await el.boundingBox();
  const antes = await el.evaluate(e => { const c=getComputedStyle(e); return [c.transform,c.backgroundColor,c.color,c.opacity].join('|'); });
  await p.mouse.move(bx.x+bx.width/2, bx.y+bx.height/2); await p.waitForTimeout(450);
  const depois = await el.evaluate(e => { const c=getComputedStyle(e); return [c.transform,c.backgroundColor,c.color,c.opacity].join('|'); });
  console.log(`${nome.padEnd(30)} ${antes!==depois?'OK':'SEM EFEITO'}`);
}
await hover('#pre-requisitos .caixa-icone', 'Requisitos: caixa do icone');
await hover('#o-programa .circulo-play', 'Sobre: circulo do play');
await hover('#localidades .seta-areas', 'Localidades: seta');
await hover('#localidades [data-chip="ce"]', 'Localidades: chip');
await hover('#a-unilever [data-inst-next]', 'Institucional: seta');
await hover('[data-story="1"] .anel', 'Stories: anel');
await b.close();
