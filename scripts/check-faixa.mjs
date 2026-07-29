import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' });
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());

const t = (s) => p.evaluate((sel) => getComputedStyle(document.querySelector(sel)).transform, s);
const a = await t('[data-faixa]'); await p.waitForTimeout(1200); const c = await t('[data-faixa]');
console.log('autoplay:', a !== c ? 'rolando (ok)' : 'PARADA');
console.log('fade lateral:', await p.evaluate(() => getComputedStyle(document.querySelector('.faixa-mascara')).maskImage.slice(0,40)));

// pausa no hover
await p.locator('.faixa-mascara').hover(); await p.waitForTimeout(200);
const h1 = await t('[data-faixa]'); await p.waitForTimeout(800); const h2 = await t('[data-faixa]');
console.log('pausa no hover:', h1 === h2 ? 'ok' : 'NAO PAUSOU');

// arraste
const box = await p.locator('[data-faixa]').boundingBox();
await p.mouse.move(box.x+400, box.y+box.height/2); await p.mouse.down();
await p.mouse.move(box.x+200, box.y+box.height/2, {steps:8}); await p.mouse.up();
console.log('arraste:', await t('[data-faixa]'));

// clique abre o story
await p.mouse.move(0,0); await p.waitForTimeout(300);
await p.locator('[data-story="2"]').first().click();
await p.waitForTimeout(500);
console.log('clique abre modal:', await p.evaluate(() => document.querySelector('#story-dialog').open));
await b.close();
