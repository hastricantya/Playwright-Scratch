import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { CHECKOUT_CUSTOMERS } from './data/checkout';
import { SAUCE_DEMO_PASSWORD, Users } from './data/users';
import { CartPage } from './pages/CartPage';
import { CheckoutCompletePage } from './pages/CheckoutCompletePage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { CheckoutYourInformationPage } from './pages/CheckoutYourInformationPage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';

async function loginAsStandard(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(Users.standard, SAUCE_DEMO_PASSWORD);
}

async function putTwoItemsInCart(page: Page) {
  const inventory = new InventoryPage(page);
  await inventory.expectLoaded();
  await inventory.addSauceLabsBackpackFromListing();
  await inventory.openProductTitleLink('item-0-title-link');
  await inventory.addToCartOnDetailPage();
  await inventory.backToProducts();
}

test.describe('Sauce Demo checkout E2E', () => {
  for (const customer of CHECKOUT_CUSTOMERS) {
    test(`happy path completes order (${customer.id})`, async ({ page }) => {
      await loginAsStandard(page);
      await putTwoItemsInCart(page);

      const cart = new CartPage(page);
      await cart.goto();
      await cart.startCheckout();

      const stepOne = new CheckoutYourInformationPage(page);
      await stepOne.fillAndContinue(customer);

      const overview = new CheckoutOverviewPage(page);
      await overview.expectLoaded();
      await overview.finish();

      const complete = new CheckoutCompletePage(page);
      await complete.expectOrderComplete();
    });
  }

  test.describe('Checkout step one — negative / validation', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsStandard(page);
      await putTwoItemsInCart(page);
      const cart = new CartPage(page);
      await cart.goto();
      await cart.startCheckout();
    });

    test('empty postal code shows required error and stays on step one', async ({
      page,
    }) => {
      const stepOne = new CheckoutYourInformationPage(page);
      await page.getByTestId('firstName').fill('Hastri');
      await page.getByTestId('lastName').fill('Cantya');
      await stepOne.clickContinue();

      await expect(page.getByTestId('error')).toContainText(/postal code/i);
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });

    /**
     * Intended scenario: postal code must be numeric-only.
     * Sauce Demo does not enforce this in the UI — non-numeric values still reach overview.
     * This test documents current demo behavior; swap assertions when testing an app that validates.
     */
    test('postal code with letters — demo allows continue (no numeric validation)', async ({
      page,
    }) => {
      const stepOne = new CheckoutYourInformationPage(page);
      await page.getByTestId('firstName').fill('Hastri');
      await page.getByTestId('lastName').fill('Cantya');
      await stepOne.fillPostalCodeOnly('ABC11510');
      await stepOne.clickContinue();

      const overview = new CheckoutOverviewPage(page);
      await overview.expectLoaded();
    });
  });
});
