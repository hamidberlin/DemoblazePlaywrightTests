import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemRow = page.locator('tr.success');
  }

  async navigateToCart() {
    await this.page.click('a#cartur');
  }

  async expectItemInCart() {
    await this.cartItemRow.first().waitFor({ state: 'visible' });
    await expect(this.cartItemRow.first()).toBeVisible();
  }
  
  
}
