// ============================================================
// Photography Services Test Suite — DigiJ Photography
// ============================================================
const { test, expect } = require('@playwright/test');

test.describe('Photography Services Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#features').scrollIntoViewIfNeeded();
  });

  test('TC-SVC-01: Services section heading is correct', async ({ page }) => {
    await expect(page.locator('#features .section-header h2')).toContainText('Our Photography Services');
  });

  test('TC-SVC-02: Six service cards are displayed', async ({ page }) => {
    await expect(page.locator('.feature-card')).toHaveCount(6);
  });

  test('TC-SVC-03: Wedding Photoshoot card is present', async ({ page }) => {
    await expect(page.locator('.feature-card').nth(0)).toContainText('Wedding Photoshoot');
  });

  test('TC-SVC-04: Birthday Photo Shoot card is present', async ({ page }) => {
    await expect(page.locator('.feature-card').nth(1)).toContainText('Birthday Photo Shoot');
  });

  test('TC-SVC-05: Baby Photo Shoot card is present', async ({ page }) => {
    await expect(page.locator('.feature-card').nth(2)).toContainText('Baby Photo Shoot');
  });

  test('TC-SVC-06: Digital Prints & Albums card is present', async ({ page }) => {
    await expect(page.locator('.feature-card').nth(3)).toContainText('Digital Prints');
  });

  test('TC-SVC-07: Family Portraits card is present', async ({ page }) => {
    await expect(page.locator('.feature-card').nth(4)).toContainText('Family Portraits');
  });

  test('TC-SVC-08: Event Photography card is present', async ({ page }) => {
    await expect(page.locator('.feature-card').nth(5)).toContainText('Event Photography');
  });

  test('TC-SVC-09: Removed sections do not exist in DOM', async ({ page }) => {
    await expect(page.locator('#installment')).toHaveCount(0);
    await expect(page.locator('#team')).toHaveCount(0);
    await expect(page.locator('#customers')).toHaveCount(0);
    await expect(page.locator('#crm')).toHaveCount(0);
  });

  test('TC-SVC-10: Services section is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('#features').scrollIntoViewIfNeeded();
    await expect(page.locator('.feature-card')).toHaveCount(6);
  });
});
