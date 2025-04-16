import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    await this.page.click('a:has-text("Add to cart")');

    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
  }
}
