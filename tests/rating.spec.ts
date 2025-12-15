import { test, expect } from '@playwright/test';

test.describe('Task A: Rating App Validation', () => {

  test('Verification of Rating App 1 to 5 stars (Image, Text, Number)', async ({ page }) => {

    await test.step('ARRANGE: Open Rating App and verify stars are visible', async () => {
      await page.goto('https://qaplayground.dev/apps/rating/');
      await expect(page.locator('.stars')).toBeVisible();
    });

    const testCases = [
      {
        index: 0,
        emojiId: '#star-1',
        emojiMargin: '0px',
        text: 'I just hate it',
        number: '1 out of 5',
      },
      {
        index: 1,
        emojiId: '#star-2',
        emojiMargin: '-135px',
        text: "I don't like it",
        number: '2 out of 5',
      },
      {
        index: 2,
        emojiId: '#star-3',
        emojiMargin: '-270px',
        text: 'This is awesome',
        number: '3 out of 5',
      },
      {
        index: 3,
        emojiId: '#star-4',
        emojiMargin: '-405px',
        text: 'I just like it',
        number: '4 out of 5',
      },
      {
        index: 4,
        emojiId: '#star-5',
        emojiMargin: '-540px',
        text: 'I just love it',
        number: '5 out of 5',
      },
    ];

    const stars = page.locator('.stars label');
    const emojiSlider = page.locator('.slideImg');

    for (const data of testCases) {

      await test.step(`ACT: Click ${data.index + 1} star(s)`, async () => {
        await stars.nth(data.index).click();
      });

      await test.step(
        `ASSERT: Image, text, and number are correct for ${data.index + 1} star(s)`,
        async () => {

          await expect(page.locator(data.emojiId)).toBeChecked();
          await expect(emojiSlider).toHaveCSS('margin-top', data.emojiMargin);

          const actualText = await page.$eval('.footer .text', el =>
            window
              .getComputedStyle(el, ':before')
              .getPropertyValue('content')
              .replace(/"/g, '')
          );
          expect(actualText).toBe(data.text);

          const actualNumber = await page.$eval('.footer .numb', el =>
            window
              .getComputedStyle(el, ':before')
              .getPropertyValue('content')
              .replace(/"/g, '')
          );
          expect(actualNumber).toBe(data.number);
        }
      );
    }
  });
});
