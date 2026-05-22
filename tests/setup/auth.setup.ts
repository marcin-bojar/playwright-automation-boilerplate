import { test as setup } from "@playwright/test";
import { LoginPage } from "@Tests/page-objects/auth/login-page.po";
import { getRequiredEnv } from "@Tests/utils/env";

const authFile = "./tests/playwright/.auth/login-auth.json";

setup("authenticate", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login({
        email: getRequiredEnv({ name: "E2E_USERNAME" }),
        password: getRequiredEnv({ name: "E2E_PASSWORD" }),
    });

    await page.context().storageState({ path: authFile });
});
