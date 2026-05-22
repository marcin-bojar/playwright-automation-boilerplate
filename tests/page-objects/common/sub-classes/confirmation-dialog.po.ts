import { Locator, Page } from '@playwright/test';

export class ConfirmationDialog {
    readonly page: Page;
    readonly confirmationDialog: Locator;
    readonly confirmationDialogConfirmButton: Locator;
    readonly confirmationDialogCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmationDialog = page.getByRole('dialog');
        this.confirmationDialogConfirmButton = this.confirmationDialog.getByRole('button', {
            name: 'Confirm',
        });
        this.confirmationDialogCancelButton = this.confirmationDialog.getByRole('button', {
            name: 'Cancel',
        });
    }

    async confirmDialog() {
        await this.confirmationDialogConfirmButton.click();
    }

    async cancelDialog() {
        await this.confirmationDialogCancelButton.click();
    }
}
