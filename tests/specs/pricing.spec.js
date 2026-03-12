// ============================================================
// Pricing / Packages Test Suite — DigiJ Photography
// ============================================================
const { test, expect } = require('@playwright/test');

test.describe('Pricing Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#pricing').scrollIntoViewIfNeeded();
  });

  test('TC-PRC-01: Pricing section heading is correct', async ({ page }) => {
    await expect(page.locator('#pricing .section-header h2')).toContainText('Photography Packages');
  });

  test('TC-PRC-02: Three pricing cards are displayed', async ({ page }) => {
    const cards = page.locator('.pricing-card');
    await expect(cards).toHaveCount(3);
  });

  test('TC-PRC-03: Basic Session card shows £99', async ({ page }) => {
    const card = page.locator('.pricing-card').nth(0);
    await expect(card).toContainText('Basic Session');
    await expect(card).toContainText('£');
    await expect(card).toContainText('99');
  });

  test('TC-PRC-04: Premium Session card shows £199 and is featured', async ({ page }) => {
    const card = page.locator('.pricing-card.pricing-featured');
    await expect(card).toContainText('Premium Session');
    await expect(card).toContainText('£');
    await expect(card).toContainText('199');
    await expect(card).toContainText('Most Popular');
  });

  test('TC-PRC-05: Full Day Coverage card shows £399', async ({ page }) => {
    const card = page.locator('.pricing-card').nth(2);
    await expect(card).toContainText('Full Day Coverage');
    await expect(card).toContainText('£');
    await expect(card).toContainText('399');
  });

  test('TC-PRC-06: All cards have Book Now buttons linking to contact', async ({ page }) => {
    const bookButtons = page.locator('.pricing-card a:has-text("Book Now")');
    await expect(bookButtons).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(bookButtons.nth(i)).toHaveAttribute('href', '#contact');
    }
  });

  test('TC-PRC-07: Basic Session lists correct features', async ({ page }) => {
    const card = page.locator('.pricing-card').nth(0);
    await expect(card).toContainText('1-hour photo session');
    await expect(card).toContainText('20 edited digital photos');
    await expect(card).toContainText('Online gallery delivery');
  });

  test('TC-PRC-08: Premium Session lists correct features', async ({ page }) => {
    const card = page.locator('.pricing-card.pricing-featured');
    await expect(card).toContainText('3-hour photo session');
    await expect(card).toContainText('60 edited digital photos');
    await expect(card).toContainText('1 printed photo album');
  });

  test('TC-PRC-09: Full Day Coverage lists correct features', async ({ page }) => {
    const card = page.locator('.pricing-card').nth(2);
    await expect(card).toContainText('Full-day (8 hours) session');
    await expect(card).toContainText('150+ edited digital photos');
    await expect(card).toContainText('Highlight video reel');
  });

  test('TC-PRC-10: Custom quote note is visible with contact link', async ({ page }) => {
    await expect(page.locator('.pricing-note')).toBeVisible();
    await expect(page.locator('.pricing-note a[href="#contact"]')).toBeVisible();
  });

  test('TC-PRC-11: Clicking Book Now on Basic scrolls to contact', async ({ page }) => {
    await page.locator('.pricing-card').nth(0).locator('a:has-text("Book Now")').click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('TC-PRC-12: Pricing section is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const cards = page.locator('.pricing-card');
    await expect(cards).toHaveCount(3);
    // All cards still visible on mobile
    for (let i = 0; i < 3; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });
});

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('TC-CON-01: Contact section heading is Book a Session', async ({ page }) => {
    await expect(page.locator('.contact-info h2')).toContainText('Book a Session');
  });

  test('TC-CON-02: Contact details show correct info', async ({ page }) => {
    await expect(page.locator('.contact-details')).toContainText('Swindon, UK');
    await expect(page.locator('.contact-details')).toContainText('gopilaxman@gmail.com');
    await expect(page.locator('.contact-details')).toContainText('+447448401362');
    await expect(page.locator('.contact-details')).toContainText('Mon–Sat');
  });

  test('TC-CON-03: Contact form has all required fields', async ({ page }) => {
    await expect(page.locator('.contact-form input[placeholder="Your Name"]')).toBeVisible();
    await expect(page.locator('.contact-form input[placeholder="Your Email"]')).toBeVisible();
    await expect(page.locator('.contact-form select')).toBeVisible();
    await expect(page.locator('.contact-form textarea')).toBeVisible();
  });

  test('TC-CON-04: Package select dropdown has correct options', async ({ page }) => {
    const select = page.locator('.contact-form select');
    await expect(select).toBeVisible();
    const options = await select.locator('option').allTextContents();
    expect(options).toContain('Basic Session – £99');
    expect(options).toContain('Premium Session – £199');
    expect(options).toContain('Full Day Coverage – £399');
  });

  test('TC-CON-05: Submit button has correct label', async ({ page }) => {
    await expect(page.locator('.contact-form button[type="submit"]')).toContainText('Send Enquiry');
  });
});
