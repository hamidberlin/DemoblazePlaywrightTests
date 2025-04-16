import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openLoginModal() {
    await this.page.click('#login2');
    await this.page.waitForSelector('#logInModal');
  }

  async login(username: string, password: string) {
    await this.page.fill('#loginusername', username);
    await this.page.fill('#loginpassword', password);
    await this.page.click('button:has-text("Log in")');

    // Warte auf Login-Erfolg (Benutzernamen wird angezeigt)
    await this.page.waitForSelector('#nameofuser');
  }
}

