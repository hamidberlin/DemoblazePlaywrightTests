import { defineConfig, devices } from '@playwright/test';

// Hauptkonfiguration für Playwright
export default defineConfig({
  // Ordner, in dem sich die Tests befinden
  testDir: 'tests',

  // Tests parallel ausführen (beschleunigt Testlauf)
  fullyParallel: true,

  // `.only` in Tests ist in CI nicht erlaubt (verhindert versehentliches Auslassen)
  forbidOnly: !!process.env.CI,

  // In CI fehlgeschlagene Tests bis zu 2× wiederholen
  retries: process.env.CI ? 2 : 0,

  // In CI nur 1 Worker, lokal so viele wie möglich
  workers: process.env.CI ? 1 : undefined,

  // Reporter für die Testergebnisse (Liste in Konsole + HTML-Report)
  reporter: [
    ['list'], // CLI-Ausgabe
    ['html', { open: 'never', outputFolder: 'playwright-report' }], // HTML-Report speichern
  ],

  // Globale Einstellungen für alle Tests
  use: {
    // Basis-URL für Seitenaufrufe
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com',

    // Screenshot nur bei Fehlern
    screenshot: 'only-on-failure',

    // Video nur bei Fehlern speichern
    video: 'retain-on-failure',

    // Bei erstem Fehlschlag Trace zur Analyse aktivieren
    trace: 'on-first-retry',
  },

  // Tests in verschiedenen Browsern laufen lassen
  projects: [
    {
      name: 'Chromium', // Chrome-basiert
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit', // Safari (macOS/iOS)
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Maximale Laufzeit für jeden Test (in Millisekunden)
  timeout: 30 * 1000,

  // Maximale Wartezeit für Assertions wie `expect()`
  expect: {
    timeout: 5000,
  },
});
