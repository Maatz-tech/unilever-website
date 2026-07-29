import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900}, javaScriptEnabled:false });
await p.goto('http://localhost:4321/', { waitUntil:'load' });
await p.locator('#pre-requisitos').screenshot({ path: '/tmp/claude-501/nojs.png' });
const temClasseJs = await p.locator('html').getAttribute('class');
console.log('classe do <html> sem JS:', JSON.stringify(temClasseJs));
await b.close();
