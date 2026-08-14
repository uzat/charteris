import { test, expect } from '@playwright/test';

// Injects a fake Date into the page so quietHours.ts reads the mocked time.
// isoUTC must be a valid ISO 8601 UTC string.
function mockTime(isoUTC: string): string {
  return `{
    const RealDate = Date;
    const fakeNow = new RealDate('${isoUTC}').getTime();
    class MockDate extends RealDate {
      constructor(...args) {
        if (args.length === 0) { super(fakeNow); }
        else { super(...args); }
      }
      static now() { return fakeNow; }
    }
    globalThis.Date = MockDate;
  }`;
}

test.describe('Quiet hours banner', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('shows Active Now badge during quiet hours — 23:30 AEDT', async ({ page }) => {
    // 23:30 AEDT (UTC+11 in January) = 12:30 UTC
    await page.addInitScript(mockTime('2024-01-15T12:30:00Z'));
    await page.goto('/stay/sorrento-ridge?group=family');
    await expect(page.getByText('Active Now')).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('shows upcoming message 30 minutes before quiet hours — 21:30 AEDT', async ({ page }) => {
    // 21:30 AEDT = 10:30 UTC
    await page.addInitScript(mockTime('2024-01-15T10:30:00Z'));
    await page.goto('/stay/sorrento-ridge?group=family');
    await expect(page.getByText(/quiet hours starting soon/i)).toBeVisible();
    await expect(page.getByRole('status')).toBeVisible();
  });

  test('shows no banner during the day — 14:00 AEDT', async ({ page }) => {
    // 14:00 AEDT = 03:00 UTC
    await page.addInitScript(mockTime('2024-01-15T03:00:00Z'));
    await page.goto('/stay/sorrento-ridge?group=family');
    await expect(page.getByRole('alert')).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveCount(0);
  });
});
