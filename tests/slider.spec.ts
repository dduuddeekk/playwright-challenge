import { test, expect } from '@playwright/test';

test.describe('Task B: Range Slider Validation', () => {

  test('Set slider value to 50 and submit feedback', async ({ page }) => {

    await test.step('ARRANGE: Open Range Slider page and verify slider exists', async () => {
      await page.goto('https://qaplayground.dev/apps/range-slider/', {
        waitUntil: 'domcontentloaded',
      });

      const slider = page.locator('input[type="range"]');
      await expect(slider).toBeVisible();
    });

    const slider = page.locator('input[type="range"]');

    await test.step('ACT: Set slider value to 50', async () => {
      await slider.evaluate((el: HTMLInputElement) => {
        el.value = '50';
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });

    await test.step('ASSERT: Slider value is set to 50', async () => {
      await expect(slider).toHaveValue('50');
    });

    const feedbackButton = page.locator('#feedback');

    await test.step('ASSERT: Send Feedback button becomes visible', async () => {
      await expect(feedbackButton).toBeVisible();
    });

    await test.step('ACT: Click Send Feedback button', async () => {
      await feedbackButton.click();
    });

    await test.step('ASSERT: Thank you message is displayed after submit', async () => {
      const thankYouMessage = page.locator('#ty-msg');
      await expect(thankYouMessage).toBeVisible();
      await expect(thankYouMessage).toHaveText('Thank you for your feedback!');
    });

  });

});
