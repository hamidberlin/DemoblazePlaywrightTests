import { test, expect, chromium } from '@playwright/test';

// Testfall mit dem Titel "sollte die Playwright-Website öffnen und den Titel überprüfen"
test('sollte die Playwright-Website öffnen und den Titel überprüfen', async () => {
  
  // Startet den Chromium-Browser. `headless: false` bedeutet, dass der Browser sichtbar ist, 
  // und du die Aktion während des Tests im Browser sehen kannst (nützlich für Debugging).
  const browser = await chromium.launch({ headless: false });
  
  // Erstellt eine neue Seite (Tab) im Browser.
  const page = await browser.newPage();
  
  // Navigiert zur Playwright-Website.
  await page.goto('https://playwright.dev');
  
  // Holt den Titel der Seite (den Text innerhalb des `<title>`-Tags).
  const title = await page.title();
  
  // Überprüft, ob der Titel der Seite mit dem erwarteten Titel übereinstimmt.
  // Falls dies nicht der Fall ist, wird der Test fehlschlagen.
  expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
  
  // Schließt den Browser, nachdem der Test abgeschlossen ist.
  await browser.close();
});
