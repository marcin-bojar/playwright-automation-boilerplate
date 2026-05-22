import { Locator, Page, expect } from '@playwright/test';
import { pendingRequestTimeout } from '@Tests/utils/constants';
import { composePO } from './utils/composer';
import { ConfirmationDialog } from './sub-classes/confirmation-dialog.po';
import { PageHeader } from './sub-classes/page-header.po';
import { SidebarNav } from './sub-classes/sidebar-nav.po';
import { Toast } from './sub-classes/toast.po';

const BasePO = composePO(PageHeader, ConfirmationDialog, SidebarNav, Toast);

export class CommonPO extends BasePO {
    readonly pageLoader: Locator;
    readonly dropdownOption: Locator;
    readonly tableSettingsButton: Locator;

    constructor(page: Page) {
        super(page);

        this.pageLoader = page.getByTestId('page-loader');
        this.dropdownOption = page.getByRole('option');
        this.tableSettingsButton = page.getByTestId('table-settings-button');
    }

    async waitForContentLoaded({ timeout = pendingRequestTimeout }: { timeout?: number } = {}) {
        await expect(this.pageLoader).toHaveCount(0, { timeout });
    }

    async clickDropdownOption({ option, exact = true }: { option: string; exact?: boolean }) {
        await this.page.getByRole('option', { name: option, exact }).click();
    }

    async pressEscapeButton() {
        await this.page.keyboard.press('Escape');
    }

    async clickTableSettingsButton() {
        await this.tableSettingsButton.click();
    }
}
