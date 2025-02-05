import { TaskPriorityType, TaskStatusType } from '@/shared/enums/task';

export interface UpdateTaskDTO {
  taskId: string;
  title: string;
  description?: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  assignedTo?: string | null;
  dueDate?: string;
}
