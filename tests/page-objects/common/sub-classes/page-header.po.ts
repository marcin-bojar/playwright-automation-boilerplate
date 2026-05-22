import { Locator, Page } from '@playwright/test';

export class PageHeader {
    readonly page: Page;
    readonly headerTitle: Locator;
    readonly saveButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerTitle = page.getByTestId('header-title');
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
        this.closeButton = page.getByRole('button', { name: 'Close', exact: true });
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }
}
