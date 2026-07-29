import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [390, 768, 1024, 1280, 1440, 1920, 2560, 3440]) {
  const p = await b.newPage({ viewport:{width:w,height:900} });
  await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
  await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
  const r = await p.evaluate(() => {
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
    const hero = document.querySelector('.hero-viewport') || document.querySelector('.hero-viewport-m');
    const hr = hero.getBoundingClientRect();
    const centrado = Math.abs((hr.left) - (window.innerWidth - hr.width - hr.left + hr.left)) < 2
      || Math.abs(hr.left - (window.innerWidth - hr.right)) < 2;
    return { overflow, scrollW: document.documentElement.scrollWidth,
             heroL: Math.round(hr.left), heroW: Math.round(hr.width), heroR: Math.round(window.innerWidth - hr.right), centrado };
  });
  console.log(`${String(w).padStart(4)}px  overflow-x: ${r.overflow ? 'SIM ('+r.scrollW+')' : 'nao'}  | hero ${r.heroW}px  margens ${r.heroL}/${r.heroR} ${r.centrado?'centrado':'DESALINHADO'}`);
  await p.close();
}
await b.close();
