import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';

export interface CreateTaskServiceDTO {
  workspaceId: string;
  projectId: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  assignedTo?: string;
  dueDate?: string;
}
