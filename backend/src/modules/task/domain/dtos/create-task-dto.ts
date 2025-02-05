import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';

export interface CreateTaskDTO {
  workspaceId: string;
  projectId: string;
  title: string;
  description?: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  assignedTo?: string;
  dueDate?: string;
  authorId: string;
}
