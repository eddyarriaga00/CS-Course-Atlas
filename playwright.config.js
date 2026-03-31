const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests/smoke',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI
        ? [['github'], ['html', { open: 'never' }]]
        : [['list']],
    use: {
        baseURL: 'http://127.0.0.1:4173',
        trace: 'on-first-retry'
    },
    webServer: {
        command: 'node scripts/serve-static.js',
        url: 'http://127.0.0.1:4173/index.html',
        timeout: 120_000,
        reuseExistingServer: !process.env.CI
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});

