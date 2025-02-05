import { NotFoundException } from '@/shared/exceptions';
import { ITaskRepository } from '../domain/repository/i-task-repository';
import { DeleteTaskServiceDTO } from './dtos/delete-task-service-dto';

export class DeleteTaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute({ taskId, workspaceId }: DeleteTaskServiceDTO) {
    const task = await this.taskRepository.findByIdAndWorkspaceId({
      taskId,
      workspaceId,
    });

    if (!task) {
      throw new NotFoundException(
        'Task not found or does not belong to the specified workspace',
      );
    }

    await this.taskRepository.delete(taskId);
  }
}
