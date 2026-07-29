import { chromium } from 'playwright';
const b = await chromium.launch();

async function cenario(opts, rotulo, sels) {
  const p = await b.newPage({ viewport:{width:1440,height:900}, ...opts });
  await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
  await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
  const out = [];
  for (const [sel, nome] of sels) {
    const r = await p.evaluate(async (s) => {
      const el = document.querySelector(s);
      if (!el) return null;
      el.scrollIntoView({ block: 'center' });
      await new Promise(r => setTimeout(r, 1400));
      return Number(getComputedStyle(el).opacity);
    }, sel);
    out.push(`${nome}=${r}`);
  }
  console.log(`${rotulo.padEnd(24)} ${out.join('  ')}`);
  await p.close();
}

const alvos = [['#sobre-titulo [data-palavra]','titulo'],['#req-cards > li:nth-child(3)','card3'],['#pre-requisitos figure[data-reveal]','foto']];
await cenario({ reducedMotion:'no-preference' }, 'com JS + movimento', alvos);
await cenario({ reducedMotion:'reduce' }, 'movimento reduzido', alvos);
await cenario({ javaScriptEnabled:false }, 'SEM JavaScript', alvos);
await b.close();
