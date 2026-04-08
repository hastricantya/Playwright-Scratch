/** Customer data for checkout step one (your information). */
export type CheckoutCustomer = {
  /** Short label for test titles / reports */
  id: string;
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const CHECKOUT_CUSTOMERS: readonly CheckoutCustomer[] = [
  {
    id: 'jakarta',
    firstName: 'Hastri',
    lastName: 'Cantya',
    postalCode: '11510',
  },
  {
    id: 'us-west',
    firstName: 'Jane',
    lastName: 'Doe',
    postalCode: '90210',
  },
  {
    id: 'leading-zero',
    firstName: 'Alex',
    lastName: 'Kim',
    postalCode: '00100',
  },
] as const;
