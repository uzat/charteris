import { test, expect } from '@playwright/test';

test.describe('Guest journey — Sorrento Ridge Estate', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('loads without overlay when group param is provided', async ({ page }) => {
    await page.goto('/stay/sorrento-ridge?group=family');
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('experience grid shows family-appropriate experiences', async ({ page }) => {
    await page.goto('/stay/sorrento-ridge?group=family');
    await expect(page.getByText('Peninsula Helicopter Tour')).toBeVisible();
    await expect(page.getByText('Peninsula Hot Springs — Private Bathing')).toBeVisible();
  });

  test('hen_party booking type hides restricted experiences', async ({ page }) => {
    await page.goto('/stay/sorrento-ridge?group=hen_party');
    await expect(page.getByText('Peninsula Helicopter Tour')).toBeVisible();
    await expect(page.getByText('Peninsula Hot Springs — Private Bathing')).not.toBeVisible();
    await expect(page.getByText('Studio & Co — Ceramics Workshop')).not.toBeVisible();
  });

  test('tapping Wi-Fi accordion expands content', async ({ page }) => {
    await page.goto('/stay/sorrento-ridge?group=family');
    const wifiButton = page.getByRole('button', { name: /wi-fi/i });
    await expect(wifiButton).toBeVisible();
    await wifiButton.click();
    await expect(page.getByText(/SorrentoRidge5G/)).toBeVisible();
  });

  test('concierge submits question and shows response', async ({ page }) => {
    await page.route('/api/concierge', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ answer: 'Check-out is at 10am. Leave keys on the kitchen bench.' }),
      })
    );

    await page.goto('/stay/sorrento-ridge?group=family');
    await page.getByRole('textbox', { name: /ask the concierge/i }).fill('What time is check-out?');
    await page.getByRole('button', { name: /send/i }).click();
    await expect(page.getByText('What time is check-out?')).toBeVisible();
    await expect(page.getByText(/check-out is at 10am/i)).toBeVisible();
  });

  test('no dialog appears on reload', async ({ page }) => {
    await page.goto('/stay/sorrento-ridge?group=couples');
    await expect(page.getByRole('main')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
