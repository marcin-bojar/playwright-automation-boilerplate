// in real projects, these types will usually come from the app or generated API client
export type Dashboard = {
    id: string;
    name: string;
    status: string;
    description: string;
    widgets: Widget[];
    workspaceId: string;
    userId: string;
};

export type Widget = {
    id: string;
    name: string;
    type: string;
    configuration: Record<string, unknown>;
};

export type DashboardRequest = Omit<Dashboard, 'id'>;
