// Viewport-true screenshots: scrolls each page one screen at a time and stitches the frames.
// Full-page screenshots stretch the viewport, which breaks vh-based and pinned sections. This does not.
// Usage: node scripts/walk.mjs <round> [baseUrl]
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const round = process.argv[2] || '1';
const base = process.argv[3] || 'http://localhost:4321';
const dir = `docs/checklists/award-website-rounds/round-${round}`;
await mkdir(dir, { recursive: true });
const pages = { home: '/', work: '/work', coast: '/work/coast', about: '/about', contact: '/contact' };
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const browser = await chromium.launch();
const errors = [];
for (const [vname, viewport] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport, colorScheme: 'dark', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${vname}] ${page.url()} ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[${vname}] ${page.url()} ${e.message}`));
  for (const [name, path] of Object.entries(pages)) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2800); // let the hero develop
    const frames = [];
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const max = Math.min(total - viewport.height, viewport.height * 14);
    for (let y = 0; y <= max; y += viewport.height) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
      await page.waitForTimeout(700);
      frames.push(await page.screenshot({ type: 'png' }));
    }
    const out = sharp({ create: { width: viewport.width, height: viewport.height * frames.length, channels: 3, background: '#0b0b0c' } });
    await out.composite(frames.map((input, i) => ({ input, top: i * viewport.height, left: 0 }))).png().toFile(`${dir}/${name}-${vname}-walk.png`);
  }
  await ctx.close();
}
await browser.close();
console.log(errors.length ? `Console errors:\n${errors.join('\n')}` : 'Console clean');
