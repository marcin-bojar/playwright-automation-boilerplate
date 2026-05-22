import { Locator, Page, expect } from '@playwright/test';
import { CommonPO } from '@Tests/page-objects/common/common.po';
import { CreateDashboardModal } from './sub-classes/create-dashboard-modal.po';

export class ExampleDashboardPage extends CommonPO {
    readonly pageTitle: Locator;
    readonly newDashboardButton: Locator;
    readonly dashboardsTable: Locator;
    readonly dashboardsTableRow: Locator;
    readonly dashboardNameCell: Locator;
    readonly dashboardStatusCell: Locator;
    readonly createDashboardModal: CreateDashboardModal;

    constructor(page: Page) {
        super(page);

        this.pageTitle = page.getByTestId('header-title').getByText('Dashboards');
        this.newDashboardButton = page.getByRole('button', { name: 'New dashboard' });
        this.dashboardsTable = page.getByTestId('dashboards-table');
        this.dashboardsTableRow = page.getByTestId('dashboards-table-row');
        this.dashboardNameCell = page.getByTestId('dashboard-name-cell');
        this.dashboardStatusCell = page.getByTestId('dashboard-status-cell');
        this.createDashboardModal = new CreateDashboardModal(page);
    }

    getDashboardRowByName({ name }: { name: string }) {
        return this.dashboardsTableRow.filter({
            has: this.dashboardNameCell.filter({ hasText: name }),
        });
    }

    async clickNewDashboardButton() {
        await this.newDashboardButton.click();
    }

    async checkDashboardRow({ name, status }: { name: string; status: string }) {
        const row = this.getDashboardRowByName({ name });

        await expect(row).toBeVisible();
        await expect(row.locator(this.dashboardNameCell)).toContainText(name);
        await expect(row.locator(this.dashboardStatusCell)).toContainText(status);
    }
}
