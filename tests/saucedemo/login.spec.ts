import { test, expect } from '@playwright/test';
import {
  SAUCE_DEMO_PASSWORD,
  USERS_THAT_REACH_INVENTORY,
  Users,
} from './data/users';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';

test.describe('Sauce Demo login', () => {
  test('login page loads via base URL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  for (const username of USERS_THAT_REACH_INVENTORY) {
    test(`reaches inventory as ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(username, SAUCE_DEMO_PASSWORD);
      await inventoryPage.expectLoaded();
    });
  }

  test('locked out user sees error and stays on login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(Users.lockedOut, SAUCE_DEMO_PASSWORD);

    await expect(page.getByTestId('error')).toContainText(/locked out/i);
    await expect(page).not.toHaveURL(/inventory/);
  });
});
