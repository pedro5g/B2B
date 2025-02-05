import { ITaskRepository } from '../domain/repository/i-task-repository';
import { GetAllTasksServiceDTO } from './dtos/get-all-tasks-service-dto';

export class GetAllTasksService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({
    workspaceId,
    projectId,
    assignedTo,
    dueDate,
    keyword,
    priority,
    status,
    pageNumber,
    pageSize,
  }: GetAllTasksServiceDTO) {
    const { items, skip, totalCount, totalPage } =
      await this.taskRepository.getAllTasks({
        workspaceId,
        projectId,
        assignedTo,
        dueDate,
        keyword,
        priority,
        status,
        pageNumber,
        pageSize,
      });

    return {
      tasks: items,
      pagination: {
        pageSize,
        pageNumber,
        totalCount,
        totalPage,
        skip,
      },
    };
  }
}
