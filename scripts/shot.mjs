/**
 * Screenshot local para comparação pixel-perfect com o Figma (Fase 4.3).
 *
 *   node scripts/shot.mjs <url> <width> <out.png> [selector]
 *
 * Sem selector: captura a página inteira.
 * Com selector: captura só aquele elemento (ex.: "header", "footer").
 */
import { chromium } from 'playwright';

const [url, width, out, selector] = process.argv.slice(2);

if (!url || !width || !out) {
  console.error('uso: node scripts/shot.mjs <url> <width> <out.png> [selector]');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: 'networkidle' });
// deixa a fonte assentar antes de fotografar
await page.evaluate(() => document.fonts.ready);
// o dev toolbar do Astro injeta <header>/<footer> próprios — fora daqui
await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());

// dispara os scroll-reveals: rola a pagina toda e volta
const alturaTotal = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < alturaTotal; y += 600) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(120);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);

const target = selector ? page.locator(selector) : page;
await target.screenshot({ path: out, ...(selector ? {} : { fullPage: true }) });

await browser.close();
console.log(`✓ ${out}`);
