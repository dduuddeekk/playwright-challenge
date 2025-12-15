import { test, expect } from '@playwright/test';

test.describe('Links', () => {

  test('Should open each menu link in a new page via URL', async ({ page, context }) => {

    await test.step('ARRANGE: Open Links app and verify navigation menu', async () => {
      await page.goto('https://qaplayground.dev/apps/links/');
      await expect(page.locator('#nav')).toBeVisible();
    });

    const links = page.locator('#nav > a');
    await expect(links).toHaveCount(5);

    const newPage = await context.newPage();

    for (let i = 1; i < await links.count(); i++) {

      const menuText = (await links.nth(i).textContent())?.trim();
      const href = await links.nth(i).getAttribute('href');

      await test.step(`ACT: Open "${menuText}" page via direct URL`, async () => {
        await newPage.goto(`https://qaplayground.dev/apps/links/${href}`);
      });

      await test.step(`ASSERT: Page title matches "${menuText}"`, async () => {
        await expect(newPage.locator('#title')).toContainText(menuText!);
      });
    }

    await newPage.close();
  });

});
