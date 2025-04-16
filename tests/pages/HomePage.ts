import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly firstProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProduct = page.locator('.card-title a').first();
  }

  async navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async clickFirstProduct() {
    await this.firstProduct.click();
  }
}
