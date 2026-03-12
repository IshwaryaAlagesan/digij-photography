const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the contact section should display {string}', async function (text) {
  const section = this.page.locator('#contact');
  await expect(section).toContainText(text);
});

Then('the contact details should show {string}', async function (text) {
  const details = this.page.locator('.contact-details');
  await expect(details).toContainText(text);
});

Then('the contact form should have a {string} input', async function (placeholder) {
  const input = this.page.locator(`.contact-form input[placeholder="${placeholder}"]`);
  await expect(input).toBeAttached();
});

Then('the contact form should have a package dropdown', async function () {
  const select = this.page.locator('.contact-form select');
  await expect(select).toBeAttached();
});

Then('the contact form should have a message textarea', async function () {
  const textarea = this.page.locator('.contact-form textarea');
  await expect(textarea).toBeAttached();
});

Then('the package dropdown should have option {string}', async function (optionText) {
  const option = this.page.locator(`.contact-form select option:has-text("${optionText}")`);
  await expect(option).toBeAttached();
});

When('I fill in the contact form with valid details', async function () {
  await this.page.fill('.contact-form input[placeholder="Your Name"]', 'John Test');
  await this.page.fill('.contact-form input[placeholder="Your Email"]', 'john@test.com');
  await this.page.locator('.contact-form select').selectOption({ index: 1 });
  await this.page.fill('.contact-form input[placeholder="Preferred Date"]', '2026-04-01');
  await this.page.fill('.contact-form textarea', 'I would like to book a photo session.');
});

When('I submit the contact form', async function () {
  await this.page.locator('.contact-form button[type="submit"]').click();
  await this.page.waitForTimeout(500);
});

Then('the submit button should show {string}', async function (text) {
  const btn = this.page.locator('.contact-form button[type="submit"]');
  await expect(btn).toContainText(text);
});
