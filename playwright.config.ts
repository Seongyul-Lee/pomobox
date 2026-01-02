import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const STORAGE_STATE = path.resolve(__dirname, 'tests/e2e/.auth/user.json');

export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Use 2 workers on CI for parallelization */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000/en',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // 인증이 필요 없는 테스트 (기본) - CI와 로컬 모두 실행
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [/auth\.setup\.ts/, /.*\.auth\.spec\.ts/],
    },

    // CI가 아닐 때만 인증 테스트와 다른 브라우저 테스트 실행
    ...(process.env.CI
      ? []
      : [
          // Auth setup - 로그인하여 인증 상태 저장 (로컬 전용)
          {
            name: 'setup',
            testMatch: /auth\.setup\.ts/,
          },
          // 인증이 필요한 테스트 (로컬 전용)
          {
            name: 'chromium-authenticated',
            use: {
              ...devices['Desktop Chrome'],
              storageState: STORAGE_STATE,
            },
            dependencies: ['setup'],
            testMatch: /.*\.auth\.spec\.ts/,
          },
          {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
            testIgnore: [/auth\.setup\.ts/, /.*\.auth\.spec\.ts/],
          },
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
            testIgnore: [/auth\.setup\.ts/, /.*\.auth\.spec\.ts/],
          },
        ]),
  ],

  /* Run your local dev server before starting the tests */
  /* CI: use production build for speed, Local: use dev server */
  webServer: {
    command: process.env.CI ? 'pnpm start' : 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: process.env.CI ? 60000 : 120000,
  },
});
