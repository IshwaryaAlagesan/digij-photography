// ============================================================
// Authentication Test Suite — Login / Register / Logout
// ============================================================
const { test, expect } = require('@playwright/test');

const TEST_USER = {
  name: 'Test User',
  email: `testuser_${Date.now()}@example.com`,
  password: 'Test@1234',
};

test.describe('Login Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear any existing session
    await page.evaluate(() => localStorage.removeItem('demosite_session'));
    await page.reload();
  });

  test('TC-AUTH-01: Login button opens the login modal', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await expect(page.locator('#login-modal')).toHaveClass(/open/);
    await expect(page.locator('#modal-login-view')).toBeVisible();
  });

  test('TC-AUTH-02: Login modal displays email and password fields', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();
    await expect(page.locator('#login-form button[type="submit"]')).toContainText('Sign In');
  });

  test('TC-AUTH-03: Modal closes when X button is clicked', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await expect(page.locator('#login-modal')).toHaveClass(/open/);
    await page.locator('#login-modal .modal-close').click();
    await expect(page.locator('#login-modal')).not.toHaveClass(/open/);
  });

  test('TC-AUTH-04: Modal closes when clicking outside (overlay)', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#login-modal').click({ position: { x: 10, y: 10 } });
    await expect(page.locator('#login-modal')).not.toHaveClass(/open/);
  });

  test('TC-AUTH-05: Switch to Register view from Login', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await expect(page.locator('#modal-register-view')).toBeVisible();
    await expect(page.locator('#modal-login-view')).toBeHidden();
  });

  test('TC-AUTH-06: Login with invalid credentials shows error', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#login-email').fill('wrong@example.com');
    await page.locator('#login-password').fill('wrongpassword');
    await page.locator('#login-form button[type="submit"]').click();
    await expect(page.locator('#login-error')).toBeVisible();
  });

  test('TC-AUTH-07: Login form requires email field', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#login-password').fill('somepassword');
    const isValid = await page.locator('#login-email').evaluate(el => el.validity.valid);
    expect(isValid).toBe(false);
  });
});

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('demosite_session');
      localStorage.removeItem('demosite_users');
    });
    await page.reload();
  });

  test('TC-REG-01: Register form is accessible from login modal', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await expect(page.locator('#reg-name')).toBeVisible();
    await expect(page.locator('#reg-email')).toBeVisible();
    await expect(page.locator('#reg-password')).toBeVisible();
  });

  test('TC-REG-02: Successful registration logs user in', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();

    await page.locator('#reg-name').fill(TEST_USER.name);
    await page.locator('#reg-email').fill(TEST_USER.email);
    await page.locator('#reg-password').fill(TEST_USER.password);
    await page.locator('#register-form button[type="submit"]').click();

    // Modal should close and user pill should appear
    await expect(page.locator('#login-modal')).not.toHaveClass(/open/);
    await expect(page.locator('#nav-user')).toBeVisible();
    await expect(page.locator('#nav-user')).toContainText(TEST_USER.name.split(' ')[0]);
  });

  test('TC-REG-03: Duplicate email registration shows error', async ({ page }) => {
    // Register first time
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await page.locator('#reg-name').fill(TEST_USER.name);
    await page.locator('#reg-email').fill(TEST_USER.email);
    await page.locator('#reg-password').fill(TEST_USER.password);
    await page.locator('#register-form button[type="submit"]').click();
    await expect(page.locator('#nav-user')).toBeVisible();

    // Logout and try to register with same email
    await page.locator('.btn-logout').click();
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await page.locator('#reg-name').fill('Another User');
    await page.locator('#reg-email').fill(TEST_USER.email);
    await page.locator('#reg-password').fill('AnotherPass123');
    await page.locator('#register-form button[type="submit"]').click();
    await expect(page.locator('#register-error')).toBeVisible();
  });

  test('TC-REG-04: Password minimum length validation (6 chars)', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await page.locator('#reg-password').fill('123');
    const isValid = await page.locator('#reg-password').evaluate(el => el.validity.valid);
    expect(isValid).toBe(false);
  });

  test('TC-REG-05: Switch back to Login view from Register', async ({ page }) => {
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await page.locator('#modal-register-view a:has-text("Sign In")').click();
    await expect(page.locator('#modal-login-view')).toBeVisible();
    await expect(page.locator('#modal-register-view')).toBeHidden();
  });
});

test.describe('Login and Logout Flow', () => {
  const USER = {
    name: 'Flow User',
    email: `flowuser_${Date.now()}@test.com`,
    password: 'FlowPass123',
  };

  test('TC-LGN-01: Full register → login → logout flow', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('demosite_session');
      localStorage.removeItem('demosite_users');
    });
    await page.reload();

    // Register
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await page.locator('#reg-name').fill(USER.name);
    await page.locator('#reg-email').fill(USER.email);
    await page.locator('#reg-password').fill(USER.password);
    await page.locator('#register-form button[type="submit"]').click();
    await expect(page.locator('#nav-user')).toBeVisible();

    // Logout
    await page.locator('.btn-logout').click();
    await expect(page.locator('#nav-guest')).toBeVisible();
    await expect(page.locator('#nav-user')).toBeHidden();

    // Login again
    await page.locator('#nav-guest button').click();
    await page.locator('#login-email').fill(USER.email);
    await page.locator('#login-password').fill(USER.password);
    await page.locator('#login-form button[type="submit"]').click();
    await expect(page.locator('#nav-user')).toBeVisible();
  });

  test('TC-LGN-02: Session persists on page reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('demosite_users'));
    await page.reload();

    // Register and check session survives reload
    await page.locator('#nav-guest button').click();
    await page.locator('#modal-login-view a:has-text("Register")').click();
    await page.locator('#reg-name').fill(USER.name);
    await page.locator('#reg-email').fill(`reload_${USER.email}`);
    await page.locator('#reg-password').fill(USER.password);
    await page.locator('#register-form button[type="submit"]').click();
    await expect(page.locator('#nav-user')).toBeVisible();

    await page.reload();
    await expect(page.locator('#nav-user')).toBeVisible();
  });
});
