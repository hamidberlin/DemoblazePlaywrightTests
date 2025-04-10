import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Ordner, in dem sich deine Tests befinden
  testDir: 'tests',

  // Alle Tests parallel ausführen
  fullyParallel: true,

  // In CI darf kein `.only` im Code sein – verhindert versehentliches Auslassen von Tests
  forbidOnly: !!process.env.CI,

  // Wie oft soll ein fehlgeschlagener Test neu versucht werden? (nur in CI sinnvoll)
  retries: process.env.CI ? 2 : 0,

  // In CI nur einen Worker nutzen, lokal alle verfügbaren
  workers: process.env.CI ? 1 : undefined,

  // Testreporter (hier: HTML + CLI-Listenausgabe)
  reporter: [
    ['list'],
    ['html', { open: 'never' }], // kein automatisches Öffnen nach dem Lauf
  ],

  // Globale Testkonfiguration
  use: {
    // Basis-URL für `page.goto('/')` und Co.
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Screenshots nur bei Fehlern speichern (hilft beim Debuggen)
    screenshot: 'only-on-failure',

    // Videos nur bei Fehlern speichern (hilfreich in CI)
    video: 'retain-on-failure',

    // Bei einem Fehler im ersten Lauf: Tracing aktivieren für bessere Analyse
    trace: 'on-first-retry',
  },

  // Projekte definieren verschiedene Testumgebungen/Browsers
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Dev-Server starten, bevor Tests beginnen (z. B. bei React/Vite/Next.js)
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI, // lokal: nicht neu starten, wenn schon läuft
  },

  // Optional: Timeout für einzelne Tests (in ms)
  timeout: 30 * 1000, 

  // Optional: Timeout für einzelne `expect()`-Assertions
  expect: {
    timeout: 5000, 
  },
});
