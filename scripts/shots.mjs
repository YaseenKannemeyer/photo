// Full-page screenshots of every page at desktop and mobile, light and dark, into docs/checklists/award-website-rounds/round-N/.
// Usage: node scripts/shots.mjs <round> [baseUrl]
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const round = process.argv[2] || '1';
const base = process.argv[3] || 'http://localhost:4321';
const dir = `docs/checklists/award-website-rounds/round-${round}`;
await mkdir(dir, { recursive: true });
const pages = { home: '/', work: '/work', coast: '/work/coast', about: '/about', contact: '/contact', '404': '/missing-page' };
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const browser = await chromium.launch();
const errors = [];
for (const scheme of ['light', 'dark']) {
  for (const [vname, viewport] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${scheme}/${vname}] ${page.url()} ${m.text()}`); });
    page.on('pageerror', (e) => errors.push(`[${scheme}/${vname}] ${page.url()} ${e.message}`));
    for (const [name, path] of Object.entries(pages)) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      // Scroll through so in-view reveals fire, then back to top.
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 400) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${dir}/${name}-${vname}-${scheme}.png`, fullPage: true });
    }
    await ctx.close();
  }
}
await browser.close();
console.log(errors.length ? `Console errors:\n${errors.join('\n')}` : 'Console clean');
