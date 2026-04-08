import type { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async startCheckout(): Promise<void> {
    await this.page.getByTestId('checkout').click();
  }
}
