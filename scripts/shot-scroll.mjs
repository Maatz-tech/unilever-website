import { chromium } from 'playwright';
const [url, width, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:Number(width),height:900}, deviceScaleFactor:1 });
await p.goto(url, { waitUntil:'networkidle' });
// rola a pagina inteira pra disparar os scroll-reveals
const h = await p.evaluate(()=>document.body.scrollHeight);
for (let y=0; y<h; y+=600){ await p.evaluate(v=>window.scrollTo(0,v), y); await p.waitForTimeout(180); }
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(600);
await p.screenshot({ path: out, fullPage:true });
await b.close(); console.log('ok');
