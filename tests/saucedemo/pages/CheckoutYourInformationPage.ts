import type { Page } from '@playwright/test';
import type { CheckoutCustomer } from '../data/checkout';

export class CheckoutYourInformationPage {
  constructor(private readonly page: Page) {}

  async fillAndContinue(customer: CheckoutCustomer): Promise<void> {
    await this.page.getByTestId('firstName').fill(customer.firstName);
    await this.page.getByTestId('lastName').fill(customer.lastName);
    await this.page.getByTestId('postalCode').fill(customer.postalCode);
    await this.page.getByTestId('continue').click();
  }

  async fillPostalCodeOnly(value: string): Promise<void> {
    await this.page.getByTestId('postalCode').fill(value);
  }

  async clickContinue(): Promise<void> {
    await this.page.getByTestId('continue').click();
  }
}
