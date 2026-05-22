import { Locator, Page, expect } from '@playwright/test';

export class Toast {
    readonly page: Page;
    readonly toastNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toastNotification = page.getByTestId('toast-notification');
    }

    async checkToastMessage({ message }: { message: string }) {
        await expect(this.toastNotification.filter({ hasText: message })).toBeVisible();
    }
}
