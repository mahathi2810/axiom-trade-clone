import { test, expect } from '@playwright/test';

test.describe('Pulse Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pulse');
  });

  test('should display token tables', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('table');
    
    // Check tabs are visible
    await expect(page.getByText('New Pairs')).toBeVisible();
    await expect(page.getByText('Final Stretch')).toBeVisible();
    await expect(page.getByText('Migrated')).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    await page.click('text=Final Stretch');
    await expect(page.locator('[data-state="active"]')).toContainText('Final Stretch');
  });

  test('should open filter panel', async ({ page }) => {
    await page.click('text=Filters');
    await expect(page.locator('text=Reset All Filters')).toBeVisible();
  });

  test('should be responsive at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });
});
