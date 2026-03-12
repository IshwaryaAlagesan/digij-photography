const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ===== GIVEN =====

Given('I am on the homepage', async function () {
  await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
  await this.page.waitForTimeout(500);
});

Given('I am on the homepage with a mobile viewport', async function () {
  await this.page.setViewportSize({ width: 375, height: 812 });
  await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
  await this.page.waitForTimeout(500);
});

Given('I am on the homepage with a small phone viewport', async function () {
  await this.page.setViewportSize({ width: 375, height: 667 });
  await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
  await this.page.waitForTimeout(500);
});

Given('I scroll to the {string} section', async function (sectionId) {
  await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, sectionId);
  await this.page.waitForTimeout(400);
});

// ===== THEN (Homepage) =====

Then('the page title should be {string}', async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).toBe(expectedTitle);
});

Then('the navbar should display {string}', async function (text) {
  const brand = await this.page.locator('.nav-brand').first().textContent();
  expect(brand.trim()).toContain(text);
});

Then('the navbar should have the following links:', async function (dataTable) {
  const expectedLinks = dataTable.rows().map(row => row[0]);
  for (const linkText of expectedLinks) {
    const link = this.page.locator('.nav-links a', { hasText: linkText });
    await expect(link).toBeAttached();
  }
});

Then('the hero section should contain {string}', async function (text) {
  const hero = this.page.locator('#home');
  await expect(hero).toContainText(text);
});

Then('I should see a button {string}', async function (buttonText) {
  const btn = this.page.locator(`a:has-text("${buttonText}"), button:has-text("${buttonText}")`).first();
  await expect(btn).toBeAttached();
});

Then('I should see floating card {string}', async function (cardText) {
  const card = this.page.locator('.floating-card', { hasText: cardText });
  await expect(card).toBeAttached();
});

Then('the stats bar should display {string}', async function (text) {
  const stats = this.page.locator('.stats-bar');
  await expect(stats).toContainText(text);
});

Then('the footer should contain {string}', async function (text) {
  const footer = this.page.locator('footer');
  await expect(footer).toContainText(text);
});

Then('the footer should have link {string}', async function (linkText) {
  const link = this.page.locator(`footer a:has-text("${linkText}")`).first();
  await expect(link).toBeAttached();
});

// ===== WHEN (Navigation) =====

When('I click the {string} nav link', async function (linkText) {
  await this.page.locator(`.nav-links a:has-text("${linkText}")`).click();
  await this.page.waitForTimeout(800);
});

Then('the {string} section should be in view', async function (sectionId) {
  const isVisible = await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }, sectionId);
  expect(isVisible).toBe(true);
});
