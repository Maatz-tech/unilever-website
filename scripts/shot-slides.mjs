import { chromium } from 'playwright';
const [sel, width, prefix] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:Number(width),height:900}, deviceScaleFactor:2 });
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
const n = await p.locator(`${sel} [data-hero-slide]`).count();
for (let i=0;i<n;i++){
  await p.evaluate(([s,idx])=>{
    document.querySelectorAll(`${s} [data-hero-slide]`).forEach((el,j)=>{ el.style.opacity = j===idx?'1':'0'; });
  },[sel,i]);
  await p.locator(sel).screenshot({ path:`${prefix}${i+1}.png` });
}
await b.close(); console.log('ok', n);
