import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

const f = await p.evaluate(async () => { await document.fonts.ready;
  return { faces: [...document.fonts].filter(x=>x.family.includes('Unilever')).length,
           usada: getComputedStyle(document.body).fontFamily.split(',')[0],
           noindex: document.querySelector('meta[name="robots"]')?.content };
});
console.log(`FONTE: ${f.usada} (${f.faces} faces) | robots: ${f.noindex}`);
console.log(`nav: "${await p.locator('.link-nav').first().textContent()}"`);

for (const [sel, nome] of [
  ['header a.btn','botão CTA'],
  ['.link-nav','link do nav'],
  ['#jornada .carta-fase','card de fase'],
  ['#beneficios .pill-beneficio','pill benefício'],
  ['#localidades [data-chip="pe"]','chip do mapa'],
  ['#a-unilever [data-inst-next]','seta institucional'],
]) {
  const el = p.locator(sel).first();
  if (!await el.count()) { console.log(nome.padEnd(20)+'NAO ENCONTRADO'); continue; }
  await el.scrollIntoViewIfNeeded();
  const antes = await el.evaluate(e => { const c=getComputedStyle(e); return [c.transform,c.backgroundColor,c.color,c.borderColor,c.filter].join('|'); });
  await el.hover(); await p.waitForTimeout(400);
  const depois = await el.evaluate(e => { const c=getComputedStyle(e); return [c.transform,c.backgroundColor,c.color,c.borderColor,c.filter].join('|'); });
  const cursor = await el.evaluate(e => getComputedStyle(e).cursor);
  console.log(`${nome.padEnd(20)} cursor=${cursor.padEnd(8)} hover=${antes!==depois?'OK':'SEM EFEITO'}`);
}
// svg da timeline encostado na borda
const svg = await p.evaluate(() => { const w=document.querySelector('#jornada [aria-hidden="true"] img'); const r=w.getBoundingClientRect(); return Math.round(r.left); });
console.log('traço da timeline: borda esquerda em x =', svg, 'px');
await b.close();
