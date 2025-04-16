import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

test('Login and add product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.navigate();

  await loginPage.openLoginModal();
  await loginPage.login('cypresstest', 'cypresstest');

  await homePage.clickFirstProduct();
  await productPage.addToCart();

  await cartPage.navigateToCart();
  await cartPage.expectItemInCart();
});
