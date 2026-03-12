const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ===== Login Button =====

Then('I should see the Login button in the navbar', async function () {
  const btn = this.page.locator('#nav-guest .btn-primary');
  await expect(btn).toBeVisible();
});

When('I click the Login button', async function () {
  // Try desktop button first, then mobile
  const desktopBtn = this.page.locator('#nav-guest .btn-primary');
  if (await desktopBtn.isVisible()) {
    await desktopBtn.click();
  } else {
    // On mobile, open hamburger first
    await this.page.locator('#nav-hamburger').click();
    await this.page.waitForTimeout(300);
    await this.page.locator('#mobile-nav-guest button').click();
  }
  await this.page.waitForTimeout(400);
});

// ===== Login Modal =====

Then('the login modal should be visible', async function () {
  const modal = this.page.locator('#login-modal');
  await expect(modal).toHaveClass(/open/);
});

Then('the login modal should not be visible', async function () {
  const modal = this.page.locator('#login-modal');
  const hasOpen = await modal.evaluate(el => el.classList.contains('open'));
  expect(hasOpen).toBe(false);
});

Then('the modal should display {string}', async function (text) {
  const modal = this.page.locator('#login-modal');
  await expect(modal).toContainText(text);
});

Then('the login modal should have an email input', async function () {
  const input = this.page.locator('#login-email');
  await expect(input).toBeVisible();
});

Then('the login modal should have a password input', async function () {
  const input = this.page.locator('#login-password');
  await expect(input).toBeVisible();
});

// ===== Registration =====

When('I click {string} link in the modal', async function (linkText) {
  await this.page.locator(`#login-modal a:has-text("${linkText}")`).click();
  await this.page.waitForTimeout(300);
});

Then('I should see the registration form', async function () {
  const view = this.page.locator('#modal-register-view');
  const display = await view.evaluate(el => el.style.display);
  expect(display).not.toBe('none');
});

Then('the registration form should have a name input', async function () {
  const input = this.page.locator('#reg-name');
  await expect(input).toBeAttached();
});

Then('the registration form should have an email input', async function () {
  const input = this.page.locator('#reg-email');
  await expect(input).toBeAttached();
});

Then('the registration form should have a password input', async function () {
  const input = this.page.locator('#reg-password');
  await expect(input).toBeAttached();
});

When('I register with name {string} email {string} and password {string}', async function (name, email, password) {
  await this.page.fill('#reg-name', name);
  await this.page.fill('#reg-email', email);
  await this.page.fill('#reg-password', password);
  await this.page.locator('#register-form button[type="submit"]').click();
  await this.page.waitForTimeout(500);
});

Then('I should be logged in as {string}', async function (firstName) {
  const username = this.page.locator('#nav-username');
  await expect(username).toHaveText(firstName);
});

// ===== Login =====

When('I login with email {string} and password {string}', async function (email, password) {
  await this.page.fill('#login-email', email);
  await this.page.fill('#login-password', password);
  await this.page.locator('#login-form button[type="submit"]').click();
  await this.page.waitForTimeout(500);
});

Then('I should see login error {string}', async function (errorMsg) {
  const error = this.page.locator('#login-error');
  await expect(error).toBeVisible();
  await expect(error).toContainText(errorMsg);
});

Given('I register a user with name {string} email {string} and password {string}', async function (name, email, password) {
  await this.page.evaluate(({ name, email, password }) => {
    const USERS_KEY = 'demosite_users';
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (!users.find(u => u.email === email)) {
      users.push({ name, email, password });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }, { name, email, password });
});

// ===== Logout =====

When('I click the Logout button', async function () {
  await this.page.locator('.btn-logout').click();
  await this.page.waitForTimeout(300);
});

// ===== Modal close =====

When('I press the Escape key', async function () {
  await this.page.keyboard.press('Escape');
  await this.page.waitForTimeout(300);
});

When('I click outside the modal', async function () {
  await this.page.locator('#login-modal').click({ position: { x: 5, y: 5 } });
  await this.page.waitForTimeout(300);
});
