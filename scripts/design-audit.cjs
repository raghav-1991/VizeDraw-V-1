const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:5189';

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(15000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const routes = [...fs.readFileSync('src/App.tsx', 'utf8').matchAll(/path: '([^']+)'/g)].map(m => m[1]);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of routes) {
      await page.goto(baseUrl + route);
      try { await page.locator('h1').waitFor(); }
      catch (error) { console.log({ route, width, errors, body: (await page.locator('body').innerText()).slice(0, 1500) }); throw error; }
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1, route + ' heading');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (overflow) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e instanceof HTMLElement && e.getBoundingClientRect().right > innerWidth + 1).slice(0, 15).map(e => ({ class: e.className, width: e.getBoundingClientRect().width }))));
      assert.equal(overflow, false, route + ' overflow at ' + width);
    }
    console.log(`Checked ${routes.length} routes at ${width}px`);
    await page.goto(baseUrl);
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `design-${width}.png`, fullPage: true, animations: 'disabled' });
    await page.screenshot({ path: `design-viewport-${width}.png`, animations: 'disabled' });
  }
  const homeQuestion = page.getByRole('button', { name: 'What is drawing knowledge?' });
  await homeQuestion.click();
  assert.equal(await homeQuestion.getAttribute('aria-expanded'), 'true');
  assert.equal(await page.getByRole('link', { name: 'Start free', exact: true }).first().getAttribute('href'), 'https://app.vizedraw.com/signup');
  assert.equal(await page.getByRole('link', { name: 'Sign in', exact: true }).first().getAttribute('href'), 'https://app.vizedraw.com/');
  // Footer legal links open the site's own legal pages.
  for (const [name, href] of [['Privacy Notice', '/privacy-notice'], ['Terms of Use', '/terms-of-use'], ['Cookie Preferences', '/cookie-preferences']]) {
    assert.equal(await page.locator('.site-footer__legal').getByRole('link', { name, exact: true }).getAttribute('href'), href);
  }
  await page.goto(baseUrl + '/cookie-preferences');
  await page.getByText('Allow analytics cookies', { exact: true }).click();
  assert.equal(await page.getByRole('switch', { name: 'Allow analytics cookies' }).isChecked(), true);
  await page.reload();
  assert.equal(await page.getByRole('switch', { name: 'Allow analytics cookies' }).isChecked(), true);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.menu-button').click();
  assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'), 'false');
  await page.goto(baseUrl + '/enterprise');
  await page.locator('.faq__q button').first().click();
  assert.equal(await page.locator('.faq__q button').first().getAttribute('aria-expanded'), 'true');
  await page.goto(baseUrl + '/pricing');
  // 100-person preset: 2 Control + 5 Pro + one 1 TB storage pack; AI covered by Pro.
  assert.equal(await page.locator('.calc__amount').innerText(), '$1,392');
  await page.getByRole('button', { name: 'Large team', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Large team', exact: true }).getAttribute('aria-pressed'), 'true');
  // 5 Control + 12 Pro + 4 × 1 TB packs + 1 × 10,000 + 4 × 1,000 credit packs.
  assert.equal(await page.locator('.calc__amount').innerText(), '$3,789');
  await page.getByLabel('Pro users').fill('300');
  assert.equal(await page.locator('.calc__warning').count(), 1);
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto(baseUrl + '/product');
  await page.screenshot({ path: 'design-product.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log(`${routes.length} routes passed at three widths; FAQ, app and legal links, cookie preferences, mobile navigation and pricing calculator passed; no page errors.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
