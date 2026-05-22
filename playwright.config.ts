import { defineConfig, devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const isCI = process.env.CI === "true";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const config: PlaywrightTestConfig = {
    globalSetup: "./tests/globalSetup",
    testDir: "./tests/e2e-specs",
    timeout: 5 * 60 * 1000,
    globalTimeout: isCI ? 45 * 60 * 1000 : undefined,
    expect: {
        timeout: 30 * 1000,
    },
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: isCI ? 4 : undefined,
    fullyParallel: true,
    reporter: isCI ? [["github"], ["html"], ["junit", { outputFile: "junit.xml" }]] : [["html"], ["junit", { outputFile: "junit.xml" }]],
    use: {
        baseURL: baseUrl,
        viewport: { width: 1920, height: 1080 },
        actionTimeout: 30 * 1000,
        navigationTimeout: 30 * 1000,
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: "setup-auth",
            testDir: "./tests/setup",
            testMatch: "auth.setup.ts",
        },
        {
            name: "cleanup",
            testDir: "./tests/setup",
            testMatch: "cleanup.setup.ts",
        },
        {
            name: "chromium",
            dependencies: ["setup-auth"],
            use: {
                ...devices["Desktop Chrome"],
                browserName: "chromium",
                storageState: "./tests/playwright/.auth/login-auth.json",
            },
            testIgnore: "cleanup.setup.ts",
        },
        {
            name: "firefox",
            dependencies: ["setup-auth"],
            use: {
                ...devices["Desktop Firefox"],
                browserName: "firefox",
                storageState: "./tests/playwright/.auth/login-auth.json",
            },
            testIgnore: "cleanup.setup.ts",
        },
    ],
};

export default defineConfig(config);
