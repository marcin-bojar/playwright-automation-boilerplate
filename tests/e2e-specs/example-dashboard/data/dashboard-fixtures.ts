import { DashboardRequest } from '@Tests/utils/types/dashboard';

export const defaultDashboardStatus = 'Active';

export const seededDashboardFixture: DashboardRequest = {
    name: 'Seeded dashboard',
    status: defaultDashboardStatus,
    description: 'Seeded dashboard description',
    widgets: [],
    workspaceId: '123',
    userId: '123',
};
