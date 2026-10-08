const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.AUDIT_URL || 'http://127.0.0.1:5190');

    // Hero workbench cycles its overlays while visible, and stops once a tool is chosen.
    await page.locator('.wb').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.wb').dataset.overlay !== 'none', null, { timeout: 8000 });
    await page.getByRole('button', { name: /Measure/ }).click();
    assert.equal(await page.locator('.wb').getAttribute('data-overlay'), 'measure');
    await page.waitForTimeout(4200);
    assert.equal(await page.locator('.wb').getAttribute('data-overlay'), 'measure');
    assert.ok(await page.locator('.wb .ov-m-line').evaluate(el => el.getAnimations().length > 0 || getComputedStyle(el).opacity === '1'));

    // Transformation line draws once the section enters.
    await page.locator('.xform').scrollIntoViewIfNeeded();
    await page.waitForSelector('.xform.motion-entered');
    await page.screenshot({ path: 'motion-showcase.png' });

    // Reduced motion: no auto-cycling.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.locator('.wb').scrollIntoViewIfNeeded();
    await page.waitForTimeout(4200);
    assert.equal(await page.locator('.wb').getAttribute('data-overlay'), 'none');

    assert.deepEqual(errors, []);
    console.log('Workbench cycling, tool selection, transformation reveal and reduced motion passed.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
