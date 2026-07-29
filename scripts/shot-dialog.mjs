import { chromium } from 'playwright';
const [url, width, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:Number(width),height:820}, deviceScaleFactor:2 });
await p.goto(url, { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
// congela o marquee: alvo em movimento nunca fica 'stable' pro Playwright
await p.evaluate(()=>document.querySelector('.marquee-mask')?.setAttribute('data-pausado',''));
await p.waitForTimeout(200);
await p.locator('[data-story]').first().click();
await p.waitForTimeout(700);
await p.screenshot({ path: out });
await b.close(); console.log('dialog ok');
