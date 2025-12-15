import { test, expect } from '@playwright/test';

test.describe('Task C: QR Code Generator', () => {

    test('Should visually validate generated image', async ({ page }) => {

        await test.step('ARRANGE: Open QR Generator page', async () => {
            await page.goto('https://qaplayground.dev/apps/qr-code-generator/');
            await expect(page.locator('text=QR Code Generator')).toBeVisible();
        });

        await test.step('ACT: Generate QR code from text', async () => {
            await page.locator('[placeholder="Enter text or URL"]').fill('Playwright');
            await page.locator('button:has-text("Generate QR Code")').click();
        });

        await test.step('ASSERT: QR image is generated visually', async () => {
            const qrImage = page.locator('.qr-code img');
            const wrapper = page.locator('.wrapper');

            await expect(wrapper).toHaveClass(/active/);

            await expect(qrImage).toHaveAttribute('src', /api\.qrserver\.com/);

            await expect(async () => {
                const isLoaded = await qrImage.evaluate((img) => {
                    return (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0;
                });
                expect(isLoaded).toBeTruthy();
            }).toPass();

            await expect(qrImage).toHaveScreenshot({ maxDiffPixels: 100 }); 
        });

    });

});