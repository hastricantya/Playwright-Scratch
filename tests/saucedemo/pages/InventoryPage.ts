import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.getByTestId('title')).toHaveText('Products');
  }

  async addSauceLabsBackpackFromListing(): Promise<void> {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  }

  /** Opens product detail via title link, e.g. `item-0-title-link`. */
  async openProductTitleLink(itemTestId: string): Promise<void> {
    await this.page.getByTestId(itemTestId).click();
  }

  async addToCartOnDetailPage(): Promise<void> {
    await this.page.getByTestId('add-to-cart').click();
  }

  async backToProducts(): Promise<void> {
    await this.page.getByTestId('back-to-products').click();
  }
}
