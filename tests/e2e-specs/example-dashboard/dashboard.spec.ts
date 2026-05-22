import { expect, test } from '@Tests/utils/fixtures/playwright-fixtures';
import { ApiManager } from '@Tests/utils/managers/ApiManager';
import { buildTestName } from '@Tests/utils/test-data';
import { defaultDashboardStatus, seededDashboardFixture } from './data/dashboard-fixtures';

test.describe('Example Dashboard Page tests', async () => {
    let seededDashboardName: string;

    test.beforeAll(async () => {
        const dashboard = await ApiManager.addDashboard({
            requestBody: {
                ...seededDashboardFixture,
                name: buildTestName({ name: seededDashboardFixture.name }),
            },
        });

        seededDashboardName = dashboard.name;
    });

    test.beforeEach(async ({ exampleDashboardPage }) => {
        await exampleDashboardPage.navigateToDashboards();
    });

    test.afterAll(async () => {
        await ApiManager.removeDashboardByName({ name: seededDashboardName });
    });

    test('User can create a dashboard', async ({ page, exampleDashboardPage }) => {
        const dashboardName = buildTestName({ name: 'Created dashboard' });

        await exampleDashboardPage.waitForContentLoaded();

        await test.step('Check initial dashboard list', async () => {
            await expect(exampleDashboardPage.dashboardsTable).toBeVisible();
            await expect(exampleDashboardPage.dashboardsTableRow).toHaveCount(1);
            await exampleDashboardPage.checkDashboardRow({
                name: seededDashboardName,
                status: defaultDashboardStatus,
            });
        });

        await test.step('Create dashboard', async () => {
            await exampleDashboardPage.clickNewDashboardButton();
            await exampleDashboardPage.createDashboardModal.createDashboard({
                name: dashboardName,
            });
        });

        await test.step('Check newly created dashboard in table', async () => {
            await expect(exampleDashboardPage.dashboardsTable).toBeVisible();
            await exampleDashboardPage.checkDashboardRow({
                name: dashboardName,
                status: defaultDashboardStatus,
            });

            // reload page and check if changes are persisted
            await page.reload();
            await exampleDashboardPage.waitForContentLoaded();

            await expect(exampleDashboardPage.dashboardsTableRow).toHaveCount(2);
            await exampleDashboardPage.checkDashboardRow({
                name: dashboardName,
                status: defaultDashboardStatus,
            });
            // previously seeded dashboard should be still in the table
            await exampleDashboardPage.checkDashboardRow({
                name: seededDashboardName,
                status: defaultDashboardStatus,
            });
        });
    });
});
