export interface AnalyticsDTO {
  projectId: string;
}

export interface AnalyticsReturnDTO {
  totalTasks: number;
  overdueTasks: number;
  completedTasks: number;
}
