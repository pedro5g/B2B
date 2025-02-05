import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';

export interface ITask {
  id: string;
  taskCode: string;
  title: string;
  description?: string | null;
  status: TaskStatusType;
  priority: TaskPriorityType;
  dueDate: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  workspaceId: string;
  assignedId: string | null;
  projectId: string;
  authorId: string;
}
