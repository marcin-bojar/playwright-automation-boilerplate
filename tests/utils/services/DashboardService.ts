import { Dashboard, DashboardRequest } from '@Tests/utils/types/dashboard';

const apiBaseUrl = process.env.API_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';

async function parseJsonResponse<T>({ response }: { response: Response }) {
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
}

export class DashboardService {
    static async addDashboard({ requestBody }: { requestBody: DashboardRequest }) {
        const response = await fetch(`${apiBaseUrl}/api/dashboards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        return parseJsonResponse<Dashboard>({ response });
    }

    static async getDashboards() {
        const response = await fetch(`${apiBaseUrl}/api/dashboards`);

        return parseJsonResponse<Dashboard[]>({ response });
    }

    static async deleteDashboard({ dashboardId }: { dashboardId: string }) {
        const response = await fetch(`${apiBaseUrl}/api/dashboards/${dashboardId}`, {
            method: 'DELETE',
        });

        if (!response.ok && response.status !== 404) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
    }
}
