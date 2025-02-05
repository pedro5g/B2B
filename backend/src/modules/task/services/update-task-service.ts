import { IProjectRepository } from '@/modules/project/domain/repository/i-project-repository';
import { ITaskRepository } from '../domain/repository/i-task-repository';
import { UpdateTaskServiceDTO } from './dtos/update-task-service-dto';
import { NotFoundException } from '@/shared/exceptions';

export class UpdateTaskService {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute({
    taskId,
    workspaceId,
    projectId,
    status,
    priority,
    title,
    description,
    dueDate,
    assignedTo,
  }: UpdateTaskServiceDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      projectId,
      workspaceId,
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to this workspace',
      );
    }

    const taskFound = await this.taskRepository.getById(taskId);

    if (!taskFound) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.taskRepository.update({
      taskId,
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
    });

    return { updatedTask };
  }
}
