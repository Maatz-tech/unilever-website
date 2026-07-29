import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
const r = await p.evaluate(async () => {
  const m = await import('/node_modules/motion/dist/es/index.mjs').catch(async () => await import('motion'));
  const log = [];
  try {
    m.inView('#pre-requisitos [data-reveal]', (arg) => { log.push('STRING ok: ' + (arg?.tagName ?? typeof arg)); }, { amount: 0.3 });
    log.push('inView(string) nao lancou');
  } catch (e) { log.push('inView(string) LANCOU: ' + e.message); }
  document.querySelector('#pre-requisitos').scrollIntoView({ block: 'center' });
  await new Promise(r => setTimeout(r, 600));
  return { log };
});
console.log(JSON.stringify(r, null, 2));
await b.close();
