import { expect, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}

  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.page.getByTestId('complete-header')).toHaveText(
      'Thank you for your order!',
    );
  }
}
