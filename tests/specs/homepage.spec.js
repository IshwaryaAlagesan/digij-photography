// ============================================================
// Homepage & Navigation Test Suite — DigiJ Photography
// ============================================================
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-HP-01: Page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DigiJ Photography');
  });

  test('TC-HP-02: Navbar is visible with brand name', async ({ page }) => {
    const brand = page.locator('.navbar .nav-brand');
    await expect(brand).toBeVisible();
    await expect(brand).toContainText('DigiJ Photography');
  });

  test('TC-HP-03: Navbar logo image is present', async ({ page }) => {
    const logo = page.locator('.navbar .nav-logo-img');
    await expect(logo).toBeVisible();
  });

  test('TC-HP-04: Hero section displays correct heading and CTA buttons', async ({ page }) => {
    await expect(page.locator('.hero-content h1')).toContainText('DigiJ Photography');
    await expect(page.locator('a:has-text("Our Services")')).toBeVisible();
    await expect(page.locator('a:has-text("Book a Session")')).toBeVisible();
  });

  test('TC-HP-05: Hero logo image is visible', async ({ page }) => {
    await expect(page.locator('.hero-logo-img')).toBeVisible();
  });

  test('TC-HP-06: Hero floating cards show photography services', async ({ page }) => {
    await expect(page.locator('.floating-card.card-1')).toContainText('Wedding Photo Shoot');
    await expect(page.locator('.floating-card.card-2')).toContainText('Baby Photo Shoot');
    await expect(page.locator('.floating-card.card-3')).toContainText('Birthday Photo Shoot');
  });

  test('TC-HP-07: Stats bar shows 4 photography statistics', async ({ page }) => {
    const stats = page.locator('.stats-bar .stat');
    await expect(stats).toHaveCount(4);
    await expect(stats.nth(0)).toContainText('1,200+');
    await expect(stats.nth(1)).toContainText('98%');
    await expect(stats.nth(2)).toContainText('8+');
    await expect(stats.nth(3)).toContainText('50+');
  });

  test('TC-HP-08: Services section displays 6 photography service cards', async ({ page }) => {
    await page.locator('#features').scrollIntoViewIfNeeded();
    const cards = page.locator('.feature-card');
    await expect(cards).toHaveCount(6);
    await expect(cards.nth(0)).toContainText('Wedding Photoshoot');
    await expect(cards.nth(1)).toContainText('Birthday Photo Shoot');
    await expect(cards.nth(2)).toContainText('Baby Photo Shoot');
    await expect(cards.nth(3)).toContainText('Digital Prints');
  });

  test('TC-HP-09: Contact section is visible with correct heading', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('.contact-info h2')).toContainText('Book a Session');
    await expect(page.locator('.contact-form')).toBeVisible();
    await expect(page.locator('.contact-form button[type="submit"]')).toContainText('Send Enquiry');
  });

  test('TC-HP-10: Contact section shows correct location details', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('.contact-details')).toContainText('Swindon, UK');
    await expect(page.locator('.contact-details')).toContainText('gopilaxman@gmail.com');
    await expect(page.locator('.contact-details')).toContainText('+447448401362');
  });

  test('TC-HP-11: Footer renders with DigiJ Photography brand', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.footer-bottom')).toContainText('2026 DigiJ Photography');
  });
});

test.describe('Desktop Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-NAV-01: Correct nav links visible on desktop', async ({ page }) => {
    const links = ['Home', 'Services', 'Pricing', 'Contact'];
    for (const link of links) {
      await expect(page.locator(`.nav-links a:has-text("${link}")`)).toBeVisible();
    }
  });

  test('TC-NAV-02: Removed tabs are not present in navbar', async ({ page }) => {
    await expect(page.locator('.nav-links a[href="#installment"]')).toHaveCount(0);
    await expect(page.locator('.nav-links a[href="#team"]')).toHaveCount(0);
    await expect(page.locator('.nav-links a[href="#customers"]')).toHaveCount(0);
    await expect(page.locator('.nav-links a[href="#crm"]')).toHaveCount(0);
  });

  test('TC-NAV-03: Clicking Services scrolls to services section', async ({ page }) => {
    await page.locator('.nav-links a[href="#features"]').click();
    await expect(page.locator('#features')).toBeInViewport();
  });

  test('TC-NAV-04: Clicking Pricing scrolls to pricing section', async ({ page }) => {
    await page.locator('.nav-links a[href="#pricing"]').click();
    await expect(page.locator('#pricing')).toBeInViewport();
  });

  test('TC-NAV-05: Clicking Contact scrolls to contact section', async ({ page }) => {
    await page.locator('.nav-links a[href="#contact"]').click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('TC-NAV-06: Navbar is sticky on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.locator('.navbar')).toBeVisible();
    const top = await page.locator('.navbar').evaluate(el => el.getBoundingClientRect().top);
    expect(top).toBe(0);
  });

  test('TC-NAV-07: Login button is visible in navbar when logged out', async ({ page }) => {
    await expect(page.locator('#nav-guest button')).toBeVisible();
    await expect(page.locator('#nav-guest button')).toContainText('Login');
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-MOB-01: Hamburger button visible, nav links hidden on mobile', async ({ page }) => {
    await expect(page.locator('.nav-hamburger')).toBeVisible();
    await expect(page.locator('.nav-links')).toBeHidden();
  });

  test('TC-MOB-02: Hamburger click opens mobile menu', async ({ page }) => {
    await page.locator('.nav-hamburger').click();
    await expect(page.locator('.mobile-menu')).toHaveClass(/open/);
    await expect(page.locator('.mobile-menu-overlay')).toHaveClass(/open/);
  });

  test('TC-MOB-03: Mobile menu contains correct navigation links', async ({ page }) => {
    await page.locator('.nav-hamburger').click();
    const links = ['Home', 'Services', 'Pricing', 'Contact'];
    for (const link of links) {
      await expect(page.locator(`.mobile-nav-links a:has-text("${link}")`)).toBeVisible();
    }
  });

  test('TC-MOB-04: Mobile menu close button closes the drawer', async ({ page }) => {
    await page.locator('.nav-hamburger').click();
    await page.locator('.mobile-menu-close').click();
    await expect(page.locator('.mobile-menu')).not.toHaveClass(/open/);
  });

  test('TC-MOB-05: Clicking overlay closes mobile menu', async ({ page }) => {
    await page.locator('.nav-hamburger').click();
    await page.locator('.mobile-menu-overlay').click({ position: { x: 10, y: 400 }, force: true });
    await expect(page.locator('.mobile-menu')).not.toHaveClass(/open/);
  });

  test('TC-MOB-06: Mobile menu contains Login/Register button', async ({ page }) => {
    await page.locator('.nav-hamburger').click();
    await expect(page.locator('#mobile-nav-guest button')).toContainText('Login / Register');
  });

  test('TC-MOB-07: Clicking a mobile nav link closes the menu', async ({ page }) => {
    await page.locator('.nav-hamburger').click();
    await page.locator('.mobile-nav-links a[href="#features"]').click();
    await expect(page.locator('.mobile-menu')).not.toHaveClass(/open/);
  });
});
