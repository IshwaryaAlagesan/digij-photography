const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the section header should display {string}', async function (text) {
  const header = this.page.locator('.section-header', { hasText: text });
  await expect(header).toBeAttached();
});

Then('I should see a service card with title {string}', async function (title) {
  const card = this.page.locator('.feature-card h3', { hasText: title });
  await expect(card).toBeAttached();
});

Then('the service card {string} should have a description', async function (title) {
  const card = this.page.locator('.feature-card', { hasText: title });
  const desc = card.locator('p');
  const text = await desc.textContent();
  expect(text.trim().length).toBeGreaterThan(10);
});

Then('there should be {int} service cards displayed', async function (count) {
  const cards = this.page.locator('.feature-card');
  await expect(cards).toHaveCount(count);
});

When('I hover over the first service card', async function () {
  const firstCard = this.page.locator('.feature-card').first();
  await firstCard.hover();
  await this.page.waitForTimeout(400);
});

Then('the first service card should have a transform style', async function () {
  // After hover, the CSS transition applies translateY(-6px)
  const transform = await this.page.locator('.feature-card').first().evaluate(el => {
    return window.getComputedStyle(el).transform;
  });
  // Transform should not be 'none' after hover
  expect(transform).not.toBe('none');
});
