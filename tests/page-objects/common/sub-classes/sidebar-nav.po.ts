import { Locator, Page } from '@playwright/test';

export class SidebarNav {
    readonly page: Page;
    readonly sidebarNav: Locator;
    readonly dashboardsMenuItem: Locator;
    readonly reportsMenuItem: Locator;
    readonly usersMenuItem: Locator;
    readonly settingsMenuItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebarNav = page.getByTestId('sidebar-nav');
        this.dashboardsMenuItem = this.sidebarNav.getByRole('menuitem', { name: 'Dashboards' });
        this.reportsMenuItem = this.sidebarNav.getByRole('menuitem', { name: 'Reports' });
        this.usersMenuItem = this.sidebarNav.getByRole('menuitem', { name: 'Users' });
        this.settingsMenuItem = this.sidebarNav.getByRole('menuitem', { name: 'Settings' });
    }

    async navigateToDashboards() {
        await this.dashboardsMenuItem.click();
    }

    async navigateToReports() {
        await this.reportsMenuItem.click();
    }

    async navigateToUsers() {
        await this.usersMenuItem.click();
    }

    async navigateToSettings() {
        await this.settingsMenuItem.click();
    }
}
