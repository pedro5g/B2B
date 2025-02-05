import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';

export interface GetAllTasksServiceDTO {
  workspaceId: string;
  projectId?: string;
  status?: TaskStatusType[];
  priority?: TaskPriorityType[];
  assignedTo?: string[];
  keyword?: string[];
  dueDate?: string;
  pageSize: number;
  pageNumber: number;
}
