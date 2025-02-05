import { IProjectRepository } from '@/modules/project/domain/repository/i-project-repository';
import { ITaskRepository } from '../domain/repository/i-task-repository';
import { GetTaskServiceDTO } from './dtos/get-task-service-dto';
import { NotFoundException } from '@/shared/exceptions';

export class GetTaskByIdService {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute({ taskId, workspaceId, projectId }: GetTaskServiceDTO) {
    const project = await this.projectRepository.getProjectByIdAndWorkspaceId({
      workspaceId,
      projectId,
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to this workspace',
      );
    }

    const task = await this.taskRepository.findByIdAndWorkspaceId({
      taskId,
      workspaceId,
    });

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return {
      task,
    };
  }
}
