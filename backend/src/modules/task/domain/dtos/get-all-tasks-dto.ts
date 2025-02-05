import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';

export interface GetAllTasksDTO {
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
