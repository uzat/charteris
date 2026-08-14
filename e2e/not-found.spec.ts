import { test, expect } from '@playwright/test';

test.describe('Property not-found page', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('unknown slug returns 404 with branded heading and contact text', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    const response = await page.goto('/stay/nonexistent-property');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Property not found' })).toBeVisible();
    await expect(page.getByText('Contact your host or property manager for the correct link')).toBeVisible();
    expect(pageErrors).toHaveLength(0);
  });

  test('slug value is not rendered anywhere on the not-found page', async ({ page }) => {
    await page.goto('/stay/xss-attempt');

    await expect(page.getByRole('heading', { name: 'Property not found' })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('xss-attempt');
  });
});
