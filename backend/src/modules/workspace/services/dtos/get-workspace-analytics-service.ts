export interface GetWorkspaceAnalyticsServiceDTO {
  workspaceId: string;
}

export interface GetWorkspaceAnalyticsServiceReturnDTO {
  analytics: {
    totalTasks: number;
    overdueTasks: number;
    completedTasks: number;
  };
}
