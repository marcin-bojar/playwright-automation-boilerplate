import { test as base } from '@playwright/test';
import { LoginPage } from '@Tests/page-objects/auth/login-page.po';
import { ExampleDashboardPage } from '@Tests/page-objects/example-dashboard/example-dashboard.po';
import { pendingRequestTimeout } from '@Tests/utils/constants';

type PlaywrightFixtures = {
    pendingRequestTimeout: number;
    loginPage: LoginPage;
    exampleDashboardPage: ExampleDashboardPage;
};

export const test = base.extend<PlaywrightFixtures>({
    pendingRequestTimeout,
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    exampleDashboardPage: async ({ page }, use) => {
        await use(new ExampleDashboardPage(page));
    },
});

export { expect } from '@playwright/test';
