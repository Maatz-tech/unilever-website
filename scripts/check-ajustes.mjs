import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

// bullets do hero
const dots = await p.locator('.hero-stage [data-hero-dot]').count();
const ativo0 = await p.locator('.hero-stage [data-hero-dot="0"]').getAttribute('aria-current');
await p.locator('.hero-stage [data-hero-dot="3"]').click();
await p.waitForTimeout(600);
const r = await p.evaluate(() => ({
  ativo: [...document.querySelectorAll('.hero-stage [data-hero-dot]')].findIndex(d => d.getAttribute('aria-current')==='true'),
  bgVisivel: [...document.querySelectorAll('.hero-stage [data-hero-bg]')].findIndex(e => Number(getComputedStyle(e).opacity) > 0.5),
}));
console.log(`bullets: ${dots} | inicial ativo=${ativo0} | apos clicar no 4o: ativo=${r.ativo} fundo visivel=${r.bgVisivel}`);

// faixa de stories: nao rola sozinha + arrasta
const antes = await p.evaluate(() => document.querySelector('[data-faixa]').scrollLeft);
await p.waitForTimeout(1500);
const depois = await p.evaluate(() => document.querySelector('[data-faixa]').scrollLeft);
console.log(`faixa: scrollLeft ${antes} -> ${depois} (${antes===depois ? 'parada, ok' : 'ROLANDO SOZINHA'})`);
const cx = await p.evaluate(() => { const r=document.querySelector('[data-faixa]').getBoundingClientRect(); return {x: r.x+r.width/2, y: r.y+r.height/2}; });
await p.mouse.move(cx.x, cx.y); await p.mouse.down(); await p.mouse.move(cx.x-200, cx.y, {steps:10}); await p.mouse.up();
console.log('faixa: scrollLeft apos arraste =', await p.evaluate(() => document.querySelector('[data-faixa]').scrollLeft));

// video do YouTube
await p.locator('[data-video-abrir]').click();
await p.waitForTimeout(800);
const v = await p.evaluate(() => ({ src: document.querySelector('[data-video-el]').src, aberto: document.querySelector('#video-dialog').open }));
console.log('video:', v.aberto ? 'modal aberto' : 'FECHADO', '|', v.src.slice(0,64));
await b.close();
