import { DashboardService } from '@Tests/utils/services/DashboardService';
import { DashboardRequest } from '@Tests/utils/types/dashboard';

export class ApiManager {
    static async addDashboard({ requestBody }: { requestBody: DashboardRequest }) {
        return await DashboardService.addDashboard({ requestBody });
    }

    static async removeDashboardByName({ name }: { name: string }) {
        const dashboards = await DashboardService.getDashboards();
        const dashboard = dashboards.find((dashboard) => dashboard.name === name);

        if (dashboard) {
            await DashboardService.deleteDashboard({ dashboardId: dashboard.id });
        }
    }
}
