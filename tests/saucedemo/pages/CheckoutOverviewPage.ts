import { expect, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');
  }

  async finish(): Promise<void> {
    await this.page.getByTestId('finish').click();
  }
}
