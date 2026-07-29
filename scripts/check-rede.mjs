import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
const req = [];
p.on('response', async (r) => {
  try { const buf = await r.body(); req.push({ url: r.url().split('/').pop(), bytes: buf.length, tipo: r.request().resourceType() }); } catch {}
});
await p.goto('http://localhost:4321/', { waitUntil:'load' });
await p.waitForTimeout(2500);
const total = req.reduce((s,r)=>s+r.bytes,0);
console.log('recursos:', req.length, '| total:', (total/1e6).toFixed(2), 'MB');
const porTipo = {};
for (const r of req) porTipo[r.tipo] = (porTipo[r.tipo]||0) + r.bytes;
for (const [t,b2] of Object.entries(porTipo).sort((a,b3)=>b3[1]-a[1])) console.log('  ', t.padEnd(12), (b2/1e6).toFixed(2), 'MB');
console.log('--- 10 maiores ---');
for (const r of req.sort((a,b4)=>b4.bytes-a.bytes).slice(0,10)) console.log('  ', r.url.slice(0,42).padEnd(44), (r.bytes/1024).toFixed(0), 'KB');
await b.close();
