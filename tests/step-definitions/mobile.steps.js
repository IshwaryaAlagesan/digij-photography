const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ===== Hamburger Menu =====

Then('the hamburger menu button should be visible', async function () {
  const hamburger = this.page.locator('#nav-hamburger');
  await expect(hamburger).toBeVisible();
});

Then('the desktop nav links should be hidden', async function () {
  const navLinks = this.page.locator('.nav-links');
  await expect(navLinks).toBeHidden();
});

When('I click the hamburger menu', async function () {
  await this.page.locator('#nav-hamburger').click();
  await this.page.waitForTimeout(400);
});

Then('the mobile menu drawer should be open', async function () {
  const menu = this.page.locator('#mobile-menu');
  await expect(menu).toHaveClass(/open/);
});

Then('the mobile menu drawer should be closed', async function () {
  const menu = this.page.locator('#mobile-menu');
  const hasOpen = await menu.evaluate(el => el.classList.contains('open'));
  expect(hasOpen).toBe(false);
});

Then('the mobile menu should have link {string}', async function (linkText) {
  const link = this.page.locator(`#mobile-menu a:has-text("${linkText}")`).first();
  await expect(link).toBeAttached();
});

When('I click the mobile menu close button', async function () {
  await this.page.locator('.mobile-menu-close').click();
  await this.page.waitForTimeout(400);
});

Then('the mobile menu should have a {string} button', async function (buttonText) {
  const btn = this.page.locator(`#mobile-menu button:has-text("${buttonText}")`);
  await expect(btn).toBeAttached();
});

// ===== Mobile Layout =====

Then('the hero section should be displayed', async function () {
  const hero = this.page.locator('#home');
  await expect(hero).toBeVisible();
});

Then('the pricing cards should be stacked vertically', async function () {
  const grid = this.page.locator('.pricing-grid');
  const computed = await grid.evaluate(el => {
    return window.getComputedStyle(el).gridTemplateColumns;
  });
  // On mobile, should be single column (only 1 track value)
  const trackCount = computed.split(' ').length;
  expect(trackCount).toBe(1);
});

Then('the contact form should be visible', async function () {
  const form = this.page.locator('.contact-form');
  await expect(form).toBeVisible();
});

Then('the service cards should be in a single column', async function () {
  const grid = this.page.locator('.features-grid');
  const computed = await grid.evaluate(el => {
    return window.getComputedStyle(el).gridTemplateColumns;
  });
  const trackCount = computed.split(' ').length;
  expect(trackCount).toBe(1);
});
