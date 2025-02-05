import { Pagination } from '@/shared/interfaces/pagination';
import { CreateTaskDTO } from '../dtos/create-task-dto';
import { UpdateTaskDTO } from '../dtos/update-task-dto';
import { ITask } from '../models/i-task';
import { GetAllTasksDTO } from '../dtos/get-all-tasks-dto';
import { ITaskWithAssigned } from '../models/i-task-with-assigned';
import { FindByIdAndWorkspaceIdDTO } from '../dtos/find-by-id-and-workspace-id-dto';

export interface ITaskRepository {
  create(createArgs: CreateTaskDTO): Promise<ITask>;
  update(updateArgs: UpdateTaskDTO): Promise<ITask>;
  delete(taskId: string): Promise<void>;
  getById(taskId: string): Promise<ITask | null>;
  findByIdAndWorkspaceId(
    findArgs: FindByIdAndWorkspaceIdDTO,
  ): Promise<ITaskWithAssigned | null>;
  getAllTasks(
    getAllArgs: GetAllTasksDTO,
  ): Promise<Pagination<ITaskWithAssigned>>;
}
