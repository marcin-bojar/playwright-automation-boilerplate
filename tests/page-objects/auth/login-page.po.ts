import { Locator, Page } from '@playwright/test';
import { CommonPO } from '@Tests/page-objects/common/common.po';

export class LoginPage extends CommonPO {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.getByLabel('Email', { exact: true });
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.submitButton = page.getByRole('button', { name: 'Log in' });
    }

    async goto() {
        await this.page.goto('/login');
    }

    async enterEmail({ email }: { email: string }) {
        await this.emailInput.fill(email);
    }

    async enterPassword({ password }: { password: string }) {
        await this.passwordInput.fill(password);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async login({ email, password }: { email: string; password: string }) {
        await this.goto();
        await this.enterEmail({ email });
        await this.enterPassword({ password });
        await this.clickSubmitButton();
        await this.waitForContentLoaded();
    }
}
