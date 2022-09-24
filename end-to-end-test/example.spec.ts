import { test, expect } from '@playwright/test';

test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Minesweeper/);

  const cells = page.locator('button.cell')
  // const cellsCount = await cells.count()

  expect(await cells.count()).toBe(9)

  await cells.nth(0).click()


  // // create a locator
  // const getStarted = page.locator('text=Get Started');

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});
