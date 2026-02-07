import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: true,
  },
});
