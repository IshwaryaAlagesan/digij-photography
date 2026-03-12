const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('there should be {int} pricing cards displayed', async function (count) {
  const cards = this.page.locator('.pricing-card');
  await expect(cards).toHaveCount(count);
});

Then('the {string} package should show price {string}', async function (packageName, price) {
  const card = this.page.locator('.pricing-card', { hasText: packageName });
  const priceEl = card.locator('.pricing-price');
  await expect(priceEl).toHaveText(price);
});

Then('the {string} package should show currency {string}', async function (packageName, currency) {
  const card = this.page.locator('.pricing-card', { hasText: packageName });
  const currencyEl = card.locator('.pricing-currency');
  await expect(currencyEl).toHaveText(currency);
});

Then('the {string} package should have a {string} tag', async function (packageName, tagText) {
  const card = this.page.locator('.pricing-card', { hasText: packageName });
  const tag = card.locator('.pricing-popular-tag');
  await expect(tag).toContainText(tagText);
});

Then('the {string} package should list feature {string}', async function (packageName, featureText) {
  const card = this.page.locator('.pricing-card', { hasText: packageName });
  const feature = card.locator('.pricing-features li', { hasText: featureText });
  await expect(feature).toBeAttached();
});

Then('each pricing card should have a {string} button', async function (buttonText) {
  const cards = this.page.locator('.pricing-card');
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    const btn = cards.nth(i).locator(`a:has-text("${buttonText}")`);
    await expect(btn).toBeAttached();
  }
});

Then('I should see text {string}', async function (text) {
  const element = this.page.locator(`text=${text}`).first();
  await expect(element).toBeAttached();
});
