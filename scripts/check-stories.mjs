import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
await p.evaluate(()=>document.querySelector('.marquee-mask')?.setAttribute('data-pausado',''));

// abre no story 3
await p.locator('[data-story="3"]').first().click();
await p.waitForTimeout(900);
const larg = () => p.evaluate(() => [...document.querySelectorAll('[data-story-barra]')].map(b => Math.round(parseFloat(getComputedStyle(b).width))));
console.log('abriu no 4o -> barras:', (await larg()).slice(0,6));

// pula pra frente
await p.locator('[data-story-next]').click();
await p.waitForTimeout(500);
console.log('apos NEXT   -> barras:', (await larg()).slice(0,6));

// volta
await p.locator('[data-story-prev]').click();
await p.waitForTimeout(500);
console.log('apos PREV   -> barras:', (await larg()).slice(0,6));

// vai pro ultimo e tenta passar
await p.evaluate(() => { for(let i=0;i<8;i++) document.querySelector('[data-story-next]').click(); });
await p.waitForTimeout(600);
const noFim = await p.evaluate(() => document.querySelector('#story-dialog').getAttribute('aria-label'));
await p.locator('[data-story-next]').click();
await p.waitForTimeout(400);
const depois = await p.evaluate(() => ({ label: document.querySelector('#story-dialog').getAttribute('aria-label'), aberto: document.querySelector('#story-dialog').open }));
console.log('no ultimo:', noFim);
console.log('apos NEXT no ultimo:', depois.label, '| modal aberto:', depois.aberto);

// volta ao primeiro e tenta voltar
await p.evaluate(() => { for(let i=0;i<15;i++) document.querySelector('[data-story-prev]').click(); });
await p.waitForTimeout(600);
await p.locator('[data-story-prev]').click();
await p.waitForTimeout(300);
console.log('apos PREV no primeiro:', await p.evaluate(() => document.querySelector('#story-dialog').getAttribute('aria-label')));
await b.close();
