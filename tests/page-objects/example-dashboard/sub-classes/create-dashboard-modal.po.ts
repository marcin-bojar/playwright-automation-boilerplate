import { Locator, Page } from '@playwright/test';
import { CommonPO } from '@Tests/page-objects/common/common.po';

export class CreateDashboardModal extends CommonPO {
    readonly nameInput: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        super(page);

        this.nameInput = page.getByLabel('Dashboard name', { exact: true });
        this.createButton = page.getByRole('button', { name: 'Create dashboard' });
    }

    async enterName({ name }: { name: string }) {
        await this.nameInput.fill(name);
    }

    async clickCreateButton() {
        await this.createButton.click();
    }

    async createDashboard({ name }: { name: string }) {
        await this.enterName({ name });
        await this.clickCreateButton();
    }
}
